const WHATSAPP_NUMBER = "593992626500";
const CART_KEY = "amigurumiland_cart";
const DB_KEY = "amigurumiland_db";
const CHECKOUT_KEY = "amigurumiland_checkout";
const products = [
  { id: 1, name: "Osito miel", cat: "Animales", price: 8.90, slug: "osito-miel", stock: 8, image: "assets/osito.jpg" },
  { id: 2, name: "Hatsune Miku", cat: "Personajes", price: 15.90, slug: "hatsune-miku", stock: 5, image: "assets/ChatGPT%20Image%202%20oct%202026%2C%2007_57_32%20p.m..png" },
  { id: 3, name: "Tulipán tejido", cat: "Regalos", price: 5.50, slug: "tulipan", stock: 10, image: "assets/tulipan.jpg" },
  { id: 4, name: "Rosa tejida", cat: "Regalos", price: 5.00, slug: "rosa", stock: 5, image: "assets/rosa.jpg" },
  { id: 5, name: "Conejito", cat: "Animales", price: 9.50, slug: "conejito", stock: 7, image: "assets/conejito.webp" },
  { id: 6, name: "Gatito", cat: "Animales", price: 9.90, slug: "gatito", stock: 6, image: "assets/gatito.jpg" },
  { id: 7, name: "Zorrito", cat: "Animales", price: 10.50, slug: "zorrito", stock: 5, image: "assets/zorrito.webp" },
  { id: 8, name: "Perrito", cat: "Animales", price: 9.90, slug: "perrito", stock: 8, image: "assets/perrito.jpg" },
  { id: 9, name: "Panda", cat: "Animales", price: 11.50, slug: "panda", stock: 4, image: "assets/panda.jpg" },
  { id: 10, name: "Abejita", cat: "Animales", price: 5.50, slug: "abejita", stock: 10, image: "assets/abejita.jpg" },
  { id: 11, name: "Capibara", cat: "Animales", price: 12.50, slug: "capibara", stock: 4, image: "assets/capybara.jpg" },
  { id: 12, name: "Ranita", cat: "Animales", price: 8.50, slug: "ranita", stock: 7, image: "assets/ranita.webp" },
  { id: 13, name: "Ballena", cat: "Animales", price: 10.90, slug: "ballena", stock: 5, image: "assets/ballena.jpg" },
  { id: 15, name: "Totoro", cat: "Personajes", price: 14.90, slug: "totoro", stock: 4, image: "assets/totoro.jpg" },
  { id: 16, name: "Kirby", cat: "Personajes", price: 12.90, slug: "kirby-rosa", stock: 5, image: "assets/kirby.webp" },
  { id: 17, name: "Pikachu", cat: "Personajes", price: 13.90, slug: "pikachu", stock: 5, image: "assets/pikachu.webp" },
  { id: 18, name: "Kuromi", cat: "Personajes", price: 14.50, slug: "kuromi", stock: 4, image: "assets/kuromi.webp" },
  { id: 19, name: "Hello Kitty", cat: "Personajes", price: 13.50, slug: "hello-kitty", stock: 6, image: "assets/hello kitty.webp" },
  { id: 20, name: "Stitch", cat: "Personajes", price: 14.90, slug: "stitch", stock: 4, image: "assets/stitch.webp" },
  { id: 21, name: "Baby Yoda", cat: "Personajes", price: 9.50, slug: "baby-yoda", stock: 3, image: "assets/baby yoda.jpg" },
  { id: 22, name: "Spiderman", cat: "Personajes", price: 14.90, slug: "spiderman", stock: 4, image: "assets/spiderman.webp" },
  { id: 23, name: "El principito", cat: "Personajes", price: 9.90, slug: "principito", stock: 8, image: "assets/principito.png" },
  { id: 25, name: "Girasol", cat: "Regalos", price: 4.50, slug: "girasol", stock: 6, image: "assets/girasol.jpg" },
  { id: 26, name: "Corazón", cat: "Regalos", price: 3.50, slug: "corazon-gato", stock: 10, image: "assets/corazon.webp" },
  { id: 27, name: "Llavero de aguacate", cat: "Regalos", price: 5.90, slug: "llavero-aguacate", stock: 12, image: "assets/Aguacate.jpg" },
  { id: 28, name: "Maceta con flor", cat: "Regalos", price: 8.90, slug: "maceta-flor", stock: 7, image: "assets/maceta.jpg" },
  { id: 29, name: "Rosa chanel", cat: "Regalos", price: 11.50, slug: "rosa-chanel", stock: 5, image: "assets/rosa chanel.jpg" },
  { id: 30, name: "Tulisnoopys", cat: "Regalos", price: 12.90, slug: "Tulisnoopys", stock: 5, image: "assets/tulisnoopys.jpg" },
  { id: 31, name: "Luna y estrella", cat: "Regalos", price: 7.90, slug: "luna-estrella", stock: 8, image: "assets/luna y estrella.jpg" },
  { id: 32, name: "Cactus", cat: "Regalos", price: 6.90, slug: "cactus", stock: 9, image: "assets/cactus.webp" }];

  // Conserva imágenes, categorías y demás datos visuales originales.
const localProductMetadata = products.map(product => ({ ...product }));
// Paletas adaptadas al color y diseño de la fotografía existente de cada producto.
const productColorPalettes = {
  "osito-miel": [["Miel", "#b78355"], ["Crema", "#e7d3bb"], ["Café", "#795548"]],
  "tulipan": [["Rosa", "#d98291"], ["Rojo", "#b83245"], ["Blanco", "#f4eee7"]],
  "rosa": [["Rojo", "#c6283d"], ["Rosa", "#e7aab4"], ["Crema", "#e7d3bb"]],
  "conejito": [["Rosa", "#e7aab4"], ["Crema", "#e7d3bb"], ["Gris", "#aeb2b5"]],
  "gatito": [["Blanco", "#f4f0e8"], ["Gris", "#aeb2b5"], ["Crema", "#e7d3bb"]],
  "zorrito": [["Naranja", "#d97732"], ["Canela", "#a95c35"], ["Crema", "#e7d3bb"]],
  "perrito": [["Crema", "#e7d3bb"], ["Beige", "#c7a783"], ["Café", "#795548"]],
  "abejita": [["Amarillo", "#f4c542"], ["Dorado", "#d99b27"], ["Crema", "#f4e8c8"]],
  "capibara": [["Caramelo", "#a86e43"], ["Café", "#795548"], ["Beige", "#c7a783"]],
  "ranita": [["Verde", "#5b9560"], ["Verde claro", "#9acb87"], ["Menta", "#b7d9c2"]],
  "ballena": [["Celeste", "#a9c7df"], ["Azul", "#5b8db8"], ["Azul claro", "#d4e6f3"]],
  "corazon-gato": [["Rojo", "#c6283d"], ["Rosa", "#e7aab4"], ["Vino", "#8f1d35"]],
  "maceta-flor": [["Rojo", "#c6283d"], ["Rosa", "#e7aab4"], ["Amarillo", "#f4c542"]],
  "luna-estrella": [["Celeste", "#a9c7df"], ["Crema", "#e7d3bb"], ["Gris", "#aeb2b5"]]
};
const fixedAppearanceSlugs = new Set([
  "hatsune-miku", "totoro", "kirby-rosa", "pikachu", "kuromi",
  "hello-kitty", "stitch", "baby-yoda", "spiderman", "principito",
  "rosa-chanel", "llavero-aguacate", "cactus", "panda", "girasol", "Tulisnoopys".toLowerCase()
]);
const fixedAppearanceNames = ["rosa chanel", "aguacate", "catcut", "cactus", "panda", "girasol", "tulisnoopys"];
function canChangeColor(p) {
  if (!p) return false;
  const name = String(p.name || "").toLowerCase();
  const slug = String(p.slug || "").toLowerCase();
  return p.cat !== "Personajes" &&
    !fixedAppearanceSlugs.has(slug) &&
    !fixedAppearanceNames.some(term => name.includes(term) || slug.includes(term.replace(/ /g, "-")));
}
function colorsForProduct(p) {
  if (!canChangeColor(p)) return [];
  return productColorPalettes[p.slug] || [];
}
const sizes = [["Pequeño (15 cm)", 0], ["Mediano (20 cm)", 3], ["Grande (30 cm)", 6]];
let cart = loadCart(), statusTimer;

