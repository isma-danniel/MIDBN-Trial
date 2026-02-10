// ===== PRODUCT DATA =====
const products = [
  {id:1,name:"Rolex Submariner Date",price:15800,brand:"Rolex",category:"mens",grade:"A",stock:3,label:"NEW",img:"https://picsum.photos/500/500?1"},
  {id:2,name:"G-Shock GA2100 Carbon",price:199,brand:"G-Shock",category:"mens",grade:"A",stock:7,label:"LAST STOCK",img:"https://picsum.photos/500/500?2"},
  {id:3,name:"Michael Kors Ladies MK3203",price:299,brand:"Michael Kors",category:"womens",grade:"B",stock:4,label:"",img:"https://picsum.photos/500/500?3"},
  {id:4,name:"Casio Couple Watch Set",price:499,brand:"Casio",category:"couple",grade:"A",stock:2,label:"NEW",img:"https://picsum.photos/500/500?4"},
  {id:5,name:"Seiko Presage Cocktail",price:899,brand:"Seiko",category:"new",grade:"A",stock:5,label:"NEW",img:"https://picsum.photos/500/500?5"},
  {id:6,name:"Tissot PRX Quartz",price:650,brand:"Tissot",category:"promo",grade:"B",stock:1,label:"DEFECT",img:"https://picsum.photos/500/500?6"}
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

// ===== HAMBURGER TOGGLE =====
hamburger.onclick = () => {
  filters.classList.toggle("active");
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
        <div class="name">${p.name}</div>
        <div class="price">$${p.price}</div>
        <div class="stock">Stock: ${p.stock}</div>
        <a href="https://wa.me/6738908960?text=${encodeURIComponent("I'm interested in " + p.name)}" 
           target="_blank" class="whatsapp-btn">Buy via WhatsApp</a>
      </div>
    `;

    card.querySelector("img").onclick = () => openQuickView(p);
    productGrid.appendChild(card);
  });
}

// ===== QUICK VIEW MODAL =====
function openQuickView(product){
  modalImg.src = product.img;
  modalName.textContent = product.name;
  modalPrice.textContent = `$${product.price}`;
  modalStock.textContent = `Stock: ${product.stock}`;
  whatsappBtn.href = `https://wa.me/6738908960?text=${encodeURIComponent("I'm interested in " + product.name)}`;
  quickViewModal.style.display = "flex";
}

closeModal.onclick = () => quickViewModal.style.display = "none";
window.onclick = e => { if(e.target === quickViewModal) quickViewModal.style.display = "none"; };

// ===== FILTER & SORT =====
function filterSortProducts(){
  let filtered = products.filter(p => {
    const searchMatch = p.name.toLowerCase().includes(searchInput.value.toLowerCase());
    const brandMatch = !brandFilter.value || p.brand === brandFilter.value;
    const categoryMatch = !categoryFilter.value || p.category === categoryFilter.value;
    const gradeMatch = !gradeFilter.value || p.grade === gradeFilter.value;
    const minMatch = !minPrice.value || p.price >= parseFloat(minPrice.value);
    const maxMatch = !maxPrice.value || p.price <= parseFloat(maxPrice.value);

    return searchMatch && brandMatch && categoryMatch && gradeMatch && minMatch && maxMatch;
  });

  // Sorting
  if(sortSelect.value === "az"){
    filtered.sort((a,b)=> a.name.localeCompare(b.name));
  }
  else if(sortSelect.value === "priceLow"){
    filtered.sort((a,b)=> a.price - b.price);
  }
  else{
    filtered.sort((a,b)=> a.id - b.id); // normal order fix
  }

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
  p.style.left = Math.random() * window.innerWidth + "px";
  p.style.width = p.style.height = (Math.random()*3+2) + "px";
  p.style.setProperty("--xMove",(Math.random()*40-20)+"px");
  p.style.animationDuration = (Math.random()*12+8)+"s";
  p.style.animationDelay = (Math.random()*10)+"s";
  particleContainer.appendChild(p);
}

// ===== PARALLAX =====
window.addEventListener('scroll', ()=>{
  particleContainer.style.transform = `translateY(${window.scrollY * 0.2}px)`;
});
