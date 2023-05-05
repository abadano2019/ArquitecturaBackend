import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../error/errors.enum.js";

import CustomError from "../error/CustomError.js";
import Product from "../js/product.js";
import productsServices from "../services/products.services.js";
import { socketServer } from "../app.js";

export const getProductsController = async (req, res, next) => {
  try {
    const { limit = 10, page = 1, sort, ...query } = req.query;
    const products = productsServices.getProductsService(
      limit,
      page,
      query,
      sort
    );
    res.json({ message: "productos encontrado:", products });
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.cause);
    console.log(error.Number);
    next(error);
  }
};

export const getProductByIdController = async (req, res,next) => {
  try {
    const { idProduct } = req.params;
    const product = await productsServices.getProductByIdService(idProduct);

    if (product) {
      res.json({ mesage: "Producto encontrado", product });
    } else {
      res.json({ mesage: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.cause);
    console.log(error.Number);
    next(error);
  }
};

export const getProducts_Controller = async (req, res,next) => {
  const { limit } = req.query;
  try {
    const products = await productsServices.getProducts_Service();

    if (limit) {
      const productSlice = products.slice(0, limit);
      res.json({ message: "productos encontrado:", productSlice });
    } else {
      res.json({ message: "productos encontrado:", products });
    }
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.cause);
    console.log(error.Number);
    next(error);
  }
};

export const addProductController = async (req, res, next) => {
  try {
    console.log(req.body);
    let {
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category,
    } = req.body;

    const priceInt = parseInt(price);
    const stockInt = parseInt(stock);
    const statusBool = Boolean(status);
    if (typeof title !== "string" || title === "") {
      //return "Title es un campo string";
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Title string datacamp"
      );
    }
    if (typeof description !== "string" || description === "") {
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Description string datacamp"
      );
    }
    if (typeof code !== "string" || code === "") {
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Code string datacamp"
      );
    }
    if (typeof category !== "string" || category === "") {
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Category string datacamp"
      );
    }
    if (typeof priceInt !== "number" || priceInt === "") {
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Price numeric datacamp"
      );
    }
    if (typeof stockInt !== "number" || stockInt === "") {
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Price numeric datacamp"
      );
    }
    if (typeof statusBool !== "boolean" || statusBool === "") {
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Status boolean datacamp"
      );
    }

    if (thumbnails === undefined) {
      thumbnails = [];
    }

    const product = new Product(
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category
    );

    const cod = await productsServices.addProductService(product);
    console.log("codigo", cod);
    if (cod === "ADDPROD-COD1") {
      res.json({
        mesage:
          "ATENCION: Verifique el campo Code, el mismo ya existe en otro producto",
      });
    } else {
      if (cod === "ADDPROD-COD2") {
        const products = await productsServices.getProducts_Service();
        console.log(products);
        socketServer.emit("productoAgregado", { products });
        res.json({ mesage: "Producto agregado", product });
      }
    }
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.cause);
    console.log(error.Number);
    next(error);
  }
};

export const updateProductController = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    } = req.body;

    if (typeof title !== "string" && title !== undefined) {
      //return "Title es un campo string";
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Title string datacamp"
      );
    }
    if (typeof description !== "string" && description !== undefined) {
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Description string datacamp"
      );
    }
    if (typeof code !== "string" && code !== undefined) {
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Code string datacamp"
      );
    }
    if (typeof category !== "string" && category !== undefined) {
      CustomError(
        ErrorsName.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        ErrorsCause.DATA_TYPE_STRING_ERROR,
        500,
        "Category string datacamp"
      );
    }
    if (typeof Number(price) !== "number" && price !== undefined) {
      CustomError(
        ErrorsName.DATA_TYPE_NUMBER_ERROR,
        ErrorsCause.DATA_TYPE_NUMBER_ERROR,
        ErrorsCause.DATA_TYPE_NUMBER_ERROR,
        500,
        "Price number datacamp"
      );
    }
    if (typeof Number(stock) !== "number" && stock !== undefined) {
      CustomError(
        ErrorsName.DATA_TYPE_NUMBER_ERROR,
        ErrorsCause.DATA_TYPE_NUMBER_ERROR,
        ErrorsCause.DATA_TYPE_NUMBER_ERROR,
        500,
        "Stock number datacamp"
      );
    }
    if (typeof Boolean(status) !== "boolean" && status !== undefined) {
      CustomError(
        ErrorsName.DATA_TYPE_BOOLEAN_ERROR,
        ErrorsCause.DATA_TYPE_BOOLEAN_ERROR,
        ErrorsCause.DATA_TYPE_BOOLEAN_ERROR,
        500,
        "Status boolean datacamp"
      );
    }
    if (!Array.isArray(thumbnail) && thumbnail !== undefined) {
      CustomError(
        ErrorsName.DATA_TYPE_ERROR,
        ErrorsCause.DATA_TYPE_ERROR,
        ErrorsCause.DATA_TYPE_ERROR,
        500,
        "Thumbnails array type"
      );
    }
    const product = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    );

    const modifyProduct = await productsServices.getProductByIdService(
      idProduct
    );
    if (modifyProduct) {
      const validation = await productsServices.updateProductService(
        idProduct,
        product
      );
      res.json("Producto modificado");
    } else {
      CustomError(
        ErrorsName.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        500,
        "Product not exist"
      );
    }
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.cause);
    console.log(error.Number);
    next(error);
  }
};

export const deleteProductController = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    if (idProduct.length < 24) {
      CustomError(
        ErrorsName.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        500,
        "Product Id not exist"
      );
    }
    const product = await productsServices.getProductByIdService(idProduct);
    console.log("encontrado:", product);

    if (product) {
      productsServices.deleteProductService(idProduct);
      const products = await productsServices.getProductsService();
      socketServer.emit("productoEliminado", { products });
      res.json({ mesage: "Producto eliminado", product });
    } else {
      console.log("no existe el producto");
      CustomError(
        ErrorsName.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        ErrorsMessage.PRODUCT_DATA_NO_EXIST,
        500,
        "Product not exist"
      );
    }
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.cause);
    console.log(error.Number);
    next(error);
  }
};
