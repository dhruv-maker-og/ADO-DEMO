import { addSelectionToWishlist, updateSelection } from "./wishlist.js";

let selectedIds = new Set();
let wishlistIds = new Set();

const bulkAction = document.querySelector("#bulk-action");
const addSelectedButton = document.querySelector("#add-selected");
const selectionCount = document.querySelector("#selection-count");
const wishlistCount = document.querySelector("#wishlist-count");
const toast = document.querySelector("#toast");
const checkboxes = document.querySelectorAll("[data-product-checkbox]");
let toastTimer;

function renderSelection() {
  const count = selectedIds.size;
  selectionCount.textContent = `${count} ${count === 1 ? "item" : "items"} selected`;
  bulkAction.hidden = count === 0;

  checkboxes.forEach((checkbox) => {
    checkbox.closest(".product-card").classList.toggle("is-selected", checkbox.checked);
  });
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    selectedIds = updateSelection(selectedIds, checkbox.value, checkbox.checked);
    renderSelection();
  });
});

addSelectedButton.addEventListener("click", () => {
  const result = addSelectionToWishlist(selectedIds, wishlistIds);
  selectedIds = result.selectedIds;
  wishlistIds = result.wishlistIds;

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  wishlistCount.textContent = wishlistIds.size;
  renderSelection();

  const count = result.addedIds.length;
  toast.textContent = `${count} ${count === 1 ? "item" : "items"} added to your wishlist`;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 3500);
});
