import Factory from "../persistence/factory.js";
import cartDTOPersistence from "../persistence/DTOs/carts.DTO/cartDTOPersistence.js";
import cartDTOResponse from "../persistence/DTOs/carts.DTO/cartDTOResponse.js";

class CartsRepository {
  #dao;
  constructor() {
    const factory = Factory.getInstance();
    const cartDAO = factory.getCartsDAO();
    this.#dao = cartDAO;
  }

  getCartsRepository = async () => {
    const carts = await this.#dao.getCarts();
    const cartsResponse = [];
    carts.forEach((cart) => {
      const cartResponse = new cartDTOResponse(cart);
      cartsResponse.push(cartResponse);
    });
    return cartsResponse;
  };

  getCartByIdRepository = async (idCart) => {
    console.log("Ver")
    console.log(idCart)
    console.log("DAO",this.#dao)
    const cart = await this.#dao.getCartById(idCart);
    console.log(cart)
    const cartResponse = new cartDTOResponse(cart);
    return cartResponse;
  };

  addCartRepository = async () => {
    const cartPersistence = new cartDTOPersistence()
    const newCart = await this.#dao.addCart(cartPersistence);
    console.log("NEW CART",newCart)
    return newCart
  };

  addProductCartRepository = async (cid, pid) => {
    return await this.#dao.addProductCart(cid, pid);
  };

  deleteCartRepository = async (idCart) => {
    return await this.#dao.deleteCart(idCart);
  };

  deleteProductCartRepository = async (cid, pid) => {
    return await this.#dao.deleteProductCart(cid, pid);
  };

  deleteProductsCartRepository = async (cid) => {
    return await this.#dao.deleteProductsCart(cid);
  };

  updateCartProductRepository = async (cid, products) => {
    return await this.#dao.updateCartProduct(cid, products);
  };

  updateCartProductQuantityRepository = async (cid, pid, cantidad) => {
    return await this.#dao.updateCartProductQuantity(cid, pid, cantidad);
  };
}

export default new CartsRepository();
