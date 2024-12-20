import { getClothes } from "./services/womensClothingService";
import "./style.css";

const clothes = await getClothes();

clothes.forEach((item) => {
  const image = document.createElement("img");
  image.src = item.image;
  image.alt = item.title;

  document.getElementById("womens_clothing")?.appendChild(image);
});
