const cartItemsContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <small>Qty: ${item.qty}</small>
        </div>
        <div>BND ${item.price * item.qty}</div>
      </div>
    `;
  });

  cartTotal.innerText = "BND " + total.toFixed(2);
}

renderCart();

document.getElementById("checkoutForm").addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const payment = document.getElementById("payment").value;

  let message = `🛒 *MIDBN ORDER*\n\n`;
  cart.forEach(item => {
    message += `• ${item.name} (x${item.qty}) - BND ${item.price * item.qty}\n`;
  });

  message += `\n*Total:* ${cartTotal.innerText}`;
  message += `\n\n*Customer:* ${name}`;
  message += `\n*Phone:* ${phone}`;
  message += `\n*Address:* ${address}`;
  message += `\n*Payment:* ${payment}`;

  const whatsapp = `https://wa.me/673XXXXXXXX?text=${encodeURIComponent(message)}`;
  window.open(whatsapp, "_blank");

  localStorage.removeItem("cart");
});
