const WHATSAPP_NUMBER = "593992626500";
const ORDERS_STORAGE_KEY = "amigurumiland_orders";
const LEGACY_ORDER_STORAGE_KEY = "amigurumiland_last_order";
const products = [
  {
    id: 1,
    name: "Osito",
    cat: "Animales",
    price: 8.9,
    slug: "osito-miel",
    stock: 8,
    image: "https://i.pinimg.com/1200x/58/94/74/589474d5455ace4fa3c3fca76d6be156.jpg"
  },
  {
    id: 2,
    name: "Hatsune Miku",
    cat: "Personajes",
    price: 15.9,
    slug: "hatsune-miku",
    stock: 5,
    image: "assets/ChatGPT%20Image%202%20oct%202026%2C%2007_57_32%20p.m..png"
  },
  {
    id: 3,
    name: "Tulipan",
    cat: "Regalos",
    price: 5.5,
    slug: "tulipan",
    stock: 10,
    image: "https://i.pinimg.com/736x/8b/10/1b/8b101b438583fa269bb28b37d52bbed6.jpg"
  },
  {
    id: 4,
    name: "Rosa",
    cat: "Regalos",
    price: 5.0,
    slug: "rosa",
    stock: 5,
    image: "https://i.pinimg.com/736x/d7/fa/3c/d7fa3cfc0f1d68ce340167189c2cfda8.jpg"
  }
];
const colors = [["Crema", "#e7d3bb"], ["Rosa", "#e7aab4"], ["Celeste", "#a9c7df"], ["Lavanda", "#bdb2d8"], ["Gris", "#aeb2b5"], ["Negro", "#111"]];
const sizes = [["Pequeño (15 cm)", 0], ["Mediano (20 cm)", 3], ["Grande (30 cm)", 6]];
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem("amigurumiland_cart") || "[]");
    if (!Array.isArray(saved)) return [];
    const remainingStock = new Map(products.map((product) => [product.id, product.stock]));
    return saved
      .filter((item) => item && products.some((p) => p.id === item.id))
      .map((item) => {
        const remaining = remainingStock.get(item.id);
        const qty = Math.min(Math.max(1, Number(item.qty) || 1), remaining);
        remainingStock.set(item.id, remaining - qty);
        return { ...item, qty };
      })
      .filter((item) => item.qty > 0);
  } catch (error) {
    return [];
  }
}

function loadOrders() {
  try {
    const saved = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || "[]");
    const orders = Array.isArray(saved)
      ? saved.filter((order) => order && order.id).map((order) => ({
        ...order,
        status: order.status === "received" ? "received" : "pending"
      }))
      : [];
    const legacyOrder = JSON.parse(localStorage.getItem(LEGACY_ORDER_STORAGE_KEY) || "null");

    if (legacyOrder?.id && !orders.some((order) => order.id === legacyOrder.id)) {
      orders.push({ ...legacyOrder, status: "pending" });
    }

    return orders.sort((first, second) => new Date(second.fecha) - new Date(first.fecha));
  } catch (error) {
    return [];
  }
}

let cart = loadCart();
let orders = loadOrders();
let lastFocusedElement = null;
let statusTimeout;

function showStatus(message) {
  const status = document.getElementById("statusMessage");
  status.textContent = message;
  status.classList.add("show");
  clearTimeout(statusTimeout);
  statusTimeout = setTimeout(() => status.classList.remove("show"), 4000);
}

const localImg = (p, v = "frente") => `assets/products/${p.slug}-${v}.svg`;
const fallbackImage = (p, v = "frente") => `https://picsum.photos/seed/${encodeURIComponent(`${p.slug}-${v}`)}/900/900`;
const img = (p, v = "frente") => p.image || localImg(p, v) || fallbackImage(p, v);
const money = (n) => `$${n.toFixed(2)}`;
function renderProducts() {
  let q = (document.getElementById("search").value || "").toLowerCase();
  let c = document.getElementById("category").value;
  const results = products.filter((p) => (!q || p.name.toLowerCase().includes(q)) && (!c || p.cat === c));
  document.getElementById("products").innerHTML = results.length
    ? results.map(
      (p) => `
        <article class="card">
          <img class="card-img" src="${img(p)}" alt="${p.name}" onerror="this.onerror=null;this.src='${fallbackImage(p)}'">
          <div class="card-body">
            <b>${p.name}</b>
            <div class="muted">${p.cat} · ${p.stock} disponibles</div>
            <div class="price">${money(p.price)}</div>
            <button class="btn dark" style="width:100%" onclick="openProduct(${p.id})">Ver producto</button>
          </div>
        </article>
      `
    )
    .join("")
    : '<p class="empty-results">No encontramos productos con esos filtros. Prueba otra búsqueda o categoría.</p>';
}

