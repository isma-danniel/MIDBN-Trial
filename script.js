// HERO ANIMATION
window.addEventListener("load", () => {
  const quote = document.querySelector(".hero-quote");
  const btn = document.querySelector(".hero-btn");

  // Animate hero text
  quote.classList.add("animate");

  setTimeout(() => {
    btn.style.opacity = "1";
    btn.style.transform = "translateY(0)";
  }, 400);
});

// FAQ toggle
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});
