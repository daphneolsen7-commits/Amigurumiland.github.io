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
function getProduct() { return products.find(p => String(p.id) === new URLSearchParams(location.search).get("id")) }
function openProductPage() {
    const p = getProduct(), box = document.getElementById("productDetail"); if (!box) return;
    if (!p) { box.innerHTML = '<div class="notice">No encontramos ese producto.</div>'; return }
    const availableColors = colorsForProduct(p);
    const initialColor = availableColors.length ? availableColors[0][0] : "Original";
    window.custom = { color: initialColor, size: sizes[0][0], extra: 0, basePrice: p.price };
    box.innerHTML = `<div class="product"><div><img class="main-img" src="${img(p)}" alt="${escapeHtml(p.name)}" onerror="this.onerror=null;this.src='assets/amigurumis.png'"></div><div><div class="muted">${escapeHtml(p.cat)}</div><h1>${escapeHtml(p.name)}</h1><p>Elige el tamaño antes de agregar el producto al carrito.</p>${availableColors.length ? `<fieldset class="option-group"><legend>Color</legend><div class="option-row">${availableColors.map((c, i) => `<button class="swatch ${i === 0 ? "active" : ""}" type="button" aria-label="Elegir color ${escapeHtml(c[0])}" aria-pressed="${i === 0}" title="${escapeHtml(c[0])}" style="background:${c[1]}" onclick="chooseColor(${i},this)"></button>`).join("")}</div><p id="selectedColor" class="selection-label">Color seleccionado: ${escapeHtml(initialColor)}</p></fieldset>` : ""}<fieldset class="option-group"><legend>Tamaño</legend><div class="option-row">${sizes.map((s, i) => `<button class="size ${i === 0 ? "active" : ""}" type="button" aria-pressed="${i === 0}" onclick="chooseSize(${i},this)">${s[0]}</button>`).join("")}</div></fieldset><p id="selectedPrice" class="price">Precio: ${money(p.price)}</p><button class="btn dark full" onclick="addCustomized(${p.id})">Agregar al carrito</button><div class="help">¿Tienes dudas? <a href="${contactUrl(p.name)}" target="_blank" rel="noopener">Consultar por WhatsApp</a></div></div></div><div class="reviews-box"><h2>Reseñas</h2><div id="reviewsList">${renderReviews(p.id)}</div><div class="review-form"><label>Calificación<select class="field" id="reviewRating"><option value="5">5 ★★★★★</option><option value="4">4 ★★★★☆</option><option value="3">3 ★★★☆☆</option><option value="2">2 ★★☆☆☆</option><option value="1">1 ★☆☆☆☆</option></select></label><label>Tu reseña<textarea class="field" id="reviewText" maxlength="1000" rows="3" placeholder="Cuéntanos tu experiencia..."></textarea></label><label>Imágenes de referencia<input class="field" id="reviewImagesInput" type="file" accept="image/jpeg,image/png,image/webp" multiple><small class="muted">Hasta 3 imágenes JPG, PNG o WebP de 5 MB cada una.</small><span id="reviewImagePreview" class="image-previews" aria-live="polite"></span></label><p id="reviewFeedback" class="form-error" role="status"></p><button class="btn dark" type="button" onclick="submitReview(${p.id})">Enviar reseña</button></div></div>`;
    document.getElementById("reviewImagesInput").addEventListener("change", event => previewReferenceImages(event.target, "reviewImagePreview"));
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
function isValidCardNumber(v) { const d = v.replace(/\D/g, ""); if (!/^\d{16}$/.test(d)) return false; let sum = 0, double = false; for (let i = d.length - 1; i >= 0; i--) { let n = +d[i]; if (double) n = n * 2 > 9 ? n * 2 - 9 : n * 2; sum += n; double = !double } return sum % 10 === 0 }
function updatePaymentFields() { const m = document.querySelector("[name=payment]:checked")?.value; document.getElementById("cardPaymentFields")?.toggleAttribute("hidden", m !== "Tarjeta"); document.getElementById("transferPaymentFields")?.toggleAttribute("hidden", m !== "Transferencia bancaria"); document.getElementById("paypalPaymentFields")?.toggleAttribute("hidden", m !== "PayPal"); document.getElementById("paymentError")?.replaceChildren();["cardholderName", "cardNumber", "cardExpiry", "cardCvv", "transferReference", "paypalEmail"].forEach(id => clearFieldError(document.getElementById(id))) }
function validatePayment() { const m = document.querySelector("[name=payment]:checked")?.value, err = document.getElementById("paymentError"); err.textContent = ""; if (m === "Tarjeta") { const name = document.getElementById("cardholderName"), num = document.getElementById("cardNumber"), exp = document.getElementById("cardExpiry"), cvv = document.getElementById("cardCvv"); if (!isValidName(name.value)) { setFieldError(name, "Escribe el nombre del titular como aparece en la tarjeta."); name.focus(); return null } if (!isValidCardNumber(num.value)) { setFieldError(num, "El número debe tener 16 dígitos y superar la comprobación de tarjeta."); num.focus(); return null } const match = exp.value.trim().match(/^(0[1-9]|1[0-2])\/(\d{2})$/); if (!match) { setFieldError(exp, "Usa el formato MM/AA con un mes válido."); exp.focus(); return null } const expiryYear = 2000 + Number(match[2]), expiryMonth = Number(match[1]), now = new Date(); if (expiryYear < now.getFullYear() || (expiryYear === now.getFullYear() && expiryMonth < now.getMonth() + 1)) { setFieldError(exp, "La tarjeta está vencida."); exp.focus(); return null } if (!/^\d{3,4}$/.test(cvv.value.trim())) { setFieldError(cvv, "El código de seguridad debe tener 3 o 4 dígitos."); cvv.focus(); return null } return { status: "approved", reference: `Tarjeta terminada en ${num.value.replace(/\D/g, "").slice(-4)}` } } if (m === "Transferencia bancaria") { const reference = document.getElementById("transferReference"); if (!/^[A-Za-z0-9-]{6,20}$/.test(reference.value.trim())) { setFieldError(reference, "Usa entre 6 y 20 letras, números o guiones."); reference.focus(); return null } return { status: "pending_verification", reference: reference.value.trim() } } if (m === "PayPal") { const email = document.getElementById("paypalEmail"); if (!isValidEmail(email.value.trim())) { setFieldError(email, "Ingresa un correo válido de PayPal."); email.focus(); return null } return { status: "approved", reference: "Autorización PayPal" } } return null }
function loadDB() { try { const db = JSON.parse(localStorage.getItem(DB_KEY) || '{"USUARIO":[],"DIRECCION":[],"PEDIDO":[],"DETALLE_PEDIDO":[],"PAGO":[],"ENVIO":[],"FACTURA":[],"RESENA":[],"COTIZACION":[]}'); return db && typeof db === "object" && !Array.isArray(db) ? db : null } catch { return null } }
function saveDB(db) { try { localStorage.setItem(DB_KEY, JSON.stringify(db)); return true } catch { return false } }
async function submitQuote() {
    const name = document.getElementById("quoteName"), email = document.getElementById("quoteEmail"), design = document.getElementById("quoteDesign"), size = document.getElementById("quoteSize"), colors = document.getElementById("quoteColors"), details = document.getElementById("quoteDetails"), input = document.getElementById("quoteImages"), feedback = document.getElementById("quoteFeedback");
    feedback.textContent = ""; [name, email, design, size, colors].forEach(clearFieldError);
    if (!isValidName(name.value)) { setFieldError(name, "Ingresa un nombre válido."); name.focus(); return }
    if (!isValidEmail(email.value.trim())) { setFieldError(email, "Ingresa un correo válido."); email.focus(); return }
    if (!design.value.trim() || design.value.trim().length > 1000) { setFieldError(design, "Describe tu idea (máximo 1000 caracteres)."); design.focus(); return }
    if (!["Pequeño (15 cm)", "Mediano (20 cm)", "Grande (30 cm)"].includes(size.value)) { setFieldError(size, "Selecciona un tamaño disponible."); size.focus(); return }
    if (!colors.value.trim() || colors.value.trim().length > 120) { setFieldError(colors, "Indica los colores (máximo 120 caracteres)."); colors.focus(); return }
    const images = await prepareReferenceImages(input); if (images === null) { input.focus(); return }
    const db = loadDB(); if (!db) { feedback.textContent = "No se pudo guardar tu solicitud."; return }
    db.COTIZACION = Array.isArray(db.COTIZACION) ? db.COTIZACION : [];
    db.COTIZACION.push({ id: `COT-${Date.now().toString().slice(-6)}`, usuario_id: user.id, nombre: user.nombre, email: user.email, diseno: design.value.trim(), tamano: size.value, colores: colors.value.trim(), detalles: details.value.trim(), imagenes: images, fecha: new Date().toISOString() });
    if (!saveDB(db)) { feedback.textContent = "No se pudo guardar. Reduce el tamaño o la cantidad de imágenes."; return }
    document.querySelector("#quoteForm")?.reset(); clearReferencePreviews(document.getElementById("quoteImagePreview")); feedback.textContent = "Solicitud enviada correctamente.";
}
function processPayment() {
    const data = getCheckout(), err = document.getElementById("paymentError"); if (!data) { location.href = "checkout-datos.html"; return } const payment = validatePayment(); if (!payment) return; const now = new Date(), orderId = "AM-" + Date.now().toString().slice(-6), db = loadDB(); if (!db) { err.textContent = "No fue posible guardar la simulación."; return }
    const userId = "USR-" + Date.now().toString().slice(-6), payId = "PAY-" + Date.now().toString().slice(-6), detailIds = cart.map((_, i) => `DET-${Date.now().toString().slice(-6)}-${i + 1}`);
    db.USUARIO.push({ id: userId, nombre: data.name, email: data.email }); db.DIRECCION.push({ id: "DIR-" + orderId, usuario_id: userId, punto_retiro: data.pickup });
    db.USUARIO.push({ id: userId, nombre: data.name, email: data.email }); db.DIRECCION.push({ id: "DIR-" + orderId, usuario_id: userId, punto_retiro: data.pickup, direccion_facturacion: data.invoice.address, telefono: data.invoice.phone });
    db.PEDIDO.push({ id: orderId, usuario_id: userId, fecha: now.toISOString(), estado: "Pendiente", total: totalCart(), punto_retiro: data.pickup, metodo_pago: document.querySelector("[name=payment]:checked").value });
    db.PEDIDO.push({ id: orderId, usuario_id: userId, fecha: now.toISOString(), estado: payment.status === "approved" ? "Confirmado" : "Pendiente de pago", total: totalCart(), punto_retiro: data.pickup, metodo_pago: document.querySelector("[name=payment]:checked").value });
    db.FACTURA = Array.isArray(db.FACTURA) ? db.FACTURA : []; db.FACTURA.push({ id: `FAC-${Date.now().toString().slice(-9)}`, pedido_id: orderId, nombre_razon_social: data.invoice.name, tipo_identificacion: data.invoice.idType, identificacion: data.invoice.idNumber, telefono: data.invoice.phone, direccion: data.invoice.address, email: data.email, total: totalCart(), estado: "Registrada", fecha: now.toISOString() });
    cart.forEach((x, i) => { const p = products.find(p => p.id === x.id); db.DETALLE_PEDIDO.push({ id: detailIds[i], pedido_id: orderId, producto_id: p.id, cantidad: x.qty, color: x.color, tamano: x.size, precio_unitario: p.price + (x.extra || 0) }) });
    db.PAGO.push({ id: payId, pedido_id: orderId, metodo: document.querySelector("[name=payment]:checked").value, estado: payment.status, referencia: payment.reference || "SIMULACION", fecha: now.toISOString() });
    db.PAGO.push({ id: payId, pedido_id: orderId, metodo: document.querySelector("[name=payment]:checked").value, estado: payment.status, referencia: payment.reference || "Pago autorizado", fecha: now.toISOString() });
    db.ENVIO.push({ id: "ENV-" + orderId, pedido_id: orderId, punto_retiro: data.pickup, estado: "Pendiente", fecha_disponible: new Date(now.getTime() + 7 * 86400000).toISOString() });
    if (!saveDB(db)) { err.textContent = "No se pudo guardar la transacción."; return }
    if (!saveDB(db)) { err.textContent = "No se pudo registrar el pago. Inténtalo nuevamente."; return }
    const orderItems = cart.map(item => { const product = products.find(p => p.id === item.id); return { name: product.name, customization: customization(item), quantity: item.qty, unitPrice: product.price + (item.extra || 0), total: (product.price + (item.extra || 0)) * item.qty } });
    sessionStorage.setItem("LAST_ORDER", JSON.stringify({ id: orderId, paymentStatus: payment.status, paymentMethod: document.querySelector("[name=payment]:checked").value, paymentReference: payment.reference || "Pago autorizado", total: totalCart(), pickup: data.pickup, customerName: data.name, email: data.email, invoice: data.invoice, items: orderItems }));
    sessionStorage.setItem("LAST_ORDER", JSON.stringify({ id: orderId, paymentStatus: payment.status, paymentMethod: document.querySelector("[name=payment]:checked").value, total: totalCart() }));
    cart = []; saveCart(); sessionStorage.removeItem(CHECKOUT_KEY); location.href = "confirmacion.html"
}
function initPayment() { if (!getCheckout()) return location.href = "checkout-datos.html"; checkoutSummary("paymentSummary") }
function initData() { if (!cart.length) return location.href = "carrito.html"; checkoutSummary("checkoutSummary") }
function initConfirmation() { const o = JSON.parse(sessionStorage.getItem("LAST_ORDER") || "null"); if (!o) return; document.getElementById("confirmationText").textContent = `Tu pedido ${o.id} fue registrado correctamente. `; document.getElementById("confirmationCard").innerHTML = `<p><b>Código del pedido</b><br>${escapeHtml(o.id)}</p><p><b>Método</b><br>${escapeHtml(o.paymentMethod)}</p><p><b>Estado del pago</b><br>${o.paymentStatus === "approved" ? "Aprobado" : "Pendiente de verificación"}</p><p><b>Total simulado</b><br>${money(o.total)}</p>` }
function initConfirmation() { let order; try { order = JSON.parse(sessionStorage.getItem("LAST_ORDER") || "null") } catch { order = null } const text = document.getElementById("confirmationText"), card = document.getElementById("confirmationCard"); if (!order) { text.textContent = "No encontramos los datos de esta compra. Consulta tus pedidos para revisar su estado."; card.hidden = true; return } const items = (order.items || []).map(item => `<div class="summary-line"><span>${escapeHtml(item.name)}<small>${escapeHtml(item.customization)} × ${item.quantity}</small></span><b>${money(item.total)}</b></div>`).join(""), invoice = order.invoice || {}; text.textContent = order.paymentStatus === "approved" ? `Gracias, ${order.customerName}. Tu pedido fue confirmado y el pago quedó registrado.` : `Gracias, ${order.customerName}. Recibimos tu pedido; el pago está pendiente de verificación.`; card.innerHTML = `<section class="order-confirmation-block"><h2>Número de pedido</h2><div class="order-code-row"><strong id="orderCodeValue">${escapeHtml(order.id)}</strong><button class="btn light copy-order-button" type="button" onclick="copyOrderCode()" aria-label="Copiar número de pedido">Copiar</button></div><p class="notice">Copia este número para consultar el estado y dar seguimiento a tu pedido.</p></section><section class="order-confirmation-block"><h2>Resumen de compra</h2>${items}<div class="summary-total"><span>Total</span><b>${money(order.total)}</b></div></section><section class="order-confirmation-block"><h2>Pago y entrega</h2><p><b>Método:</b> ${escapeHtml(order.paymentMethod)}</p><p><b>Estado:</b> ${order.paymentStatus === "approved" ? "Confirmado" : "Pendiente de verificación"}</p><p><b>Retiro:</b> ${escapeHtml(order.pickup)}</p></section><section class="order-confirmation-block"><h2>Datos de facturación</h2><p>${escapeHtml(invoice.name || order.customerName)} · ${invoice.idType === "ruc" ? "RUC" : "Cédula"} ${escapeHtml(invoice.idNumber || "")}</p><p>${escapeHtml(invoice.address || "")}</p><p>${escapeHtml(invoice.phone || "")} · ${escapeHtml(order.email)}</p></section>` }
async function copyOrderCode() { const code = document.getElementById("orderCodeValue")?.textContent; if (!code) return; try { await navigator.clipboard.writeText(code) } catch { const field = document.createElement("textarea"); field.value = code; field.style.position = "fixed"; field.style.opacity = "0"; document.body.append(field); field.select(); document.execCommand("copy"); field.remove() } showStatus("Número de pedido copiado.") }
function lookupOrder() { const codeField = document.getElementById("orderCode"), emailField = document.getElementById("orderEmail"), code = codeField.value.trim().toUpperCase(), email = emailField.value.trim().toLowerCase(), db = loadDB(), result = document.getElementById("orderLookupResult"); clearFieldError(codeField); clearFieldError(emailField); result.replaceChildren(); if (!/^AM-\d{6}$/.test(code)) { setFieldError(codeField, "Usa el formato AM-123456."); codeField.focus(); return } if (!isValidEmail(email)) { setFieldError(emailField, "Ingresa un correo válido."); emailField.focus(); return } if (!db) { result.innerHTML = '<p class="order-empty">No se pudo consultar el almacenamiento local.</p>'; return } const user = (db.USUARIO || []).find(u => String(u.email).toLowerCase() === email), order = user && (db.PEDIDO || []).find(p => p.id === code && p.usuario_id === user.id); if (!order) { result.innerHTML = '<p class="order-empty">No encontramos un pedido con esos datos. Verifica el código y el correo.</p>'; return } const details = (db.DETALLE_PEDIDO || []).filter(d => d.pedido_id === order.id), pay = (db.PAGO || []).find(p => p.pedido_id === order.id), env = (db.ENVIO || []).find(e => e.pedido_id === order.id); result.innerHTML = `<article class="order-card"><div class="order-card-header"><div><b>Pedido ${escapeHtml(order.id)}</b><time>${new Date(order.fecha).toLocaleString("es-EC", { dateStyle: "medium", timeStyle: "short" })}</time></div><span class="order-status is-pending">${escapeHtml(order.estado)}</span></div><ul class="order-items">${details.map(d => { const p = products.find(p => p.id === d.producto_id); return `<li>${escapeHtml(p?.name || "Producto")} · ${escapeHtml(d.tamano)} × ${d.cantidad}</li>` }).join("")}</ul><div class="order-card-footer"><span>Retiro: ${escapeHtml(order.punto_retiro)}</span><b>Total: ${money(order.total)}</b></div><p class="muted">Pago: ${pay?.estado === "approved" ? "Aprobado" : "Transferencia por verificar"}</p><p class="muted">Disponible para recoger desde: ${env ? new Date(env.fecha_disponible).toLocaleDateString("es-EC", { dateStyle: "long" }) : "Pendiente de registro"}</p></article>` }
function getReviews(id) { try { const reviews = JSON.parse(localStorage.getItem(`amigurumiland_reviews_${id}`) || "[]"); return Array.isArray(reviews) ? reviews : [] } catch { return [] } }
function renderReviews(id) { const reviews = getReviews(id); return reviews.length ? reviews.map(review => { const images = Array.isArray(review.images) ? review.images.filter(src => typeof src === "string" && /^data:image\/(jpeg|png|webp);base64,/.test(src)) : []; return `<div class="review-item"><b>${"★".repeat(Math.min(5, Math.max(1, Number(review.rating) || 1)))}${"☆".repeat(5 - Math.min(5, Math.max(1, Number(review.rating) || 1)))}</b><p>${escapeHtml(review.comment)}</p><span class="muted">${new Date(review.date).toLocaleDateString("es-EC")}</span>${images.length ? `<div class="review-images">${images.map(src => `<img src="${escapeHtml(src)}" alt="Imagen adjunta a la reseña" loading="lazy">`).join("")}</div>` : ""}</div>` }).join("") : '<p class="muted">Aún no hay reseñas para este producto.</p>' }
async function submitReview(id) { const text = document.getElementById("reviewText"), rating = document.getElementById("reviewRating"), input = document.getElementById("reviewImagesInput"), feedback = document.getElementById("reviewFeedback"); feedback.textContent = ""; clearFieldError(text); if (!text.value.trim() || text.value.trim().length > 1000) { setFieldError(text, "Escribe una reseña de 1 a 1000 caracteres."); text.focus(); return } if (!["1", "2", "3", "4", "5"].includes(rating.value)) { setFieldError(rating, "Selecciona una calificación válida."); rating.focus(); return } const images = await prepareReferenceImages(input); if (images === null) { input.focus(); return } const reviews = getReviews(id); reviews.unshift({ rating: Number(rating.value), comment: text.value.trim(), images, date: new Date().toISOString() }); try { localStorage.setItem(`amigurumiland_reviews_${id}`, JSON.stringify(reviews)) } catch { feedback.textContent = "No se pudo guardar. Reduce el tamaño o la cantidad de imágenes."; return } text.value = ""; input.value = ""; clearReferencePreviews(document.getElementById("reviewImagePreview")); document.getElementById("reviewsList").innerHTML = renderReviews(id); feedback.textContent = "Reseña guardada en este navegador." }
function contactUrl(name) { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola, quiero consultar sobre ${name} en Amigurumiland.`)}` }
async function submitQuote() { if (!requireLogin()) return; const user = currentUser(); if (!user) return; const name = document.getElementById("quoteName"), email = document.getElementById("quoteEmail"), design = document.getElementById("quoteDesign"), size = document.getElementById("quoteSize"), colors = document.getElementById("quoteColors"), details = document.getElementById("quoteDetails"), input = document.getElementById("quoteImages"), feedback = document.getElementById("quoteFeedback"); name.value = user.nombre || ""; email.value = user.email || ""; feedback.textContent = "";[name, email, design, size, colors].forEach(clearFieldError); if (!isValidName(name.value)) { setFieldError(name, "Ingresa un nombre válido."); name.focus(); return } if (!isValidEmail(email.value.trim())) { setFieldError(email, "Ingresa un correo válido."); email.focus(); return } if (!design.value.trim() || design.value.trim().length > 1000) { setFieldError(design, "Describe tu idea (máximo 1000 caracteres)."); design.focus(); return } if (!["Pequeño (15 cm)", "Mediano (20 cm)", "Grande (30 cm)"].includes(size.value)) { setFieldError(size, "Selecciona un tamaño disponible."); size.focus(); return } if (!colors.value.trim() || colors.value.trim().length > 120) { setFieldError(colors, "Indica los colores (máximo 120 caracteres)."); colors.focus(); return } const images = await prepareReferenceImages(input); if (images === null) { input.focus(); return } const db = loadDB(); if (!db) { feedback.textContent = "No se pudo acceder al almacenamiento local."; return } db.COTIZACION = Array.isArray(db.COTIZACION) ? db.COTIZACION : []; db.COTIZACION.push({ id: `COT-${Date.now().toString().slice(-6)}`, usuario_id: user.id, nombre: user.nombre, email: user.email, diseno: design.value.trim(), tamano: size.value, colores: colors.value.trim(), detalles: details.value.trim(), imagenes: images, fecha: new Date().toISOString() }); if (!saveDB(db)) { feedback.textContent = "No se pudo guardar. Reduce el tamaño o la cantidad de imágenes."; return } document.querySelector("#quoteForm")?.reset(); clearReferencePreviews(document.getElementById("quoteImagePreview")); feedback.textContent = "Solicitud enviada correctamente." }
function processPayment() {
    const data = getCheckout(), error = document.getElementById("paymentError");
    if (!data?.invoice || !cart.length) { location.href = "checkout-datos.html"; return }
    const payment = validatePayment();
    if (!payment) return;
    const db = loadDB();
    if (!db) { error.textContent = "No fue posible registrar el pago."; return }
    ["USUARIO", "DIRECCION", "PEDIDO", "DETALLE_PEDIDO", "PAGO", "ENVIO", "FACTURA"].forEach(key => { if (!Array.isArray(db[key])) db[key] = [] });
    const now = new Date(), stamp = Date.now().toString(), orderId = `AM-${stamp.slice(-6)}`, userId = `USR-${stamp.slice(-6)}`, method = document.querySelector('[name="payment"]:checked').value;
    db.USUARIO.push({ id: userId, nombre: data.name, email: data.email });
    db.DIRECCION.push({ id: `DIR-${orderId}`, usuario_id: userId, punto_retiro: data.pickup, direccion_facturacion: data.invoice.address, telefono: data.invoice.phone });
    db.PEDIDO.push({ id: orderId, usuario_id: userId, fecha: now.toISOString(), estado: payment.status === "approved" ? "Confirmado" : "Pendiente de pago", total: totalCart(), punto_retiro: data.pickup, metodo_pago: method });
    db.FACTURA.push({ id: `FAC-${stamp.slice(-9)}`, pedido_id: orderId, nombre_razon_social: data.invoice.name, tipo_identificacion: data.invoice.idType, identificacion: data.invoice.idNumber, telefono: data.invoice.phone, direccion: data.invoice.address, email: data.email, total: totalCart(), estado: "Registrada", fecha: now.toISOString() });
    const items = cart.map((item, index) => {
        const product = products.find(entry => entry.id === item.id), unitPrice = product.price + (item.extra || 0);
        db.DETALLE_PEDIDO.push({ id: `DET-${stamp.slice(-6)}-${index + 1}`, pedido_id: orderId, producto_id: product.id, cantidad: item.qty, color: item.color, tamano: item.size, precio_unitario: unitPrice });
        return { name: product.name, customization: customization(item), quantity: item.qty, unitPrice, total: unitPrice * item.qty };
    });
    db.PAGO.push({ id: `PAY-${stamp.slice(-6)}`, pedido_id: orderId, metodo: method, estado: payment.status, referencia: payment.reference || "Pago autorizado", fecha: now.toISOString() });
    db.ENVIO.push({ id: `ENV-${orderId}`, pedido_id: orderId, punto_retiro: data.pickup, estado: "Pendiente", fecha_disponible: new Date(now.getTime() + 7 * 86400000).toISOString() });
    if (!saveDB(db)) { error.textContent = "No se pudo registrar el pago. Inténtalo nuevamente."; return }
    const order = { id: orderId, paymentStatus: payment.status, paymentMethod: method, total: totalCart(), pickup: data.pickup, customerName: data.name, email: data.email, invoice: data.invoice, items };
    try { sessionStorage.setItem("LAST_ORDER", JSON.stringify(order)); sessionStorage.removeItem(CHECKOUT_KEY) } catch { error.textContent = "No se pudo preparar la confirmación del pedido."; return }
    cart = []; saveCart(); location.href = "confirmacion.html";
}
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


/* --- Gestión de cuenta y sesión del navegador --- */
const AUTH_KEY = "amigurumiland_session";
function authDB() {
  const db = loadDB();
  if (!db) return null;
  ["USUARIO","DIRECCION","PEDIDO","DETALLE_PEDIDO","PAGO","ENVIO","FACTURA","RESENA","COTIZACION"].forEach(k => { if (!Array.isArray(db[k])) db[k] = []; });
  return db;
}
function currentUser() {
  try {
    const id = sessionStorage.getItem(AUTH_KEY);
    if (!id) return null;
    const db = authDB();
    return db?.USUARIO.find(u => u.id === id) || null;
  } catch { return null; }
}
function requireLogin() {
  const user = currentUser();
  if (!user) {
    const next = encodeURIComponent(location.pathname.split("/").pop() + location.search);
    location.replace(`login.html?next=${next}`);
    return false;
  }
  return true;
}
async function passwordDigest(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2,"0")).join("");
}
function safeNext() {
  const next = new URLSearchParams(location.search).get("next") || "index.html";
  return /^[a-z0-9-]+\.html(?:\?.*)?$/i.test(next) && !/^(login|registro)\.html/i.test(next) ? next : "index.html";
}
function logout() {
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(CHECKOUT_KEY);
  location.href = "index.html";
}
function updateAccountNav() {
  const link = document.getElementById("accountNav");
  if (!link) return;
  const user = currentUser();
  link.href = user ? "cuenta.html" : "login.html";
  link.textContent = user ? "Mi cuenta" : "Iniciar sesión";
}
async function initRegister() {
  const form = document.getElementById("registerForm");
  if (!form) return;
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const confirm = document.getElementById("registerPassword2").value;
    const feedback = document.getElementById("registerError");
    feedback.textContent = "";
    if (!isValidName(name)) { feedback.textContent = "Ingresa un nombre válido."; return; }
    if (!isValidEmail(email)) { feedback.textContent = "Ingresa un correo electrónico válido."; return; }
    if (password.length < 8) { feedback.textContent = "La contraseña debe tener al menos 8 caracteres."; return; }
    if (password !== confirm) { feedback.textContent = "Las contraseñas no coinciden."; return; }
    const db = authDB();
    if (!db) { feedback.textContent = "No se pudo acceder al almacenamiento local."; return; }
    if (db.USUARIO.some(u => String(u.email).toLowerCase() === email)) { feedback.textContent = "Ya existe una cuenta con ese correo. Inicia sesión."; return; }
    try {
      const id = "USR-" + Date.now().toString(36).toUpperCase();
      db.USUARIO.push({ id, nombre: name, email, password_hash: await passwordDigest(password), fecha_registro: new Date().toISOString(), estado: "activo" });
      if (!saveDB(db)) { feedback.textContent = "No se pudo guardar la cuenta en este navegador."; return; }
      sessionStorage.setItem(AUTH_KEY, id);
      location.href = safeNext();
    } catch { feedback.textContent = "No se pudo completar el registro en este navegador."; }
  });
}
function initLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const feedback = document.getElementById("loginError");
    feedback.textContent = "";
    const db = authDB();
    if (!db) { feedback.textContent = "No se pudo acceder al almacenamiento local."; return; }
    const user = db.USUARIO.find(u => String(u.email).toLowerCase() === email);
    if (!user) { feedback.textContent = "Correo o contraseña incorrectos."; return; }
    try {
      const hash = await passwordDigest(password);
      if (!user.password_hash || user.password_hash !== hash) { feedback.textContent = "Correo o contraseña incorrectos. Si tu cuenta fue creada antes de esta actualización, regístrate de nuevo."; return; }
      sessionStorage.setItem(AUTH_KEY, user.id);
      location.href = safeNext();
    } catch { feedback.textContent = "No se pudo verificar la contraseña en este navegador."; }
  });
}
function initAccount() {
  const form = document.getElementById("accountForm");
  if (!form || !requireLogin()) return;
  let user = currentUser();
  document.getElementById("accountName").value = user.nombre || "";
  document.getElementById("accountEmail").value = user.email || "";
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("accountName").value.trim();
    const email = document.getElementById("accountEmail").value.trim().toLowerCase();
    const feedback = document.getElementById("accountFeedback");
    feedback.textContent = "";
    if (!isValidName(name)) { feedback.textContent = "Ingresa un nombre válido."; return; }
    if (!isValidEmail(email)) { feedback.textContent = "Ingresa un correo válido."; return; }
    const db = authDB(); user = db?.USUARIO.find(u => u.id === user.id);
    if (!db || !user) { feedback.textContent = "No se pudo cargar tu cuenta."; return; }
    if (db.USUARIO.some(u => u.id !== user.id && String(u.email).toLowerCase() === email)) { feedback.textContent = "Ese correo ya está asociado a otra cuenta."; return; }
    user.nombre = name; user.email = email; user.actualizado_en = new Date().toISOString();
    if (!saveDB(db)) { feedback.textContent = "No se pudieron guardar los cambios."; return; }
    feedback.textContent = "Tus datos se actualizaron correctamente.";
  });
  document.getElementById("changePasswordButton").addEventListener("click", async () => {
    const current = document.getElementById("currentPassword").value;
    const next = document.getElementById("newPassword").value;
    const confirm = document.getElementById("newPassword2").value;
    const feedback = document.getElementById("passwordFeedback");
    feedback.textContent = "";
    const db = authDB(); user = db?.USUARIO.find(u => u.id === user.id);
    if (!user || !current || !next || !confirm) { feedback.textContent = "Completa los tres campos de contraseña."; return; }
    if (await passwordDigest(current) !== user.password_hash) { feedback.textContent = "La contraseña actual no es correcta."; return; }
    if (next.length < 8) { feedback.textContent = "La nueva contraseña debe tener al menos 8 caracteres."; return; }
    if (next !== confirm) { feedback.textContent = "Las nuevas contraseñas no coinciden."; return; }
    user.password_hash = await passwordDigest(next); user.actualizado_en = new Date().toISOString();
    if (!saveDB(db)) { feedback.textContent = "No se pudo actualizar la contraseña."; return; }
    ["currentPassword","newPassword","newPassword2"].forEach(id => document.getElementById(id).value = "");
    feedback.textContent = "Contraseña actualizada.";
  });
}
function initMyOrders() {
  const box = document.getElementById("myOrders");
  if (!box || !requireLogin()) return;
  const user = currentUser(), db = authDB();
  const orders = (db?.PEDIDO || []).filter(o => o.usuario_id === user.id).sort((a,b) => new Date(b.fecha)-new Date(a.fecha));
  if (!orders.length) {
    box.innerHTML = '<div class="lookup-card"><h2>Aún no tienes pedidos</h2><p class="muted">Cuando realices una compra, aparecerá aquí.</p><a class="btn dark" href="productos.html">Explorar productos</a></div>';
    return;
  }
  box.innerHTML = orders.map(order => {
    const details = db.DETALLE_PEDIDO.filter(d => d.pedido_id === order.id);
    const payment = db.PAGO.find(p => p.pedido_id === order.id);
    const items = details.map(d => {
      const p = products.find(x => x.id === d.producto_id);
      return `<li>${escapeHtml(p?.name || "Producto")} · ${escapeHtml(d.tamano || "")} · ${d.cantidad} unidad(es)</li>`;
    }).join("");
    return `<article class="order-card"><div class="order-card-header"><div><b>Pedido ${escapeHtml(order.id)}</b><time>${new Date(order.fecha).toLocaleString("es-EC",{dateStyle:"medium",timeStyle:"short"})}</time></div><span class="order-status">${escapeHtml(order.estado || "Registrado")}</span></div><ul class="order-items">${items}</ul><div class="order-card-footer"><span>Retiro: ${escapeHtml(order.punto_retiro || "Por coordinar")}<br><span class="muted">Pago: ${payment?.estado === "approved" ? "Aprobado" : "Pendiente de verificación"}</span></span><b>${money(order.total)}</b></div></article>`;
  }).join("");
}
function saveCheckoutData() {
  if (!requireLogin()) return;
  if (!cart.length) { location.href = "carrito.html"; return; }
  const user = currentUser();
  const name = document.getElementById("name"), email = document.getElementById("email");
  const invoiceName = document.getElementById("invoiceName"), idType = document.getElementById("invoiceIdType"), invoiceId = document.getElementById("invoiceId"), phone = document.getElementById("invoicePhone"), address = document.getElementById("invoiceAddress"), err = document.getElementById("checkoutDataError");
  const fields = [name,email,invoiceName,invoiceId,phone,address]; err.textContent = ""; fields.forEach(clearFieldError);
  name.value = user.nombre || ""; email.value = user.email || "";
  if (!isValidName(name.value)) { setFieldError(name, "Actualiza tu nombre desde Mi cuenta."); name.focus(); return; }
  if (!isValidEmail(email.value.trim())) { setFieldError(email, "Actualiza tu correo desde Mi cuenta."); email.focus(); return; }
  if (!isValidName(invoiceName.value)) { setFieldError(invoiceName, "Ingresa el nombre o razón social de la factura."); invoiceName.focus(); return; }
  if (!isValidEcuadorianTaxId(invoiceId.value.trim(), idType.value)) { setFieldError(invoiceId, idType.value === "ruc" ? "Ingresa un RUC ecuatoriano válido de 13 dígitos." : "Ingresa una cédula ecuatoriana válida de 10 dígitos."); invoiceId.focus(); return; }
  if (!/^[0-9+()\s-]{7,13}$/.test(phone.value.trim())) { setFieldError(phone, "Ingresa un teléfono válido."); phone.focus(); return; }
  if (!address.value.trim() || address.value.trim().length > 160) { setFieldError(address, "Ingresa una dirección de facturación válida."); address.focus(); return; }
  const pickup = document.querySelector("[name=pickup]:checked")?.value;
  if (!["Centro Norte","Centro Histórico","Cumbayá"].includes(pickup)) { err.textContent = "Selecciona un punto de retiro."; return; }
  const data = { userId:user.id, name:user.nombre, email:user.email, pickup, invoice:{ name:invoiceName.value.trim(), idType:idType.value, idNumber:invoiceId.value.trim(), phone:phone.value.trim(), address:address.value.trim() } };
  try { sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(data)); location.href = "checkout-pago.html"; }
  catch { err.textContent = "No fue posible guardar los datos de compra en este navegador."; }
}
function processPayment() {
  if (!requireLogin()) return;
  const user = currentUser(), data = getCheckout(), err = document.getElementById("paymentError");
  if (!data || !cart.length || data.userId !== user.id) { location.href = "checkout-datos.html"; return; }
  const payment = validatePayment(); if (!payment) return;
  const db = authDB(); if (!db) { err.textContent = "No fue posible registrar la simulación."; return; }
  const now = new Date(), stamp = Date.now().toString(), orderId = "AM-" + stamp.slice(-6);
  const method = document.querySelector("[name=payment]:checked")?.value || "Tarjeta";
  const userId = user.id;
  db.DIRECCION.push({ id:"DIR-"+orderId, usuario_id:userId, punto_retiro:data.pickup, direccion_facturacion:data.invoice.address, telefono:data.invoice.phone });
  db.PEDIDO.push({ id:orderId, usuario_id:userId, fecha:now.toISOString(), estado:payment.status === "approved" ? "Confirmado" : "Pendiente de pago", total:totalCart(), punto_retiro:data.pickup, metodo_pago:method });
  db.FACTURA.push({ id:"FAC-"+stamp.slice(-9), pedido_id:orderId, nombre_razon_social:data.invoice.name, tipo_identificacion:data.invoice.idType, identificacion:data.invoice.idNumber, telefono:data.invoice.phone, direccion:data.invoice.address, email:user.email, total:totalCart(), estado:"Registrada", fecha:now.toISOString() });
  const items = cart.map((x,i) => {
    const p = products.find(p => p.id === x.id), unit = p.price + (Number(x.extra)||0);
    db.DETALLE_PEDIDO.push({ id:`DET-${stamp.slice(-6)}-${i+1}`, pedido_id:orderId, producto_id:p.id, cantidad:x.qty, color:x.color, tamano:x.size, precio_unitario:unit });
    return {name:p.name, customization:customization(x), quantity:x.qty, unitPrice:unit, total:unit*x.qty};
  });
  db.PAGO.push({ id:"PAY-"+stamp.slice(-6), pedido_id:orderId, metodo:method, estado:payment.status, referencia:payment.reference || "SIMULACION", fecha:now.toISOString() });
  db.ENVIO.push({ id:"ENV-"+orderId, pedido_id:orderId, punto_retiro:data.pickup, estado:"Pendiente", fecha_disponible:new Date(now.getTime()+7*86400000).toISOString() });
  if (!saveDB(db)) { err.textContent = "No se pudo registrar el pedido."; return; }
  const order = {id:orderId,paymentStatus:payment.status,paymentMethod:method,total:totalCart(),pickup:data.pickup,customerName:user.nombre,email:user.email,invoice:data.invoice,items};
  sessionStorage.setItem("LAST_ORDER",JSON.stringify(order));
  sessionStorage.removeItem(CHECKOUT_KEY); cart=[]; saveCart(); location.href="confirmacion.html";
}
document.addEventListener("DOMContentLoaded", () => {
  updateAccountNav();
  initRegister(); initLogin(); initAccount(); initMyOrders();
  const file = location.pathname.split("/").pop();
  if (["checkout-datos.html","checkout-pago.html","confirmacion.html","pedidos.html","cuenta.html","cotizacion.html"].includes(file) && !requireLogin()) return;
  if (file === "checkout-datos.html") {
    const u = currentUser();
    const n = document.getElementById("name"), e = document.getElementById("email");
    if (u && n && e) { n.value=u.nombre||""; e.value=u.email||""; n.readOnly=true; e.readOnly=true; const inv=document.getElementById("invoiceName"); if(inv && !inv.value) inv.value=u.nombre||""; }
  }
  if (file === "cotizacion.html") {
    const u = currentUser();
    const n = document.getElementById("quoteName"), e = document.getElementById("quoteEmail");
    if (u && n && e) { n.value = u.nombre || ""; e.value = u.email || ""; n.readOnly = true; e.readOnly = true; }
  }
});
