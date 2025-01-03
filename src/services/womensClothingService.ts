import { IwomensItem } from "../models/IwomensItem";
import { Article } from "./article";

export const getClothes = async () => {
  const response = await fetch(
    "https://fakestoreapi.com/products/category/women's%20clothing"
  );
  const result: Article[] = await response.json();
  return result;
};
