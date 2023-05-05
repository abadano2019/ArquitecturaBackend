import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../error/errors.enum.js";

import CustomError from "../error/CustomError.js";
import cartsServices from "../services/carts.services.js";
import productsServices from "../services/products.services.js";
import usersServices from "../services/users.services.js";

export const getCartsController = async (req, res, next) => {
  const { limit } = req.query;
  console.log(limit);
  try {
    const carts = await cartsServices.getCartsService();
    console.log(carts);
    if (limit) {
      const cartSlice = carts.slice(0, limit);
      res.json({ message: "productos encontrado:", cartSlice });
    } else {
      res.json({ message: "productos encontrado:", carts });
    }
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.cause);
    console.log(error.Number);
    next(error);
  }
};

export const getCartByIdController = async (req, res, next) => {
  try {
    const { idCart } = req.params;
    const cart = await cartsServices.getCartByIdService(idCart);

    if (cart) {
      const cartProducts = cart.cartProducts;
      if (cartProducts && cartProducts.length > 0) {
        res.json({ mesage: "Productos del carrito: ", cartProducts });
      } else {
        res.json({ mesage: "Carrito sin productos" });
      }
    } else {
      res.json({ mesage: "Carrito no encontrado" });
    }
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.cause);
    console.log(error.Number);
    next(error);
  }
};

export const addCartController = async (req, res, next) => {
  try {
    const cart = await cartsServices.addCartService();
    res.json({ mesage: "Carrito agregado", cart });
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.cause);
    console.log(error.Number);
    next(error);
  }
};

export const addProductToCartController = async (req, res, next) => {
  try {
    const { pid } = req.params;

    const product = await productsServices.getProductByIdService(pid);
    if (!product) {
      //res.json({ mesage: "Producto inexistente" });
      CustomError(
        ErrorsName.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        ErrorsMessage.PRODUCT_DATA_NO_EXIST,
        500,
        "Product not exist"
      );
      return;
    }
    const user = await usersServices.getUserByIdService(req.session.email);
    console.log("user cart", user.cart.id);
    const cart = await cartsServices.getCartByIdService(user.cart.id);
    console.log("cart encontrado:", cart);
    if (!cart) {
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
      );
      return;
    }
    await cartsServices.addProductCartService(cart.id, pid);
    res.json({ mesage: "Producto agregado" });
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.cause);
    console.log(error.Number);
    next(error);
  }
};

export const addProductCartController = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;

    const product = await productsServices.getProductByIdService(pid);
    if (!product) {
      CustomError(
        ErrorsName.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        ErrorsMessage.PRODUCT_DATA_NO_EXIST,
        500,
        "Product not exist"
      );
      return;
    }
    const cart = await cartsServices.getCartByIdService(cid);
    if (!cart) {
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
      );
      return;
    }
    await cartsServices.addProductCartService(cid, pid);
    res.json({ mesage: "Producto agregado" });
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.cause);
    console.log(error.Number);
    next(error);
  }
};

export const deleteCartController = async (req, res, next) => {};

export const deleteProductCartController = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    if (cid === "" || pid === "") {
      CustomError(
        ErrorsName.PRODUCT_DATA_ERROR,
        ErrorsCause.PRODUCT_DATA_ERROR,
        ErrorsMessage.PRODUCT_DATA_ERROR,
        500,
        "Input parameter missing"
      );
    }

    const product = await productsServices.getProductByIdService(pid);
    if (!product) {
      CustomError(
        ErrorsName.PRODUCT_DATA_NO_EXIST,
        ErrorsCause.PRODUCT_DATA_NO_EXIST,
        ErrorsMessage.PRODUCT_DATA_NO_EXIST,
        500,
        "Product not exist"
      );
      return;
    }
    const cart = await cartsServices.getCartByIdService(cid);

    if (cart) {
      await cartsServices.deleteProductCartService(cid, pid);
      res.json({ mesage: "Carrito encontrado, producto borrado", cart });
    } else {
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
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

export const deleteProductsCartController = async (req, res) => {
  try {
    const { cid } = req.params;
    if (cid === "") {
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "Input parameter missing"
      );
    }

    const cart = await cartsServices.getCartByIdService(cid);

    if (cart) {
      await cartsServices.deleteProductsCartService(cid);
      res.json({
        mesage: "Carrito encontrado, se borraron todos los productos",
        cart,
      });
    } else {
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
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

export const updateCartProductController = async (req, res) => {
  try {
    const { cid } = req.params;
    const { cartProducts } = req.body;

    if (cid === "") {
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "Input parameter missing"
      );
    }

    if (cartProducts === "") {
      CustomError(
        ErrorsName.PRODUCT_ADD_ERROR,
        ErrorsCause.PRODUCT_ADD_ERROR,
        ErrorsMessage.PRODUCT_ADD_ERROR,
        500,
        "Input parameter missing"
      );
    }

    const modifyProduct = await cartsServices.updateCartProductService(
      cid,
      cartProducts
    );
    console.log(modifyProduct);
    if (modifyProduct === "OK") {
      res.json({ mesage: "Carrito modificado" });
    } else {
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "Contact to administrator - Error update cartProducts"
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

export const updateCartProductQuantityController = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { cantidad } = req.body;

    if (cid === "" || pid === "") {
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "Input parameter missing"
      );
    }

    if (cantidad === "") {
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "Input parameter missing"
      );
    }

    const modifyProduct = await cartsServices.updateCartProductQuantityService(
      cid,
      pid,
      cantidad
    );
    console.log(modifyProduct);
    if (modifyProduct === "OK") {
      res.json({ mesage: "Producto modificado" });
    } else {
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "Contact to administrator - Error update product quantity"
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
