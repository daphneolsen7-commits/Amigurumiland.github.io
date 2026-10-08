# Amigurumiland

Prototipo académico de e-commerce para HCI.

## Navegación
La interfaz está separada en varias pantallas HTML, no en una sola página con anclas:
- `index.html` — inicio
- `productos.html` — catálogo
- `producto.html?id=...` — detalle y personalización
- `carrito.html` — carrito
- `checkout-datos.html` — datos del comprador y punto de retiro
- `checkout-pago.html` — simulación del método de pago
- `confirmacion.html` — resultado de la transacción simulada
- `pedido.html` — consulta del pedido
- `faq.html` — preguntas frecuentes
- `contacto.html` — contacto
- `cotizacion.html` — solicitud de cotización personalizada

## Simulación de base de datos
Mientras el prototipo no está conectado a MariaDB, las operaciones se guardan temporalmente en `localStorage` con una estructura que representa las tablas `USUARIO`, `DIRECCION`, `PEDIDO`, `DETALLE_PEDIDO`, `PAGO`, `ENVIO` y `RESENA`.

Los datos de pago son únicamente datos de prueba. No existe conexión con bancos, procesadores de pago ni cuentas reales.

Para tarjeta puede usarse, por ejemplo, `4242 4242 4242 4242`, con vencimiento futuro y CVV ficticio de 3 o 4 dígitos.

## WhatsApp
El número de contacto está definido en `script.js` en `WHATSAPP_NUMBER`.