function openProduct(id) {
  let p = products.find((x) => x.id === id);
  lastFocusedElement = document.activeElement;
  window.custom = { color: p.slug === "hatsune-miku" ? "Original" : colors[0][0], size: sizes[0][0], extra: 0, basePrice: p.price };
  document.getElementById("productDetail").innerHTML = `
    <div class="product">
      <div class="gallery single-image-gallery">
        <img id="mainProductImage" class="main-img" src="${img(p)}" alt="${p.name}" onerror="this.onerror=null;this.src='${fallbackImage(p)}'">
      </div>
      <div>
        <div class="muted">${p.cat}</div>
        <h2 id="productTitle">${p.name}</h2>
        <p>Elige la personalización antes de agregar el producto al carrito.</p>
        ${p.slug !== "hatsune-miku" ? `
          <b>Color</b>
          <div class="option-row">
            ${colors
              .map(
                (c, i) => `<button type="button" class="swatch ${i ? "" : "active"}" title="${c[0]}" aria-label="Elegir color ${c[0]}" aria-pressed="${i === 0}" style="background:${c[1]}" onclick="chooseColor(${i},this)"></button>`
              )
              .join("")}
          </div>
          <p class="selection-label" id="selectedColor" aria-live="polite">Color seleccionado: ${colors[0][0]}</p>
        ` : ""}
        <b>Tamaño</b>
        <div class="option-row">
          ${sizes.map((s, i) => `<button type="button" class="size ${i ? "" : "active"}" aria-pressed="${i === 0}" onclick="chooseSize(${i},this)">${s[0]}</button>`).join("")}
        </div>
        <p class="price" id="selectedPrice" aria-live="polite">Precio: ${money(p.price + sizes[0][1])}</p>
        <button class="btn dark" type="button" style="width:100%" onclick="addCustomized(${p.id})">Agregar al carrito</button>
        <div class="help">¿Tienes dudas? <a href="#" onclick="contactWhatsApp(${p.id});return false">Consultar por WhatsApp</a></div>
      </div>
    </div>
    <div class="reviews-box">
      <h3>Reseñas</h3>
      <div id="reviewsList-${p.id}">${renderReviews(p.id)}</div>
      <div class="review-form">
        <label>Calificación
          <select id="reviewRating-${p.id}">
            <option value="5">5 ★★★★★</option>
            <option value="4">4 ★★★★☆</option>
            <option value="3">3 ★★★☆☆</option>
            <option value="2">2 ★★☆☆☆</option>
            <option value="1">1 ★☆☆☆☆</option>
          </select>
        </label>
        <label>Tu reseña
          <textarea id="reviewText-${p.id}" rows="3" placeholder="Cuéntanos tu experiencia con este producto..."></textarea>
        </label>
        <label for="reviewPhoto-${p.id}">Foto (opcional)</label>
        <input class="review-photo-input" id="reviewPhoto-${p.id}" type="file" accept="image/jpeg,image/png,image/webp" onchange="previewReviewPhoto(${p.id},this)">
        <p class="muted">JPG, PNG o WebP. Máximo 5 MB; la imagen se reduce antes de guardarla.</p>
        <div class="photo-preview" id="photoPreview-${p.id}" hidden>
          <img alt="Vista previa de la foto para la reseña">
          <button class="btn photo-remove" type="button" onclick="clearReviewPhoto(${p.id})">Quitar foto</button>
        </div>
        <p id="reviewFeedback-${p.id}" class="form-error" role="status" aria-live="polite"></p>
        <button class="btn dark" type="button" style="width:100%" onclick="submitReview(${p.id})">Enviar reseña</button>
      </div>
    </div>
  `;
  document.getElementById("productModal").classList.add("show");
  document.querySelector("#productModal .modal-close").focus();
}

