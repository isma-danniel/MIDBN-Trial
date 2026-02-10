document.addEventListener("DOMContentLoaded", () => {
  // 1. DATABASE
  const products = [
    {id:1,name:"Rolex Submariner Date",price:15800,brand:"Rolex",category:"mens",grade:"A",stock:3,label:"NEW",img:"https://picsum.photos/500/500?random=1"},
    {id:2,name:"G-Shock GA2100 Carbon",price:199,brand:"G-Shock",category:"mens",grade:"A",stock:7,label:"LAST STOCK",img:"https://picsum.photos/500/500?random=2"},
    {id:3,name:"Michael Kors Ladies MK3203",price:299,brand:"Michael Kors",category:"womens",grade:"B",stock:4,label:"",img:"https://picsum.photos/500/500?random=3"},
    {id:4,name:"Casio Couple Watch Set",price:499,brand:"Casio",category:"couple",grade:"A",stock:2,label:"NEW",img:"https://picsum.photos/500/500?random=4"},
    {id:5,name:"Seiko Presage Cocktail",price:899,brand:"Seiko",category:"new",grade:"A",stock:5,label:"NEW",img:"https://picsum.photos/500/500?random=5"},
    {id:6,name:"Tissot PRX Quartz",price:650,brand:"Tissot",category:"promo",grade:"B",stock:1,label:"DEFECT",img:"https://picsum.photos/500/500?random=6"}
  ];

  // 2. DOM ELEMENTS
  const productGrid = document.getElementById("productGrid");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const brandFilter = document.getElementById("brandFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const gradeFilter = document.getElementById("gradeFilter");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");
  const hamburger = document.getElementById("hamburger");
  const filters = document.getElementById("filters");
  const loadingSpinner = document.getElementById("loadingSpinner");
  
  // Modal Elements
  const quickViewModal = document.getElementById("quickViewModal");
  const modalImg = document.getElementById("modalImg");
  const modalName = document.getElementById("modalName");
  const modalPrice = document.getElementById("modalPrice");
  const modalStock = document.getElementById("modalStock");
  const whatsappBtn = document.getElementById("whatsappBtn");
  const closeModal = document.getElementById("closeModal");

  // 3. RENDER FUNCTION (This was missing!)
  function renderProducts(items) {
    productGrid.innerHTML = ""; // Clear current grid logic
    
    if (items.length === 0) {
      productGrid.innerHTML = "<p style='color:white; text-align:center; width:100%;'>No products found.</p>";
      return;
    }

    items.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      
      // Determine label HTML
      let labelHTML = "";
      if (product.label) {
        labelHTML = `<span class="badge badge-${product.label === "NEW" ? "new" : "sale"}">${product.label}</span>`;
      }

      card.innerHTML = `
        <div class="image-wrapper">
          ${labelHTML}
          <img src="${product.img}" alt="${product.name}" loading="lazy">
        </div>
        <div class="info">
          <h3>${product.name}</h3>
          <div class="price">$${product.price.toLocaleString()}</div>
          <div class="meta">
            <span>Grade: ${product.grade}</span>
            <span>Stock: ${product.stock}</span>
          </div>
          <button class="view-btn" data-id="${product.id}">View Details</button>
        </div>
      `;
      productGrid.appendChild(card);
    });

    // Re-attach click listeners for buttons
    document.querySelectorAll(".view-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        openModal(id);
      });
    });
  }

  // 4. FILTER LOGIC
  function filterAndSortProducts() {
    let filtered = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchInput.value.toLowerCase());
      const matchesBrand = brandFilter.value === "" || p.brand === brandFilter.value;
      const matchesCategory = categoryFilter.value === "" || p.category === categoryFilter.value;
      const matchesGrade = gradeFilter.value === "" || p.grade === gradeFilter.value;
      const matchesMinPrice = !minPrice.value || p.price >= parseInt(minPrice.value);
      const matchesMaxPrice = !maxPrice.value || p.price <= parseInt(maxPrice.value);

      return matchesSearch && matchesBrand && matchesCategory && matchesGrade && matchesMinPrice && matchesMaxPrice;
    });

    // Sorting
    const sortValue = sortSelect.value;
    if (sortValue === "priceLow") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "az") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderProducts(filtered);
  }

  // 5. EVENT LISTENERS
  searchInput.addEventListener("input", filterAndSortProducts);
  sortSelect.addEventListener("change", filterAndSortProducts);
  brandFilter.addEventListener("change", filterAndSortProducts);
  categoryFilter.addEventListener("change", filterAndSortProducts);
  gradeFilter.addEventListener("change", filterAndSortProducts);
  minPrice.addEventListener("input", filterAndSortProducts);
  maxPrice.addEventListener("input", filterAndSortProducts);

  // Hamburger Toggle
  if(hamburger){
    hamburger.onclick = () => {
      filters.classList.toggle("active");
    };
  }

  // 6. MODAL LOGIC
  function openModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    modalImg.src = product.img;
    modalName.textContent = product.name;
    modalPrice.textContent = `$${product.price}`;
    modalStock.textContent = `Stock Available: ${product.stock}`;
    
    // WhatsApp Link Generator
    const message = `Hi, I am interested in ${product.name} (Price: $${product.price})`;
    whatsappBtn.href = `https://wa.me/628123456789?text=${encodeURIComponent(message)}`;
    
    quickViewModal.style.display = "flex";
  }

  if(closeModal) {
    closeModal.onclick = () => {
      quickViewModal.style.display = "none";
    };
  }

  window.onclick = (event) => {
    if (event.target === quickViewModal) {
      quickViewModal.style.display = "none";
    }
  };

  // 7. PARTICLE SYSTEM
  const particleContainer = document.getElementById("particleContainer");
  if(particleContainer) {
    const particleCount = 35;
    for(let i=0;i<particleCount;i++){
      const p = document.createElement("div");
      p.className = "particle";
      const startX = Math.random() * window.innerWidth;
      const size = Math.random()*3 + 2 + "px";
      const delay = Math.random()*10 + "s";
      const duration = Math.random()*12 + 8 + "s";
      
      p.style.left = startX + "px";
      p.style.width = size;
      p.style.height = size;
      p.style.animationDuration = duration;
      p.style.animationDelay = delay;
      particleContainer.appendChild(p);
    }
  }

  // 8. INITIAL LOAD
  // Hide loading spinner and render
  if(loadingSpinner) loadingSpinner.style.display = "none";
  renderProducts(products); 
});
