import { ImensItem } from "../models/ImensItem";

export const getMensClothes = async () => {
  const response = await fetch(
    "https://fakestoreapi.com/products/category/men's%20clothing"
  );
  const result: ImensItem[] = await response.json();

  return result;
};