function getReviews(productId) {
  try {
    return JSON.parse(localStorage.getItem(`amigurumiland_reviews_${productId}`) || "[]");
  } catch (error) {
    return [];
  }
}

function saveReviews(productId, reviews) {
  try {
    localStorage.setItem(`amigurumiland_reviews_${productId}`, JSON.stringify(reviews));
    return true;
  } catch (error) {
    return false;
  }
}

function escapeHtml(value) {
  const element = document.createElement("span");
  element.textContent = String(value);
  return element.innerHTML;
}

function renderReviews(productId) {
  const reviews = getReviews(productId);

  if (!reviews.length) {
    return '<p class="muted">Aún no hay reseñas para este producto.</p>';
  }

  return reviews
    .map(
      (review) => `
        <div class="review-item">
          <div class="review-meta">
            <b>${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</b>
            <span>${new Date(review.date).toLocaleDateString("es-ES")}</span>
          </div>
          <p>${escapeHtml(review.comment)}</p>
          ${typeof review.photo === "string" && /^data:image\/jpeg;base64,/.test(review.photo)
            ? `<img class="review-photo" src="${review.photo}" alt="Foto adjunta a la reseña de ${escapeHtml(products.find((product) => product.id === productId)?.name || "este producto")}">`
            : ""}
        </div>
      `
    )
    .join("");
}

function previewReviewPhoto(productId, input) {
  const feedback = document.getElementById(`reviewFeedback-${productId}`);
  const preview = document.getElementById(`photoPreview-${productId}`);
  const image = preview.querySelector("img");
  const file = input.files?.[0];

  feedback.textContent = "";
  if (!file) {
    clearReviewPhoto(productId);
    return;
  }
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    input.value = "";
    feedback.textContent = "Elige una imagen JPG, PNG o WebP.";
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    input.value = "";
    feedback.textContent = "La foto supera 5 MB. Elige una imagen más pequeña.";
    return;
  }

  const objectUrl = URL.createObjectURL(file);
  image.onload = () => URL.revokeObjectURL(objectUrl);
  image.src = objectUrl;
  preview.hidden = false;
}

function clearReviewPhoto(productId) {
  const input = document.getElementById(`reviewPhoto-${productId}`);
  const preview = document.getElementById(`photoPreview-${productId}`);
  const image = preview.querySelector("img");
  if (image.dataset.objectUrl) URL.revokeObjectURL(image.dataset.objectUrl);
  image.removeAttribute("src");
  preview.hidden = true;
  input.value = "";
}

async function compressReviewPhoto(file) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Elige una imagen JPG, PNG o WebP.");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("La foto supera 5 MB. Elige una imagen más pequeña.");
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1000 / bitmap.width, 1000 / bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.78);
}

