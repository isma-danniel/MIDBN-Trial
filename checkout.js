// ✅ checkout.js (FULL)
// - renders cart
// - validates form
// - saves order to Apps Script
// - deducts stock
// - adds waterfall particles
// - better UX (disable button, handle errors)

const API = "https://script.google.com/macros/s/AKfycbwPTwgGLqGy75TQ8fY9E-pyKoncCVmbs6BJdzZzfgGBRXv4OKTgLbJaBJ3hB4ZfW2rd/exec";

const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const form = document.getElementById("checkoutForm");
const placeOrderBtn = document.getElementById("placeOrderBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= WATERFALL PARTICLES =================
const particleContainer = document.getElementById("particleContainer");
if (particleContainer) {
  const particleCount = 35;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    const startX = Math.random() * window.innerWidth;
    const size = Math.random() * 3 + 2;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 10;

    p.style.left = startX + "px";
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.animationDuration = duration + "s";
    p.style.animationDelay = delay + "s";

    particleContainer.appendChild(p);
  }
}

// ================= RENDER CART =================
function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (!cart || cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">Your cart is empty</p>`;
    cartTotal.innerText = "BND 0.00";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const qty = Number(item.qty || 0);
    const price = Number(item.price || 0);
    const line = price * qty;

    total += line;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>Qty: ${qty}</small>
        </div>
        <div>BND ${line.toFixed(2)}</div>
      </div>
    `;
  });

  cartTotal.innerText = "BND " + total.toFixed(2);
}

renderCart();

// ================= HELPERS =================
function setSubmitting(isSubmitting) {
  if (!placeOrderBtn) return;
  placeOrderBtn.disabled = isSubmitting;
  placeOrderBtn.innerText = isSubmitting ? "Placing Order..." : "Place Order";
}

async function postJSON(url, payload) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify(payload)
  });
  return await res.json();
}

// ================= SUBMIT ORDER =================
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;

  if (!name || !phone || !address || !payment) {
    alert("Please complete all fields.");
    return;
  }

  const total = cartTotal.innerText;

  try {
    setSubmitting(true);

    // 1) Save order
    const orderRes = await postJSON(API, {
      type: "order",
      cart,
      total,
      customer: { name, phone, address, payment }
    });

    if (orderRes.status !== "success") {
      setSubmitting(false);
      alert("Failed to place order, try again!");
      return;
    }

    // 2) Deduct stock (best-effort)
    try {
      await postJSON(API, { type: "stock", cart });
    } catch (_) {
      // still okay if stock update fails temporarily
    }

    alert(`Order placed successfully!\nOrder ID: ${orderRes.orderId}`);

    localStorage.removeItem("cart");
    window.location.href = "products.html";

  } catch (err) {
    console.error(err);
    alert("Network error. Please try again.");
  } finally {
    setSubmitting(false);
  }
});
