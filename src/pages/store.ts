document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', ready)
  : ready();

function ready(): void {
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

function purchaseClicked(): void {
  const cartItems = document.getElementsByClassName('cart-items')[0] as HTMLElement;
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild!);
  }
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
  buttonClicked.parentElement!.parentElement!.remove();
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
  const price = (shopItem.getElementsByClassName('shop-item-price')[0] as HTMLElement).innerText;
  const imageSrc = (shopItem.getElementsByClassName('shop-item-image')[0] as HTMLImageElement).src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title: string, price: string, imageSrc: string): void {
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartItems = document.getElementsByClassName('cart-items')[0] as HTMLElement;
  const cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  for (let i = 0; i < cartItemNames.length; i++) {
    if ((cartItemNames[i] as HTMLElement).innerText === title) {
      alert('This item is already added to the cart');
      return;
    }
  }

  const cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;

  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);

  const removeButton = cartRow.getElementsByClassName('btn-danger')[0] as HTMLButtonElement;
  removeButton.addEventListener('click', removeCartItem);

  const quantityInput = cartRow.getElementsByClassName('cart-quantity-input')[0] as HTMLInputElement;
  quantityInput.addEventListener('change', quantityChanged);
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
  const totalPrice = document.getElementsByClassName('cart-total-price')[0] as HTMLElement;
  totalPrice.innerText = `$${total}`;
}
