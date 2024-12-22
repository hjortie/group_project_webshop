function ready(): void {
  // Load cart items from localStorage on page load
  loadCartFromLocalStorage();

  const removeCartItemButtons = document.getElementsByClassName('btn-danger');
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    const button = removeCartItemButtons[i] as HTMLButtonElement;
    button.addEventListener('click', removeCartItem);
  }

  const quantityInputs = document.getElementsByClassName('cart-quantity-input');
  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i] as HTMLInputElement;
    input.addEventListener('change', quantityChanged);
  }

  const addToCartButtons = document.getElementsByClassName('shop-item-button');
  for (let i = 0; i < addToCartButtons.length; i++) {
    const button = addToCartButtons[i] as HTMLButtonElement;
    button.addEventListener('click', addToCartClicked);
  }

  const purchaseButton = document.getElementsByClassName('btn-purchase')[0] as HTMLButtonElement;
  purchaseButton.addEventListener('click', purchaseClicked);
}
ready();

function loadCartFromLocalStorage(): void {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartContainer = document.getElementsByClassName('cart-items')[0] as HTMLElement;
  cartContainer.innerHTML = ''; // Clear existing cart items

  cartItems.forEach((item: { image: string; title: string; price: number }) => {
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
      <input id="quantity" class="cart-quantity-input" type="number" value="1">
    </div>
  </div>
      <button class="btn btn-danger" type="button">
      <i class="fa-solid fa-trash-can"></i>
    </button>
</div>

     `;

    cartRow.innerHTML = cartRowContents;
    cartContainer.appendChild(cartRow);

    const removeButton = cartRow.getElementsByClassName('btn-danger')[0] as HTMLButtonElement;
    removeButton.addEventListener('click', removeCartItem);

    const quantityInput = cartRow.getElementsByClassName('cart-quantity-input')[0] as HTMLInputElement;
    quantityInput.addEventListener('change', quantityChanged);
  });

  // Update the total price
  updateCartTotal();
}

function purchaseClicked(): void {
  const cartItems = document.getElementsByClassName('cart-items')[0] as HTMLElement;
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild!);
  }

  // Clear localStorage cart
  localStorage.removeItem('cart');

  updateCartTotal();

  // Show the "Thanks for giving us money!" message
  const thankYouMessage = document.getElementById('thank-you-message') as HTMLElement;
  thankYouMessage.style.display = 'block'; // Make the div visible
  setTimeout(() => {
    thankYouMessage.style.display = 'none'; // Hide the message after 5 seconds
  }, 5000); // Hide after 5 seconds
}

function removeCartItem(event: Event): void {
  const buttonClicked = event.target as HTMLButtonElement;
  const cartRow = buttonClicked.parentElement!.parentElement!;
  const title = cartRow.getElementsByClassName('cart-item-title')[0].innerHTML;

  // Remove the item from localStorage
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart = cart.filter((item: { title: string }) => item.title !== title);
  localStorage.setItem('cart', JSON.stringify(cart));

  // Remove the cart row and update total
  cartRow.remove();
  updateCartTotal();
}

function quantityChanged(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (isNaN(Number(input.value)) || Number(input.value) <= 0) {
    input.value = '1';
  }
  updateCartTotal();
}

function addToCartClicked(event: Event): void {
  const button = event.target as HTMLButtonElement;
  const shopItem = button.parentElement!.parentElement! as HTMLElement;
  const title = (shopItem.getElementsByClassName('shop-item-title')[0] as HTMLElement).innerText;
  const price = parseFloat(
    (shopItem.getElementsByClassName('shop-item-price')[0] as HTMLElement).innerText.replace('$', '')
  );
  const imageSrc = (shopItem.getElementsByClassName('shop-item-image')[0] as HTMLImageElement).src;

  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title: string, price: number, imageSrc: string): void {
  // Save the item to localStorage
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const itemExists = cart.some((item: { title: string }) => item.title === title);

  if (itemExists) {
    alert('This item is already added to the cart');
    return;
  }

  const newItem = { title, price, image: imageSrc };
  cart.push(newItem);
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update the UI
  loadCartFromLocalStorage();
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