const money = n => `$${Number(n).toFixed(2)}`;
const img = p => p.image || `assets/products/${p.slug}-frente.svg`;
function showStatus(message) { const el = document.getElementById("statusMessage"); if (!el) return; el.textContent = message; el.classList.add("show"); clearTimeout(statusTimer); statusTimer = setTimeout(() => el.classList.remove("show"), 3500) }
function escapeHtml(v) { const d = document.createElement("span"); d.textContent = String(v); return d.innerHTML }
function setFieldError(field, message) { if (!field) return; const errorId = `${field.id || field.name}Error`; let error = document.getElementById(errorId); if (!error) { error = document.createElement("small"); error.id = errorId; error.className = "field-error"; error.setAttribute("role", "alert"); field.insertAdjacentElement("afterend", error) } error.textContent = message; field.setAttribute("aria-invalid", "true"); field.setAttribute("aria-errormessage", errorId); field.setAttribute("aria-describedby", errorId) }
function clearFieldError(field) { if (!field) return; const errorId = field.getAttribute("aria-errormessage"); if (errorId) document.getElementById(errorId)?.remove(); field.removeAttribute("aria-invalid"); field.removeAttribute("aria-errormessage"); field.removeAttribute("aria-describedby") }
function isValidName(value) { return /^\p{L}[\p{L}\p{M} .'-]{1,79}$/u.test(value.trim()) }
function isValidEmail(value) { if (value.length > 254 || value.trim() !== value) return false; const input = document.createElement("input"); input.type = "email"; input.required = true; input.value = value; return input.checkValidity() }
function isValidEcuadorianCedula(value) { if (!/^\d{10}$/.test(value) || Number(value.slice(0, 2)) < 1 || Number(value.slice(0, 2)) > 24 || Number(value[2]) > 5) return false; let sum = 0; for (let i = 0; i < 9; i++) { let digit = Number(value[i]); if (i % 2 === 0) { digit *= 2; if (digit > 9) digit -= 9 } sum += digit } return (10 - sum % 10) % 10 === Number(value[9]) }
function isValidEcuadorianTaxId(value, type) { if (!/^\d+$/.test(value) || Number(value.slice(0, 2)) < 1 || Number(value.slice(0, 2)) > 24) return false; if (type === "cedula") return isValidEcuadorianCedula(value); if (value.length !== 13 || value.slice(10) === "000") return false; const third = Number(value[2]); if (third <= 5) return isValidEcuadorianCedula(value.slice(0, 10)); if (third === 9) { const weights = [4, 3, 2, 7, 6, 5, 4, 3, 2], sum = weights.reduce((total, weight, index) => total + Number(value[index]) * weight, 0), check = (11 - sum % 11) % 11; return check < 10 && check === Number(value[9]) } if (third === 6) { const weights = [3, 2, 7, 6, 5, 4, 3, 2], sum = weights.reduce((total, weight, index) => total + Number(value[index]) * weight, 0), check = (11 - sum % 11) % 11; return check < 10 && check === Number(value[8]) } return false }
function updateInvoiceIdField() { const type = document.getElementById("invoiceIdType"), field = document.getElementById("invoiceId"), label = document.getElementById("invoiceIdLabel"), isRuc = type?.value === "ruc"; if (!field || !label) return; label.firstChild.textContent = isRuc ? "Número de RUC" : "Número de cédula"; field.maxLength = isRuc ? 13 : 10; field.placeholder = isRuc ? "13 dígitos" : "10 dígitos"; clearFieldError(field) }
function clearReferencePreviews(target) { target._previewUrls?.forEach(url => URL.revokeObjectURL(url)); target._previewUrls = []; target.replaceChildren() }
function readFileData(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error("No se pudo leer la imagen.")); reader.readAsDataURL(file) }) }
function compressReferenceImage(data) { return new Promise((resolve, reject) => { const image = new Image(); image.onload = () => { const scale = Math.min(1, 1200 / Math.max(image.width, image.height)), canvas = document.createElement("canvas"); canvas.width = Math.max(1, Math.round(image.width * scale)); canvas.height = Math.max(1, Math.round(image.height * scale)); const context = canvas.getContext("2d"); if (!context) { reject(new Error("No se pudo procesar la imagen.")); return } context.drawImage(image, 0, 0, canvas.width, canvas.height); resolve(canvas.toDataURL("image/jpeg", .78)) }; image.onerror = () => reject(new Error("El archivo no es una imagen válida.")); image.src = data }) }
async function prepareReferenceImages(input) { const files = Array.from(input.files || []); if (files.length > 3) { setFieldError(input, "Selecciona como máximo 3 imágenes."); return null } if (files.some(file => !["image/jpeg", "image/png", "image/webp"].includes(file.type))) { setFieldError(input, "Usa imágenes JPG, PNG o WebP."); return null } if (files.some(file => file.size > 5 * 1024 * 1024)) { setFieldError(input, "Cada imagen debe pesar como máximo 5 MB."); return null } try { return await Promise.all(files.map(async file => compressReferenceImage(await readFileData(file)))) } catch { setFieldError(input, "No se pudo procesar una imagen. Prueba con otro archivo."); return null } }
function previewReferenceImages(input, targetId) { const target = document.getElementById(targetId); if (!target) return; clearReferencePreviews(target); const files = Array.from(input.files || []); if (files.length > 3 || files.some(file => !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024)) { setFieldError(input, files.length > 3 ? "Selecciona como máximo 3 imágenes." : "Usa imágenes JPG, PNG o WebP de hasta 5 MB."); return } clearFieldError(input); files.forEach(file => { const image = document.createElement("img"), url = URL.createObjectURL(file); target._previewUrls.push(url); image.src = url; image.alt = `Vista previa: ${file.name}`; target.append(image) }) }
function toggleNav() { const h = document.querySelector(".nav"); const b = document.querySelector(".menu-btn"); const open = h.classList.toggle("menu-open"); b.setAttribute("aria-expanded", open); b.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú") }
function closeNav() { document.querySelector(".nav")?.classList.remove("menu-open") }
function updateCartCount() { const n = cart.reduce((s, x) => s + x.qty, 0); const el = document.getElementById("cartCount"); if (el) el.textContent = n }
function loadCart() { try { const a = JSON.parse(localStorage.getItem(CART_KEY) || "[]"); return Array.isArray(a) ? a.filter(x => products.some(p => p.id === x.id) && Number(x.qty) > 0).map(x => ({ ...x, qty: Number(x.qty) })) : [] } catch { return [] } }
function saveCart() { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount() }
function totalCart() { return cart.reduce((sum, x) => { const p = products.find(p => p.id === x.id); return sum + (p.price + (Number(x.extra) || 0)) * x.qty }, 0) }
function customization(x) { return x.color === "Original" ? x.size : `${x.color} · ${x.size}` }
function renderProducts() {
  const box = document.getElementById("products"); if (!box) return;
  const q = (document.getElementById("search")?.value || "").toLowerCase().trim(), c = document.getElementById("category")?.value || "";
  const result = products.filter(p => (!q || p.name.toLowerCase().includes(q)) && (!c || p.cat === c));
  box.innerHTML = result.length ? result.map(p => `<a class="card product-card" href="./producto.html?id=${encodeURIComponent(p.id)}" aria-label="Ver detalles de ${escapeHtml(p.name)}"><img class="card-img" src="${img(p)}" alt="${escapeHtml(p.name)}" onerror="this.onerror=null;this.src='assets/amigurumis.png'"><div class="card-body"><div class="muted">${escapeHtml(p.cat)}</div><h2>${escapeHtml(p.name)}</h2><div class="price">${money(p.price)}</div><p class="muted">${p.stock} disponibles</p><span class="btn dark full card-action">Ver producto</span></div></a>`).join("") : '<p class="empty-results">No encontramos productos con esos filtros.</p>';
}

async function loadProductsFromSupabase() {
  if (typeof supabaseClient === "undefined") {
    products.splice(0, products.length);
    renderProducts(); renderCartPage(); openProductPage();
    return;
  }

  const { data, error } = await supabaseClient
    .from("productos")
    .select("id, nombre, precio, stock, activo")
    .eq("activo", true)
    .order("id");

  if (error) {
    console.error("No se pudo cargar el catálogo:", error.message);
    products.splice(0, products.length);
    renderProducts(); renderCartPage(); openProductPage();
    const box = document.getElementById("products");
    if (box) box.innerHTML = '<p class="form-error" role="alert">No se pudo conectar con el catálogo en línea. Recarga la página cuando tengas conexión.</p>';
    return;
  }

  const syncedProducts = data
    .map(dbProduct => {
      const local = localProductMetadata.find(
        product => product.id === Number(dbProduct.id)
      );

      if (!local) {
        console.warn("No hay datos visuales locales para el producto:", dbProduct.id);
        return null;
      }

      return {
        ...local,
        name: dbProduct.nombre,
        price: Number(dbProduct.precio),
        stock: Number(dbProduct.stock)
      };
    })
    .filter(Boolean);

  if (!syncedProducts.length) {
    products.splice(0, products.length);
    renderProducts(); renderCartPage(); openProductPage();
    const box = document.getElementById("products");
    if (box) box.innerHTML = '<p class="form-error" role="alert">No hay productos activos disponibles en la base de datos.</p>';
    return;
  }

  // Actualiza el arreglo existente sin romper las referencias del resto del código.
  products.splice(0, products.length, ...syncedProducts);

  // Elimina del carrito productos que ya no estén activos.
  cart = cart.filter(item =>
    products.some(product => product.id === item.id)
  );

  saveCart();
  renderProducts();
  renderCartPage();
  openProductPage();
  checkoutSummary("checkoutSummary");
  checkoutSummary("paymentSummary");

  console.log("Catálogo sincronizado con Supabase:", products.length, "productos");
}
let productStockChannel = null;
function watchProductStock() {
  if (typeof supabaseClient === "undefined" || productStockChannel) return;
  productStockChannel = supabaseClient.channel("catalogo-stock-en-vivo")
    .on("postgres_changes", { event: "*", schema: "public", table: "productos" }, () => loadProductsFromSupabase())
    .subscribe();
}
window.addEventListener("focus", () => loadProductsFromSupabase());
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") loadProductsFromSupabase();
});

