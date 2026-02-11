// ✅ BOOT: hamburger always works
window.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const filters = document.getElementById("filters");
  if (hamburger && filters) {
    hamburger.addEventListener("click", () => filters.classList.toggle("active"));
  }

  // keyboard support
  hamburger?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") hamburger.click();
  });
});

// ===== PRODUCT DATA =====
const products = [
  {id:1,name:"Rolex Submariner Date",price:15800,brand:"Rolex",category:"mens",grade:"A",stock:3,label:"NEW",img:"https://picsum.photos/500/500?1",details:"Stainless steel, automatic movement, waterproof 300m"},
  {id:2,name:"G-Shock GA2100 Carbon",price:199,brand:"G-Shock",category:"mens",grade:"A",stock:7,label:"LAST STOCK",img:"https://picsum.photos/500/500?2",details:"Carbon core guard, shock resistant"},
  {id:3,name:"Michael Kors Ladies MK3203",price:299,brand:"Michael Kors",category:"womens",grade:"B",stock:4,label:"",img:"https://picsum.photos/500/500?3",details:"Gold-tone stainless steel"},
  {id:4,name:"Casio Couple Watch Set",price:499,brand:"Casio",category:"couple",grade:"A",stock:2,label:"NEW",img:"https://picsum.photos/500/500?4",details:"Matching his & hers watches"},
  {id:5,name:"Seiko Presage Cocktail",price:899,brand:"Seiko",category:"new",grade:"A",stock:5,label:"NEW",img:"https://picsum.photos/500/500?5",details:"Japanese automatic"},
  {id:6,name:"Tissot PRX Quartz",price:650,brand:"Tissot",category:"promo",grade:"B",stock:1,label:"DEFECT",img:"https://picsum.photos/500/500?6",details:"Quartz movement"}
];

// ===== DOM =====
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const brandFilter = document.getElementById("brandFilter");
const categoryFilter = document.getElementById("categoryFilter");
const gradeFilter = document.getElementById("gradeFilter");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");

