import { createHtmlWomensClothes } from "./helpers/htmlHelper";
import { getClothes } from "./services/womensClothingService";
import "./style.css";

const womensClothes = await getClothes();

createHtmlWomensClothes(womensClothes);
