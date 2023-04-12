import {
  addCartController,
  addProductCartController,
  deleteCartController,
  deleteProductCartController,
  deleteProductsCartController,
  getCartByIdController,
  getCartsController,
  updateCartProductController,
  updateCartProductQuantityController,
} from "../controllers/carts.controller.js";

import { Router } from "express";

const router = Router();

// Busqueda de todos los productos y busqueda de productos filtrando por un limite pasado por query
router.get("/", getCartsController);

// Busqueda de productos por id de carrito
router.get("/:idCart", getCartByIdController);

// Alta de carrito
router.post("/", addCartController)

// Alta de producto a un carrito, debe existir el carrito y debe existir el producto en el archivo de productos
router.post("/:cid/products/:pid", addProductCartController)

// Borrado de un producto dado por parametro del carrito de compra
router.delete("/:cid/products/:pid", deleteProductCartController)

// Borrado de todos los productos de un carrito de compra
router.delete("/:cid", deleteProductsCartController)

// modificación del arreglo de productos de un carrito
router.put("/:cid", updateCartProductController)

// modificación de la cantidad de un producto de un carrito
router.put("/:cid/products/:pid", updateCartProductQuantityController)

export default router;
