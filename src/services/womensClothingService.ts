import { IwomensItem } from "../models/IwomensItem";

export const getClothes = async () => {
  const response = await fetch(
    "https://fakestoreapi.com/products/category/women's%20clothing"
  );
  const result: IwomensItem[] = await response.json();
  return result;
};
