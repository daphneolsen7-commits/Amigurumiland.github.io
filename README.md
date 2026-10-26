# Amigurumiland

Sitio web de comercio electrónico de amigurumis. Incluye catálogo y filtros, personalización de productos, carrito, registro e inicio de sesión, checkout, selección de punto de retiro, flujo de pago de prueba, confirmación de compra, cuenta de usuario, historial y consulta de pedidos, reseñas, cotizaciones, FAQ y contacto.

## Ejecutar y revisar

1. Descomprime la carpeta completa.
2. Abre `index.html` o publica la carpeta en un hosting estático como GitHub Pages.
3. Para probar compras, crea una cuenta, inicia sesión, agrega un producto al carrito y completa los formularios del checkout.
4. La autenticación, el catálogo activo, el checkout transaccional, el historial, las cotizaciones, las reseñas y la consulta pública de pedidos usan Supabase. El carrito y los datos temporales del checkout permanecen en el navegador por diseño. Las imágenes de cotización se almacenan en un bucket privado y las imágenes de reseñas en un bucket público con permisos de carga restringidos.

## Estado de los pagos

El flujo de pago valida los campos y registra un resultado de prueba; no se conecta con bancos, PayPal ni una pasarela de pagos y no realiza cargos reales. No introduzcas datos bancarios reales.

## Importante: cómo hacer que funcione desde cualquier laptop

El sitio usa GitHub Pages para la interfaz y Supabase para autenticación y datos transaccionales. Los pedidos confirmados por el checkout y el historial se comparten a través de Supabase; el carrito es local por diseño. El panel administrativo se encuentra en `admin.html` y valida el rol contra Supabase. Permite revisar pedidos y pagos, actualizar estados de retiro y responder cotizaciones. Solo una cuenta incluida en `public.administradores` puede usarlo. No se debe usar `localStorage` como fuente de verdad para pagos o pedidos.

Arquitectura actual: **GitHub Pages (frontend) + Supabase Auth + PostgreSQL/Supabase (backend y base de datos)**. Las migraciones nuevas se versionan en `supabase/migrations/`; revisa el SQL antes de aplicarlo a otro proyecto. Las reglas sensibles se validan en PostgreSQL mediante RLS y funciones transaccionales. El checkout actual registra pedidos y descuenta inventario de forma atómica; la transferencia sigue pendiente de verificación manual y el pago simulado no cobra dinero. No se deben almacenar números de tarjeta ni CVV. Para pagos reales hará falta una pasarela y verificación real del cobro.

## Modelo de datos

La base de datos activa está en Supabase. El esquema incluye categorías, perfiles, productos, puntos de retiro, pedidos, detalles, pagos, facturas, envíos, cotizaciones, imágenes de cotización y reseñas, con RLS habilitado. Los cambios SQL deben guardarse también como migraciones versionadas; no ejecutes a ciegas el archivo de checkout completo sobre una base ya existente.


## Catálogo de productos e imágenes

El catálogo contiene 30 productos: 10 de Animales, 10 de Personajes y 10 de Regalos. Por ahora, los datos están definidos al inicio de `script.js` en el arreglo `products`; no es obligatorio tener un archivo JSON para que funcione.

### Cómo añadir o cambiar la imagen de un producto

1. Dentro de la carpeta del sitio, abre `assets` y crea una carpeta llamada `products` si todavía no existe.
2. Guarda la imagen del producto en esa carpeta, preferiblemente en formato JPG o WebP, con un nombre corto y sin espacios. Usa el nombre del archivo que figura en el campo `image` del producto. Por ejemplo, para `conejito-nube`, guarda `assets/products/conejito-nube.jpg`.
3. En `script.js`, busca el producto por su nombre y confirma que tenga `image: "assets/products/conejito-nube.jpg"`. La ruta distingue mayúsculas y minúsculas al publicar en algunos servidores.
4. Guarda los cambios y recarga el sitio. Si no encuentra la imagen, la interfaz mostrará la imagen general de respaldo.
5. Para la ficha de producto y la tarjeta del catálogo se reutiliza el mismo campo `image`. Si quieres mostrar varios ángulos, habría que ampliar cada producto para que tenga una lista de imágenes y actualizar la ficha para mostrar una galería.

Recomendaciones: usa fotografías propias o imágenes que tengas permiso de utilizar; recorta los productos con buena luz, fondo sencillo y el muñeco centrado. Conviene que las imágenes tengan proporciones parecidas (por ejemplo, cuadradas) y un tamaño optimizado para que la web cargue rápido.

### ¿Es obligatorio usar JSON?

No. JSON es un formato de texto para organizar datos. En este proyecto los productos están en un arreglo de objetos JavaScript dentro de `script.js`, que cumple la misma función para el catálogo actual. Tus compañeros pueden tener archivos `.json` porque separan los datos del código, por ejemplo `productos.json`. Cuando se implemente el backend, la API podrá devolver los productos en formato JSON desde la base de datos. No es necesario crear JSON ahora solo por tener muchos productos; sí conviene mantener el catálogo ordenado y migrarlo después a la base de datos.


## Ajustes de personalización por producto

- Los productos de la categoría `Personajes` no muestran selector de color.
- Tampoco muestran selector `Rosa Chanel`, `Llavero de aguacate`, `Cactus`, `Panda`, `Girasol` ni `Tulisnoopys`.
- Los demás productos muestran únicamente una paleta de colores relacionada con la fotografía existente del producto.
- No se agregaron ni modificaron imágenes. La selección de color se registra en el carrito, pero no cambia la fotografía; para mostrar visualmente cada variante sería necesario contar con una imagen de esa variante.