function getProduct() { return products.find(p => String(p.id) === new URLSearchParams(location.search).get("id")) }
function openProductPage() {
  const p = getProduct(), box = document.getElementById("productDetail"); if (!box) return;
  if (!p) { box.innerHTML = '<div class="notice">No encontramos ese producto.</div>'; return }
  const availableColors = colorsForProduct(p);
  const initialColor = availableColors.length ? availableColors[0][0] : "Original";
  window.custom = { color: initialColor, size: sizes[0][0], extra: 0, basePrice: p.price };
  box.innerHTML = `<div class="product"><div><img class="main-img" src="${img(p)}" alt="${escapeHtml(p.name)}" onerror="this.onerror=null;this.src='assets/amigurumis.png'"></div><div><div class="muted">${escapeHtml(p.cat)}</div><h1>${escapeHtml(p.name)}</h1><p>Elige el tamaño antes de agregar el producto al carrito.</p>${availableColors.length ? `<fieldset class="option-group"><legend>Color</legend><div class="option-row">${availableColors.map((c, i) => `<button class="swatch ${i === 0 ? "active" : ""}" type="button" aria-label="Elegir color ${escapeHtml(c[0])}" aria-pressed="${i === 0}" title="${escapeHtml(c[0])}" style="background:${c[1]}" onclick="chooseColor(${i},this)"></button>`).join("")}</div><p id="selectedColor" class="selection-label">Color seleccionado: ${escapeHtml(initialColor)}</p></fieldset>` : ""}<fieldset class="option-group"><legend>Tamaño</legend><div class="option-row">${sizes.map((s, i) => `<button class="size ${i === 0 ? "active" : ""}" type="button" aria-pressed="${i === 0}" onclick="chooseSize(${i},this)">${s[0]}</button>`).join("")}</div></fieldset><p id="selectedPrice" class="price">Precio: ${money(p.price)}</p><button class="btn dark full" onclick="addCustomized(${p.id})">Agregar al carrito</button><div class="help">¿Tienes dudas? <a href="${contactUrl(p.name)}" target="_blank" rel="noopener">Consultar por WhatsApp</a></div></div></div><div class="reviews-box"><h2>Reseñas</h2><div id="reviewsList">${renderReviews(p.id)}</div><div class="review-form"><label>Calificación<select class="field" id="reviewRating"><option value="5">5 ★★★★★</option><option value="4">4 ★★★★☆</option><option value="3">3 ★★★☆☆</option><option value="2">2 ★★☆☆☆</option><option value="1">1 ★☆☆☆☆</option></select></label><label>Tu reseña<textarea class="field" id="reviewText" maxlength="1000" rows="3" placeholder="Cuéntanos tu experiencia..."></textarea></label><label>Imágenes de referencia<input class="field" id="reviewImagesInput" type="file" accept="image/jpeg,image/png,image/webp" multiple><small class="muted">Hasta 3 imágenes JPG, PNG o WebP de 5 MB cada una.</small><span id="reviewImagePreview" class="image-previews" aria-live="polite"></span></label><p id="reviewFeedback" class="form-error" role="status"></p><button class="btn dark" type="button" onclick="submitReview(${p.id})">Enviar reseña</button></div></div>`;
  document.getElementById("reviewImagesInput").addEventListener("change", event => previewReferenceImages(event.target, "reviewImagePreview"));
  loadReviews(p.id);
}
function chooseColor(i, b) {
  const p = getProduct(), availableColors = colorsForProduct(p);
  if (!availableColors[i] || !window.custom) return;
  window.custom.color = availableColors[i][0];
  document.querySelectorAll(".swatch").forEach(x => { x.classList.remove("active"); x.setAttribute("aria-pressed", "false") });
  b.classList.add("active"); b.setAttribute("aria-pressed", "true");
  const label = document.getElementById("selectedColor");
  if (label) label.textContent = `Color seleccionado: ${window.custom.color}`;
}
function chooseSize(i, b) { window.custom.size = sizes[i][0]; window.custom.extra = sizes[i][1]; document.querySelectorAll(".size").forEach(x => { x.classList.remove("active"); x.setAttribute("aria-pressed", "false") }); b.classList.add("active"); b.setAttribute("aria-pressed", "true"); document.getElementById("selectedPrice").textContent = `Precio: ${money(window.custom.basePrice + window.custom.extra)}` }
function addCustomized(id) { const p = products.find(x => x.id === id), c = window.custom, selectedColor = colorsForProduct(p).length ? c.color : "Original", key = `${id}|${selectedColor}|${c.size}`, existing = cart.find(x => x.key === key), qty = cart.filter(x => x.id === id).reduce((s, x) => s + x.qty, 0); if (qty >= p.stock) { showStatus(`Solo hay ${p.stock} unidades disponibles.`); return } if (existing) existing.qty++; else cart.push({ key, id, qty: 1, color: selectedColor, size: c.size, extra: c.extra }); saveCart(); showStatus(`${p.name} agregado al carrito.`) }
function renderCartPage() {
  const box = document.getElementById("cartItems"); if (!box) return;
  if (!cart.length) { box.innerHTML = '<div class="empty-cart"><h2>Tu carrito está vacío</h2><p class="muted">Explora nuestros amigurumis y agrega tu favorito.</p><a class="btn dark" href="productos.html">Ver productos</a></div>'; document.getElementById("subtotal").textContent = "$0.00"; const button = document.getElementById("checkoutButton"); button.classList.add("disabled"); button.setAttribute("aria-disabled", "true"); button.setAttribute("tabindex", "-1"); return }
  box.innerHTML = cart.map((x, i) => { const p = products.find(p => p.id === x.id); return `<article class="cart-item"><img src="${img(p)}" alt="${p.name}" onerror="this.onerror=null;this.src='assets/amigurumis.png'"><div><h3>${p.name}</h3><p class="muted">${customization(x)}</p><div class="qty" role="group" aria-label="Cantidad de ${p.name}"><button onclick="changeQty(${i},-1)" aria-label="Restar una unidad de ${p.name}">−</button><span aria-live="polite" aria-atomic="true">${x.qty}</span><button onclick="changeQty(${i},1)" aria-label="Agregar una unidad de ${p.name}">+</button></div></div><b>${money((p.price + x.extra) * x.qty)}</b></article>` }).join("");
  document.getElementById("subtotal").textContent = money(totalCart()); const button = document.getElementById("checkoutButton"); button.classList.remove("disabled"); button.removeAttribute("aria-disabled"); button.removeAttribute("tabindex")
}
function changeQty(i, d) { const item = cart[i]; if (!item) return; const p = products.find(x => x.id === item.id); const qty = cart.filter(x => x.id === item.id).reduce((s, x) => s + x.qty, 0); if (d > 0 && qty >= p.stock) { showStatus(`Solo hay ${p.stock} unidades disponibles.`); return } if (d < 0 && item.qty === 1) { const ok = window.confirm(`El producto "${p.name}" está en 1 unidad. ¿Estás seguro de que deseas quitarlo del carrito?`); if (!ok) return } item.qty += d; if (item.qty <= 0) cart.splice(i, 1); saveCart(); renderCartPage() }
function checkoutSummary(target) { const box = document.getElementById(target); if (!box) return; box.innerHTML = cart.length ? cart.map(x => { const p = products.find(p => p.id === x.id); return `<div class="summary-line"><span>${p.name}<small>${customization(x)} × ${x.qty}</small></span><b>${money((p.price + x.extra) * x.qty)}</b></div>` }).join("") + `<hr><div class="summary-total"><span>Total</span><b>${money(totalCart())}</b></div>` : '<p class="muted">Tu carrito está vacío.</p>' }
function getCheckout() { try { return JSON.parse(sessionStorage.getItem(CHECKOUT_KEY) || "null") } catch { return null } }
function saveCheckoutData() { if (!cart.length) { location.href = "carrito.html"; return } const name = document.getElementById("name"), email = document.getElementById("email"), err = document.getElementById("checkoutDataError"); err.textContent = ""; clearFieldError(name); clearFieldError(email); if (!isValidName(name.value)) { setFieldError(name, "Ingresa un nombre completo válido (solo letras, espacios, apóstrofes o guiones)."); name.focus(); return } if (!isValidEmail(email.value.trim())) { setFieldError(email, "Ingresa un correo válido."); email.focus(); return } const data = { name: name.value.trim(), email: email.value.trim(), pickup: document.querySelector("[name=pickup]:checked")?.value }; if (!data.pickup) { err.textContent = "Selecciona un punto de retiro."; return } try { sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(data)); location.href = "checkout-pago.html" } catch { err.textContent = "No fue posible guardar tus datos en este navegador." } }
function saveCheckoutData() { if (!cart.length) { location.href = "carrito.html"; return } const name = document.getElementById("name"), email = document.getElementById("email"), invoiceName = document.getElementById("invoiceName"), idType = document.getElementById("invoiceIdType"), invoiceId = document.getElementById("invoiceId"), phone = document.getElementById("invoicePhone"), address = document.getElementById("invoiceAddress"), err = document.getElementById("checkoutDataError"), fields = [name, email, invoiceName, invoiceId, phone, address]; err.textContent = ""; fields.forEach(clearFieldError); if (!isValidName(name.value)) { setFieldError(name, "Ingresa un nombre completo válido."); name.focus(); return } if (!isValidEmail(email.value.trim())) { setFieldError(email, "Ingresa un correo válido."); email.focus(); return } if (!isValidName(invoiceName.value)) { setFieldError(invoiceName, "Ingresa el nombre o razón social de la factura."); invoiceName.focus(); return } if (!isValidEcuadorianTaxId(invoiceId.value.trim(), idType.value)) { setFieldError(invoiceId, idType.value === "ruc" ? "Ingresa un RUC ecuatoriano válido de 13 dígitos." : "Ingresa una cédula ecuatoriana válida de 10 dígitos."); invoiceId.focus(); return } if (!/^(?:\+593|0)(?:[2-7]\d{7}|9\d{8})$/.test(phone.value.replace(/[\s()-]/g, ""))) { setFieldError(phone, "Ingresa un teléfono ecuatoriano válido."); phone.focus(); return } if (address.value.trim().length < 8 || address.value.trim().length > 160) { setFieldError(address, "Escribe una dirección de 8 a 160 caracteres."); address.focus(); return } const data = { name: name.value.trim(), email: email.value.trim(), invoice: { name: invoiceName.value.trim(), idType: idType.value, idNumber: invoiceId.value.trim(), phone: phone.value.replace(/[\s()-]/g, ""), address: address.value.trim() }, pickup: document.querySelector("[name=pickup]:checked")?.value }; if (!data.pickup) { err.textContent = "Selecciona un punto de retiro."; return } try { sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(data)); location.href = "checkout-pago.html" } catch { err.textContent = "No fue posible guardar tus datos de compra." } }
function isValidCardNumber(v) { return /^\d{16}$/.test(String(v).replace(/\D/g, "")); }
function updatePaymentFields() {
  const m = document.querySelector("[name=payment]:checked")?.value;
  document.getElementById("cardPaymentFields")?.toggleAttribute("hidden", m !== "Tarjeta");
  document.getElementById("transferPaymentFields")?.toggleAttribute("hidden", m !== "Transferencia bancaria");
  document.getElementById("paypalPaymentFields")?.toggleAttribute("hidden", m !== "PayPal");
  document.getElementById("paymentError")?.replaceChildren();
  ["cardholderName", "cardNumber", "cardExpiry", "cardCvv", "transferHolder", "transferReference", "transferDate", "paypalName", "paypalEmail"].forEach(id => clearFieldError(document.getElementById(id)));
}
function validatePayment() {
  const method = document.querySelector("[name=payment]:checked")?.value;
  const err = document.getElementById("paymentError");
  err.textContent = "";
  const requiredText = (id, message, validator = value => !!value.trim()) => {
    const field = document.getElementById(id);
    clearFieldError(field);
    if (!validator(field.value)) { setFieldError(field, message); field.focus(); return false; }
    return true;
  };
  if (method === "PayPal") {
    if (!requiredText("paypalName", "Escribe un nombre ficticio para la cuenta." , value => isValidName(value))) return null;
    if (!requiredText("paypalEmail", "Introduce un correo de demostración válido.", value => { const input = document.createElement("input"); input.type = "email"; input.value = value.trim(); return input.checkValidity(); })) return null;
    return { status: "pending_verification", reference: "DEMO-PAYPAL" };
  }
  if (method === "Transferencia bancaria") {
    if (!requiredText("transferHolder", "Escribe un nombre ficticio.", value => isValidName(value))) return null;
    if (!requiredText("transferReference", "Escribe una referencia ficticia.")) return null;
    if (!requiredText("transferDate", "Selecciona una fecha de prueba.")) return null;
    return { status: "pending_verification", reference: "DEMO-TRANSFERENCIA" };
  }
  if (method !== "Tarjeta") { err.textContent = "Selecciona un método de pago válido."; return null; }
  const name = document.getElementById("cardholderName");
  const number = document.getElementById("cardNumber");
  const expiry = document.getElementById("cardExpiry");
  const cvv = document.getElementById("cardCvv");
  [name, number, expiry, cvv].forEach(clearFieldError);
  if (!isValidName(name.value)) { setFieldError(name, "Escribe el nombre del titular ficticio."); name.focus(); return null; }
  const digits = number.value.replace(/\D/g, "");
  if (!isValidCardNumber(digits)) { setFieldError(number, "Introduce exactamente 16 dígitos (se acepta cualquier combinación ficticia)."); number.focus(); return null; }
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry.value.trim())) { setFieldError(expiry, "Usa el formato MM/AA."); expiry.focus(); return null; }
  const parts = expiry.value.trim().split("/");
  const month = Number(parts[0]), year = 2000 + Number(parts[1]), now = new Date();
  if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) { setFieldError(expiry, "La fecha debe ser futura."); expiry.focus(); return null; }
  if (!/^\d{3,4}$/.test(cvv.value.trim())) { setFieldError(cvv, "Introduce un CVV ficticio de 3 o 4 dígitos."); cvv.focus(); return null; }
  // Nunca se envían ni guardan el número, vencimiento o CVV de la tarjeta.
  return { status: "pending_verification", reference: "DEMO-TARJETA" };
}
function loadDB() { try { const db = JSON.parse(localStorage.getItem(DB_KEY) || '{"USUARIO":[],"DIRECCION":[],"PEDIDO":[],"DETALLE_PEDIDO":[],"PAGO":[],"ENVIO":[],"FACTURA":[],"RESENA":[],"COTIZACION":[]}'); return db && typeof db === "object" && !Array.isArray(db) ? db : null } catch { return null } }
function saveDB(db) { try { localStorage.setItem(DB_KEY, JSON.stringify(db)); return true } catch { return false } }
async function submitQuote() {
  if (!requireLogin()) return;
  const user = currentUser();
  if (!user || typeof supabaseClient === "undefined") return;
  const design = document.getElementById("quoteDesign");
  const size = document.getElementById("quoteSize");
  const colors = document.getElementById("quoteColors");
  const details = document.getElementById("quoteDetails");
  const input = document.getElementById("quoteImages");
  const feedback = document.getElementById("quoteFeedback");
  feedback.textContent = "";
  [design, size, colors].forEach(clearFieldError);
  if (!design.value.trim() || design.value.trim().length > 1000) { setFieldError(design, "Describe tu idea (máximo 1000 caracteres)."); design.focus(); return; }
  if (!["Pequeño (15 cm)", "Mediano (20 cm)", "Grande (30 cm)"].includes(size.value)) { setFieldError(size, "Selecciona un tamaño disponible."); size.focus(); return; }
  if (!colors.value.trim() || colors.value.trim().length > 120) { setFieldError(colors, "Indica los colores (máximo 120 caracteres)."); colors.focus(); return; }
  const processedImages = await prepareReferenceImages(input);
  if (processedImages === null) { input.focus(); return; }
  let quoteId = null;
  const uploadedPaths = [];
  try {
    const { data: quote, error: quoteError } = await supabaseClient.from("cotizaciones")
      .insert({ usuario_id: user.id, diseno: design.value.trim(), tamano: size.value, colores: colors.value.trim(), detalles: details.value.trim().slice(0, 1000) })
      .select("id").single();
    if (quoteError) throw quoteError;
    quoteId = quote.id;
    for (let i = 0; i < processedImages.length; i++) {
      const blob = await fetch(processedImages[i]).then(response => response.blob());
      const path = `${user.id}/${quoteId}/referencia-${i + 1}.jpg`;
      const { error: uploadError } = await supabaseClient.storage.from("amigurumiland-cotizaciones")
        .upload(path, blob, { contentType: "image/jpeg", upsert: false });
      if (uploadError) throw uploadError;
      uploadedPaths.push(path);
    }
    if (uploadedPaths.length) {
      const { error: imageRowsError } = await supabaseClient.from("imagenes_cotizacion")
        .insert(uploadedPaths.map(storage_path => ({ cotizacion_id: quoteId, storage_path })));
      if (imageRowsError) throw imageRowsError;
    }
    document.querySelector("#quoteForm")?.reset();
    clearReferencePreviews(document.getElementById("quoteImagePreview"));
    feedback.textContent = "Solicitud enviada correctamente y guardada en tu cuenta.";
  } catch (error) {
    console.error("No se pudo guardar la cotización:", error.message);
    if (uploadedPaths.length) await supabaseClient.storage.from("amigurumiland-cotizaciones").remove(uploadedPaths);
    if (quoteId) await supabaseClient.from("cotizaciones").delete().eq("id", quoteId).eq("usuario_id", user.id);
    feedback.textContent = "No se pudo guardar la cotización en línea. Revisa tu conexión e inténtalo de nuevo.";
  }
}
async function processPayment() {
  const data = getCheckout();
  const err = document.getElementById("paymentError");
  const button = document.querySelector('button[onclick="processPayment()"]');

  if (!err) {
    console.error("No existe el contenedor de errores del pago.");
    return;
  }
  if (!data) {
    err.textContent = "Tus datos de compra expiraron. Vuelve al paso de datos.";
    location.href = "checkout-datos.html";
    return;
  }
  if (!requireLogin()) return;
  if (typeof supabaseClient === "undefined") {
    err.textContent = "No está disponible la conexión con la base de datos. Inténtalo más tarde.";
    return;
  }

  // Verifica la sesión real de Supabase antes de ejecutar la función transaccional.
  // Así evitamos que una sesión visual desactualizada impida guardar el pedido.
  const { data: authData, error: authError } = await supabaseClient.auth.getUser();
  if (authError || !authData?.user) {
    console.error("Sesión no válida al finalizar compra:", authError?.message || "Sin usuario autenticado");
    err.textContent = "Tu sesión expiró. Inicia sesión nuevamente y vuelve a intentar la compra.";
    return;
  }
  authenticatedUser = authData.user;
  authReady = true;

  const payment = validatePayment();
  if (!payment) return;

  if (!cart.length) {
    err.textContent = "Tu carrito está vacío.";
    return;
  }

  const pickupIds = {
    "Centro Norte": 1,
    "Centro Histórico": 2,
    "Cumbayá": 3
  };
  const selectedPayment = document.querySelector("[name=payment]:checked")?.value;
  const paymentMethods = {
    "Tarjeta": "tarjeta",
    "Transferencia bancaria": "transferencia",
    "PayPal": "paypal"
  };
  const databasePaymentMethod = paymentMethods[selectedPayment];
  if (!databasePaymentMethod) {
    err.textContent = "Selecciona un método de pago válido.";
    return;
  }
  const items = cart.map(item => ({
    producto_id: Number(item.id),
    cantidad: Number(item.qty),
    color: item.color === "Original" ? null : String(item.color || "").slice(0, 80),
    tamano: String(item.size || "")
  }));

  const invoice = {
    nombre_razon_social: data.invoice.name,
    tipo_identificacion: data.invoice.idType,
    identificacion: data.invoice.idNumber,
    telefono: data.invoice.phone,
    direccion: data.invoice.address,
    email: data.email
  };

  err.textContent = "";
  if (button) {
    button.disabled = true;
    button.textContent = "Registrando pedido…";
  }

  try {
    const { data: result, error } = await supabaseClient.rpc(
      "finalizar_compra_transaccional",
      {
        p_items: items,
        p_punto_retiro_id: pickupIds[data.pickup] || null,
        p_factura: invoice,
        p_metodo: databasePaymentMethod,
        p_referencia: payment.reference
      }
    );

    if (error) {
      console.error("Error registrando el pedido en Supabase:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      const message = String(error.message || "");
      if (message.includes("Stock insuficiente")) {
        err.textContent = "Uno de los productos ya no tiene suficiente stock. Actualiza el carrito e inténtalo de nuevo.";
      } else if (/iniciar sesión|auth|JWT|permission denied/i.test(message)) {
        err.textContent = "Supabase no reconoce tu sesión o no autoriza la compra. Cierra sesión, vuelve a iniciar sesión e inténtalo de nuevo.";
      } else {
        err.textContent = "Supabase rechazó el pedido y no se guardó ninguna compra. Detalle: " + message.slice(0, 220);
      }
      return;
    }
    if (!result || !result.pedido_id || !result.codigo) {
      console.error("La función de compra no devolvió confirmación válida:", result);
      err.textContent = "La base de datos no confirmó el pedido. No vaciamos el carrito; inténtalo de nuevo.";
      return;
    }

    const orderItems = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      const unitPrice = Number(product.price) + (Number(item.extra) || 0);
      return {
        name: product.name,
        customization: customization(item),
        quantity: item.qty,
        unitPrice,
        total: unitPrice * item.qty
      };
    });

    const order = {
      id: result.codigo,
      databaseId: result.pedido_id,
      paymentStatus: "pending_verification",
      paymentMethod: selectedPayment,
      paymentReference: payment.reference,
      total: Number(result.total),
      pickup: data.pickup,
      customerName: data.name,
      email: data.email,
      invoice: data.invoice,
      items: orderItems
    };

    sessionStorage.setItem("LAST_ORDER", JSON.stringify(order));
    cart = [];
    saveCart();
    sessionStorage.removeItem(CHECKOUT_KEY);
    location.href = "confirmacion.html";
  } catch (error) {
    console.error("Error inesperado al registrar el pedido:", error);
    err.textContent = "No se pudo completar el registro del pedido: " + String(error?.message || "error de conexión").slice(0, 220);
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = "Pagar ahora";
    }
  }
}
function initPayment() {
  if (!getCheckout()) return location.href = "checkout-datos.html";
  checkoutSummary("paymentSummary");
  const number = document.getElementById("cardNumber");
  number?.addEventListener("input", () => {
    const digits = number.value.replace(/\D/g, "").slice(0, 16);
    number.value = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  });
  updatePaymentFields();
}
function initData() { if (!cart.length) return location.href = "carrito.html"; checkoutSummary("checkoutSummary") }
function initConfirmation() { const o = JSON.parse(sessionStorage.getItem("LAST_ORDER") || "null"); if (!o) return; document.getElementById("confirmationText").textContent = `Tu pedido ${o.id} fue registrado correctamente. `; document.getElementById("confirmationCard").innerHTML = `<p><b>Código del pedido</b><br>${escapeHtml(o.id)}</p><p><b>Método</b><br>${escapeHtml(o.paymentMethod)}</p><p><b>Estado del pago</b><br>${o.paymentStatus === "approved" ? "Aprobado" : "Pendiente de verificación"}</p><p><b>Total simulado</b><br>${money(o.total)}</p>` }
function initConfirmation() { let order; try { order = JSON.parse(sessionStorage.getItem("LAST_ORDER") || "null") } catch { order = null } const text = document.getElementById("confirmationText"), card = document.getElementById("confirmationCard"); if (!order) { text.textContent = "No encontramos los datos de esta compra. Consulta tus pedidos para revisar su estado."; card.hidden = true; return } const items = (order.items || []).map(item => `<div class="summary-line"><span>${escapeHtml(item.name)}<small>${escapeHtml(item.customization)} × ${item.quantity}</small></span><b>${money(item.total)}</b></div>`).join(""), invoice = order.invoice || {}; text.textContent = order.paymentStatus === "approved" ? `Gracias, ${order.customerName}. Tu pedido fue confirmado y el pago quedó registrado.` : `Gracias, ${order.customerName}. Recibimos tu pedido; el pago está pendiente de verificación.`; card.innerHTML = `<section class="order-confirmation-block"><h2>Número de pedido</h2><div class="order-code-row"><strong id="orderCodeValue">${escapeHtml(order.id)}</strong><button class="btn light copy-order-button" type="button" onclick="copyOrderCode()" aria-label="Copiar número de pedido">Copiar</button></div><p class="notice">Tu pedido está asociado a tu cuenta. Puedes verlo junto con tus otras compras en Mis pedidos; el código queda como opción adicional de consulta.</p><p><a class="btn dark" href="pedidos.html">Ver mis pedidos</a></p></section><section class="order-confirmation-block"><h2>Resumen de compra</h2>${items}<div class="summary-total"><span>Total</span><b>${money(order.total)}</b></div></section><section class="order-confirmation-block"><h2>Pago y entrega</h2><p><b>Método:</b> ${escapeHtml(order.paymentMethod)}</p><p><b>Estado:</b> ${order.paymentStatus === "approved" ? "Confirmado" : "Pendiente de verificación"}</p><p><b>Retiro:</b> ${escapeHtml(order.pickup)}</p></section><section class="order-confirmation-block"><h2>Datos de facturación</h2><p>${escapeHtml(invoice.name || order.customerName)} · ${invoice.idType === "ruc" ? "RUC" : "Cédula"} ${escapeHtml(invoice.idNumber || "")}</p><p>${escapeHtml(invoice.address || "")}</p><p>${escapeHtml(invoice.phone || "")} · ${escapeHtml(order.email)}</p></section>` }
async function copyOrderCode() { const code = document.getElementById("orderCodeValue")?.textContent; if (!code) return; try { await navigator.clipboard.writeText(code) } catch { const field = document.createElement("textarea"); field.value = code; field.style.position = "fixed"; field.style.opacity = "0"; document.body.append(field); field.select(); document.execCommand("copy"); field.remove() } showStatus("Número de pedido copiado.") }
async function lookupOrder() {
  const codeField = document.getElementById("orderCode");
  const emailField = document.getElementById("orderEmail");
  const code = codeField.value.trim().toUpperCase();
  const email = emailField.value.trim().toLowerCase();
  const result = document.getElementById("orderLookupResult");
  clearFieldError(codeField); clearFieldError(emailField); result.replaceChildren();
  if (!/^(?:AMI-[A-F0-9]{10}|AM-\d{6})$/.test(code)) {
    setFieldError(codeField, "Ingresa el código completo de tu pedido, por ejemplo AMI-1A2B3C4D5E."); codeField.focus(); return;
  }
  if (!isValidEmail(email)) { setFieldError(emailField, "Ingresa un correo válido."); emailField.focus(); return; }
  if (typeof supabaseClient === "undefined") { result.innerHTML = '<p class="order-empty">No está disponible la conexión con la base de datos.</p>'; return; }
  result.innerHTML = '<p class="muted" role="status">Consultando tu pedido…</p>';
  try {
    const { data, error } = await supabaseClient.rpc("consultar_pedido_publico", { p_codigo: code, p_email: email });
    if (error) throw error;
    if (!data) { result.innerHTML = '<p class="order-empty">No encontramos un pedido con esos datos. Verifica el código y el correo.</p>'; return; }
    const items = (data.detalles || []).map(item => {
      const options = [item.color, item.tamano].filter(Boolean).join(" · ");
      return `<li>${escapeHtml(item.nombre_producto)} · ${escapeHtml(options)} × ${Number(item.cantidad)}</li>`;
    }).join("");
    const paymentLabel = data.pago_estado === "Aprobado" ? "Aprobado" : data.pago_metodo === "simulado" ? "Simulación (sin cobro real)" : "Transferencia pendiente de verificación";
    result.innerHTML = `<article class="order-card">
      <div class="order-card-header"><div><b>Pedido ${escapeHtml(data.codigo)}</b><time>${new Date(data.created_at).toLocaleString("es-EC", { dateStyle: "medium", timeStyle: "short" })}</time></div><span class="order-status">${escapeHtml(data.estado)}</span></div>
      <ul class="order-items">${items}</ul>
      <div class="order-card-footer"><span>Retiro: ${escapeHtml(data.punto_retiro)}</span><b>Total: ${money(data.total)}</b></div>
      <p class="muted">Pago: ${escapeHtml(paymentLabel)}</p>
      <p class="muted">Disponible para recoger desde: ${data.fecha_disponible ? new Date(data.fecha_disponible + "T12:00:00").toLocaleDateString("es-EC", { dateStyle: "long" }) : "Pendiente de registro"}</p>
    </article>`;
  } catch (error) {
    console.error("Error consultando el pedido:", error.message);
    result.innerHTML = '<p class="order-empty">No se pudo consultar el pedido en línea. Inténtalo de nuevo más tarde.</p>';
  }
}
function renderReviews(reviews) {
  if (!reviews?.length) return '<p class="muted">Aún no hay reseñas para este producto.</p>';
  return reviews.map(review => {
    const rating = Math.min(5, Math.max(1, Number(review.puntuacion) || 1));
    const images = (review.images || []).map(url => `<img src="${escapeHtml(url)}" alt="Imagen adjunta a la reseña" loading="lazy">`).join("");
    return `<div class="review-item"><b>${"★".repeat(rating)}${"☆".repeat(5 - rating)}</b><p>${escapeHtml(review.comentario)}</p><span class="muted">${new Date(review.created_at).toLocaleDateString("es-EC")}</span>${images ? `<div class="review-images">${images}</div>` : ""}</div>`;
  }).join("");
}
async function loadReviews(productId) {
  const list = document.getElementById("reviewsList");
  if (!list || typeof supabaseClient === "undefined") return;
  list.innerHTML = '<p class="muted" role="status">Cargando reseñas…</p>';
  try {
    const { data: reviews, error } = await supabaseClient.from("resenas")
      .select("id, puntuacion, comentario, created_at").eq("producto_id", productId)
      .order("created_at", { ascending: false }).limit(100);
    if (error) throw error;
    const ids = (reviews || []).map(review => review.id);
    let imageRows = [];
    if (ids.length) {
      const { data, error: imageError } = await supabaseClient.from("resenas_imagenes")
        .select("resena_id, storage_path").in("resena_id", ids);
      if (imageError) throw imageError;
      imageRows = data || [];
    }
    const hydrated = (reviews || []).map(review => ({
      ...review,
      images: imageRows.filter(row => row.resena_id === review.id)
        .map(row => supabaseClient.storage.from("amigurumiland-resenas").getPublicUrl(row.storage_path).data.publicUrl)
    }));
    list.innerHTML = renderReviews(hydrated);
  } catch (error) {
    console.error("No se pudieron cargar las reseñas:", error.message);
    list.innerHTML = '<p class="form-error" role="alert">No se pudieron cargar las reseñas desde la base de datos.</p>';
  }
}
async function submitReview(id) {
  if (!requireLogin()) return;
  const user = currentUser();
  const text = document.getElementById("reviewText");
  const rating = document.getElementById("reviewRating");
  const input = document.getElementById("reviewImagesInput");
  const feedback = document.getElementById("reviewFeedback");
  feedback.textContent = ""; clearFieldError(text);
  if (!text.value.trim() || text.value.trim().length > 1000) { setFieldError(text, "Escribe una reseña de 1 a 1000 caracteres."); text.focus(); return; }
  if (!["1", "2", "3", "4", "5"].includes(rating.value)) { setFieldError(rating, "Selecciona una calificación válida."); rating.focus(); return; }
  const processedImages = await prepareReferenceImages(input);
  if (processedImages === null) { input.focus(); return; }
  if (typeof supabaseClient === "undefined") { feedback.textContent = "No está disponible la conexión con la base de datos."; return; }
  const requestId = crypto.randomUUID();
  const uploadedPaths = [];
  let reviewId = null;
  try {
    for (let i = 0; i < processedImages.length; i++) {
      const blob = await fetch(processedImages[i]).then(response => response.blob());
      const path = `${user.id}/${requestId}/resena-${i + 1}.jpg`;
      const { error: uploadError } = await supabaseClient.storage.from("amigurumiland-resenas")
        .upload(path, blob, { contentType: "image/jpeg", upsert: false });
      if (uploadError) throw uploadError;
      uploadedPaths.push(path);
    }
    const { data: review, error: reviewError } = await supabaseClient.from("resenas")
      .insert({ usuario_id: user.id, producto_id: Number(id), puntuacion: Number(rating.value), comentario: text.value.trim() })
      .select("id").single();
    if (reviewError) throw reviewError;
    reviewId = review.id;
    if (uploadedPaths.length) {
      const { error: rowsError } = await supabaseClient.from("resenas_imagenes")
        .insert(uploadedPaths.map(storage_path => ({ resena_id: reviewId, storage_path })));
      if (rowsError) throw rowsError;
    }
    text.value = ""; input.value = "";
    clearReferencePreviews(document.getElementById("reviewImagePreview"));
    feedback.textContent = "Reseña guardada y visible en el catálogo.";
    await loadReviews(id);
  } catch (error) {
    console.error("No se pudo guardar la reseña:", error.message);
    if (uploadedPaths.length) await supabaseClient.storage.from("amigurumiland-resenas").remove(uploadedPaths);
    if (reviewId) await supabaseClient.from("resenas").delete().eq("id", reviewId).eq("usuario_id", user.id);
    feedback.textContent = "No se pudo guardar la reseña en línea. Inténtalo de nuevo.";
  }
}