async function submitReview(productId) {
  const ratingField = document.getElementById(`reviewRating-${productId}`);
  const textField = document.getElementById(`reviewText-${productId}`);
  const photoField = document.getElementById(`reviewPhoto-${productId}`);
  const submitButton = document.querySelector(`#productDetail .review-form .btn.dark`);
  const feedback = document.getElementById(`reviewFeedback-${productId}`);
  const rating = Number(ratingField?.value || 5);
  const comment = (textField?.value || "").trim();

  if (!comment) {
    feedback.textContent = "Escribe una reseña antes de enviarla.";
    textField?.focus();
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Preparando reseña...";
  try {
    const photo = photoField.files?.[0] ? await compressReviewPhoto(photoField.files[0]) : null;
    const reviews = getReviews(productId);
    reviews.unshift({ rating, comment, date: new Date().toISOString(), photo });

    if (!saveReviews(productId, reviews)) {
      feedback.textContent = "No hay espacio disponible para guardar esta reseña. Prueba con una foto más pequeña.";
      return;
    }

    const list = document.getElementById(`reviewsList-${productId}`);
    if (list) list.innerHTML = renderReviews(productId);
    textField.value = "";
    clearReviewPhoto(productId);
    feedback.textContent = "Reseña agregada en este navegador.";
  } catch (error) {
    feedback.textContent = error.message || "No se pudo cargar la foto. Prueba con otra imagen.";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Enviar reseña";
  }
}

function changeMain(src, b) {
  document.getElementById("mainProductImage").src = src;
  document.querySelectorAll(".thumb").forEach((x) => x.classList.remove("active"));
  b.classList.add("active");
}

function chooseColor(i, b) {
  window.custom.color = colors[i][0];
  document.querySelectorAll("#productDetail .swatch").forEach((x) => {
    x.classList.remove("active");
    x.setAttribute("aria-pressed", "false");
  });
  b.classList.add("active");
  b.setAttribute("aria-pressed", "true");
  document.getElementById("selectedColor").textContent = `Color seleccionado: ${window.custom.color}`;
}

function chooseSize(i, b) {
  window.custom.size = sizes[i][0];
  window.custom.extra = sizes[i][1];
  document.querySelectorAll("#productDetail .size").forEach((x) => {
    x.classList.remove("active");
    x.setAttribute("aria-pressed", "false");
  });
  b.classList.add("active");
  b.setAttribute("aria-pressed", "true");
  document.getElementById("selectedPrice").textContent = `Precio: ${money(window.custom.basePrice + window.custom.extra)}`;
}

function addCustomized(id) {
  let p = products.find((x) => x.id === id);
  let c = window.custom;
  let key = `${id}|${c.color}|${c.size}`;
  let f = cart.find((x) => x.key === key);
  const productQty = cart.filter((item) => item.id === id).reduce((sum, item) => sum + item.qty, 0);
  if (productQty >= p.stock) {
    showStatus(`Solo hay ${p.stock} unidades disponibles de ${p.name}.`);
    return;
  }
  if (f) {
    f.qty++;
  } else {
    cart.push({ key, id, qty: 1, color: c.color, size: c.size, extra: c.extra });
  }
  saveCart();
  closeModal();
  openCart();
  showStatus(`${p.name} agregado al carrito.`);
}

function saveCart() {
  localStorage.setItem("amigurumiland_cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  cart = cart.filter((item) => products.some((p) => p.id === item.id));
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCount = document.getElementById("cartCount");
  const cartButton = document.querySelector(".cart-button");
  const checkoutButton = document.getElementById("checkoutButton");
  cartCount.textContent = itemCount;
  cartButton.setAttribute("aria-label", `Abrir carrito, ${itemCount} ${itemCount === 1 ? "producto" : "productos"}`);
  checkoutButton.disabled = itemCount === 0;
  let box = document.getElementById("cartItems");
  let total = 0;

  if (!cart.length) {
    box.innerHTML = '<p class="muted">Tu carrito está vacío.</p>';
    document.getElementById("subtotal").textContent = "$0.00";
    return;
  }

  box.innerHTML = cart
    .map((x, i) => {
      let p = products.find((p) => p.id === x.id);
      let line = (p.price + x.extra) * x.qty;
      total += line;
      let customization = x.color === "Original" ? x.size : `${x.color} · ${x.size}`;
      return `
        <div class="cart-item">
          <img src="${img(p)}" alt="${p.name}" onerror="this.onerror=null;this.src='${fallbackImage(p)}'">
          <div>
            <b>${p.name}</b>
            <div class="muted">${customization}</div>
            <div class="qty">
              <button type="button" aria-label="Restar una unidad de ${p.name}" onclick="changeQty(${i},-1)">−</button>${x.qty}<button type="button" aria-label="Agregar una unidad de ${p.name}" onclick="changeQty(${i},1)">+</button>
            </div>
          </div>
          <b>${money(line)}</b>
        </div>
      `;
    })
    .join("");
  document.getElementById("subtotal").textContent = money(total);
}

function changeQty(i, d) {
  const item = cart[i];
  if (!item) return;
  const product = products.find((p) => p.id === item.id);
  const productQty = cart.filter((entry) => entry.id === item.id).reduce((sum, entry) => sum + entry.qty, 0);
  if (d > 0 && productQty >= product.stock) {
    showStatus(`Solo hay ${product.stock} unidades disponibles de ${product.name}.`);
    return;
  }
  item.qty += d;
  const removed = item.qty <= 0;
  if (removed) cart.splice(i, 1);
  saveCart();
  showStatus(removed ? `${product.name} eliminado del carrito.` : "Cantidad actualizada.");
}

function openCart() {
  closeNav();
  const cartPanel = document.getElementById("cart");
  cartPanel.removeAttribute("inert");
  cartPanel.setAttribute("aria-hidden", "false");
  renderCart();
  cartPanel.classList.add("open");
  document.querySelector(".cart-button").setAttribute("aria-expanded", "true");
  document.querySelector("#cart .cart-header button").focus();
}

function closeCart() {
  const cartPanel = document.getElementById("cart");
  cartPanel.classList.remove("open");
  cartPanel.setAttribute("aria-hidden", "true");
  cartPanel.setAttribute("inert", "");
  document.querySelector(".cart-button").setAttribute("aria-expanded", "false");
  document.querySelector(".cart-button").focus();
}

function closeModal() {
  document.getElementById("productModal").classList.remove("show");
  lastFocusedElement?.focus();
}

function openCheckout() {
  if (!cart.length) {
    showStatus("Agrega un producto al carrito antes de continuar.");
    return;
  }
  lastFocusedElement = document.querySelector(".cart-button");
  closeCart();
  let total = 0;
  document.getElementById("checkoutSummary").innerHTML =
    cart
      .map((x) => {
        let p = products.find((p) => p.id === x.id);
        let line = (p.price + x.extra) * x.qty;
        total += line;
        let customization = x.color === "Original" ? x.size : `${x.color} · ${x.size}`;
        return `<p>${p.name} · ${customization}<br><b>${money(line)}</b></p>`;
      })
      .join("") + `<hr><h3>Total: ${money(total)}</h3>`;
  document.getElementById("checkoutError").textContent = "";
  updatePaymentFields();
  document.getElementById("checkoutModal").classList.add("show");
  document.getElementById("name").focus();
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.remove("show");
  lastFocusedElement?.focus();
}

function updatePaymentFields() {
  const method = document.querySelector("[name=payment]:checked").value;
  document.getElementById("cardPaymentFields").hidden = method !== "Tarjeta";
  document.getElementById("transferPaymentFields").hidden = method !== "Transferencia bancaria";
  document.getElementById("paypalPaymentFields").hidden = method !== "PayPal";
  document.getElementById("confirmOrderButton").textContent = method === "Transferencia bancaria"
    ? "Registrar transferencia"
    : method === "PayPal" ? "Continuar con PayPal" : "Pagar con tarjeta";
  document.getElementById("checkoutError").textContent = "";
}

function isValidCardNumber(value) {
  if (!/^[\d\s-]+$/.test(value.trim())) return false;
  const digits = value.replace(/\D/g, "");
  if (!/^\d{16}$/.test(digits)) return false;

  let sum = 0;
  let doubleDigit = false;
  for (let index = digits.length - 1; index >= 0; index--) {
    let digit = Number(digits[index]);
    if (doubleDigit) digit = digit * 2 > 9 ? digit * 2 - 9 : digit * 2;
    sum += digit;
    doubleDigit = !doubleDigit;
  }
  return sum % 10 === 0;
}

function validatePaymentDetails() {
  const method = document.querySelector("[name=payment]:checked").value;
  const error = document.getElementById("checkoutError");
  let field;

  if (method === "Tarjeta") {
    field = document.getElementById("cardholderName");
    if (!field.value.trim()) {
      error.textContent = "Escribe el nombre del titular (puede ser ficticio).";
      field.focus();
      return null;
    }

    field = document.getElementById("cardNumber");
    if (!isValidCardNumber(field.value)) {
      error.textContent = "Ingresa un número ficticio de 16 dígitos válido para la simulación.";
      field.focus();
      return null;
    }

    field = document.getElementById("cardExpiry");
    const expiry = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(field.value.trim());
    if (!expiry) {
      error.textContent = "Escribe el vencimiento en formato MM/AA.";
      field.focus();
      return null;
    }
    const currentDate = new Date();
    const expiryYear = 2000 + Number(expiry[2]);
    const expiryMonth = Number(expiry[1]);
    if (expiryYear < currentDate.getFullYear()
      || (expiryYear === currentDate.getFullYear() && expiryMonth < currentDate.getMonth() + 1)) {
      error.textContent = "La fecha de vencimiento no puede estar en el pasado.";
      field.focus();
      return null;
    }

    field = document.getElementById("cardCvv");
    if (!/^\d{3,4}$/.test(field.value)) {
      error.textContent = "El CVV de prueba debe tener 3 o 4 dígitos.";
      field.focus();
      return null;
    }
    return { paymentStatus: "approved" };
  }

  if (method === "Transferencia bancaria") {
    field = document.getElementById("transferReference");
    if (!/^[A-Za-z0-9-]{6,20}$/.test(field.value.trim())) {
      error.textContent = "La referencia debe tener entre 6 y 20 letras, números o guiones.";
      field.focus();
      return null;
    }
    return { paymentStatus: "pending_verification", reference: field.value.trim() };
  }

  field = document.getElementById("paypalEmail");
  if (!field.value.trim() || !field.checkValidity()) {
    error.textContent = "Ingresa un correo válido para la cuenta de prueba de PayPal.";
    field.focus();
    return null;
  }
  return { paymentStatus: "approved" };
}

function closeOnBackdrop(event, modalId) {
  if (event.target.id !== modalId) return;
  if (modalId === "productModal") closeModal();
  if (modalId === "checkoutModal") closeCheckout();
}

function saveOrders() {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    if (orders.length) {
      localStorage.setItem(LEGACY_ORDER_STORAGE_KEY, JSON.stringify(orders[0]));
    }
    return true;
  } catch (error) {
    return false;
  }
}

function lookupOrder() {
  const code = document.getElementById("orderCode").value.trim().toLowerCase();
  const email = document.getElementById("orderEmail").value.trim().toLowerCase();
  const result = document.getElementById("orderLookupResult");
  const order = orders.find((entry) => entry.id.toLowerCase() === code
    && String(entry.email || "").trim().toLowerCase() === email);

  if (!order) {
    result.innerHTML = '<p class="order-empty">No encontramos un pedido con esos datos. Verifica el código y el correo.</p>';
    return;
  }

    const date = order.fecha
      ? new Date(order.fecha).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" })
      : "Fecha no disponible";
    const items = Array.isArray(order.detalle_pedido) ? order.detalle_pedido : [];
    const itemTotal = items.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.id);
      return sum + ((product?.price ?? Number(item.price) ?? 0) + (Number(item.extra) || 0)) * (Number(item.qty) || 1);
    }, 0);
    const itemMarkup = items.map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      const name = product?.name || item.nombre || "Producto";
      const customization = `${item.color && item.color !== "Original" ? `${item.color} · ` : ""}${item.size || ""}`;
      return `<li>${escapeHtml(name)}${customization ? ` · ${escapeHtml(customization)}` : ""} × ${Number(item.qty) || 1}</li>`;
    }).join("");
    const status = order.status === "pending" ? "Pendiente" : "Recibido";
    const paymentStatus = {
      approved: "Aprobado (simulación)",
      pending_verification: "Transferencia por verificar"
    }[order.payment_status] || "Sin información";

  result.innerHTML = `
      <article class="order-card">
        <div class="order-card-header">
          <div><b>Pedido ${escapeHtml(order.id)}</b><time>${escapeHtml(date)}</time></div>
          <span class="order-status ${order.status === "pending" ? "is-pending" : "is-received"}">${status}</span>
        </div>
        <ul class="order-items">${itemMarkup || "<li>Detalle no disponible</li>"}</ul>
        <div class="order-card-footer">
          <span>Retiro: ${escapeHtml(order.punto_retiro || "No especificado")}</span>
          <b>Total: ${money(itemTotal)}</b>
        </div>
        <p class="muted">Pago: ${paymentStatus}</p>
      </article>
    `;
}

