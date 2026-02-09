// Hamburger toggle
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".header nav ul");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

// Product filtering and sorting
const productsGrid = document.getElementById("products-grid");
const productCards = Array.from(productsGrid.getElementsByClassName("product-card"));

const searchInput = document.getElementById("search");
const filterBrand = document.getElementById("filter-brand");
const filterCategory = document.getElementById("filter-category");
const filterGrade = document.getElementById("filter-grade");
const sortButtons = document.querySelectorAll(".sort-btn");

function filterProducts() {
  const search = searchInput.value.toLowerCase();
  const brand = filterBrand.value;
  const category = filterCategory.value;
  const grade = filterGrade.value;

  productCards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const cBrand = card.dataset.brand;
    const cCategory = card.dataset.category;
    const cGrade = card.dataset.grade;

    const matchesSearch = name.includes(search);
    const matchesBrand = brand === "all" || cBrand === brand;
    const matchesCategory = category === "all" || cCategory === category;
    const matchesGrade = grade === "all" || cGrade === grade;

    if(matchesSearch && matchesBrand && matchesCategory && matchesGrade){
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Event listeners
searchInput.addEventListener("input", filterProducts);
filterBrand.addEventListener("change", filterProducts);
filterCategory.addEventListener("change", filterProducts);
filterGrade.addEventListener("change", filterProducts);

// Sorting
sortButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    sortButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const sortType = btn.dataset.sort;
    const sorted = productCards.sort((a,b)=>{
      if(sortType==="az") return a.dataset.name.localeCompare(b.dataset.name);
      if(sortType==="price") return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
      return 0;
    });
    sorted.forEach(card => productsGrid.appendChild(card));
  });
});
