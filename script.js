// ------------------------
// HERO ANIMATION SEQUENTIAL
// ------------------------
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

// ------------------------
// FAQ toggle
// ------------------------
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});

// ------------------------
// NEW ARRIVALS horizontal drag/swipe with momentum
// ------------------------
const slider = document.querySelector('.arrival-scroll');
let isDown = false;
let startX, scrollLeft;
let velocity = 0;
let lastX = 0;
let momentumID;
let pauseAutoScroll = false;
const speed = 0.3;

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
  const x = e.pageX - startX;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
  velocity = e.pageX - lastX;
  lastX = e.pageX;
});

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
  const x = e.touches[0].pageX - startX;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
  velocity = e.touches[0].pageX - lastX;
  lastX = e.touches[0].pageX;
});

function endDrag() {
  isDown = false;
  pauseAutoScroll = false;
  startMomentum(velocity);
}

function startMomentum(initialVelocity) {
  let v = initialVelocity;
  function momentum() {
    slider.scrollLeft -= v;
    v *= 0.95;
    if(Math.abs(v) > 0.5) momentumID = requestAnimationFrame(momentum);
  }
  momentumID = requestAnimationFrame(momentum);
}

function cancelMomentum() {
  if(momentumID) cancelAnimationFrame(momentumID);
}

let autoScroll = 0;
function animateSlide() {
  if(!slider) return;
  if(!pauseAutoScroll && !isDown) {
    autoScroll += speed;
    slider.scrollLeft += (autoScroll - slider.scrollLeft) * 0.05;
    if(slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
      slider.scrollLeft = 0;
      autoScroll = 0;
    }
  }
  requestAnimationFrame(animateSlide);
}
requestAnimationFrame(animateSlide);

// ------------------------
// HAMBURGER MENU LOGIC
// ------------------------
const hamburger = document.createElement('div');
hamburger.classList.add('hamburger');
hamburger.innerHTML = '<span></span><span></span><span></span>';
document.querySelector('.header').appendChild(hamburger);

const mobileMenu = document.createElement('div');
mobileMenu.classList.add('mobile-menu');
document.querySelectorAll('.header nav ul li a').forEach(a => {
  const link = a.cloneNode(true);
  mobileMenu.appendChild(link);
});
document.body.appendChild(mobileMenu);

const overlay = document.createElement('div');
overlay.classList.add('menu-overlay');
document.body.appendChild(overlay);

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('show');
  overlay.classList.toggle('show');
});

overlay.addEventListener('click', () => {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('show');
  overlay.classList.remove('show');
});
