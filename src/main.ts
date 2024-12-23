import {
  createHtmlMensClothes,
  createHtmlWomensClothes,
} from "./helpers/htmlHelper";
import { getMensClothes } from "./services/mensClothing";
import { getClothes } from "./services/womensClothingService";
import "./style.css";

const womensClothes = await getClothes();
const mensClothes = await getMensClothes();

createHtmlWomensClothes(womensClothes);
createHtmlMensClothes(mensClothes);
