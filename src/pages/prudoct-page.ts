function createHtmlOneProduct() {
  const myApp = document.getElementById("product-section");
  const myP = document.createElement("p");
  myP.innerHTML = "hej";

  myApp?.appendChild(myP);
  console.log("hej");
}

createHtmlOneProduct();
