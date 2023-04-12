import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getProducts_,
  updateProduct,
} from "../persistence/persistence.js";

export async function getProductsService(limit, page, query, sort) {
  return getProducts(limit, page, query, sort);
}

export async function getProducts_Service() {
  return await getProducts_();
}

export async function getProductByIdService() {
  return await getProductById();
}

export async function addProductService(producto) {
  return await addProduct(producto);
}

export async function updateProductService(id, producto) {
  return await updateProduct(id, producto);
}

export async function deleteProductService(id) {
  return await deleteProduct(id);
}