function contactUrl(name) { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quiero consultar sobre ${name} en Amigurumiland.`)}` }
function initConfirmation() {
  let order;
  try { order = JSON.parse(sessionStorage.getItem("LAST_ORDER") || "null") } catch { order = null }
  const text = document.getElementById("confirmationText"), card = document.getElementById("confirmationCard");
  if (!order) { text.textContent = "No encontramos los datos de esta compra. Consulta tus pedidos para revisar su estado."; card.hidden = true; return }
  const items = (order.items || []).map(item => `<div class="summary-line"><span>${escapeHtml(item.name)}<small>${escapeHtml(item.customization)} × ${item.quantity}</small></span><b>${money(item.total)}</b></div>`).join(""), invoice = order.invoice || {};
  text.textContent = order.paymentStatus === "approved" ? `Gracias, ${order.customerName}. Tu pedido fue confirmado y el pago quedó registrado.` : `Gracias, ${order.customerName}. Recibimos tu pedido; el pago está pendiente de verificación.`;
  card.hidden = false;
  card.innerHTML = `<section class="order-confirmation-block"><h2>Número de pedido</h2><div class="order-code-row"><strong id="orderCodeValue">${escapeHtml(order.id)}</strong><button class="btn light copy-order-button" type="button" onclick="copyOrderCode()" aria-label="Copiar número de pedido">Copiar</button></div><p class="notice">Copia este número para consultar el estado y dar seguimiento a tu pedido.</p></section><section class="order-confirmation-block"><h2>Resumen de compra</h2>${items}<div class="summary-total"><span>Total</span><b>${money(order.total)}</b></div></section><section class="order-confirmation-block"><h2>Pago y entrega</h2><p><b>Método:</b> ${escapeHtml(order.paymentMethod)}</p><p><b>Estado:</b> ${order.paymentStatus === "approved" ? "Confirmado" : "Pendiente de verificación"}</p><p><b>Retiro:</b> ${escapeHtml(order.pickup)}</p></section><section class="order-confirmation-block"><h2>Datos de facturación</h2><p>${escapeHtml(invoice.name || order.customerName)} · ${invoice.idType === "ruc" ? "RUC" : "Cédula"} ${escapeHtml(invoice.idNumber || "")}</p><p>${escapeHtml(invoice.address || "")}</p><p>${escapeHtml(invoice.phone || "")} · ${escapeHtml(order.email)}</p></section>`;
}
async function copyOrderCode() {
  const code = document.getElementById("orderCodeValue")?.textContent;
  if (!code) return;
  try { await navigator.clipboard.writeText(code) } catch { const field = document.createElement("textarea"); field.value = code; field.style.position = "fixed"; field.style.opacity = "0"; document.body.append(field); field.select(); document.execCommand("copy"); field.remove() }
  showStatus("Número de pedido copiado.");
}
function lookupOrder() {
  const codeField = document.getElementById("orderCode"), emailField = document.getElementById("orderEmail"), code = codeField.value.trim().toUpperCase(), email = emailField.value.trim().toLowerCase(), db = loadDB(), result = document.getElementById("orderLookupResult");
  clearFieldError(codeField); clearFieldError(emailField); result.replaceChildren();
  if (!/^AM-\d{6}$/.test(code)) { setFieldError(codeField, "Usa el formato AM-123456."); codeField.focus(); return }
  if (!isValidEmail(email)) { setFieldError(emailField, "Ingresa un correo válido."); emailField.focus(); return }
  if (!db) { result.innerHTML = '<p class="order-empty">No hay pedidos guardados en este navegador todavía.</p>'; revealOrderLookupResult(result); return }
  const orders = Array.isArray(db.PEDIDO) ? db.PEDIDO : [], users = Array.isArray(db.USUARIO) ? db.USUARIO : [], invoices = Array.isArray(db.FACTURA) ? db.FACTURA : [], order = orders.find(entry => String(entry.id).toUpperCase() === code);
  if (!order) { result.innerHTML = orders.length ? '<p class="order-empty">No encontramos un pedido con ese código. Revisa que esté copiado completo.</p>' : '<p class="order-empty">No hay pedidos guardados en este navegador todavía.</p>'; revealOrderLookupResult(result); return }
  const user = users.find(entry => entry.id === order.usuario_id), invoice = invoices.find(entry => entry.pedido_id === order.id), emailMatches = [user?.email, invoice?.email].some(savedEmail => String(savedEmail || "").trim().toLowerCase() === email);
  if (!emailMatches) { result.innerHTML = '<p class="order-empty">El código y el correo no coinciden con el pedido. Usa el correo ingresado durante la compra.</p>'; revealOrderLookupResult(result); return }
  const details = (db.DETALLE_PEDIDO || []).filter(detail => detail.pedido_id === order.id), payment = (db.PAGO || []).find(entry => entry.pedido_id === order.id), shipping = (db.ENVIO || []).find(entry => entry.pedido_id === order.id);
  result.innerHTML = `<article class="order-card"><div class="order-card-header"><div><b>Pedido ${escapeHtml(order.id)}</b><time>${new Date(order.fecha).toLocaleString("es-EC", { dateStyle: "medium", timeStyle: "short" })}</time></div><span class="order-status is-pending">${escapeHtml(order.estado)}</span></div><ul class="order-items">${details.map(detail => { const product = products.find(entry => entry.id === detail.producto_id); return `<li>${escapeHtml(product?.name || "Producto")} · ${escapeHtml(detail.tamano)} × ${detail.cantidad}</li>` }).join("")}</ul><div class="order-card-footer"><span>Retiro: ${escapeHtml(order.punto_retiro)}</span><b>Total: ${money(order.total)}</b></div><p class="muted">Pago: ${payment?.estado === "approved" ? "Confirmado" : "Transferencia pendiente de verificación"}</p><p class="muted">Disponible para recoger desde: ${shipping ? new Date(shipping.fecha_disponible).toLocaleDateString("es-EC", { dateStyle: "long" }) : "Pendiente de registro"}</p></article>`;
  revealOrderLookupResult(result);
}
function revealOrderLookupResult(result) { result.focus({ preventScroll: true }); result.scrollIntoView({ block: "nearest" }) }
document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.querySelector("main");
  if (mainContent) { if (!mainContent.id) mainContent.id = "main-content"; mainContent.setAttribute("tabindex", "-1") }
  if (mainContent && !document.querySelector(".skip-link")) { const skipLink = document.createElement("a"); skipLink.className = "skip-link"; skipLink.href = "#main-content"; skipLink.textContent = "Saltar al contenido principal"; document.body.prepend(skipLink) }
  updateCartCount();
  const wa = document.getElementById("waLink"); if (wa) wa.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, necesito ayuda con mi pedido o personalización en Amigurumiland.")}`;
  const waf = document.getElementById("waLinkFooter"); if (waf) waf.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, necesito ayuda con mi pedido o personalización en Amigurumiland.")}`;
  renderProducts(); renderCartPage(); openProductPage();
  loadProductsFromSupabase();
  watchProductStock();
  if (document.getElementById("checkoutSummary")) initData();
  if (document.getElementById("paymentSummary")) initPayment();
  if (document.getElementById("confirmationCard")) initConfirmation();
  document.querySelectorAll("[name=payment]").forEach(x => x.addEventListener("change", updatePaymentFields)); updatePaymentFields();
  const invoiceIdType = document.getElementById("invoiceIdType"); if (invoiceIdType) { invoiceIdType.addEventListener("change", updateInvoiceIdField); updateInvoiceIdField() }
  const siteNav = document.querySelector(".site-nav"); if (siteNav && !siteNav.querySelector('a[href="cotizacion.html"]')) { const quoteLink = document.createElement("a"); quoteLink.href = "cotizacion.html"; quoteLink.textContent = "Cotizar"; siteNav.append(quoteLink) }
  const originalQuoteSubmit = window.submitQuote; if (typeof originalQuoteSubmit === "function") window.submitQuote = async (...args) => { await originalQuoteSubmit(...args); const feedback = document.getElementById("quoteFeedback"); if (feedback?.textContent.startsWith("Solicitud guardada")) feedback.textContent = "Solicitud enviada correctamente." };
  document.addEventListener("input", event => { const field = event.target; if (!field.matches("input,textarea,select")) return; clearFieldError(field); if (field.id === "cardNumber") field.value = field.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim(); if (field.id === "cardExpiry") { const digits = field.value.replace(/\D/g, "").slice(0, 4); field.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits } if (field.id === "cardCvv") field.value = field.value.replace(/\D/g, "").slice(0, 4) });
  const quoteImages = document.getElementById("quoteImages"); if (quoteImages) quoteImages.addEventListener("change", event => previewReferenceImages(event.target, "quoteImagePreview"));
});


