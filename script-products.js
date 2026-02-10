// ==============================
// MIDBN PRODUCT CATALOG SYSTEM
// ==============================

// --------------------
// Product Database
// --------------------

const products = [
  {
    id:1,
    name:"Rolex Submariner Date",
    price:15800,
    brand:"Rolex",
    category:"mens",
    grade:"A",
    stock:3,
    label:"NEW",
    img:"https://picsum.photos/500/500?1"
  },
  {
    id:2,
    name:"G-Shock GA2100 Carbon",
    price:199,
    brand:"G-Shock",
    category:"mens",
    grade:"A",
    stock:7,
    label:"LAST STOCK",
    img:"https://picsum.photos/500/500?2"
  },
  {
    id:3,
    name:"Michael Kors Ladies MK3203",
    price:299,
    brand:"Michael Kors",
    category:"womens",
    grade:"B",
    stock:4,
    label:"",
    img:"https://picsum.photos/500/500?3"
  },
  {
    id:4,
    name:"Casio Couple Watch Set",
    price:499,
    brand:"Casio",
    category:"couple",
    grade:"A",
    stock:2,
    label:"NEW",
    img:"https://picsum.photos/500/500?4"
  },
  {
    id:5,
    name:"Seiko Presage Cocktail",
    price:899,
    brand:"Seiko",
    category:"new",
    grade:"A",
    stock:5,
    label:"NEW",
    img:"https://picsum.photos/500/500?5"
  },
  {
    id:6,
    name:"Tissot PRX Quartz",
    price:650,
    brand:"Tissot",
    category:"promo",
    grade:"B",
    stock:1,
    label:"DEFECT",
    img:"https://picsum.photos/500/500?6"
  }
];

// --------------------
// DOM Elements
// --------------------

const productGrid   = document.getElementById("productGrid");
const searchInput   = document.getElementById("searchInput");
const sortSelect    = document.getElementById("sortSelect");
const brandFilter   = document.getElementById("brandFilter");
const categoryFilter= document.getElementById("categoryFilter");
const gradeFilter   = document.getElementById("gradeFilter");
const hamburger     = document.getElementById("hamburger");
const filters       = document.getElementById("filters");

// --------------------
// Hamburger Toggle
// --------------------

if(hamburger && filters){
  hamburger.onclick = () => filters.classList.toggle("active");
}

// --------------------
// Render Products
// --------------------

function renderProducts(list){
  if(!productGrid) return;

  productGrid.innerHTML = "";

  if(list.length === 0){
    productGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:#777;padding:40px">No products found</div>`;
    return;
  }

  list.forEach(p=>{
    productGrid.innerHTML += `
      <a href="product.html?id=${p.id}" class="product-card">
        ${p.label ? `<div class="label">${p.label}</div>` : ""}
        <img src="${p.img}" alt="${p.name}">
        <div class="card-body">
          <div class="name">${p.name}</div>
          <div class="price">$${p.price}</div>
          <div class="stock">Stock: ${p.stock}</div>
        </div>
      </a>
    `;
  });
}

// --------------------
// Filter Logic
// --------------------

function applyFilters(){
  let list = [...products];

  const searchVal   = searchInput?.value.toLowerCase() || "";
  const sortVal     = sortSelect?.value || "";
  const brandVal    = brandFilter?.value || "";
  const categoryVal = categoryFilter?.value || "";
  const gradeVal    = gradeFilter?.value || "";

  if(searchVal){
    list = list.filter(p => p.name.toLowerCase().includes(searchVal));
  }

  if(brandVal){
    list = list.filter(p => p.brand === brandVal);
  }

  if(categoryVal){
    list = list.filter(p => p.category === categoryVal);
  }

  if(gradeVal){
    list = list.filter(p => p.grade === gradeVal);
  }

  if(sortVal === "az"){
    list.sort((a,b) => a.name.localeCompare(b.name));
  }

  if(sortVal === "priceLow"){
    list.sort((a,b) => a.price - b.price);
  }

  renderProducts(list);
}

// --------------------
// Event Listeners
// --------------------

searchInput?.addEventListener("input", applyFilters);
sortSelect?.addEventListener("change", applyFilters);
brandFilter?.addEventListener("change", applyFilters);
categoryFilter?.addEventListener("change", applyFilters);
gradeFilter?.addEventListener("change", applyFilters);

// --------------------
// Initial Render
// --------------------

renderProducts(products);
