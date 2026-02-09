// Hamburger toggle
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".header nav ul");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

// Brands and categories
const brands = ["Rolex","Omega","Casio","Cartier","Patek Philippe","G-Shock","Swarovski","Franck Muller","Audemars Piguet","Seiko","Michael Kors"];
const categories = ["Mens","Womens","Couple","New Collection","Defect/Promo"];

// Add filter buttons
const brandFilters = document.getElementById("brandFilters");
brands.forEach(b => {
  const btn = document.createElement("button");
  btn.classList.add("filter-btn");
  btn.textContent = b;
  btn.dataset.brand = b;
  brandFilters.appendChild(btn);
});

const categoryFilters = document.getElementById("categoryFilters");
categories.forEach(c => {
  const btn = document.createElement("button");
  btn.classList.add("filter-btn");
  btn.textContent = c;
  btn.dataset.category = c;
  categoryFilters.appendChild(btn);
});

// Sample product array
const products = [
  {name:"Rolex Watch",brand:"Rolex",category:"Mens",price:2500,stock:5,badge:"New Arrival",img:"images/products/sample1.png"},
  {name:"Omega Watch",brand:"Omega",category:"Womens",price:1800,stock:3,badge:"Last Stock",img:"images/products/sample2.png"},
  {name:"Casio Watch",brand:"Casio",category:"New Collection",price:150,stock:10,badge:"New Arrival",img:"images/products/sample3.png"},
  {name:"Cartier Watch",brand:"Cartier",category:"Defect/Promo",price:3000,stock:0,badge:"Defect",img:"images/products/sample4.png"},
  {name:"Seiko Watch",brand:"Seiko",category:"Couple",price:500,stock:2,badge:"New Arrival",img:"images/products/sample5.png"},
];

// Render products
const productGrid = document.getElementById("productGrid");

function renderProducts(filtered = products) {
  productGrid.innerHTML = "";
  filtered.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <div class="product-badge">${p.badge}</div>
      <img src="${p.img}" alt="${p.name}">
      <div class="product-name">${p.name}</div>
      <div class="product-price">$${p.price}</div>
      <div class="product-stock">Stock: ${p.stock}</div>
    `;
    productGrid.appendChild(card);
  });
}

renderProducts();

// Filtering logic
let activeBrands = [];
let activeCategories = [];

document.querySelectorAll("#brandFilters .filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const b = btn.dataset.brand;
    activeBrands.includes(b) ? activeBrands.splice(activeBrands.indexOf(b),1) : activeBrands.push(b);
    applyFilters();
  });
});

document.querySelectorAll("#categoryFilters .filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const c = btn.dataset.category;
    activeCategories.includes(c) ? activeCategories.splice(activeCategories.indexOf(c),1) : activeCategories.push(c);
    applyFilters();
  });
});

function applyFilters() {
  let filtered = products.filter(p => {
    const brandMatch = activeBrands.length ? activeBrands.includes(p.brand) : true;
    const categoryMatch = activeCategories.length ? activeCategories.includes(p.category) : true;
    return brandMatch && categoryMatch;
  });
  renderProducts(filtered);
}

// Sort buttons
document.querySelectorAll(".sort-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const sortType = btn.dataset.sort;
    let sorted = [...products];
    if(sortType === "az") sorted.sort((a,b)=>a.name.localeCompare(b.name));
    if(sortType === "price") sorted.sort((a,b)=>a.price-b.price);
    renderProducts(sorted);
  });
});

// Search box
document.getElementById("searchBox").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  renderProducts(filtered);
});
