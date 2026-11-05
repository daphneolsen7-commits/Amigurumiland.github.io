const EXPECTED_SECRET = PropertiesService.getScriptProperties().getProperty("AMIGURILAND_SHARED_SECRET");

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (!EXPECTED_SECRET || !data.secret || data.secret !== EXPECTED_SECRET) return output({ sent: false, error: "No autorizado" });
    const recipient = String(data.to || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) return output({ sent: false, error: "Correo no válido" });
    const safe = value => String(value == null ? "" : value).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" })[c]);
    const money = value => new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD" }).format(Number(value || 0));
    const rows = (data.items || []).map(item => '<tr><td style="padding:10px;border-bottom:1px solid #eee">' + safe(item.name) + '<br><small>' + safe(item.options || "Sin personalización") + '</small></td><td style="padding:10px;border-bottom:1px solid #eee;text-align:center">' + Number(item.quantity) + '</td><td style="padding:10px;border-bottom:1px solid #eee;text-align:right">' + money(item.unitPrice) + '</td><td style="padding:10px;border-bottom:1px solid #eee;text-align:right">' + money(item.subtotal) + '</td></tr>').join("");
    const html = '<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#302b29;line-height:1.6"><h1 style="color:#a0442c">Amigurumiland ♡</h1><p>Hola ' + safe(data.customerName) + ',</p><h2>¡Recibimos tu pedido!</h2><p>Pedido <b>' + safe(data.orderCode) + '</b> · ' + safe(data.createdAt) + '</p><h3>Resumen de compra</h3><table style="width:100%;border-collapse:collapse"><thead><tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Subtotal</th></tr></thead><tbody>' + rows + '</tbody></table><p style="text-align:right"><b>Subtotal: ' + money(data.subtotal) + '<br>Total: ' + money(data.total) + '</b></p><h3>Pago y entrega</h3><p><b>Método:</b> ' + safe(data.paymentMethod) + '<br><b>Estado del pago:</b> ' + safe(data.paymentStatus) + '<br><b>Estado del pedido:</b> ' + safe(data.orderStatus) + '<br><b>Punto de retiro:</b> ' + safe(data.pickup) + '</p><p style="padding:12px;background:#fbf8f2;border:1px solid #e8e0d7;font-size:13px">Este correo es un resumen informativo de compra. No es una factura electrónica tributaria autorizada ni reemplaza un comprobante autorizado por el SRI.</p><p>Gracias por elegirnos.<br><b>Con cariño, Amigurumiland</b></p></div>';
    MailApp.sendEmail({ to: recipient, subject: "Confirmación y resumen de tu pedido " + String(data.orderCode || ""), htmlBody: html, body: "Recibimos tu pedido " + String(data.orderCode || "") + ". Consulta el resumen en este correo HTML." });
    return output({ sent: true });
  } catch (err) {
    console.error(err);
    return output({ sent: false, error: "No se pudo enviar el correo" });
  }
}
function output(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
function autorizarEnvioGmail() { MailApp.getRemainingDailyQuota(); }