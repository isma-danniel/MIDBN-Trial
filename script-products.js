// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Product filtering
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const productGrid = document.getElementById('productGrid');
const filterButtons = document.querySelectorAll('.filters button');

function filterProducts() {
  const search = searchInput.value.toLowerCase();

  const categoryFilter = document.querySelector('.filter-category button.active')?.dataset.filter || 'all';
  const brandFilter = document.querySelector('.filter-brand button.active')?.dataset.filter || 'all';
  const gradeFilter = document.querySelector('.filter-grade button.active')?.dataset.filter || 'all';

  const products = Array.from(productGrid.children);
  products.forEach(card => {
    const name = card.querySelector('h3').innerText.toLowerCase();
    const category = card.dataset.category;
    const brand = card.dataset.brand;
    const grade = card.dataset.grade;

    const matchesSearch = name.includes(search);
    const matchesCategory = categoryFilter === 'all' || category === categoryFilter;
    const matchesBrand = brandFilter === 'all' || brand === brandFilter;
    const matchesGrade = gradeFilter === 'all' || grade === gradeFilter;

    if (matchesSearch && matchesCategory && matchesBrand && matchesGrade) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

searchInput.addEventListener('input', filterProducts);

// Filter button click
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.parentElement;
    parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts();
  });
});

// Sorting
sortSelect.addEventListener('change', () => {
  const products = Array.from(productGrid.children);
  let sorted = [...products];
  if (sortSelect.value === 'name') {
    sorted.sort((a,b) => a.querySelector('h3').innerText.localeCompare(b.querySelector('h3').innerText));
  } else if (sortSelect.value === 'price') {
    sorted.sort((a,b) => Number(a.dataset.price) - Number(b.dataset.price));
  }
  sorted.forEach(p => productGrid.appendChild(p));
});
