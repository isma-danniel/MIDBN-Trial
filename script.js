
// Reveal animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
});

document.querySelectorAll('.fade').forEach(el => observer.observe(el));

// Product Database
const products = [
  {
    id: 1,
    name: "MIDBN Heritage",
    price: "$499",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
  },
  {
    id: 2,
    name: "MIDBN Classic",
    price: "$459",
    img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1"
  },
  {
    id: 3,
    name: "MIDBN Royal",
    price: "$599",
    img: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3"
  }
];

// Load product detail
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if(id){
  const product = products.find(p => p.id == id);
  if(product){
    document.getElementById("p-img").src = product.img;
    document.getElementById("p-name").innerText = product.name;
    document.getElementById("p-price").innerText = product.price;
  }
}

const products = [
  {id:1, name:"Heritage", price:"$499", img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30"},
  {id:2, name:"Classic", price:"$459", img:"https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1"},
  {id:3, name:"Royal", price:"$599", img:"https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3"},
  {id:4, name:"Elegance", price:"$529", img:"https://images.unsplash.com/photo-1598970434795-26d7a4cc7519"}
];

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if(id){
  const product = products.find(p => p.id == id);
  if(product){
    document.getElementById("p-img").src = product.img;
    document.getElementById("p-name").innerText = product.name;
    document.getElementById("p-price").innerText = product.price;
  }
}

// ==========================
// SCROLL REVEAL
// ==========================
const scrollElements = document.querySelectorAll('.fade, .product-card, .product-hero-grid, .editorial, .collection-hero');

const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight - offset);
};

const displayScrollElement = (el) => {
  el.classList.add('show');
};

const hideScrollElement = (el) => {
  el.classList.remove('show');
};

const handleScrollAnimation = () => {
  scrollElements.forEach(el => {
    if(elementInView(el, 100)){
      displayScrollElement(el);
    } else {
      hideScrollElement(el);
    }
  });
};

window.addEventListener('scroll', () => {
  handleScrollAnimation();
});