/* --- Autenticación con Supabase --- */
const AUTH_KEY = "amigurumiland_session";
let authenticatedUser = null;
let authReady = false;

function handleAuthRedirectFeedback() {
  const params = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const feedback = document.getElementById("loginError");

  const authError = hashParams.get("error_description") || hashParams.get("error");
  if (authError) {
    if (feedback) {
      feedback.textContent = "El enlace de confirmación no es válido o ha caducado. Solicita un correo nuevo y abre el enlace más reciente.";
    }
    history.replaceState({}, document.title, window.location.pathname + window.location.search);
    return;
  }

  if (params.get("verified") === "1") {
    const message = document.getElementById("emailVerifiedMessage");
    if (message) {
      if (authenticatedUser?.email_confirmed_at) {
        message.textContent = "¡Correo confirmado! Tu cuenta está lista. Ya puedes iniciar sesión.";
      } else {
        message.textContent = "Regresaste del enlace de confirmación. Intenta iniciar sesión; si no funciona, solicita un nuevo correo de confirmación.";
      }
      message.hidden = false;
    }
    params.delete("verified");
    const query = params.toString();
    history.replaceState({}, document.title, window.location.pathname + (query ? `?${query}` : "") + window.location.hash);
  }
}

function currentUser() {
  if (!authenticatedUser) return null;

  return {
    id: authenticatedUser.id,
    nombre: authenticatedUser.user_metadata?.full_name || "",
    email: authenticatedUser.email || ""
  };
}