function confirmOrder() {
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const error = document.getElementById("checkoutError");
  let n = nameField.value.trim();
  let e = emailField.value.trim();

  if (!n) {
    error.textContent = "Escribe tu nombre para continuar.";
    nameField.focus();
    return;
  }
  if (!emailField.checkValidity()) {
    error.textContent = "Escribe un correo válido, por ejemplo nombre@dominio.com.";
    emailField.focus();
    return;
  }

  const payment = validatePaymentDetails();
  if (!payment) return;

  let order = {
    id: "AM-" + Date.now().toString().slice(-6),
    usuario: n,
    email: e,
    punto_retiro: document.querySelector("[name=pickup]:checked").value,
    metodo_pago: document.querySelector("[name=payment]:checked").value,
    payment_status: payment.paymentStatus,
    ...(payment.reference ? { payment_reference: payment.reference } : {}),
    detalle_pedido: cart,
    fecha: new Date().toISOString()
  };

  orders.unshift({ ...order, status: "pending" });
  if (!saveOrders()) {
    orders.shift();
    error.textContent = "No se pudo guardar el pedido en este navegador. Libera espacio e inténtalo otra vez.";
    return;
  }

  cart = [];
  saveCart();
  closeCheckout();
  document.getElementById("orderCode").value = order.id;
  document.getElementById("orderEmail").value = order.email;
  lookupOrder();
  showStatus(payment.paymentStatus === "approved"
    ? `Pago simulado aprobado. Pedido ${order.id} guardado en este navegador.`
    : `Pedido ${order.id} guardado. La transferencia quedó pendiente de verificación.`);
}

