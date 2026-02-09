// HERO TEXT ANIMATION
window.addEventListener("load", () => {
  document.querySelector(".hero-quote").style.opacity = "1";
  document.querySelector(".hero-quote").style.transform = "translateY(0)";

  setTimeout(() => {
    document.querySelector(".hero-btn").style.opacity = "1";
    document.querySelector(".hero-btn").style.transform = "translateY(0)";
  }, 400);
});

// FAQ TOGGLE
document.querySelectorAll(".faq-question").forEach(question => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});
