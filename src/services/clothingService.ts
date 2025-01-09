import { Article } from "./article";
const BASE_URL = `https://fakestoreapi.com/products/category/`;

export const getClothes = async (pageID: string) => {
  const response = await fetch(`${BASE_URL}${pageID}`);
  const result: Article[] = await response.json();
  return result;
};
