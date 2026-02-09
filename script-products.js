/* ---------------------------------
   Script Products | MIDBN Timepieces
--------------------------------- */

// Hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Product filter
const productGrid = document.querySelector(".product-grid");
const filterButtons = document.querySelectorAll(".filter-bar button");
const searchInput = document.getElementById("productSearch");
const sortSelect = document.getElementById("sortStock");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");
    const brand = btn.getAttribute("data-brand");
    const grade = btn.getAttribute("data-grade");

    filterProducts(category, brand, grade);
  });
});

searchInput.addEventListener("keyup", () => {
  filterProducts();
});

sortSelect.addEventListener("change", () => {
  sortProducts();
});

function filterProducts(category = "all", brand = "all", grade = "all") {
  const searchText = searchInput.value.toLowerCase();
  const products = document.querySelectorAll(".product-card");

  products.forEach(prod => {
    const prodCategory = prod.getAttribute("data-category");
    const prodBrand = prod.getAttribute("data-brand");
    const prodGrade = prod.getAttribute("data-grade");
    const title = prod.querySelector("h3").innerText.toLowerCase();

    let isVisible = true;

    if(category !== "all" && prodCategory.toLowerCase() !== category.toLowerCase()) isVisible = false;
    if(brand !== "all" && prodBrand.toLowerCase() !== brand.toLowerCase()) isVisible = false;
    if(grade !== "all" && prodGrade.toLowerCase() !== grade.toLowerCase()) isVisible = false;
    if(title.indexOf(searchText) === -1) isVisible = false;

    prod.style.display = isVisible ? "flex" : "none";
  });
}

function sortProducts() {
  const products = Array.from(document.querySelectorAll(".product-card"));
  const sortValue = sortSelect.value;

  products.sort((a,b) => {
    if(sortValue === "az") return a.querySelector("h3").innerText.localeCompare(b.querySelector("h3").innerText);
    if(sortValue === "price-low") return parseFloat(a.querySelector("p:nth-of-type(2)").innerText.replace(/[^0-9\.]+/g,"")) - 
                                        parseFloat(b.querySelector("p:nth-of-type(2)").innerText.replace(/[^0-9\.]+/g,""));
    return 0;
  });

  products.forEach(p => productGrid.appendChild(p));
}

// WhatsApp button
const whatsappButtons = document.querySelectorAll(".whatsapp-product");
whatsappButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const productName = btn.getAttribute("data-product");
    const phone = "6738908960";
    window.open(`https://wa.me/${phone}?text=Hi, I'm interested in the product: ${encodeURIComponent(productName)}`, "_blank");
  });
});

// Stock counter
document.querySelectorAll(".product-card").forEach(card => {
  const stock = parseInt(card.querySelector(".stock").dataset.stock);
  const stockElem = card.querySelector(".stock");
  if(stock === 0) {
    stockElem.innerText = "Out of Stock";
    card.querySelector(".buy-btn").style.pointerEvents = "none";
    card.querySelector(".buy-btn").style.opacity = "0.6";
  } else {
    stockElem.innerText = `${stock} in stock`;
  }

  // Add label for last stock
  if(stock === 1) {
    const badge = document.createElement("span");
    badge.classList.add("badge", "last-stock");
    badge.innerText = "Last Stock!";
    card.appendChild(badge);
  }
});