function requireLogin() {
  if (!authReady) {
    showStatus("Verificando tu sesión. Inténtalo nuevamente en unos segundos.");
    return false;
  }

  if (!currentUser()) {
    const next = encodeURIComponent(
      location.pathname.split("/").pop() + location.search
    );
    location.replace(`login.html?next=${next}`);
    return false;
  }

  return true;
}

function safeNext() {
  const next = new URLSearchParams(location.search).get("next") || "index.html";

  return /^[a-z0-9-]+\.html(?:\?.*)?$/i.test(next) &&
    !/^(login|registro)\.html/i.test(next)
    ? next
    : "index.html";
}

function updateAccountNav() {
  const link = document.getElementById("accountNav");
  if (!link) return;

  const user = currentUser();
  link.href = user ? "cuenta.html" : "login.html";
  link.textContent = user ? "Mi cuenta" : "Iniciar sesión";
}

async function logout() {
  if (typeof supabaseClient === "undefined") {
    showStatus("No está disponible la conexión de autenticación.");
    return;
  }

  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    showStatus("No se pudo cerrar la sesión. Inténtalo nuevamente.");
    console.error("Error al cerrar sesión:", error.message);
    return;
  }

  authenticatedUser = null;
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(CHECKOUT_KEY);
  location.href = "index.html";
}

