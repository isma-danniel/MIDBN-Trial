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

// NEW ARRIVALS horizontal drag/swipe with momentum & auto-slide
const slider = document.querySelector('.arrival-scroll');
let isDown = false;
let startX, scrollLeft;
let velocity = 0;
let lastX = 0;
let momentumID;
let pauseAutoScroll = false;
const speed = 0.3;

// Desktop drag
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  pauseAutoScroll = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  lastX = e.pageX;
  cancelMomentum();
});
slider.addEventListener('mouseleave', () => endDrag());
slider.addEventListener('mouseup', () => endDrag());
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;

  velocity = e.pageX - lastX;
  lastX = e.pageX;
});

// Mobile swipe
slider.addEventListener('touchstart', (e) => {
  isDown = true;
  pauseAutoScroll = true;
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  lastX = e.touches[0].pageX;
  cancelMomentum();
});
slider.addEventListener('touchend', () => endDrag(true));
slider.addEventListener('touchmove', (e) => {
  if(!isDown) return;
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;

  velocity = e.touches[0].pageX - lastX;
  lastX = e.touches[0].pageX;
});

// Helper functions
function endDrag(isTouch=false) {
  isDown = false;
  pauseAutoScroll = false;
  startMomentum(velocity);
}

function startMomentum(initialVelocity) {
  let v = initialVelocity;
  function momentum() {
    slider.scrollLeft -= v;
    v *= 0.95;
    if (Math.abs(v) > 0.5) {
      momentumID = requestAnimationFrame(momentum);
    }
  }
  momentumID = requestAnimationFrame(momentum);
}

function cancelMomentum() {
  if(momentumID) cancelAnimationFrame(momentumID);
}

// Smooth auto-slide when not interacting
let autoScroll = 0;
function animateSlide() {
  if (!slider) return;
  if (!pause
