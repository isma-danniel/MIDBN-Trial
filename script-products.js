// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".header nav ul");

if(hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// Optional: Filter buttons functionality
const filterButtons = document.querySelectorAll(".filter-bar button");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");

    productCards.forEach(card => {
      if(category === "all" || card.classList.contains(category)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});
