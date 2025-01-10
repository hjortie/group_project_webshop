function store(): void {
  // Load cart items from localStorage on page load
  loadCartFromLocalStorage();

  const removeCartItemButtons = document.getElementsByClassName('btn-danger');
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    const button = removeCartItemButtons[i] as HTMLButtonElement;

    // Use an anonymous function to pass the index to removeCartItem
    button.addEventListener('click', () => {
      removeCartItem(i); // Pass the index of the current button
    });
  }

  const quantityInputs = document.getElementsByClassName('cart-quantity-input');
  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i] as HTMLInputElement;
    input.addEventListener('change', quantityChanged);
  }

  const purchaseButton = document.getElementsByClassName('btn-purchase')[0] as HTMLButtonElement;
  purchaseButton.addEventListener('click', purchaseClicked);
}
store();

function loadCartFromLocalStorage(): void {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartContainer = document.getElementsByClassName('cart-items')[0] as HTMLElement;
  cartContainer.innerHTML = ''; // Clear existing cart items

  cartItems.forEach((item: { image: string; title: string; price: number }, index: number) => { // Added index parameter
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');

    const cartRowContents = `
      <div class="cart-item">
        <img class="cart-item-image" src="${item.image}" width="100" height="100">
        <div class="cart-item-details">
          <span class="cart-item-title">${item.title}</span>
          <span class="cart-price">$${item.price}</span>
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

    // Initialize event listeners for remove button, pass index to removeCartItem
    const removeButton = cartRow.getElementsByClassName('btn-danger')[0] as HTMLButtonElement;
    removeButton.addEventListener('click', () => removeCartItem(index)); // Pass the index here

    // Initialize event listeners for quantity input
    const quantityInput = cartRow.getElementsByClassName('cart-quantity-input')[0] as HTMLInputElement;
    quantityInput.addEventListener('change', quantityChanged);

    // Initialize event listeners for increment and decrement buttons
    const incrementButton = cartRow.getElementsByClassName('increment')[0] as HTMLButtonElement;
    const decrementButton = cartRow.getElementsByClassName('decrement')[0] as HTMLButtonElement;

    incrementButton.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value, 10);
      quantityInput.value = (currentValue + 1).toString();

      // Update the total after increment
      updateCartTotal();
    });

    decrementButton.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value, 10);
      if (currentValue > 1) {
        quantityInput.value = (currentValue - 1).toString();

        // Update the total after decrement
        updateCartTotal();
      }
    });
  });

  // Update the total price
  updateCartTotal();
}

function purchaseClicked(): void {
  const cartItems = document.getElementById('cart-items') as HTMLElement;

  cartItems.textContent = '';

  localStorage.removeItem('cart');

  updateCartTotal();

  const thankYouMessage = document.getElementById('thank-you-message') as HTMLElement;
  thankYouMessage.style.display = 'block'; 
  setTimeout(() => {
    thankYouMessage.style.display = 'none';
  }, 5000);
}

function removeCartItem(index: number): void {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');

  cart.splice(index, 1);

  localStorage.setItem('cart', JSON.stringify(cart));

  loadCartFromLocalStorage();
  updateCartTotal();
}

function quantityChanged(event: Event): void {
  const input = event.target as HTMLInputElement;
  
  if (input.value === '' || Number(input.value) <= 0) {
    input.value = '1';
  }
  
  updateCartTotal();
}

function updateCartTotal(): void {
  const cartItemContainer = document.getElementsByClassName('cart-items')[0] as HTMLElement;
  const cartRows = cartItemContainer.getElementsByClassName('cart-row');
  let total = 0;

  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i] as HTMLElement;
    const priceElement = cartRow.getElementsByClassName('cart-price')[0] as HTMLElement;
    const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0] as HTMLInputElement;

    const price = parseFloat(priceElement.innerText.replace('$', ''));
    const quantity = Number(quantityElement.value);
    total += price * quantity;
  }

  total = Math.round(total * 100) / 100;
  const totalPriceElement = document.getElementsByClassName('cart-total-price')[0] as HTMLElement;
  totalPriceElement.innerText = `$${total}`;
}

// Bugg när man väljer att ta bort en vara som inte är den sista i listan så försvinner två varor istället för en på första klicket. 