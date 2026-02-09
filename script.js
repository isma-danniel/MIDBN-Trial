// ------------------------
// HERO ANIMATION
// ------------------------
window.addEventListener("load", () => {
  const quote = document.querySelector(".hero-quote");
  const btn = document.querySelector(".hero-btn");

  const lines = quote.innerHTML.split('<br>');
  quote.innerHTML = '';

  lines.forEach((lineText, index) => {
    const line = document.createElement('div');
    line.textContent = lineText.toUpperCase();
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
// FAQ TOGGLE
// ------------------------
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});

// ------------------------
// NEW ARRIVALS HORIZONTAL SCROLL
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
  const x = e.pageX - slider.offsetLeft;
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
  const x = e.touches[0].pageX - slider.offsetLeft;
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
    if (Math.abs(v) > 0.5) {
      momentumID = requestAnimationFrame(momentum);
    }
  }
  momentumID = requestAnimationFrame(momentum);
}

function cancelMomentum() {
  if(momentumID) cancelAnimationFrame(momentumID);
}

let autoScroll = 0;
function animateSlide() {
  if (!slider) return;
  if (!pauseAutoScroll && !isDown) {
    autoScroll += speed;
    slider.scrollLeft += (autoScroll - slider.scrollLeft) * 0.05;
    if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
      slider.scrollLeft = 0;
      autoScroll = 0;
    }
  }
  requestAnimationFrame(animateSlide);
}
requestAnimationFrame(animateSlide);

// ------------------------
// HEADER ACTIVE LINK ON SCROLL
// ------------------------
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".header nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ------------------------
// SMOOTH SCROLL ON HEADER LINK CLICK
// ------------------------
navLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const headerOffset = 70;
      const sectionPosition = targetSection.offsetTop - headerOffset;
      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth"
      });
    }
  });
});

// ------------------------
// HAMBURGER MENU TOGGLE
// ------------------------
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.header nav');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (document.body.classList.contains('nav-open')) {
      document.body.classList.remove('nav-open');
    }
  });
});
