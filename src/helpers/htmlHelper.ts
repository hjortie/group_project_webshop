import { Article } from "../services/article";

export function getDataForModal() {
  const cartItemContainer = document.getElementById("cart") as HTMLTableElement;
  const cartItems: Article[] = JSON.parse(localStorage.getItem("cart") || "[]");
  let total = 0;

  cartItemContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const cartRow = document.createElement("tr");
    const itemContainer = document.createElement("td");
    const cartItemQty = document.createElement("td");
    const dltBtnContainer = document.createElement("td");

    const itemName = document.createElement("p");
    const itemPrice = document.createElement("p");
    const itemSize = document.createElement("p");
    const decrementBtn = document.createElement("button");
    const itemQty = document.createElement("input");
    const incrementBtn = document.createElement("button");
    const deleteBtn = document.createElement("i");

    deleteBtn.className = "fa fa-times btn btn-danger";
    deleteBtn.addEventListener("click", () => {
      cartItems.splice(cartItems.indexOf(item), 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      getDataForModal();
      updateCartCount();
    });
    cartRow.className = "cart-row";
    cartItemQty.className = "qty-container";
    itemPrice.className = "text-muted";
    itemSize.className = "text-muted";
    decrementBtn.className = "decrease-btn-modal";
    decrementBtn.innerText = "-";
    decrementBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity -= 1;
        itemQty.value = item.quantity.toString();
        total -= item.price;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        getDataForModal();
        updateCartCount();
      } else {
        cartItems.splice(cartItems.indexOf(item), 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        getDataForModal();
        updateCartCount();
      }
    });
    itemQty.type = "text";
    itemQty.className = "form-control";
    incrementBtn.className = "increase-btn-modal";
    incrementBtn.innerText = "+";
    incrementBtn.addEventListener("click", () => {
      item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cartItems));
      itemQty.value = item.quantity.toString();
      total += item.price;
      getDataForModal();
      updateCartCount();
    });

    itemName.innerText = item.title;
    itemSize.innerText = `Size: ${item.size}`;
    itemPrice.innerText = `$${item.price.toString()}`;
    itemQty.value = item.quantity.toString();

    dltBtnContainer.appendChild(deleteBtn);
    itemContainer.appendChild(itemName);
    itemContainer.appendChild(itemSize);
    itemContainer.appendChild(itemPrice);
    cartItemQty.appendChild(decrementBtn);
    cartItemQty.appendChild(itemQty);
    cartItemQty.appendChild(incrementBtn);
    cartRow.appendChild(itemContainer);
    cartRow.appendChild(cartItemQty);
    cartRow.appendChild(dltBtnContainer);

    cartItemContainer.appendChild(cartRow);

    total += item.price * item.quantity;
  });

  const cost = document.getElementById("total-cost") as HTMLSpanElement;
  const totalFixed = total.toFixed(2);
  cost.innerText = `$${totalFixed.toString()}`;
  if (cartItems.length === 0) {
    cost.innerText = "$0";
  }
}

export const createHtmlClothes = (clothes: Article[]) => {
  clothes.forEach((item) => {
    const itemContainer = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("span");
    const price = document.createElement("p");

    itemContainer.id = "item-container";
    image.src = item.image;
    image.alt = item.title;
    title.innerHTML = item.title;
    price.innerHTML = `$${item.price}`;

    itemContainer.appendChild(image);
    itemContainer.appendChild(title);
    itemContainer.appendChild(price);
    document.getElementById("clothing")?.appendChild(itemContainer);

    itemContainer.addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(item));
      window.location.href = "product-page.html";
    });
  });
};

export function updateCartItemCount(count: number): void {
  const cartIcon = document.getElementById("ShoppingCart") as HTMLElement;

  let cartBadge = cartIcon.querySelector("span");
  if (!cartBadge) {
    cartBadge = document.createElement("span");
    cartIcon.appendChild(cartBadge);
  }

  cartBadge.textContent = count.toString();
}

export function updateCartCount() {
  const cart: Article[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountSpan = document.querySelector(".right-side-nav span") as HTMLElement;
  if (cartCountSpan) {
    if (totalQuantity > 0) {
      cartCountSpan.textContent = totalQuantity.toString();
    } else {
      cartCountSpan.textContent = ""; 
    }
  }
}