const products = [
  {id:1,name:"Rolex Submariner Date",price:15800,brand:"Rolex",category:"mens",grade:"A",stock:3,label:"NEW",img:"https://picsum.photos/500/500?1"},
  {id:2,name:"G-Shock GA2100 Carbon",price:199,brand:"G-Shock",category:"mens",grade:"A",stock:7,label:"LAST STOCK",img:"https://picsum.photos/500/500?2"},
  {id:3,name:"Michael Kors Ladies MK3203",price:299,brand:"Michael Kors",category:"womens",grade:"B",stock:4,label:"",img:"https://picsum.photos/500/500?3"},
  {id:4,name:"Casio Couple Watch Set",price:499,brand:"Casio",category:"couple",grade:"A",stock:2,label:"NEW",img:"https://picsum.photos/500/500?4"},
  {id:5,name:"Seiko Presage Cocktail",price:899,brand:"Seiko",category:"new",grade:"A",stock:5,label:"NEW",img:"https://picsum.photos/500/500?5"},
  {id:6,name:"Tissot PRX Quartz",price:650,brand:"Tissot",category:"promo",grade:"B",stock:1,label:"DEFECT",img:"https://picsum.photos/500/500?6"}
];

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

// Hamburger toggle + fade-in
hamburger.onclick = () => {
  filters.classList.toggle("active");
  const items = filters.querySelectorAll("input, select");
  items.forEach((item,i)=>{item.style.opacity=0;setTimeout(()=>item.style.opacity=1,50+i*40);});
};

// ===== INFINITE SCROLL VARIABLES =====
let itemsPerLoad = 4;
let currentIndex = 0;
let filteredProducts = [...products];

// ===== LOAD MORE PRODUCTS =====
function loadMoreProducts(){
  if(currentIndex >= filteredProducts.length) return;
  loadingSpinner.style.display = "block";

  setTimeout(()=>{
    const nextItems = filteredProducts.slice(currentIndex,currentIndex+itemsPerLoad);
    nextItems.forEach((p,i)=>{
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        ${p.label ? `<div class="label">${p.label}</div>` : ""}
        <img src="${p.img}" alt="${p.name}">
        <div class="card-body">
          <div class="name">${p.name}</div>
          <div class="price">$${p.price}</div>
          <div class="stock">Stock: ${p.stock}</div>
          <a href="https://wa.me/?text=Hi,%20I%20want%20to%20buy%20${encodeURIComponent(p.name)}" target="_blank" class="whatsapp-btn">📱 WhatsApp</a>
        </div>
      `;
      productGrid.appendChild(card);
      setTimeout(()=>card.classList.add("show"),50+i*60);

      // Quick View
      const img = card.querySelector("img");
      img.onclick = ()=>{
        modalImg.src=p.img;
        modalName.textContent=p.name;
        modalPrice.textContent="$"+p.price;
        modalStock.textContent="Stock: "+p.stock;
        whatsappBtn.href=`https://wa.me/?text=Hi,%20I want%20to%20buy%20${encodeURIComponent(p.name)}`;
        quickViewModal.style.display="flex";
      };
    });
    currentIndex += itemsPerLoad;
    loadingSpinner.style.display = "none";
  },350);
}

// Close modal
closeModal.onclick = ()=> quickViewModal.style.display="none";
quickViewModal.onclick = e=>{if(e.target===quickViewModal) quickViewModal.style.display="none";};

// ===== APPLY FILTERS & SORT =====
function applyFilters(){
  let list = [...products];
  const searchVal = searchInput?.value.toLowerCase() || "";
  const sortVal = sortSelect?.value || "";
  const brandVal = brandFilter?.value || "";
  const categoryVal = categoryFilter?.value || "";
  const gradeVal = gradeFilter?.value || "";
  const minVal = Number(minPrice?.value) || 0;
  const maxVal = Number(maxPrice?.value) || Infinity;

  if(searchVal) list = list.filter(p=>p.name.toLowerCase().includes(searchVal));
  if(brandVal) list = list.filter(p=>p.brand===brandVal);
  if(categoryVal) list = list.filter(p=>p.category===categoryVal);
  if(gradeVal) list = list.filter(p=>p.grade===gradeVal);
  list = list.filter(p=>p.price>=minVal && p.price<=maxVal);

  const labelPriority={"NEW":1,"LAST STOCK":2,"DEFECT":3,"":4};
  list.sort((a,b)=>{
    if(labelPriority[a.label]!==labelPriority[b.label]) return labelPriority[a.label]-labelPriority[b.label];
    if(a.stock!==b.stock) return a.stock-b.stock;
    return a.name.localeCompare(b.name);
  });

  if(sortVal==="az") list.sort((a,b)=>a.name.localeCompare(b.name));
  if(sortVal==="priceLow") list.sort((a,b)=>a.price-b.price);

  filteredProducts = list;
  currentIndex = 0;
  productGrid.innerHTML = "";
  loadMoreProducts();
}

// Event listeners
[searchInput,sortSelect,brandFilter,categoryFilter,gradeFilter,minPrice,maxPrice].forEach(el=>{
  el?.addEventListener("input",applyFilters);
  el?.addEventListener("change",applyFilters);
});

// Infinite