function toggleNav() {
  const header = document.querySelector(".nav");
  const button = document.querySelector(".menu-btn");
  const isOpen = header.classList.toggle("menu-open");
  button.setAttribute("aria-expanded", String(isOpen));
  button.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
}

function closeNav() {
  document.querySelector(".nav").classList.remove("menu-open");
  const button = document.querySelector(".menu-btn");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Abrir menú");
}

document.addEventListener("keydown", (event) => {
  const modal = document.querySelector(".modal.show");
  if (event.key === "Escape") {
    if (modal?.id === "checkoutModal") closeCheckout();
    else if (modal?.id === "productModal") closeModal();
    else if (document.getElementById("cart").classList.contains("open")) closeCart();
    else closeNav();
    return;
  }

  if (event.key !== "Tab" || !modal) return;
  const focusable = [...modal.querySelectorAll("button:not([disabled]), input:not([disabled]), textarea, select, a[href]")];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

function contactWhatsApp(id) {
  let p = products.find((x) => x.id === id);
  let url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, necesito ayuda con la personalización de " + p.name + " en Amigurumiland.")}`;
  window.open(url, "_blank");
}

const contactWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, necesito ayuda con mi pedido o personalización en Amigurumiland.")}`;

const waLink = document.getElementById("waLink");
if (waLink) waLink.href = contactWhatsAppUrl;

const waLinkFooter = document.getElementById("waLinkFooter");
if (waLinkFooter) waLinkFooter.href = contactWhatsAppUrl;

const desiredDateInput = document.querySelector('input[name="Fecha deseada"]');
if (desiredDateInput) {
  const firstFutureDate = new Date();
  firstFutureDate.setDate(firstFutureDate.getDate() + 1);
  desiredDateInput.min = [
    firstFutureDate.getFullYear(),
    String(firstFutureDate.getMonth() + 1).padStart(2, "0"),
    String(firstFutureDate.getDate()).padStart(2, "0")
  ].join("-");
}

document.getElementById("name").addEventListener("input", () => {
  document.getElementById("checkoutError").textContent = "";
});
document.getElementById("email").addEventListener("input", () => {
  document.getElementById("checkoutError").textContent = "";
});
document.querySelectorAll("[name=payment]").forEach((option) => {
  option.addEventListener("change", updatePaymentFields);
});

renderProducts();
renderCart();
updatePaymentFields();
