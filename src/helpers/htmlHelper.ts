import { ImensItem } from "../models/ImensItem";
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
    itemContainer.appendChild(buyButton);
    document.getElementById("womens-clothing")?.appendChild(itemContainer);

    buyButton.addEventListener("click", () => {
      const selectedItem = {
        image: item.image,
        title: item.title,
        price: item.price,
      };

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      cart.push(selectedItem);

      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${item.title} added to cart!`);
    });
  });
};

export const createHtmlMensClothes = (clothes: ImensItem[]) => {
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

      alert(`${item.title} added to cart!`);
    });
  });
};
