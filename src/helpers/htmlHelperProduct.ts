export function createHtmlOneProduct() {
  const myApp = document.getElementById("app");
  const myP = document.createElement("p");
  myP.innerHTML = "hej";

  myApp?.appendChild(myP);
}
