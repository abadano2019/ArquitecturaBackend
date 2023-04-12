import {
  addCart,
  addProductCart,
  deleteCart,
  deleteProductCart,
  deleteProductsCart,
  getCartById,
  getCarts,
  updateCartProduct,
  updateCartProductQuantity,
} from "../persistence/persistence.js";

export async function getCartsService() {
  return getCarts();
}

export async function getCartByIdService(idCart) {
  return getCartById(idCart);
}

export async function addCartService(cart) {
  return addCart(cart);
}

export async function addProductCartService(cid, pid) {
  return addProductCart(cid, pid);
}

export async function deleteCartService(idCart) {
  return deleteCart(idCart);
}

export async function deleteProductCartService(cid, pid) {
  return deleteProductCart(cid, pid);
}

export async function deleteProductsCartService(cid) {
  return deleteProductsCart(cid);
}

export async function updateCartProductService(cid, products) {
  return updateCartProduct(cid, products);
}

export async function updateCartProductQuantityService(cid, pid, cantidad) {
  return updateCartProductQuantity(cid, pid, cantidad);
}
