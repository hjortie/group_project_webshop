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
    const dltBtn = document.createElement("td");

    const itemName = document.createElement("p");
    const itemPrice = document.createElement("p");
    const decrementBtn = document.createElement("button");
    const itemQty = document.createElement("input");
    const incrementBtn = document.createElement("button");

    const btnContent = `<a href="#" class="btn btn-danger btn-sm">
<i class="fa fa-times"></i>
</a>`;
    dltBtn.innerHTML = btnContent;
    cartRow.className = "cart-row";
    cartItemQty.className = "qty-container";
    itemPrice.className = "text-muted";
    decrementBtn.className = "decrease-btn-modal";
    decrementBtn.innerText = "-";
    decrementBtn.addEventListener("click", () => {
      if (item.quantity > 0) {
        item.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        itemQty.value = item.quantity.toString();
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
    });

    itemName.innerText = item.title;
    itemPrice.innerText = `$${item.price.toString()}`;
    itemQty.value = item.quantity.toString();

    itemContainer.appendChild(itemName);
    itemContainer.appendChild(itemPrice);
    cartItemQty.appendChild(decrementBtn);
    cartItemQty.appendChild(itemQty);
    cartItemQty.appendChild(incrementBtn);
    cartRow.appendChild(itemContainer);
    cartRow.appendChild(cartItemQty);
    cartRow.appendChild(dltBtn);

    cartItemContainer.appendChild(cartRow);

    const cost = document.getElementById("total-cost") as HTMLSpanElement;
    total += item.price;
    cost.innerText = `$${total.toString()}`;
  });
}

export const createHtmlWomensClothes = (clothes: Article[]) => {
  clothes.forEach((item) => {
    const itemContainer = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("span");
    const price = document.createElement("p");
    // const buyButton = document.createElement("button");

    itemContainer.id = "item-container";
    image.src = item.image;
    image.alt = item.title;
    title.innerHTML = item.title;
    price.innerHTML = `${item.price} USD`;
    // buyButton.innerHTML = "Buy";

    itemContainer.appendChild(image);
    itemContainer.appendChild(title);
    itemContainer.appendChild(price);
    // itemContainer.appendChild(buyButton);
    document.getElementById("womens-clothing")?.appendChild(itemContainer);

    itemContainer.addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(item));
      window.location.href = "product-page.html";
    });
  });
};

export const createHtmlMensClothes = (clothes: Article[]) => {
  clothes.forEach((item) => {
    const itemContainer = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("span");
    const price = document.createElement("p");
    const buyButton = document.createElement("button");

    itemContainer.id = "item-container";
    image.src = item.image;
    image.alt = item.title;
    title.innerHTML = item.title;
    price.innerHTML = `${item.price} USD`;
    buyButton.innerHTML = "Buy";

    itemContainer.appendChild(image);
    itemContainer.appendChild(title);
    itemContainer.appendChild(price);
    itemContainer.appendChild(buyButton);
    document.getElementById("mens-clothing")?.appendChild(itemContainer);

    buyButton.addEventListener("click", () => {
      const selectedItem = {
        image: item.image,
        title: item.title,
        price: item.price,
      };

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      cart.push(selectedItem);

      localStorage.setItem("cart", JSON.stringify(cart));
      getDataForModal();

      alert(`${item.title} added to cart!`);
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
