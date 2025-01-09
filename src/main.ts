import { getDataForModal, updateCartCount } from "./helpers/htmlHelper";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
  });

getDataForModal();
