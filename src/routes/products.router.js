import {
  addProductController,
  deleteProductController,
  getProductByIdController,
  getProductsController,
  getProducts_Controller,
  updateProductController,
} from "../controllers/products.controller.js";

import { Router } from "express";

const router = Router();

// Busqueda de todos los productos y busqueda de productos filtrando por un limite pasado por query
router.get("/", getProducts_Controller)

// Busqueda de productos, paginación
router.get("/paginate", getProductsController);

// Busqueda de producto por id
router.get("/:idProduct", getProductByIdController)

// alta de producto
router.post("/", addProductController)

// modificación de producto
router.put("/:idProduct", updateProductController)

// eliminación de producto
router.delete("/:idProduct", deleteProductController)

export default router;