async function initRegister() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("registerPassword2").value;
    const feedback = document.getElementById("registerError");
    const button = form.querySelector('[type="submit"]');

    feedback.textContent = "";

    if (!isValidName(name)) {
      feedback.textContent = "Ingresa un nombre válido.";
      return;
    }

    if (!isValidEmail(email)) {
      feedback.textContent = "Ingresa un correo electrónico válido.";
      return;
    }

    if (password.length < 8) {
      feedback.textContent = "La contraseña debe tener al menos 8 caracteres.";
      return;
    }

    if (password !== confirm) {
      feedback.textContent = "Las contraseñas no coinciden.";
      return;
    }

    if (typeof supabaseClient === "undefined") {
      feedback.textContent = "No se pudo conectar con el servicio de cuentas.";
      return;
    }

    if (button) button.disabled = true;

    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: new URL("login.html?verified=1", window.location.href).href
        }
      });

      if (error) {
        console.error("Error de registro:", error.message);
        feedback.textContent =
          error.message.includes("already registered")
            ? "No se pudo crear la cuenta con esos datos. Intenta iniciar sesión."
            : "No se pudo crear la cuenta. Verifica los datos e inténtalo nuevamente.";
        return;
      }

      if (data.session && data.user) {
        authenticatedUser = data.user;
        authReady = true;
        updateAccountNav();
        location.href = safeNext();
        return;
      }

      feedback.textContent =
        "Tu registro fue recibido. Revisa tu correo para confirmar la cuenta y después inicia sesión.";
    } catch (error) {
      console.error("Error inesperado en el registro:", error);
      feedback.textContent = "Ocurrió un error de conexión. Inténtalo nuevamente.";
    } finally {
      if (button) button.disabled = false;
    }
  });
}

function initLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const feedback = document.getElementById("loginError");
    const button = form.querySelector('[type="submit"]');

    feedback.textContent = "";

    if (!isValidEmail(email) || !password) {
      feedback.textContent = "Ingresa un correo y una contraseña válidos.";
      return;
    }

    if (typeof supabaseClient === "undefined") {
      feedback.textContent = "No se pudo conectar con el servicio de cuentas.";
      return;
    }

    if (button) button.disabled = true;

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (error || !data.user) {
        feedback.textContent = "Correo o contraseña incorrectos. Verifica también si debes confirmar tu correo.";
        return;
      }

      authenticatedUser = data.user;
      authReady = true;
      updateAccountNav();
      location.href = safeNext();
    } catch (error) {
      console.error("Error inesperado al iniciar sesión:", error);
      feedback.textContent = "No se pudo iniciar sesión. Comprueba tu conexión e inténtalo de nuevo.";
    } finally {
      if (button) button.disabled = false;
    }
  });
}


function initPasswordRecovery() {
  const form = document.getElementById("recoveryForm");
  if (!form) return;
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const emailField = document.getElementById("recoveryEmail");
    const feedback = document.getElementById("recoveryFeedback");
    const button = form.querySelector('[type="submit"]');
    const email = emailField.value.trim().toLowerCase();
    feedback.textContent = "";
    if (!isValidEmail(email)) {
      feedback.textContent = "Escribe un correo electrónico válido.";
      emailField.focus();
      return;
    }
    if (typeof supabaseClient === "undefined") {
      feedback.textContent = "El servicio de cuentas no está disponible. Inténtalo más tarde.";
      return;
    }
    if (button) button.disabled = true;
    try {
      const redirectTo = new URL("restablecer-contrasena.html", location.href).href;
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) throw error;
      feedback.textContent = "Si existe una cuenta con ese correo, recibirás un enlace para cambiar la contraseña. Revisa también spam.";
      form.reset();
    } catch (error) {
      console.error("No se pudo solicitar recuperación:", error);
      feedback.textContent = "No se pudo enviar el enlace. Comprueba la configuración de correo de Supabase e inténtalo de nuevo.";
    } finally {
      if (button) button.disabled = false;
    }
  });
}

function initPasswordReset() {
  const form = document.getElementById("resetPasswordForm");
  if (!form) return;
  const password = document.getElementById("newPassword");
  const confirm = document.getElementById("confirmPassword");
  const feedback = document.getElementById("resetPasswordFeedback");
  let recoverySessionReady = false;

  const showReady = async () => {
    try {
      const { data, error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      // Una sesión normal no demuestra que el usuario abrió un enlace de recuperación.
      // Solo PASSWORD_RECOVERY, recibido desde el flujo de Supabase Auth, habilita el cambio.
      recoverySessionReady = false;
      form.querySelector('[type="submit"]').disabled = true;
      feedback.textContent = data.session
        ? "Esperando la validación del enlace de recuperación…"
        : "El enlace no es válido o ha caducado. Solicita uno nuevo.";
    } catch (error) {
      feedback.textContent = "No se pudo validar el enlace. Solicita uno nuevo.";
      form.querySelector('[type="submit"]').disabled = true;
    }
  };
  if (typeof supabaseClient === "undefined") {
    feedback.textContent = "El servicio de cuentas no está disponible.";
    form.querySelector('[type="submit"]').disabled = true;
    return;
  }
  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === "PASSWORD_RECOVERY" && session) {
      recoverySessionReady = true;
      form.querySelector('[type="submit"]').disabled = false;
      feedback.textContent = "Enlace validado. Elige una contraseña nueva.";
    }
  });
  showReady();

  form.addEventListener("submit", async event => {
    event.preventDefault();
    feedback.textContent = "";
    if (!recoverySessionReady) {
      feedback.textContent = "Abre primero el enlace válido que recibiste por correo.";
      return;
    }
    if (password.value.length < 8) {
      feedback.textContent = "La contraseña debe tener al menos 8 caracteres.";
      password.focus();
      return;
    }
    if (password.value !== confirm.value) {
      feedback.textContent = "Las contraseñas no coinciden.";
      confirm.focus();
      return;
    }
    const button = form.querySelector('[type="submit"]');
    if (button) button.disabled = true;
    try {
      const { error } = await supabaseClient.auth.updateUser({ password: password.value });
      if (error) throw error;
      await supabaseClient.auth.signOut();
      feedback.textContent = "Contraseña actualizada. Ya puedes iniciar sesión con tu nueva contraseña.";
      form.reset();
      window.setTimeout(() => { location.href = "login.html"; }, 1800);
    } catch (error) {
      console.error("No se pudo actualizar la contraseña:", error);
      feedback.textContent = "No se pudo cambiar la contraseña. Solicita un enlace nuevo e inténtalo otra vez.";
    } finally {
      if (button) button.disabled = false;
    }
  });
}

