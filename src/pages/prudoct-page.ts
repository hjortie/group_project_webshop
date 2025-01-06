import { getDataForModal } from "../helpers/htmlHelper";
import { Article } from "../services/article";
import { updateCartItemCount } from "../helpers/htmlHelper";

function createHtmlOneProduct() {
  const productData = localStorage.getItem("selectedProduct");
  if (!productData) {
    return;
  }

  const product: Article = JSON.parse(productData);

  console.log(product);

  // Skapa dynamisk HTML
  const productSection = document.getElementById("product-section");
  const descriptionContainer = document.createElement("div");
  const imageContainer = document.createElement("div");
  const image = document.createElement("img");
  const title = document.createElement("h2");
  const price = document.createElement("p");
  const description = document.createElement("p"); // Om beskrivning finns i produktdata
  const buyButton = document.createElement("button");
  descriptionContainer.id = "description-container";
  imageContainer.id = "image-container";

  image.src = product.image;
  image.alt = product.title;
  title.textContent = product.title;
  price.textContent = `${product.price} USD`;
  description.textContent = product.description || "No description available.";
  buyButton.innerHTML = "Lägg till i varukorg";

  imageContainer.appendChild(image);
  descriptionContainer.append(title, price, description, buyButton);
  productSection?.append(imageContainer, descriptionContainer);

  // Skapa <select>-elementet
  const select = document.createElement("select");
  select.id = "choose-size";

  // Skapa alternativ för <select>
  const options = [
    { value: "S", text: "Smal", selected: true },
    { value: "M", text: "Medium" },
    { value: "L", text: "Large" },
  ];

  // Lägg till varje <option> i <select>
  options.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text;
    if (optionData.selected) {
      option.selected = true;
    }
    select.appendChild(option);
  });

  // Lägg till <select> i DOM
  descriptionContainer.appendChild(select);

  buyButton.addEventListener("click", () => {
    const selectedItem = {
      image: product.image,
      title: product.title,
      price: product.price,
      quantity: product.quantity + 1,
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    cart.push(selectedItem);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartItemCount(cart.length);
    getDataForModal();

    alert(`${product.title} added to cart!`);
  });
}

createHtmlOneProduct();
