import { getDataForModal } from "../main";
import { Article } from "../services/article";

export const createHtmlWomensClothes = (clothes: Article[]) => {
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
    document.getElementById("womens-clothing")?.appendChild(itemContainer);

    buyButton.addEventListener("click", () => {
      const selectedItem = {
        image: item.image,
        title: item.title,
        price: item.price,
        quantity: item.quantity + 1,
        sizeS: item.isS,
        sizeM: item.isM,
        sizeL: item.isL,
      };

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      cart.push(selectedItem);

      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartItemCount(cart.length);
      getDataForModal();

      alert(`${item.title} added to cart!`);
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

function updateCartItemCount(count: number): void {
  const cartIcon = document.getElementById("ShoppingCart") as HTMLElement;

  let cartBadge = cartIcon.querySelector("span");
  if (!cartBadge) {
    cartBadge = document.createElement("span");
    cartIcon.appendChild(cartBadge);
  }

  cartBadge.textContent = count.toString();
}
