import { IwomensItem } from "../models/IwomensItem";

export const createHtmlWomensClothes = (clothes: IwomensItem[]) => {
  clothes.forEach((item) => {
    const itemContainer = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("span");
    const price = document.createElement("p");

    itemContainer.id = "item-container";
    image.src = item.image;
    image.alt = item.title;
    title.innerHTML = item.title;
    price.innerHTML = `${item.price} USD`;

    itemContainer.appendChild(image);
    itemContainer.appendChild(title);
    itemContainer.appendChild(price);
    document.getElementById("womens-clothing")?.appendChild(itemContainer);
  });
};
