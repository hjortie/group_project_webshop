import {
  createHtmlMensClothes,
  createHtmlWomensClothes,
} from "./helpers/htmlHelper";
import { Article } from "./services/article";
import { getMensClothes } from "./services/mensClothing";
import { getClothes } from "./services/womensClothingService";
import "./style.css";

const womensClothes = await getClothes();
const mensClothes = await getMensClothes();

const newWomensClothes = womensClothes.map(
  (item) =>
    new Article(
      item.title,
      item.price,
      item.image,
      item.description,
      0,
      false,
      false,
      false
    )
);

const newMensClothes = mensClothes.map(
  (item) =>
    new Article(
      item.title,
      item.price,
      item.image,
      item.description,
      0,
      false,
      false,
      false
    )
);
createHtmlWomensClothes(newWomensClothes);
createHtmlMensClothes(newMensClothes);

const cartItemContainer = document.getElementById(
  "cart-items"
) as HTMLTableElement;
const cartItemQty = document.getElementById(
  "qty-container"
) as HTMLTableElement;
const cartItems: Article[] = JSON.parse(localStorage.getItem("cart") || "[]");
let total = 0;

cartItems.forEach((item) => {
  const itemName = document.createElement("p");
  const itemPrice = document.createElement("p");
  const itemQty = document.createElement("input");

  itemPrice.className = "text-muted";
  itemQty.type = "text";
  itemQty.className = "form-control";

  itemName.innerText = item.title;
  itemPrice.innerText = item.price.toString();
  //itemQty.value = item.quantity.toString();

  cartItemContainer.appendChild(itemName);
  cartItemContainer.appendChild(itemPrice);
  cartItemQty.appendChild(itemQty);

  const cost = document.getElementById("total-cost") as HTMLSpanElement;
  total += item.price;
  cost.innerText = `${total.toString()}$`;
});
