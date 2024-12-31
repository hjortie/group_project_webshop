import { ImensItem } from "../models/ImensItem";
import { Article } from "./article";

export const getMensClothes = async () => {
  const response = await fetch(
    "https://fakestoreapi.com/products/category/men's%20clothing"
  );
  const result: Article = await response.json();

  return result;
};
