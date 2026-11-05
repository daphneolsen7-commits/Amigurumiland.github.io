import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, x-client-info, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const money = (value: number) =>
  new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD" }).format(value);

const escapeHtml = (value: unknown) =>
  String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]!);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Metodo no permitido." }, 405);

  try {
    const authorization = req.headers.get("Authorization") || "";
    const token = authorization.replace(/^Bearer\s+/i, "");
    if (!token || token === authorization) return json({ error: "Sesion requerida." }, 401);

    const url = Deno.env.get("SUPABASE_URL");
    const publishableKeys = JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") || "{}");
    const secretKeys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}");
    const publishableKey = publishableKeys.default;
    const secretKey = secretKeys.default;
    if (!url || !publishableKey || !secretKey) {
      console.error("Faltan variables internas de Supabase para la funcion.");
      return json({ error: "La funcion no esta configurada correctamente." }, 500);
    }

    const userClient = createClient(url, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: "Bearer " + token } },
    });
    const { data: authData, error: authError } = await userClient.auth.getUser(token);
    if (authError || !authData.user) return json({ error: "Sesion no valida." }, 401);

    const body = await req.json().catch(() => ({}));
    const orderId = String(body.orderId || "");
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(orderId)) {
      return json({ error: "Identificador de pedido no valido." }, 400);
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL");
    if (!resendKey || !fromEmail) {
      return json({
        error: "Falta configurar RESEND_API_KEY y RESEND_FROM_EMAIL en los secretos de Edge Functions.",
        code: "EMAIL_NOT_CONFIGURED",
      }, 503);
    }

    const admin = createClient(url, secretKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: order, error: orderError } = await admin
      .from("pedidos")
      .select("id, codigo, usuario_id, estado, subtotal, total, created_at, punto_retiro_id")
      .eq("id", orderId)
      .eq("usuario_id", authData.user.id)
      .maybeSingle();
    if (orderError) throw orderError;
    if (!order) return json({ error: "No se encontro el pedido para esta cuenta." }, 404);

    const [invoiceResult, detailsResult, paymentResult, pickupResult] = await Promise.all([
      admin.from("facturas").select("email, nombre_razon_social").eq("pedido_id", order.id).maybeSingle(),
      admin.from("detalle_pedido").select("nombre_producto, cantidad, color, tamano, precio_unitario, subtotal").eq("pedido_id", order.id),
      admin.from("pagos").select("metodo, estado").eq("pedido_id", order.id).maybeSingle(),
      order.punto_retiro_id
        ? admin.from("puntos_retiro").select("nombre").eq("id", order.punto_retiro_id).maybeSingle()
        : Promise.resolve({ data: null, error: null }),
    ]);
    if (invoiceResult.error) throw invoiceResult.error;
    if (detailsResult.error) throw detailsResult.error;
    if (paymentResult.error) throw paymentResult.error;
    if (pickupResult.error) throw pickupResult.error;

    const recipient = String(invoiceResult.data?.email || authData.user.email || "").trim().toLowerCase();
    if (!recipient || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
      return json({ error: "El pedido no tiene un correo de destino valido." }, 422);
    }
    if (!detailsResult.data?.length) return json({ error: "El pedido no tiene productos asociados." }, 422);

    const itemsHtml = detailsResult.data.map((item: any) => {
      const options = [item.color, item.tamano].filter(Boolean).join(" · ");
      return `<tr><td>${escapeHtml(item.nombre_producto)}<br><small>${escapeHtml(options || "Sin personalización")}</small></td><td>${Number(item.cantidad)}</td><td>${escapeHtml(money(Number(item.precio_unitario)))}</td><td>${escapeHtml(money(Number(item.subtotal)))}</td></tr>`;
    }).join("");
    const customerName = String(invoiceResult.data?.nombre_razon_social || authData.user.user_metadata?.full_name || "Cliente");
    const paymentMethod = String(paymentResult.data?.metodo || "No registrado");
    const paymentStatus = String(paymentResult.data?.estado || "Pendiente");
    const pickupName = String(pickupResult.data?.nombre || "Por coordinar");
    const createdAt = new Date(order.created_at).toLocaleString("es-EC", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Guayaquil" });
    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"></head><body style="margin:0;padding:24px;background:#fbf8f2;font-family:Arial,sans-serif;color:#302b29;line-height:1.6">
      <main style="max-width:680px;margin:auto;background:#fffdf9;padding:28px;border:1px solid #e8e0d7;border-radius:12px">
      <h1 style="color:#a0442c">Amigurumiland ♡</h1><p>Hola ${escapeHtml(customerName)},</p><h2>¡Recibimos tu pedido!</h2>
      <p>Tu pedido <strong>${escapeHtml(order.codigo)}</strong> fue registrado el ${escapeHtml(createdAt)}.</p>
      <h3>Resumen de compra</h3><table style="width:100%;border-collapse:collapse"><thead><tr style="background:#fbf8f2"><th>Producto</th><th>Cant.</th><th>Precio</th><th>Subtotal</th></tr></thead><tbody>${itemsHtml}</tbody></table>
      <p style="text-align:right;font-size:20px"><strong>Total: ${escapeHtml(money(Number(order.total)))}</strong></p>
      <h3>Pago y entrega</h3><p><strong>Método:</strong> ${escapeHtml(paymentMethod)}<br><strong>Estado del pago:</strong> ${escapeHtml(paymentStatus)}<br><strong>Estado del pedido:</strong> ${escapeHtml(order.estado)}<br><strong>Punto de retiro:</strong> ${escapeHtml(pickupName)}</p>
      <p style="padding:12px;background:#fbf8f2;border:1px solid #e8e0d7;font-size:13px">Este correo es un resumen informativo de compra. No es una factura electrónica tributaria autorizada ni reemplaza un comprobante autorizado por el SRI.</p>
      <p>Gracias por elegirnos.<br><strong>Con cariño, Amigurumiland</strong></p></main></body></html>`;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + resendKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipient],
        subject: "Confirmación y resumen de tu pedido " + order.codigo + " | Amigurumiland",
        html,
      }),
    });

    const resendResult = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("Resend rechazo el envio:", response.status, resendResult?.message || "sin detalle");
      return json({ error: "No se pudo enviar el correo. Verifica la configuracion del remitente en Resend." }, 502);
    }

    return json({ sent: true, orderCode: order.codigo, email: recipient });
  } catch (error) {
    console.error("Error enviando el resumen del pedido:", error?.message || error);
    return json({ error: "Ocurrio un error al preparar o enviar el resumen del pedido." }, 500);
  }
});
