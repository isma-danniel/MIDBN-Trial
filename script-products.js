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
const whatsappBtn = document.getElementById("whatsappBtn");
const closeModal = document.getElementById("closeModal");
const modalDetails = document.getElementById("modalDetails");

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
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      ${p.label ? `<div class="label">${p.label}</div>` : ""}
      <div class="card-body">
        <div class="brand">Brand: ${p.brand}</div>
        <div class="name">${p.name}</div>
        <div class="price">$${p.price}</div>
        <div class="stock">Stock: ${p.stock}</div>
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
  modalPrice.textContent = `$${product.price}`;
  modalStock.textContent = `Stock: ${product.stock}`;
  modalDetails.textContent = product.details || "No details available";

  whatsappBtn.href = `https://wa.me/?text=I'm interested in ${encodeURIComponent(product.name)}`;
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

// ===== PARTICLES =====
const particleContainer = document.getElementById("particleContainer");
const particleCount = 35;
for(let i=0;i<particleCount;i++){
  const p = document.createElement("div");
  p.className = "particle";
  const startX = Math.random() * window.innerWidth;
  const xMove = (Math.random() * 40 - 20) + "px";
  const size = Math.random() * 3 + 2 + "px";
  const delay = Math.random() * 10 + "s";
  const duration = Math.random() * 12 + 8 + "s";
  p.style.left = startX + "px";
  p.style.width = p.style.height = size;
  p.style.setProperty("--xMove", xMove);
  p.style.animationDuration = duration;
  p.style.animationDelay = delay;
  particleContainer.appendChild(p);
}

// ===== PARALLAX =====
window.addEventListener('scroll', ()=>{
  const scrollTop = window.scrollY;
  particleContainer.style.transform = `translateY(${scrollTop * 0.2}px)`;
});

const API = "https://script.google.com/macros/s/AKfycbwPTwgGLqGy75TQ8fY9E-pyKoncCVmbs6BJdzZzfgGBRXv4OKTgLbJaBJ3hB4ZfW2rd/exec"; // replace with your Apps Script URL

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Load live products and stock */
fetch(API)
  .then(res => res.json())
  .then(products => {
    products.forEach(p => {
      const card = document.querySelector(`[data-id="${p.id}"]`);
      if(!card) return;

      card.querySelector(".price").innerText = `BND ${p.price}`;
      card.querySelector(".stock").innerText = `Stock: ${p.stock}`;

      if(p.stock <= 0){
        const btn = card.querySelector(".buy-btn");
        btn.disabled = true;
        btn.innerText = "Out of Stock";
      }
    });
  });

/* Add product to cart with stock check */
function addToCart(id, name, price) {
  fetch(API)
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id == id);
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
      alert("Added to cart");
    });
}
