# Amigurumiland

Sitio web de comercio electrónico de amigurumis. Incluye catálogo y filtros, personalización de productos, carrito, registro e inicio de sesión, checkout, selección de punto de retiro, flujo de pago de prueba, confirmación de compra, cuenta de usuario, historial y consulta de pedidos, reseñas, cotizaciones, FAQ y contacto.

## Ejecutar y revisar

1. Descomprime la carpeta completa.
2. Abre `index.html` o publica la carpeta en un hosting estático como GitHub Pages.
3. Para probar compras, crea una cuenta, inicia sesión, agrega un producto al carrito y completa los formularios del checkout.
4. La información de cuentas, pedidos, reseñas y cotizaciones se guarda actualmente en el almacenamiento del navegador (`localStorage` / `sessionStorage`). Para revisar de nuevo los datos, usa el mismo navegador y el mismo perfil.

## Estado de los pagos

El flujo de pago valida los campos y registra un resultado de prueba; no se conecta con bancos, PayPal ni una pasarela de pagos y no realiza cargos reales. No introduzcas datos bancarios reales.

## Importante: cómo hacer que funcione desde cualquier laptop

El hosting estático publica los archivos, pero no comparte el `localStorage` de un visitante con otro. Por eso, en el estado actual, el profesor puede navegar por el sitio desde cualquier equipo, pero los registros y pedidos creados en un navegador no aparecerán automáticamente en otro. Para conseguir persistencia compartida hay que desplegar una API/backend y una base de datos en línea, y cambiar el JavaScript para que las operaciones de registro, inicio de sesión, cotizaciones, pedidos y reseñas usen esa API.

Arquitectura sencilla recomendada para la siguiente etapa: **GitHub Pages (frontend) + API Node.js/Express (Render u otro hosting de backend) + PostgreSQL administrado (Neon/Supabase) o MariaDB administrada**. Las contraseñas deben verificarse en el servidor con Argon2id/bcrypt; no debe confiarse en autenticación ni validaciones solo del navegador. La API debe proteger las rutas de cuenta y pedidos, validar los datos y guardar cada pedido y sus detalles en una transacción. Las tarjetas/CVV no deben almacenarse; para pagos reales se integraría una pasarela, pero para esta entrega se conserva el flujo de pago de prueba.

## Modelo de datos

`modelo_bd_amigurumiland.sql` documenta el modelo MariaDB propuesto. Todavía no se ejecuta ni se conecta desde la web. Incluye usuarios, categorías, productos e imágenes, puntos de retiro, pedidos y detalles, pagos, facturas, reseñas y cotizaciones.


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
