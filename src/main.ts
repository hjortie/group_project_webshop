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
getDataForModal();

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
    const itemQty = document.createElement("input");

    const btnContent = `<a href="#" class="btn btn-danger btn-sm">
<i class="fa fa-times"></i>
</a>`;
    cartRow.className = "cart-row";
    itemPrice.className = "text-muted";
    itemQty.type = "text";
    itemQty.className = "form-control";
    dltBtn.innerHTML = btnContent;

    itemName.innerText = item.title;
    itemPrice.innerText = `$${item.price.toString()}`;
    itemQty.value = item.quantity.toString();

    itemContainer.appendChild(itemName);
    itemContainer.appendChild(itemPrice);
    cartItemQty.appendChild(itemQty);
    cartRow.appendChild(itemContainer);
    cartRow.appendChild(cartItemQty);
    cartRow.appendChild(dltBtn);

    cartItemContainer.appendChild(cartRow);

    const cost = document.getElementById("total-cost") as HTMLSpanElement;
    total += item.price;
    cost.innerText = `$${total.toString()}`;
  });
}
