import {
  createHtmlMensClothes,
  createHtmlWomensClothes,
} from "../helpers/htmlHelper";
import { Article } from "../services/article";
import { getClothes } from "../services/clothingService";

const womenURL = `women's%20clothing`;

const clothes = await getClothes(womenURL);
const newClothes = clothes.map(
  (item) =>
    new Article(item.title, item.price, item.image, item.description, 0, "")
);

createHtmlWomensClothes(newClothes);
