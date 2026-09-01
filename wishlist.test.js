import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { addSelectionToWishlist, updateSelection } from "./wishlist.js";

test("tracks multiple selected products without mutating the previous selection", () => {
  const initialSelection = new Set(["weekender"]);
  const selection = updateSelection(initialSelection, "overshirt", true);

  assert.deepEqual([...initialSelection], ["weekender"]);
  assert.deepEqual([...selection], ["weekender", "overshirt"]);
});

test("removes an unchecked product from the selection", () => {
  const selection = updateSelection(new Set(["weekender", "overshirt"]), "weekender", false);

  assert.deepEqual([...selection], ["overshirt"]);
});

test("adds every selected product to the wishlist and clears the selection", () => {
  const result = addSelectionToWishlist(
    new Set(["weekender", "overshirt"]),
    new Set(["cap"]),
  );

  assert.deepEqual([...result.addedIds], ["weekender", "overshirt"]);
  assert.deepEqual([...result.wishlistIds], ["cap", "weekender", "overshirt"]);
  assert.equal(result.selectedIds.size, 0);
});

test("renders bulk wishlist controls and accessible status feedback", async () => {
  const html = await readFile(new URL("./index.html", import.meta.url), "utf8");

  assert.match(html, /data-product-checkbox/g);
  assert.match(html, />\s*Add selected to wishlist\s*</);
  assert.match(html, /role="status" aria-live="polite"/);
});
