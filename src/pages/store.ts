import { getDataForModal } from "../helpers/htmlHelper";

function store(): void {
  loadCartFromLocalStorage();

  const purchaseButton = document.getElementById(
    "btn-purchase"
  ) as HTMLButtonElement;
  purchaseButton.addEventListener("click", purchaseClicked);

  getDataForModal();
}
store();

function loadCartFromLocalStorage(): void {
  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartContainer = document.getElementById("cart-items") as HTMLElement;
  cartContainer.innerHTML = "";

  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");

    const cartRowContents = `
      <div class="cart-item">
        <img class="cart-item-image" src="${item.image}" width="100" height="100">
        <div class="cart-item-details">
          <span class="cart-item-title">${item.title}</span>
          <span class="cart-price" id="cart-price">${item.price}</span>
          <div class="cart-size">
            <label for="size">Size:</label>
            <select id="size">
              <option>S</option>
              <option>M</option>
              <option selected>L</option>
              <option>XL</option>
              <option>XXL</option>
              <option>XXXL</option>
              <option>XXXXL</option>
              <option>XXXXXL</option>
              <option>XXXXXXL</option>
            </select>
          </div>
          <div class="cart-quantity">
            <label for="quantity">Quantity:</label>
            <button class="quantity-btn decrement" type="button">-</button>
            <input id="quantity" class="cart-quantity-input" type="number" value="1" min="1">
            <button class="quantity-btn increment" type="button">+</button>
          </div>
        </div>
        <button class="btn btn-danger" id="btn-danger" type="button">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;

    cartRow.innerHTML = cartRowContents;
    cartContainer.appendChild(cartRow);

    const removeButton = cartRow.getElementsByClassName(
      "btn-danger"
    )[0] as HTMLButtonElement;
    removeButton.addEventListener("click", () => removeCartItem(i));

    const quantityInput = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0] as HTMLInputElement;
    quantityInput.addEventListener("change", quantityChanged);

    const incrementButton = cartRow.getElementsByClassName(
      "increment"
    )[0] as HTMLButtonElement;
    const decrementButton = cartRow.getElementsByClassName(
      "decrement"
    )[0] as HTMLButtonElement;

    // Inputfields are strings by default, + Converts string to number, toString() converts number back to string
    incrementButton.addEventListener("click", () => {
      const currentValue = +quantityInput.value;
      quantityInput.value = (currentValue + 1).toString();
      updateCartTotal();
    });

    // Add "?" to ensure the value doesn't go below 1
    decrementButton.addEventListener("click", () => {
      const currentValue = +quantityInput.value;
      quantityInput.value = (
        currentValue > 1 ? currentValue - 1 : currentValue
      ).toString();
      updateCartTotal();
    });
  }

  updateCartTotal();
}

function purchaseClicked(event: Event): void {
  event.preventDefault();
  const name = document.getElementById("name") as HTMLInputElement;
  const address = document.getElementById("address") as HTMLInputElement;
  const cardNumber = document.getElementById("card-number") as HTMLInputElement;
  const expiry = document.getElementById("expiry") as HTMLInputElement;
  const cvv = document.getElementById("cvv") as HTMLInputElement;

  if (checkFormFields(name, address, cardNumber, expiry, cvv)) {
    const cartItems = document.getElementById("cart-items") as HTMLElement;
    cartItems.textContent = "";
    localStorage.removeItem("cart");
    updateCartTotal();

    const thankYouMessage = document.getElementById(
      "thank-you-message"
    ) as HTMLElement;
    thankYouMessage.style.display = "block";
    setTimeout(() => {
      thankYouMessage.style.display = "none";
    }, 5000);
  }
}
function checkFormFields(
  name: HTMLInputElement,
  address: HTMLInputElement,
  cardNumber: HTMLInputElement,
  expiry: HTMLInputElement,
  cvv: HTMLInputElement
): boolean {
  if (!name.value) {
    alert("Please fill in your name.");
    return false;
  }
  if (!address.value) {
    alert("Please fill in your address.");
    return false;
  }
  if (!cardNumber.value) {
    alert("Please fill in your card number.");
    return false;
  }
  if (!expiry.value) {
    alert("Please fill in the expiry date.");
    return false;
  }
  if (!cvv.value) {
    alert("Please fill in the CVV.");
    return false;
  }

  return true;
}

function removeCartItem(index: number): void {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCartFromLocalStorage();
  updateCartTotal();
}

function quantityChanged(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.value === "" || Number(input.value) <= 0) {
    input.value = "1";
  }

  updateCartTotal();
}

function updateCartTotal(): void {
  const cartItemContainer = document.getElementById(
    "cart-items"
  ) as HTMLElement;
  const cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;

  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i] as HTMLElement;
    const priceElement = cartRow.getElementsByClassName(
      "cart-price"
    )[0] as HTMLElement;
    const quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0] as HTMLInputElement;

    // Get the price/quantity as a number
    const price = +priceElement.innerText.replace("$", "");
    const quantity = +quantityElement.value;

    total += price * quantity;
  }

  // Round the total to 2 decimal, toFixed(2) returns a string, + operator to convert the result of toFixed(2) back to a number.
  total = +total.toFixed(2);

  const totalPriceElement = document.getElementById(
    "cart-total-price"
  ) as HTMLElement;
  totalPriceElement.innerText = `$${total}`;
}
