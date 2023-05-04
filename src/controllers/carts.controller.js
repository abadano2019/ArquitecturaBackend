import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../error/errors.enum.js";

import CustomError from "../error/CustomError.js";
import cartsServices from "../services/carts.services.js";
import productsServices from "../services/products.services.js";
import usersServices from "../services/users.services.js";

export const getCartsController = async (req, res) => {
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
    console.log(error);
  }
};

export const getCartByIdController = async (req, res) => {
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
    console.log(error);
  }
};

export const addCartController = async (req, res) => {
  //const createCart = () => (cart = { cartProducts: [] });

  try {
    //const cart = createCart();
    const cart = await cartsServices.addCartService();
    res.json({ mesage: "Carrito agregado", cart });
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCartController = async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productsServices.getProductByIdService(pid);
    if (!product) {
      //res.json({ mesage: "Producto inexistente" });
      CustomError.createCustomError({
        name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
        cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE,
        message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
      });
      return;
    }
    const user = await usersServices.getUserByIdService(req.session.email);
    console.log("user cart", user.cart.id);
    const cart = await cartsServices.getCartByIdService(user.cart.id);
    console.log("cart encontrado:", cart);
    if (!cart) {
      res.json({ mesage: "Carrito no encontrado" });
      return;
    }
    await cartsServices.addProductCartService(cart.id, pid);
    res.json({ mesage: "Producto agregado" });
  } catch (error) {
    console.log(error);
  }
};

export const addProductCartController = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const product = await productsServices.getProductByIdService(pid);
    if (!product) {
      res.json({ mesage: "Por aca. Producto inexistente" });
      return;
    }
    const cart = await cartsServices.getCartByIdService(cid);
    if (!cart) {
      res.json({ mesage: "Carrito no encontrado" });
      return;
    }
    await cartsServices.addProductCartService(cid, pid);
    res.json({ mesage: "Producto agregado" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartController = async (req, res) => {};

export const deleteProductCartController = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const product = await productsServices.getProductByIdService(pid);
    if (!product) {
      res.json({ mesage: "Producto inexistente" });
      return;
    }
    const cart = await cartsServices.getCartByIdService(cid);

    if (cart) {
      await cartsServices.deleteProductCartService(cid, pid);
      res.json({ mesage: "Carrito encontrado, producto borrado", cart });
    } else {
      res.json({ mesage: "Carrito no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductsCartController = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsServices.getCartByIdService(cid);

    if (cart) {
      await cartsServices.deleteProductsCartService(cid);
      res.json({
        mesage: "Carrito encontrado, se borraron todos los productos",
        cart,
      });
    } else {
      res.json({ mesage: "Carrito no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateCartProductController = async (req, res) => {
  try {
    const { cid } = req.params;
    const { cartProducts } = req.body;

    const modifyProduct = await cartsServices.updateCartProductService(
      cid,
      cartProducts
    );
    console.log(modifyProduct);
    if (modifyProduct === "OK") {
      res.json({ mesage: "Carrito modificado" });
    } else {
      res.json({ mesage: validation });
    }
  } catch (error) {
    console.log("CODIGO PUTCartProd: CONTACTAR AL ADMINISTRADOR DEL SITIO");
    console.log("LOG: " + error);
  }
};

export const updateCartProductQuantityController = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { cantidad } = req.body;

    const modifyProduct = await cartsServices.updateCartProductQuantityService(
      cid,
      pid,
      cantidad
    );
    console.log(modifyProduct);
    if (modifyProduct === "OK") {
      res.json({ mesage: "Producto modificado" });
    } else {
      res.json({ mesage: modifyProduct });
    }
  } catch (error) {
    console.log(
      "CODIGO PUTCartProdQuantity: CONTACTAR AL ADMINISTRADOR DEL SITIO"
    );
    console.log("LOG: " + error);
  }
};