function initAccount() {
  const form = document.getElementById("accountForm");
  if (!form) return;

  const user = currentUser();
  if (!user) return;

  const nameField = document.getElementById("accountName");
  const emailField = document.getElementById("accountEmail");
  const feedback = document.getElementById("accountFeedback");

  if (nameField) nameField.value = user.nombre;
  if (emailField) emailField.value = user.email;

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const name = nameField.value.trim();
    const email = emailField.value.trim().toLowerCase();

    feedback.textContent = "";

    if (!isValidName(name)) {
      feedback.textContent = "Ingresa un nombre válido.";
      return;
    }

    if (!isValidEmail(email)) {
      feedback.textContent = "Ingresa un correo válido.";
      return;
    }

    try {
      const { data, error } = await supabaseClient.auth.updateUser({
        email,
        data: { full_name: name }
      });

      if (error) {
        console.error("Error actualizando la cuenta:", error.message);
        feedback.textContent = "No se pudieron actualizar los datos.";
        return;
      }

      if (data.user) authenticatedUser = data.user;

      feedback.textContent = email !== user.email
        ? "Nombre actualizado. Revisa tu correo por si Supabase solicita confirmar la nueva dirección."
        : "Tus datos se actualizaron correctamente.";

      updateAccountNav();
    } catch (error) {
      console.error("Error inesperado actualizando la cuenta:", error);
      feedback.textContent = "Ocurrió un error al actualizar tus datos.";
    }
  });

  document.getElementById("changePasswordButton")?.addEventListener("click", async () => {
    const next = document.getElementById("newPassword").value;
    const confirm = document.getElementById("newPassword2").value;
    const current = document.getElementById("currentPassword").value;
    const passwordFeedback = document.getElementById("passwordFeedback");

    passwordFeedback.textContent = "";

    if (!current || !next || !confirm) {
      passwordFeedback.textContent = "Completa los tres campos de contraseña.";
      return;
    }

    if (next.length < 8) {
      passwordFeedback.textContent = "La nueva contraseña debe tener al menos 8 caracteres.";
      return;
    }

    if (next !== confirm) {
      passwordFeedback.textContent = "Las nuevas contraseñas no coinciden.";
      return;
    }

    try {
      // Reautentica al usuario antes de permitir el cambio de contraseña.
      const { error: verifyError } = await supabaseClient.auth.signInWithPassword({
        email: currentUser().email,
        password: current
      });

      if (verifyError) {
        passwordFeedback.textContent = "La contraseña actual no es correcta.";
        return;
      }

      const { error } = await supabaseClient.auth.updateUser({
        password: next
      });

      if (error) {
        console.error("Error cambiando contraseña:", error.message);
        passwordFeedback.textContent = "No se pudo actualizar la contraseña.";
        return;
      }

      ["currentPassword", "newPassword", "newPassword2"].forEach(id => {
        document.getElementById(id).value = "";
      });

      passwordFeedback.textContent = "Contraseña actualizada correctamente.";
    } catch (error) {
      console.error("Error inesperado cambiando contraseña:", error);
      passwordFeedback.textContent = "Ocurrió un error al actualizar la contraseña.";
    }
  });
}

async function initMyOrders() {
  const box = document.getElementById("myOrders");
  if (!box) return;
  if (typeof supabaseClient === "undefined") {
    box.innerHTML = '<p class="form-error" role="alert">No está disponible la conexión con Supabase.</p>';
    return;
  }

  // Recupera el usuario directamente del cliente de Supabase en vez de depender
  // únicamente de la copia local de la sesión mantenida por la interfaz.
  try {
    const { data: authData, error: authError } = await supabaseClient.auth.getUser();
    if (authError) throw authError;
    authenticatedUser = authData?.user || null;
    authReady = true;
    updateAccountNav();
  } catch (error) {
    console.error("No se pudo validar la sesión para Mis pedidos:", error.message);
    box.innerHTML = '<p class="form-error" role="alert">No se pudo verificar tu sesión. Inicia sesión nuevamente y recarga esta página.</p>';
    return;
  }

  if (!currentUser()) {
    box.innerHTML = '<div class="lookup-card"><h2>Inicia sesión para ver tus pedidos</h2><p class="muted">Aquí aparecerán automáticamente las compras asociadas a tu cuenta.</p><a class="btn dark" href="login.html?next=pedidos.html">Iniciar sesión</a></div>';
    return;
  }

  const user = currentUser();
  if (!user) return;

  box.innerHTML = '<p class="muted" role="status">Cargando tus pedidos desde Supabase…</p>';

  try {
    const { data: orders, error } = await supabaseClient
      .from("pedidos")
      .select("id, codigo, estado, total, punto_retiro_id, created_at")
      .eq("usuario_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (!orders?.length) {
      box.innerHTML = '<div class="lookup-card"><h2>Aún no tienes pedidos</h2><p class="muted">Cuando realices una compra, aparecerá aquí.</p><a class="btn dark" href="productos.html">Explorar productos</a></div>';
      return;
    }

    const ids = orders.map(order => order.id);
    const [{ data: details, error: detailError }, { data: payments, error: paymentError }] = await Promise.all([
      supabaseClient.from("detalle_pedido")
        .select("pedido_id, nombre_producto, cantidad, color, tamano, precio_unitario, subtotal")
        .in("pedido_id", ids),
      supabaseClient.from("pagos")
        .select("pedido_id, metodo, estado, es_simulacion")
        .in("pedido_id", ids)
    ]);

    if (detailError) throw detailError;
    if (paymentError) throw paymentError;

    const pickupNames = { 1: "Centro Norte", 2: "Centro Histórico", 3: "Cumbayá" };
    box.innerHTML = orders.map(order => {
      const orderDetails = (details || []).filter(detail => detail.pedido_id === order.id);
      const payment = (payments || []).find(entry => entry.pedido_id === order.id);
      const items = orderDetails.map(detail => {
        const options = [detail.color, detail.tamano].filter(Boolean).join(" · ");
        return `<li>${escapeHtml(detail.nombre_producto)} · ${escapeHtml(options)} × ${detail.cantidad}</li>`;
      }).join("");
      const paymentMethods = { tarjeta: "Tarjeta", transferencia: "Transferencia", paypal: "PayPal", simulado: "Pago simulado" };
      const paymentLabel = payment
        ? (paymentMethods[String(payment.metodo || "").toLowerCase()] || "Método no especificado")
        : "Pendiente de registro";

      return `<article class="order-card">
        <div class="order-card-header">
          <div><b>Pedido ${escapeHtml(order.codigo)}</b><time>${new Date(order.created_at).toLocaleString("es-EC", { dateStyle: "medium", timeStyle: "short" })}</time></div>
          <span class="order-status">${escapeHtml(order.estado)}</span>
        </div>
        <ul class="order-items">${items}</ul>
        <div class="order-card-footer"><span>Retiro: ${escapeHtml(pickupNames[order.punto_retiro_id] || "Por coordinar")}<br><span class="muted">Pago: ${escapeHtml(paymentLabel)}</span></span><b>${money(order.total)}</b></div>
      </article>`;
    }).join("");
  } catch (error) {
    console.error("No se pudieron cargar los pedidos:", error.message);
    box.innerHTML = '<p class="form-error" role="alert">No se pudieron cargar tus pedidos desde Supabase. Recarga la página o inténtalo más tarde.</p>';
  }
}

/* Inicializa las funciones de cuenta solo después de recuperar la sesión. */
document.addEventListener("DOMContentLoaded", async () => {
  if (typeof supabaseClient === "undefined") {
    authReady = true;
    updateAccountNav();
    initRegister();
    initLogin();
    initPasswordRecovery();
    initPasswordReset();
    console.error("Supabase no está disponible. Revisa el orden de los scripts.");
    return;
  }

  try {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
      console.error("No se pudo recuperar la sesión:", error.message);
    }

    authenticatedUser = data?.session?.user || null;
  } catch (error) {
    console.error("Error recuperando la sesión:", error);
    authenticatedUser = null;
  }

  authReady = true;
  updateAccountNav();
  handleAuthRedirectFeedback();

  initRegister();
  initLogin();
  initPasswordRecovery();
  initPasswordReset();
  initAccount();
  initMyOrders();

  const file = location.pathname.split("/").pop();

  if (["checkout-datos.html", "checkout-pago.html", "confirmacion.html", "pedidos.html", "cuenta.html", "cotizacion.html"].includes(file) && !requireLogin()) {
    return;
  }

  const user = currentUser();

  if (file === "checkout-datos.html" && user) {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const invoiceName = document.getElementById("invoiceName");

    if (name && email) {
      name.value = user.nombre;
      email.value = user.email;
      name.readOnly = true;
      email.readOnly = true;

      if (invoiceName && !invoiceName.value) {
        invoiceName.value = user.nombre;
      }
    }
  }

  if (file === "cotizacion.html" && user) {
    const name = document.getElementById("quoteName");
    const email = document.getElementById("quoteEmail");

    if (name && email) {
      name.value = user.nombre;
      email.value = user.email;
      name.readOnly = true;
      email.readOnly = true;
    }
  }
});