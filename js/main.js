// SwiftMart front-end functionality. Cart data is saved in the browser using localStorage.
const products = [
  {id:1,name:"Wireless Headphones",category:"Accessories",price:699,description:"Comfortable headphones with clear sound for work and play.",image:"IMAGES FILES/New folder (3)/PM-08 Javascript images/Popular.jpg",tag:"Popular"},
  {id:2,name:"Smart Watch",category:"Gadgets",price:899,description:"A handy everyday watch for notifications and activity tracking.",image:"IMAGES FILES/New folder (3)/PM-08 Javascript images/Smart pick.jpg",tag:"Smart pick"},
  {id:3,name:"Portable Speaker",category:"Gadgets",price:549,description:"Take your music with you with this compact speaker.",image:"IMAGES FILES/New folder (3)/PM-08 Javascript images/Great sound.jpg",tag:"Great sound"},
  {id:4,name:"Desk Lamp",category:"Home",price:349,description:"A clean, modern lamp for your desk or bedside table.",image:"IMAGES FILES/New folder (3)/PM-08 Javascript images/Everyday.jpg",tag:"Everyday"},
  {id:5,name:"Wireless Mouse",category:"Accessories",price:249,description:"A comfortable wireless mouse for your laptop or desktop.",image:"IMAGES FILES/New folder (3)/PM-08 Javascript images/Work essential.jpg",tag:"Work essential"},
  {id:6,name:"Travel Backpack",category:"Accessories",price:599,description:"A practical backpack for daily commutes and weekend trips.",image:"IMAGES FILES/New folder (3)/PM-08 Javascript images/On the go.jpg",tag:"On the go"},
  {id:7,name:"Coffee Maker",category:"Home",price:799,description:"Make your morning routine easier with fresh coffee at home.",image:"IMAGES FILES/New folder (3)/PM-08 Javascript images/Home favourite.jpg",tag:"Home favourite"},
  {id:8,name:"Power Bank",category:"Gadgets",price:299,description:"Extra battery power for your phone when you are out and about.",image:"IMAGES FILES/New folder (3)/PM-08 Javascript images/Travel ready.jpg",tag:"Travel ready"}
];

const CART_KEY = "swiftmart-cart-v1";
const money = value => new Intl.NumberFormat("en-ZA", {style:"currency",currency:"ZAR"}).format(value);

function getCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter(item => products.some(product => product.id === Number(item.id)) && Number(item.quantity) > 0).map(item => ({id:Number(item.id),quantity:Math.floor(Number(item.quantity))})) : [];
  } catch (error) { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount() {
  const count = getCart().reduce((total,item) => total + item.quantity, 0);
  document.querySelectorAll(".cart-count").forEach(element => { element.textContent = count; });
}
function addToCart(id) {
  const cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity += 1; else cart.push({id,quantity:1});
  saveCart(cart);
  const product = products.find(item => item.id === id);
  showToast(`${product.name} added to cart`);
}
function showToast(message) {
  let toast = document.querySelector(".toast-message");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast-message";
    toast.setAttribute("role","status");
    Object.assign(toast.style,{position:"fixed",right:"20px",bottom:"20px",zIndex:"50",padding:"13px 18px",background:"#174d36",color:"#fff",borderRadius:"10px",boxShadow:"0 8px 25px #0002",fontSize:".9rem"});
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.hidden = true; }, 2400);
}
function productCard(product) {
  return `<article class="product-card">
    <div class="product-image-wrap"><img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/800x600/e8f2eb/226c4c?text=SwiftMart+Product'"><span class="product-tag">${product.tag}</span></div>
    <div class="product-info"><p class="product-category">${product.category === "Home" ? "Home essentials" : product.category}</p><h3>${product.name}</h3><p class="product-description">${product.description}</p><div class="product-bottom"><strong class="product-price">${money(product.price)}</strong><button class="add-to-cart" type="button" data-add="${product.id}">＋ Add to cart</button></div></div>
  </article>`;
}
function renderProductGrid(container, items) {
  if (!container) return;
  container.innerHTML = items.map(productCard).join("");
  container.querySelectorAll("[data-add]").forEach(button => button.addEventListener("click", () => addToCart(Number(button.dataset.add))));
}
function initProductsPage() {
  const container = document.getElementById("all-products");
  if (!container) return;
  let activeFilter = "All";
  const search = document.getElementById("product-search");
  const count = document.getElementById("product-result-count");
  const empty = document.getElementById("no-products");
  function applyFilters() {
    const query = search.value.trim().toLowerCase();
    const filtered = products.filter(product => (activeFilter === "All" || product.category === activeFilter) &&
      `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query));
    renderProductGrid(container, filtered);
    count.textContent = `${filtered.length} product${filtered.length === 1 ? "" : "s"}`;
    empty.hidden = filtered.length !== 0;
    container.hidden = filtered.length === 0;
  }
  document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach(item => item.classList.toggle("active", item === button));
    applyFilters();
  }));
  search.addEventListener("input", applyFilters);
  applyFilters();
}
function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;
  const cart = getCart();
  const empty = document.getElementById("cart-empty");
  const quantity = cart.reduce((total,item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total,item) => total + products.find(product => product.id === item.id).price * item.quantity, 0);
  document.getElementById("cart-heading-count").textContent = `(${quantity})`;
  document.getElementById("summary-quantity").textContent = quantity;
  document.getElementById("summary-subtotal").textContent = money(subtotal);
  document.getElementById("summary-total").textContent = money(subtotal);
  empty.hidden = cart.length > 0;
  container.hidden = cart.length === 0;
  container.innerHTML = cart.map(item => {
    const product = products.find(entry => entry.id === item.id);
    return `<article class="cart-item">
      <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/300x300/e8f2eb/226c4c?text=Product'">
      <div><span class="cart-category">${product.category === "Home" ? "Home essentials" : product.category}</span><h3>${product.name}</h3><p class="cart-unit-price">${money(product.price)} each</p>
      <div class="quantity-controls"><button type="button" data-change="${product.id}" data-delta="-1" aria-label="Decrease ${product.name} quantity">−</button><span>${item.quantity}</span><button type="button" data-change="${product.id}" data-delta="1" aria-label="Increase ${product.name} quantity">+</button></div></div>
      <div class="cart-item-end"><strong class="cart-item-total">${money(product.price * item.quantity)}</strong><button type="button" class="remove-item" data-remove="${product.id}">Remove</button></div>
    </article>`;
  }).join("");
  container.querySelectorAll("[data-change]").forEach(button => button.addEventListener("click", () => {
    const id = Number(button.dataset.change), delta = Number(button.dataset.delta);
    const updated = getCart().map(item => item.id === id ? {...item,quantity:item.quantity + delta} : item).filter(item => item.quantity > 0);
    saveCart(updated); renderCart();
  }));
  container.querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => {
    saveCart(getCart().filter(item => item.id !== Number(button.dataset.remove)));
    renderCart();
  }));
}
function initCheckoutForm() {
  const form = document.getElementById("checkout-form");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const error = document.getElementById("checkout-error");
    const name = document.getElementById("checkout-name").value.trim();
    const email = document.getElementById("checkout-email").value.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!getCart().length) { error.textContent = "Your cart is empty. Add a product before submitting an order."; return; }
    if (name.length < 2) { error.textContent = "Please enter your full name."; return; }
    if (!emailValid) { error.textContent = "Please enter a valid email address."; return; }
    error.textContent = "";
    const orderNumber = "SM" + Date.now().toString().slice(-6);
    alert(`Thank you, ${name}! Your demo order ${orderNumber} has been recorded on this page. No payment or real order was sent.`);
    saveCart([]);
    form.reset();
    renderCart();
  });
}
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();
    const error = document.getElementById("contact-error");
    const success = document.getElementById("contact-success");
    success.hidden = true;
    if (name.length < 2) { error.textContent = "Please enter a name with at least 2 characters."; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { error.textContent = "Please enter a valid email address."; return; }
    if (message.length < 10) { error.textContent = "Please enter a message with at least 10 characters."; return; }
    error.textContent = "";
    success.textContent = `Thanks, ${name}! Your message has passed validation. This is a demo form, so it has not been sent to a real inbox.`;
    success.hidden = false;
    form.reset();
  });
}
function initNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "✕" : "☰";
  });
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".current-year").forEach(element => element.textContent = new Date().getFullYear());
  updateCartCount();
  renderProductGrid(document.getElementById("featured-products"), products.slice(0,4));
  initProductsPage();
  renderCart();
  initCheckoutForm();
  initContactForm();
  initNavigation();
});