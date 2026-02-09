// HERO ANIMATION SEQUENTIAL
window.addEventListener("load", () => {
  const quote = document.querySelector(".hero-quote");
  const btn = document.querySelector(".hero-btn");

  const lines = quote.innerHTML.split('<br>');
  quote.innerHTML = '';

  lines.forEach((lineText, index) => {
    const line = document.createElement('div');
    line.textContent = lineText;
    line.style.opacity = '0';
    line.style.transform = 'translateY(20px)';
    line.style.transition = 'all 0.8s ease';
    quote.appendChild(line);

    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 400 * (index + 1));
  });

  setTimeout(() => {
    btn.style.opacity = '1';
    btn.style.transform = 'translateY(0)';
  }, 400 * (lines.length + 1));
});

// FAQ toggle
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});

// ARRIVALS horizontal drag
const slider = document.querySelector('.arrival-scroll');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});
