// ==========================================
// PRODUCT DATA
// ==========================================

const products = [
  {id:1,name:"Rolex Submariner Date",price:15800,brand:"Rolex",category:"mens",grade:"A",stock:3,label:"NEW",img:"https://picsum.photos/500/500?1",details:"Stainless steel, automatic movement, waterproof 300m"},
  {id:2,name:"G-Shock GA2100 Carbon",price:199,brand:"G-Shock",category:"mens",grade:"A",stock:7,label:"LAST STOCK",img:"https://picsum.photos/500/500?2",details:"Carbon core guard, shock resistant"},
  {id:3,name:"Michael Kors Ladies MK3203",price:299,brand:"Michael Kors",category:"womens",grade:"B",stock:4,label:"",img:"https://picsum.photos/500/500?3",details:"Gold-tone stainless steel"},
  {id:4,name:"Casio Couple Watch Set",price:499,brand:"Casio",category:"couple",grade:"A",stock:2,label:"NEW",img:"https://picsum.photos/500/500?4",details:"Matching his & hers watches"},
  {id:5,name:"Seiko Presage Cocktail",price:899,brand:"Seiko",category:"new",grade:"A",stock:5,label:"NEW",img:"https://picsum.photos/500/500?5",details:"Japanese automatic"},
  {id:6,name:"Tissot PRX Quartz",price:650,brand:"Tissot",category:"promo",grade:"B",stock:1,label:"DEFECT",img:"https://picsum.photos/500/500?6",details:"Quartz movement"}
];

// ==========================================
// DOM ELEMENTS
// ==========================================

const productGrid = document.getElementById("productGrid");
const quickViewModal = document.getElementById("quickViewModal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalStock = document.getElementById("modalStock");
const modalDetails = document.getElementById("modalDetails");
const closeModal = document.getElementById("closeModal");
const modalAddCart = document.getElementById("modalAddCart");
const goCheckoutBottom = document.getElementById("goCheckoutBottom");
const hamburger = document.getElementById("hamburger");
const filters = document.getElementById("filters");

if(hamburger && filters){
  hamburger.addEventListener("click", ()=>{
    filters.classList.toggle("active");
  });
}

const API = "https://script.google.com/macros/s/AKfycbwPTwgGLqGy75TQ8fY9E-pyKoncCVmbs6BJdzZzfgGBRXv4OKTgLbJaBJ3hB4ZfW2rd/exec";

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentQuickProduct = null;


// ==========================================
// RENDER PRODUCTS
// ==========================================

function renderProducts(list){

  productGrid.innerHTML = "";

  list.forEach(p => {

    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = p.id;

    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      ${p.label ? `<div class="label">${p.label}</div>` : ""}

      <!-- FLOATING ADD BUTTON -->
      <button class="img-addcart" data-id="${p.id}" type="button">+ Add</button>

      <div class="card-body">
        <div class="brand">${p.brand}</div>
        <div class="name product-name">${p.name}</div>
        <div class="price">BND ${p.price}</div>
        <div class="stock">Stock: ${p.stock}</div>
        <a href="#" class="more-details-btn">More Details →</a>
      </div>
    `;

    // Quick view events
    card.querySelector("img").onclick = () => openQuickView(p);
    card.querySelector(".more-details-btn").onclick = (e)=>{
      e.preventDefault();
      openQuickView(p);
    };

    productGrid.appendChild(card);
  });
}

renderProducts(products);


// ==========================================
// QUICK VIEW MODAL
// ==========================================

function openQuickView(product){

  currentQuickProduct = product;

  modalImg.src = product.img;
  modalName.textContent = product.name;
  modalPrice.textContent = `BND ${product.price}`;
  modalStock.textContent = `Stock: ${product.stock}`;
  modalDetails.textContent = product.details;

  if(modalAddCart){
    modalAddCart.disabled = product.stock <= 0;
    modalAddCart.innerText = product.stock <= 0 ? "Out of Stock" : "+ Add to Cart";
  }

  quickViewModal.style.display = "flex";
}

closeModal.onclick = ()=> quickViewModal.style.display = "none";
window.onclick = (e)=>{
  if(e.target === quickViewModal){
    quickViewModal.style.display = "none";
  }
};


// ==========================================
// LOAD LIVE STOCK FROM GOOGLE SHEET
// ==========================================

fetch(API)
.then(res => res.json())
.then(data => {

  data.forEach(p => {

    const card = document.querySelector(`[data-id="${p.id}"]`);
    if(!card) return;

    card.querySelector(".price").innerText = `BND ${p.price}`;
    card.querySelector(".stock").innerText = `Stock: ${p.stock}`;

    const addBtn = card.querySelector(".img-addcart");
    if(addBtn && p.stock <= 0){
      addBtn.disabled = true;
      addBtn.innerText = "Out";
    }

  });

});


// ==========================================
// ADD TO CART FUNCTION
// ==========================================

function addToCart(id, name, price){

  fetch(API)
  .then(res => res.json())
  .then(data => {

    const product = data.find(p => p.id == id);

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
      cart.push({ id, name, price, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

  });
}


// ==========================================
// FLOATING IMAGE ADD BUTTON CLICK
// ==========================================

document.addEventListener("click", function(e){

  const btn = e.target.closest(".img-addcart");
  if(!btn) return;

  const card = btn.closest(".product-card");

  const id = btn.dataset.id;
  const name = card.querySelector(".product-name").innerText;
  const price = parseFloat(card.querySelector(".price").innerText.replace("BND","").trim());

  addToCart(id, name, price);

});


// ==========================================
// MODAL ADD BUTTON (PREMIUM EFFECT)
// ==========================================

if(modalAddCart){

  modalAddCart.addEventListener("click", ()=>{

    if(!currentQuickProduct) return;

    addToCart(
      currentQuickProduct.id,
      currentQuickProduct.name,
      currentQuickProduct.price
    );

    modalAddCart.classList.add("added");
    modalAddCart.innerText = "✓ Added";
    modalAddCart.disabled = true;

    setTimeout(()=>{
      modalAddCart.classList.remove("added");
      modalAddCart.innerText = "+ Add to Cart";
      modalAddCart.disabled = false;
    }, 1000);

  });

}


// ==========================================
// GLOBAL BOTTOM CHECKOUT BUTTON
// ==========================================

if(goCheckoutBottom){

  goCheckoutBottom.addEventListener("click", ()=>{

    const cartNow = JSON.parse(localStorage.getItem("cart")) || [];

    if(cartNow.length === 0){
      alert("Your cart is empty!");
      return;
    }

    window.location.href = "checkout.html";

  });

}
