// ===== PRODUCT DATA =====
const products = [
  {id:1,name:"Rolex Submariner Date",price:15800,brand:"Rolex",category:"mens",grade:"A",stock:3,label:"NEW",img:"https://picsum.photos/500/500?1", details:"Stainless steel, automatic movement, waterproof 300m"},
  {id:2,name:"G-Shock GA2100 Carbon",price:199,brand:"G-Shock",category:"mens",grade:"A",stock:7,label:"LAST STOCK",img:"https://picsum.photos/500/500?2", details:"Carbon core guard, shock resistant, 200m water resistant"},
  {id:3,name:"Michael Kors Ladies MK3203",price:299,brand:"Michael Kors",category:"womens",grade:"B",stock:4,label:"",img:"https://picsum.photos/500/500?3", details:"Gold-tone stainless steel, quartz, elegant design"},
  {id:4,name:"Casio Couple Watch Set",price:499,brand:"Casio",category:"couple",grade:"A",stock:2,label:"NEW",img:"https://picsum.photos/500/500?4", details:"Matching his & hers watches, durable, water resistant"},
  {id:5,name:"Seiko Presage Cocktail",price:899,brand:"Seiko",category:"new",grade:"A",stock:5,label:"NEW",img:"https://picsum.photos/500/500?5", details:"Japanese automatic, cocktail-inspired dial, 50m water resistant"},
  {id:6,name:"Tissot PRX Quartz",price:650,brand:"Tissot",category:"promo",grade:"B",stock:1,label:"DEFECT",img:"https://picsum.photos/500/500?6", details:"Quartz movement, stainless steel, retro design"}
];

// ===== DOM ELEMENTS =====
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const brandFilter = document.getElementById("brandFilter");
const categoryFilter = document.getElementById("categoryFilter");
const gradeFilter = document.getElementById("gradeFilter");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const hamburger = document.getElementById("hamburger");
const filters = document.getElementById("filters");
const loadingSpinner = document.getElementById("loadingSpinner");

