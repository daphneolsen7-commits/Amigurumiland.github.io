# Amigurumiland

Actualización del prototipo de e-commerce.

## WhatsApp
En `script.js`, cambia `WHATSAPP_NUMBER` por tu número en formato internacional sin +, espacios ni guiones. Ejemplo Ecuador: `0991234567` → `593991234567`. El enlace aparece en Contacto y en cada ficha de producto.

## Imágenes
Cada producto tiene cuatro vistas genéricas: frente, lado, atrás y detalle.

## Base de datos
La interfaz conserva el modelo relacional de 10 tablas: USUARIO, DIRECCION, CATEGORIA, PRODUCTO, INVENTARIO, PEDIDO, DETALLE_PEDIDO, PAGO, ENVIO y RESENA. La personalización color/tamaño se conserva dentro del detalle del pedido. Este HTML es un prototipo front-end y todavía no se conecta a MariaDB ni procesa pagos reales.