const quickViewModal = document.getElementById("quickViewModal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalStock = document.getElementById("modalStock");
const modalDetails = document.getElementById("modalDetails");
const closeModal = document.getElementById("closeModal");
const modalAddCart = document.getElementById("modalAddCart");
const whatsappBtn = document.getElementById("whatsappBtn");

const goCheckoutBottom = document.getElementById("goCheckoutBottom");

// ===== CONFIG =====
const API = "https://script.google.com/macros/s/AKfycbwPTwgGLqGy75TQ8fY9E-pyKoncCVmbs6BJdzZzfgGBRXv4OKTgLbJaBJ3hB4ZfW2rd/exec";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentQuickProduct = null;

// ===== CART COUNT ON BUTTON =====
function getCartQty(){
  const cartNow = JSON.parse(localStorage.getItem("cart")) || [];
  return cartNow.reduce((sum, i) => sum + (i.qty || 0), 0);
}

function updateCheckoutButton(){
  if(!goCheckoutBottom) return;

  const qty = getCartQty();

  if(qty <= 0){
    goCheckoutBottom.classList.add("is-hidden");
    goCheckoutBottom.classList.remove("pop-in","glow","shake");
    goCheckoutBottom.textContent = "🛒 Go to Checkout";
    return;
  }

  const wasHidden = goCheckoutBottom.classList.contains("is-hidden");

  goCheckoutBottom.classList.remove("is-hidden");
  goCheckoutBottom.textContent = `🛒 Go to Checkout (${qty})`;

  if(wasHidden){
    goCheckoutBottom.classList.remove("pop-in");
    void goCheckoutBottom.offsetWidth;
    goCheckoutBottom.classList.add("pop-in");
  } else {
    goCheckoutBottom.classList.remove("glow","shake");
    void goCheckoutBottom.offsetWidth;
    goCheckoutBottom.classList.add("glow","shake");
  }
}
updateCheckoutButton();

// ===== RENDER PRODUCTS =====
function renderProducts(list){
  if(!productGrid) return;
  productGrid.innerHTML = "";

  if(list.length === 0){
    productGrid.innerHTML = "<p style='color:var(--muted);text-align:center;padding:20px;'>No products found.</p>";
    return;
  }

  list.forEach(p=>{
    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = p.id;

    // ✅ No +Add on card (only modal)
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      ${p.label ? `<div class="label">${p.label}</div>` : ""}
      <div class="card-body">
        <div class="brand">${p.brand}</div>
        <div class="name product-name">${p.name}</div>
        <div class="price">BND ${p.price}</div>
        <div class="stock">Stock: ${p.stock}</div>
        <a href="#" class="more-details-btn">More Details →</a>
      </div>
    `;

    card.querySelector("img")?.addEventListener("click", ()=>openQuickView(p));
    card.querySelector(".more-details-btn")?.addEventListener("click",(e)=>{
      e.preventDefault();
      openQuickView(p);
    });

    productGrid.appendChild(card);
  });
}

// ===== QUICK VIEW =====
function openQuickView(product){
  currentQuickProduct = product;

  modalImg && (modalImg.src = product.img);
  modalName && (modalName.textContent = product.name);
  modalPrice && (modalPrice.textContent = `BND ${product.price}`);
  modalStock && (modalStock.textContent = `Stock: ${product.stock}`);
  modalDetails && (modalDetails.textContent = product.details || "");

  if(whatsappBtn){
    whatsappBtn.href = `https://wa.me/?text=${encodeURIComponent("I'm interested in " + product.name)}`;
  }

  if(modalAddCart){
    modalAddCart.disabled = product.stock <= 0;
    modalAddCart.innerText = product.stock <= 0 ? "Out of Stock" : "+ Add to Cart";
  }

  quickViewModal && (quickViewModal.style.display = "flex");
}

// close modal
closeModal?.addEventListener("click", ()=> quickViewModal.style.display = "none");
window.addEventListener("click",(e)=>{
  if(e.target === quickViewModal) quickViewModal.style.display = "none";
});

// ===== FILTER + SORT =====
function filterSortProducts(){
  let filtered = [...products];
  const q = (searchInput?.value || "").toLowerCase().trim();

  filtered = filtered.filter(p=>{
    const searchMatch = p.name.toLowerCase().includes(q);
    const brandMatch = !brandFilter?.value || brandFilter.value === "" || p.brand === brandFilter.value;
    const categoryMatch = !categoryFilter?.value || categoryFilter.value === "" || p.category === categoryFilter.value;
    const gradeMatch = !gradeFilter?.value || gradeFilter.value === "" || p.grade === gradeFilter.value;

    const min = minPrice?.value ? parseFloat(minPrice.value) : null;
    const max = maxPrice?.value ? parseFloat(maxPrice.value) : null;

    const minMatch = min === null || p.price >= min;
    const maxMatch = max === null || p.price <= max;

    return searchMatch && brandMatch && categoryMatch && gradeMatch && minMatch && maxMatch;
  });

  if(sortSelect?.value === "az") filtered.sort((a,b)=>a.name.localeCompare(b.name));
  if(sortSelect?.value === "priceLow") filtered.sort((a,b)=>a.price-b.price);

  renderProducts(filtered);
}

// listeners
searchInput?.addEventListener("input", filterSortProducts);
sortSelect?.addEventListener("change", filterSortProducts);
brandFilter?.addEventListener("change", filterSortProducts);
categoryFilter?.addEventListener("change", filterSortProducts);
gradeFilter?.addEventListener("change", filterSortProducts);
minPrice?.addEventListener("input", filterSortProducts);
maxPrice?.addEventListener("input", filterSortProducts);

// init
renderProducts(products);

// ===== LOAD LIVE STOCK =====
fetch(API)
  .then(res=>res.json())
  .then(data=>{
    data.forEach(p=>{
      const card = document.querySelector(`[data-id="${p.id}"]`);
      if(card){
        card.querySelector(".price").innerText = `BND ${p.price}`;
        card.querySelector(".stock").innerText = `Stock: ${p.stock}`;
      }

      const local = products.find(x=>x.id==p.id);
      if(local){
        local.price = Number(p.price);
        local.stock = Number(p.stock);
      }
    });
  })
  .catch(()=>{});

// ===== ADD TO CART (stock check + fallback if API fails) =====
function addToCart(id, name, price){
  // Try API first (live stock)
  return fetch(API)
    .then(res => res.json())
    .then(data => {
      const product = data.find(p => String(p.id) === String(id));

      if(!product){
        alert("Product not found in stock sheet");
        return false;
      }

      const stock = Number(product.stock || 0);
      const livePrice = Number(product.price || price);

      if(stock <= 0){
        alert("Out of stock");
        return false;
      }

      cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(i => String(i.id) === String(id));

      if(existing){
        if(existing.qty + 1 > stock){
          alert("Not enough stock");
          return false;
        }
        existing.qty++;
      } else {
        cart.push({ id, name, price: livePrice, qty: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCheckoutButton();
      return true;
    })
    .catch(err => {
      console.error("API failed, fallback addToCart():", err);

      // ✅ Fallback (offline): still add locally
      cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(i => String(i.id) === String(id));

      if(existing){
        existing.qty++;
      } else {
        cart.push({ id, name, price, qty: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCheckoutButton();

      alert("Added to cart (offline mode). Stock check unavailable.");
      return true;
    });
}

// ===== MODAL ADD BUTTON (premium) =====
modalAddCart?.addEventListener("click", async ()=>{
  if(!currentQuickProduct) return;

  const ok = await addToCart(
    currentQuickProduct.id,
    currentQuickProduct.name,
    currentQuickProduct.price
  );
  if(!ok) return;

  modalAddCart.classList.add("added");
  modalAddCart.innerText = "✓ Added";
  modalAddCart.disabled = true;

  setTimeout(()=>{
    modalAddCart.classList.remove("added");
    modalAddCart.innerText = "+ Add to Cart";
    modalAddCart.disabled = false;
  }, 1000);
});

// ===== CHECKOUT BUTTON =====
goCheckoutBottom?.addEventListener("click", ()=>{
  const cartNow = JSON.parse(localStorage.getItem("cart")) || [];
  if(cartNow.length === 0){
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "./checkout.html";
});

// keep label updated if user returns back
window.addEventListener("focus", updateCheckoutButton);
