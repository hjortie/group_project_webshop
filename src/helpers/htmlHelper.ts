import { IwomensItem } from "../models/IwomensItem";

export const createHtmlWomensClothes = (clothes: IwomensItem[]) => {
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
    itemContainer.appendChild(buyButton)
    document.getElementById("womens-clothing")?.appendChild(itemContainer);

    buyButton.addEventListener("click", () => {
      // Create item object
      const selectedItem = {
        image: item.image,
        title: item.title,
        price: item.price,
      };

      // Get existing items from localStorage
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      // Add new item to the cart array
      cart.push(selectedItem);

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${item.title} added to cart!`);
    });
  });
};
