import cartsReposotory from "../repositories/carts.repository.js";
import productsServices from "./products.services.js";

class CartsServices {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }

  getCartsService = async () => {
    return await this.#repository.getCartsRepository();
  };

  getCartByIdService = async (idCart) => {
    return await this.#repository.getCartByIdRepository(idCart);
  };

  addCartService = async () => {
    const cart = await this.#repository.addCartRepository();
    return cart;
  };

  addProductCartService = async (cid, pid) => {
    return await this.#repository.addProductCartRepository(cid, pid);
  };

  deleteCartService = async (idCart) => {
    return await this.#repository.deleteCartRepository(idCart);
  };

  deleteProductCartService = async (cid, pid) => {
    return await this.#repository.deleteProductCartRepository(cid, pid);
  };

  deleteProductsCartService = async (cid) => {
    return await this.#repository.deleteProductsCartRepository(cid);
  };

  updateCartProductService = async (cid, products) => {
    return await this.#repository.updateCartProductRepository(cid, products);
  };

  updateCartProductQuantityService = async (cid, pid, cantidad) => {
    return await this.#repository.updateCartProductQuantityRepository(
      cid,
      pid,
      cantidad
    );
  };

  sumItemsCarts = async (cart) => {
    let total = 0;
    const products = await productsServices.getProducts_Service();
    await cart.forEach((cartProduct) => {
      let id = cartProduct.id._id.toString();
      let product = products.find((prod) => prod.id === id);
      total = total + product.price * cartProduct.quantity;
    });
    return total;
  };

  /*checkProductsCart = async (cart) => {
    let cartPurchase = [];
    let newCart = [];
    const products = await productsServices.getProducts_Service();

    await cart.forEach(async (cartProduct) => {
      let id = cartProduct.id._id.toString();
      let product = products.find((prod) => prod.id === id);
      if (product.stock >= cartProduct.quantity) {
        cartPurchase.push(cartProduct);
        let producto =
        {
          title:"",
          description:"",
          price:"",
          thumbnails:"",
          code:"",
          stock:product.stock - cartProduct.quantity, 
          status:"", 
          category:""
        }
        console.log("Id de producto a modificar:", id)
        const updatedProd = await productsServices.updateProductService(id,producto);

      } else {
        newCart.push(cartProduct);
      }
    });
    return [cartPurchase, newCart];
  };*/

  checkProductsCart = async (cart) => {
    let cartPurchase = [];
    let newCart = [];
    const products = await productsServices.getProducts_Service();

    for (let i = 0; i < cart.length; i++) {
      let id = cart[i].id._id.toString();
      let product = products.find((prod) => prod.id === id);
      if (product.stock >= cart[i].quantity) {
        cartPurchase.push(cart[i]);
        /*let producto = {
          title: "",
          description: "",
          price: "",
          thumbnails: "",
          code: "",
          stock: product.stock - cart[i].quantity,
          status: "",
          category: "",
        };
        console.log("Id de producto a modificar:", id);*/

        //const updatedProd = await productsServices.updateProductService(id,producto);
        let stock = product.stock - cart[i].quantity;
        await productsServices.updateStock(id, stock);
      } else {
        newCart.push(cart[i]);
      }
    }
    return [cartPurchase, newCart];
  };
}

export default new CartsServices(cartsReposotory);
