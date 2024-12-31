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
