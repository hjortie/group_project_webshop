import {
  createHtmlMensClothes,
  createHtmlWomensClothes,
  getDataForModal,
} from "./helpers/htmlHelper";
import { Article } from "./services/article";
import { getMensClothes } from "./services/mensClothing";
import { getClothes } from "./services/womensClothingService";
import "./style.css";

getDataForModal();

const womensClothes = await getClothes();
const mensClothes = await getMensClothes();

const newWomensClothes = womensClothes.map(
  (item) =>
    new Article(item.title, item.price, item.image, item.description, 0, "")
);

const newMensClothes = mensClothes.map(
  (item) =>
    new Article(item.title, item.price, item.image, item.description, 0, "")
);

createHtmlWomensClothes(newWomensClothes);
createHtmlMensClothes(newMensClothes);
