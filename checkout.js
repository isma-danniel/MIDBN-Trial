const API = "https://script.google.com/home/projects/1WZ7biSO_A7f0gyGr3oST38qIvmGXbfj3JhJ3MbGDfcjS_XZ_UNp90g-Y/edit"; // replace with your Apps Script URL

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

/* Checkout form submit */
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

  const total = cartTotal.innerText;

  /* 1️⃣ Save order */
  fetch(API, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      type: "order",
      cart,
      total,
      customer: { name, phone, address, payment }
    })
  }).then(res=>res.json())
    .then(orderRes=>{
      if(orderRes.status === "success"){
        /* 2️⃣ Deduct stock */
        fetch(API, {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({ type:"stock", cart })
        });

        alert(`Order placed successfully!\nOrder ID: ${orderRes.orderId}`);
        localStorage.removeItem("cart");
        window.location.reload();
      } else {
        alert("Failed to place order, try again!");
      }
    });
});
