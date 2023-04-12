import {
  addCartService,
  addProductCartService,
  deleteCartService,
  deleteProductCartService,
  deleteProductsCartService,
  getCartByIdService,
  getCartsService,
  updateCartProductQuantityService,
  updateCartProductService,
} from "../services/carts.services.js";

import { getProductByIdService } from "../services/products.services.js";

export const getCartsController = async (req, res) => {
  const { limit } = req.query;
  console.log(limit);
  try {
    const carts = await getCartsService();
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
    const cart = await getCartByIdService(idCart);

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
  const createCart = () => (cart = { cartProducts: [] });

  try {
    const cart = createCart();
    await addCartService(cart);
    res.json({ mesage: "Carrito agregado", cart });
  } catch (error) {
    console.log(error);
  }
};

export const addProductCartController = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const product = await getProductByIdService(pid);
    if (!product) {
      res.json({ mesage: "Por aca. Producto inexistente" });
      return;
    }
    const cart = await getCartByIdService(cid);
    if (!cart) {
      res.json({ mesage: "Carrito no encontrado" });
      return;
    }
    await cartsManager.addProductCartService(cid, pid);
    res.json({ mesage: "Producto agregado" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartController = async (req, res) => {};

export const deleteProductCartController = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const product = await getProductByIdService(pid);
    if (!product) {
      res.json({ mesage: "Producto inexistente" });
      return;
    }
    const cart = await getCartByIdService(cid);

    if (cart) {
      await deleteProductCartService(cid, pid);
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
    const cart = await getCartByIdService(cid);

    if (cart) {
      await deleteProductsCartService(cid);
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

export const updateCartProductController = async(req,res) => {
  try {
    const { cid } = req.params;
    const { cartProducts } = req.body;

    const modifyProduct = await updateCartProductService(
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

export const updateCartProductQuantityController = async(req,res) => {

  try {
    const { cid, pid } = req.params;
    const { cantidad } = req.body;

    const modifyProduct = await updateCartProductQuantityService(
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