const quickViewModal = document.getElementById("quickViewModal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalStock = document.getElementById("modalStock");
const modalDetails = document.getElementById("modalDetails");
const closeModal = document.getElementById("closeModal");

// ===== FLOATING MINI-CART ELEMENTS =====
const miniCart = document.getElementById("miniCart");
const miniCartItems = document.getElementById("miniCartItems");
const miniCartTotal = document.querySelector(".mini-cart-total");
const floatingCartCount = document.getElementById("floatingCartCount");
const floatingGoCheckout = document.getElementById("floatingGoCheckout");
const floatingToggle = document.getElementById("floatingToggle");

const API = "https://script.google.com/macros/s/AKfycbwPTwgGLqGy75TQ8fY9E-pyKoncCVmbs6BJdzZzfgGBRXv4OKTgLbJaBJ3hB4ZfW2rd/exec";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== HAMBURGER TOGGLE =====
hamburger.onclick = () => {
  filters.classList.toggle("active");
  const items = filters.querySelectorAll("input, select, .filter-row");
  items.forEach((item,i)=>{
    item.style.opacity = 0;
    setTimeout(()=> item.style.opacity = 1, 50 + i*40);
  });
};

// ===== RENDER PRODUCTS =====
function renderProducts(list){
  productGrid.innerHTML = "";
  if(list.length === 0){
    productGrid.innerHTML = "<p style='color:var(--muted);text-align:center;padding:20px;'>No products found.</p>";
    return;
  }
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card show";
    card.dataset.id = p.id;
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      ${p.label ? `<div class="label">${p.label}</div>` : ""}
      <div class="card-body">
        <div class="brand">Brand: ${p.brand}</div>
        <div class="name product-name">${p.name}</div>
        <div class="price">BND ${p.price}</div>
        <div class="stock">Stock: ${p.stock}</div>
        <div class="card-buttons">
          <button class="buy-btn add-to-cart">+ Add to Cart</button>
          <button class="buy-btn go-checkout">🛒 Go to Checkout</button>
        </div>
        <a href="#" class="more-details-btn">More Details →</a>
      </div>
    `;

    // Quick view click
    const moreBtn = card.querySelector(".more-details-btn");
    moreBtn.onclick = (e)=>{
      e.preventDefault();
      openQuickView(p);
    };
    card.querySelector("img").onclick = ()=>openQuickView(p);

    productGrid.appendChild(card);
  });
}

// ===== QUICK VIEW MODAL =====
function openQuickView(product){
  modalImg.src = product.img;
  modalName.textContent = product.name;
  modalPrice.textContent = `BND ${product.price}`;
  modalStock.textContent = `Stock: ${product.stock}`;
  modalDetails.textContent = product.details || "No details available";
  quickViewModal.style.display = "flex";
}
closeModal.onclick = () => quickViewModal.style.display = "none";
window.onclick = e => {if(e.target === quickViewModal) quickViewModal.style.display = "none";};

// ===== FILTER & SORT =====
function filterSortProducts(){
  let filtered = products.filter(p => {
    const searchMatch = p.name.toLowerCase().includes(searchInput.value.toLowerCase());
    const brandMatch = brandFilter.value === "" || p.brand === brandFilter.value;
    const categoryMatch = categoryFilter.value === "" || p.category === categoryFilter.value;
    const gradeMatch = gradeFilter.value === "" || p.grade === gradeFilter.value;
    const minMatch = minPrice.value === "" || p.price >= parseFloat(minPrice.value);
    const maxMatch = maxPrice.value === "" || p.price <= parseFloat(maxPrice.value);
    return searchMatch && brandMatch && categoryMatch && gradeMatch && minMatch && maxMatch;
  });

  // Sorting
  if(sortSelect.value === "az") filtered.sort((a,b)=> a.name.localeCompare(b.name));
  if(sortSelect.value === "priceLow") filtered.sort((a,b)=> a.price - b.price);

  renderProducts(filtered);
}

// ===== EVENT LISTENERS =====
searchInput.addEventListener("input", filterSortProducts);
sortSelect.addEventListener("change", filterSortProducts);
brandFilter.addEventListener("change", filterSortProducts);
categoryFilter.addEventListener("change", filterSortProducts);
gradeFilter.addEventListener("change", filterSortProducts);
minPrice.addEventListener("input", filterSortProducts);
maxPrice.addEventListener("input", filterSortProducts);

// ===== INITIAL RENDER =====
renderProducts(products);

// ===== LOAD LIVE STOCK FROM SHEET =====
fetch(API)
  .then(res => res.json())
  .then(productsData => {
    productsData.forEach(p => {
      const card = document.querySelector(`[data-id="${p.id}"]`);
      if(!card) return;
      card.querySelector(".price").innerText = `BND ${p.price}`;
      card.querySelector(".stock").innerText = `Stock: ${p.stock}`;
      const btn = card.querySelector(".add-to-cart");
      if(p.stock <= 0) {
        btn.disabled = true;
        btn.innerText = "Out of Stock";
      }
    });
    updateFloatingCart();
  });

// ===== ADD TO CART =====
function addToCart(id, name, price) {
  fetch(API)
    .then(res => res.json())
    .then(productsData => {
      const product = productsData.find(p => p.id == id);
      if(!product || product.stock <= 0){
        alert("Out of stock");
        return;
      }

      const existing = cart.find(i => i.id == id);
      if(existing){
        if(existing.qty + 1 > product.stock){
          alert("Not enough stock");
          return;
        }
        existing.qty++;
      } else {
        cart.push({ id, name, price, qty:1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateFloatingCart();
      alert("Added to cart");
    });
}

// ===== FLOATING MINI-CART FUNCTIONALITY =====

// Toggle mini cart
floatingToggle.addEventListener("click", ()=>{
  miniCart.style.display = miniCart.style.display === "flex" ? "none" : "flex";
});

// Render mini cart
function renderMiniCart(){
  miniCartItems.innerHTML = "";
  let total = 0;
  if(cart.length === 0){
    miniCartItems.innerHTML = `<p style="opacity:.6;text-align:center;">Cart is empty</p>`;
    miniCartTotal.innerText = "Total: BND 0";
    return;
  }
  cart.forEach(item => {
    total += item.price * item.qty;
    miniCartItems.innerHTML += `
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
        <span>${item.name} x${item.qty}</span>
        <span>BND ${(item.price*item.qty).toFixed(2)}</span>
      </div>
    `;
  });
  miniCartTotal.innerText = `Total: BND ${total.toFixed(2)}`;
}

// Update cart count badge
function updateFloatingCart(){
  const totalQty = cart.reduce((sum,i)=>sum+i.qty,0);
  if(floatingCartCount) floatingCartCount.innerText = totalQty;
  renderMiniCart();
}

// Go to checkout from mini cart
floatingGoCheckout.addEventListener("click", ()=>{
  if(cart.length === 0){
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "checkout.html";
});

// Initial update
updateFloatingCart();

// ===== EVENT DELEGATION FOR PRODUCT CARD BUTTONS =====
document.addEventListener("click", function(e){
  const card = e.target.closest(".product-card");
  if(!card) return;

  const id = card.dataset.id;
  const name = card.querySelector(".product-name").innerText;
  const price = parseFloat(card.querySelector(".price").innerText.replace("BND","").trim());

  if(e.target.classList.contains("add-to-cart")){
    addToCart(id,name,price);
    updateFloatingCart();
  }

  if(e.target.classList.contains("go-checkout")){
    if(cart.length === 0){
      alert("Your cart is empty!");
      return;
    }
    window.location.href = "checkout.html";
  }
});
