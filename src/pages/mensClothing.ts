import { createHtmlMensClothes } from "../helpers/htmlHelper";
import { Article } from "../services/article";
import { getClothes } from "../services/clothingService";
const menURL = `men's%20clothing`;

const clothes = await getClothes(menURL);
const newClothes = clothes.map(
  (item) =>
    new Article(item.title, item.price, item.image, item.description, 0, "")
);

createHtmlMensClothes(newClothes);
