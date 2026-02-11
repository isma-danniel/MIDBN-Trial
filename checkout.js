const API = "https://script.google.com/macros/s/AKfycbw5ATYF07THSscuWqnF-rYA_iyIjKLQc6JTNPQgpAi8RAiAEShbff5hgbiy7rS-XR8h/exec";

const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if(cart.length === 0){
    cartItemsContainer.innerHTML = `<p style="opacity:.6;text-align:center">Your cart is empty</p>`;
    cartTotal.innerText = "BND 0";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>Qty: ${item.qty}</small>
        </div>
        <div>BND ${(item.price * item.qty).toFixed(2)}</div>
      </div>
    `;
  });

  cartTotal.innerText = "BND " + total.toFixed(2);
}

renderCart();

document.getElementById("checkoutForm").addEventListener("submit", function(e){
  e.preventDefault();

  if(cart.length === 0){
    alert("Your cart is empty!");
    return;
  }

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const address = addressInput.value.trim();
  const payment = paymentSelect.value;

  const total = cartTotal.innerText;

  /* 1️⃣ SAVE ORDER */
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "order",
      cart,
      total,
      customer: { name, phone, address, payment }
    })
  });

  /* 2️⃣ DEDUCT STOCK */
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "stock",
      cart
    })
  });

  /* 3️⃣ SEND WHATSAPP */
  let message = `🛒 *MIDBN ORDER*\n\n`;

  cart.forEach(item => {
    message += `• ${item.name} (x${item.qty}) - BND ${(item.price * item.qty).toFixed(2)}\n`;
  });

  message += `\n*Total:* ${total}`;
  message += `\n\n*Customer:* ${name}`;
  message += `\n*Phone:* ${phone}`;
  message += `\n*Address:* ${address}`;
  message += `\n*Payment:* ${payment}`;

  const whatsapp = `https://wa.me/6737306993?text=${encodeURIComponent(message)}`;
  window.open(whatsapp, "_blank");

  localStorage.removeItem("cart");
});
