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

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;

  let message = `🛒 *MIDBN ORDER*\n\n`;

  cart.forEach(item => {
    message += `• ${item.name} (x${item.qty}) - BND ${(item.price * item.qty).toFixed(2)}\n`;
  });

  message += `\n*Total:* ${cartTotal.innerText}`;
  message += `\n\n*Customer:* ${name}`;
  message += `\n*Phone:* ${phone}`;
  message += `\n*Address:* ${address}`;
  message += `\n*Payment:* ${payment}`;

  const whatsappNumber = "673XXXXXXXX"; // replace with your real WhatsApp number
  const whatsapp = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsapp, "_blank");

  localStorage.removeItem("cart");
});
