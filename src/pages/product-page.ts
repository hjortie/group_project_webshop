import { getDataForModal } from "../helpers/htmlHelper";
import { Article } from "../services/article";

function createHtmlOneProduct() {
  const productData = localStorage.getItem("selectedProduct");
  if (!productData) {
    return;
  }

  const product: Article = JSON.parse(productData);

  // Skapa dynamisk HTML
  const productSection = document.getElementById("product-section");
  const descriptionContainer = document.createElement("div");
  const imageContainer = document.createElement("div");
  const image = document.createElement("img");
  const title = document.createElement("h2");
  const price = document.createElement("p");
  const description = document.createElement("p");
  const buyButton = document.createElement("button");
  descriptionContainer.id = "description-container";
  imageContainer.id = "image-container";

  image.src = product.image;
  image.alt = product.title;
  title.textContent = product.title;
  price.textContent = `${product.price} USD`;
  description.textContent = product.description || "No description available.";
  buyButton.innerHTML = "Lägg till i varukorg";
  buyButton.classList.add("buy-btn");

  imageContainer.appendChild(image);
  descriptionContainer.append(title, price, description, buyButton);
  productSection?.append(imageContainer, descriptionContainer);

  // Skapa <select>-elementet
  const select = document.createElement("select");
  select.id = "choose-size";

  // Skapa alternativ för <select>
  const options = [
    { value: "S", text: "S", selected: true },
    { value: "M", text: "M" },
    { value: "L", text: "L" },
    { value: "XL", text: "XL" },
  ];

  options.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text;
    if (optionData.selected) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  descriptionContainer.appendChild(select);

  // Lägg till klickhändelse för köpknappen
  buyButton.addEventListener("click", () => {
    const selectedSize = select.value;

    const selectedItem: Article = {
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      size: selectedSize,
      quantity: 1,
    };

    const cart: Article[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItem = cart.find(
      (item) => item.title === selectedItem.title && item.size === selectedSize
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(selectedItem);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    getDataForModal();
  });
}

createHtmlOneProduct();
