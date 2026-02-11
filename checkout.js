<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MIDBN | Checkout</title>

  <!-- Optional: if you want shared variables/theme -->
  <link rel="stylesheet" href="style-products.css" />

  <!-- Checkout page styling -->
  <link rel="stylesheet" href="checkout.css" />
</head>
<body>

  <!-- ===== HEADER (same concept) ===== -->
  <header class="header">
    <a href="products.html" class="logo">← Products</a>
  </header>

  <!-- ===== WATERFALL BACKGROUND ===== -->
  <div id="particleContainer"></div>

  <h2 class="checkout-title">Checkout</h2>

  <div class="checkout-container">

    <!-- CART ITEMS -->
    <div class="cart-section">
      <h3>Your Cart</h3>

      <div id="cartItems"></div>

      <div id="cartTotal" class="cart-total">BND 0.00</div>
    </div>

    <!-- CHECKOUT FORM -->
    <div class="form-section">
      <h3>Customer Details</h3>

      <form id="checkoutForm" class="checkout-form">
        <input type="text" id="name" placeholder="Full Name" required />
        <input type="text" id="phone" placeholder="Phone Number" required />
        <textarea id="address" placeholder="Delivery Address" required></textarea>

        <select id="payment" required>
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>

        <button id="placeOrderBtn" type="submit">Place Order</button>
        <p id="orderHint" class="order-hint">Stock will be deducted after order is saved.</p>
      </form>
    </div>

  </div>

  <script src="checkout.js"></script>
</body>
</html>
