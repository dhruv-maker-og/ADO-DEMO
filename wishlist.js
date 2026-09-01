export function updateSelection(selectedIds, productId, isSelected) {
  const nextSelection = new Set(selectedIds);

  if (isSelected) {
    nextSelection.add(productId);
  } else {
    nextSelection.delete(productId);
  }

  return nextSelection;
}

export function addSelectionToWishlist(selectedIds, wishlistIds) {
  return {
    addedIds: [...selectedIds],
    selectedIds: new Set(),
    wishlistIds: new Set([...wishlistIds, ...selectedIds]),
  };
}
