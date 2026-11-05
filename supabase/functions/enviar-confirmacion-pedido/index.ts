import { createClient } from "npm:@supabase/supabase-js@2";
import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";

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

function wrapText(text: string, maxLength: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? line + " " + word : word;
    if (candidate.length > maxLength && line) {
      lines.push(line);
      line = word;
    } else line = candidate;
  }
  if (line) lines.push(line);
  return lines;
}

async function createReceiptPdf(order: any, details: any[], payment: any, pickup: any) {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - 58;
  const ink = rgb(0.19, 0.16, 0.15);
  const accent = rgb(0.63, 0.27, 0.17);

  const draw = (text: string, x = 48, size = 10, useBold = false) => {
    page.drawText(text, { x, y, size, font: useBold ? bold : font, color: ink });
    y -= size + 7;
  };
  const ensureSpace = (needed = 28) => {
    if (y < 55 + needed) {
      page = pdf.addPage([pageWidth, pageHeight]);
      y = pageHeight - 58;
    }
  };

  page.drawText("AMIGURUMILAND", {
    x: 48, y, size: 19, font: bold, color: accent,
  });
  y -= 30;
  draw("CONFIRMACION Y RESUMEN DE COMPRA", 48, 12, true);
  draw("Este documento es un comprobante informativo del pedido; no es una factura tributaria autorizada.");
  y -= 8;
  page.drawLine({ start: { x: 48, y }, end: { x: 547, y }, thickness: 1, color: accent });
  y -= 24;

  draw("Pedido: " + String(order.codigo), 48, 12, true);
  draw("Fecha: " + new Date(order.created_at).toLocaleString("es-EC", {
    dateStyle: "medium", timeStyle: "short", timeZone: "America/Guayaquil",
  }));
  draw("Cliente: " + String(order.customer_name || "Cliente"));
  draw("Correo: " + String(order.email));
  draw("Punto de retiro: " + String(pickup?.nombre || "Por coordinar"));
  draw("Estado del pedido: " + String(order.estado));
  draw("Metodo de pago: " + String(payment?.metodo || "No registrado"));
  draw("Estado del pago: " + String(payment?.estado || "Pendiente"));
  y -= 12;

  draw("DETALLE DE PRODUCTOS", 48, 12, true);
  for (const item of details) {
    ensureSpace(48);
    const customization = [item.color, item.tamano].filter(Boolean).join(" / ");
    const label = String(item.nombre_producto) + (customization ? " (" + customization + ")" : "");
    for (const line of wrapText(label, 72)) {
      ensureSpace(20);
      draw(line, 52, 10, true);
    }
    draw("Cantidad: " + item.cantidad + "   Precio unitario: " + money(Number(item.precio_unitario)) +
      "   Subtotal: " + money(Number(item.subtotal)), 62, 9);
  }

  ensureSpace(75);
  y -= 10;
  page.drawLine({ start: { x: 330, y }, end: { x: 547, y }, thickness: 0.7, color: accent });
  y -= 24;
  page.drawText("TOTAL: " + money(Number(order.total)), {
    x: 330, y, size: 14, font: bold, color: accent,
  });
  y -= 34;
  ensureSpace(38);
  draw("Gracias por elegir Amigurumiland. Elaboramos cada pieza con dedicacion.", 48, 9);
  draw("Conserva este resumen para consultar el estado de tu pedido.", 48, 9);

  return await pdf.save();
}

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

    const orderForPdf = {
      ...order,
      customer_name: invoiceResult.data?.nombre_razon_social || authData.user.email || "Cliente",
      email: recipient,
    };
    const pdfBytes = await createReceiptPdf(
      orderForPdf, detailsResult.data, paymentResult.data, pickupResult.data,
    );
    let binary = "";
    for (let offset = 0; offset < pdfBytes.length; offset += 0x8000) {
      binary += String.fromCharCode(...pdfBytes.subarray(offset, offset + 0x8000));
    }
    const pdfBase64 = btoa(binary);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + resendKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipient],
        subject: "Confirmacion de tu pedido " + order.codigo + " | Amigurumiland",
        html: `<div style="font-family:Arial,sans-serif;color:#302b29;line-height:1.6">
          <h2 style="color:#a0442c">¡Gracias por tu compra!</h2>
          <p>Hola ${escapeHtml(orderForPdf.customer_name)},</p>
          <p>Registramos tu pedido <strong>${escapeHtml(order.codigo)}</strong>.</p>
          <p>El estado actual del pedido es <strong>${escapeHtml(order.estado)}</strong> y el pago figura como <strong>${escapeHtml(paymentResult.data?.estado || "Pendiente")}</strong>. Si elegiste transferencia, recuerda que el pago queda pendiente de verificacion.</p>
          <p>Adjuntamos el resumen de compra en PDF para tu consulta.</p>
          <p><strong>Total: ${escapeHtml(money(Number(order.total)))}</strong></p>
          <p>Este resumen es informativo y no constituye una factura tributaria autorizada.</p>
          <p>Con cariño,<br>Amigurumiland</p>
        </div>`,
        attachments: [{
          filename: "resumen-pedido-" + order.codigo + ".pdf",
          content: pdfBase64,
        }],
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
