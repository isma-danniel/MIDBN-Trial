const hamburger = document.getElementById("hamburger");
const filterPanel = document.getElementById("filterPanel");
hamburger.onclick = () => filterPanel.classList.toggle("active");

const productGrid = document.getElementById("productGrid");

const products = [
  {
    name:"Rolex Submariner",
    price:15800,
    brand:"Rolex",
    category:"mens",
    grade:"A",
    stock:3,
    label:"NEW",
    img:"https://picsum.photos/500/500?1"
  },
  {
    name:"G-Shock GA2100",
    price:199,
    brand:"G-Shock",
    category:"mens",
    grade:"A",
    stock:7,
    label:"LAST STOCK",
    img:"https://picsum.photos/500/500?2"
  },
  {
    name:"Michael Kors Ladies",
    price:299,
    brand:"Michael Kors",
    category:"womens",
    grade:"B",
    stock:4,
    label:"",
    img:"https://picsum.photos/500/500?3"
  },
  {
    name:"Couple Watch Set",
    price:499,
    brand:"Casio",
    category:"couple",
    grade:"A",
    stock:2,
    label:"NEW",
    img:"https://picsum.photos/500/500?4"
  }
];

function renderProducts(list){
  productGrid.innerHTML = "";
  list.forEach(p=>{
    productGrid.innerHTML += `
      <div class="product-card">
        ${p.label ? `<div class="label">${p.label}</div>`:""}
        <img src="${p.img}">
        <div class="card-body">
          <div class="name">${p.name}</div>
          <div class="price">$${p.price}</div>
          <div class="stock">Stock: ${p.stock}</div>
        </div>
      </div>
    `;
  });
}

renderProducts(products);

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const brandFilter = document.getElementById("brandFilter");
const categoryFilter = document.getElementById("categoryFilter");
const gradeFilter = document.getElementById("gradeFilter");

function filterProducts(){
  let list = [...products];

  if(searchInput.value){
    list = list.filter(p=>p.name.toLowerCase().includes(searchInput.value.toLowerCase()));
  }

  if(brandFilter.value){
    list = list.filter(p=>p.brand === brandFilter.value);
  }

  if(categoryFilter.value){
    list = list.filter(p=>p.category === categoryFilter.value);
  }

  if(gradeFilter.value){
    list = list.filter(p=>p.grade === gradeFilter.value);
  }

  if(sortSelect.value === "az"){
    list.sort((a,b)=>a.name.localeCompare(b.name));
  }

  if(sortSelect.value === "priceLow"){
    list.sort((a,b)=>a.price - b.price);
  }

  renderProducts(list);
}

searchInput.oninput = filterProducts;
sortSelect.onchange = filterProducts;
brandFilter.onchange = filterProducts;
categoryFilter.onchange = filterProducts;
gradeFilter.onchange = filterProducts;
