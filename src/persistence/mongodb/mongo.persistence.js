import CartsManager from "./mongoManager/cartsManager.js";
import MessageManager from "./mongoManager/messagesManager.js";
import ProductsManager from "./mongoManager/productsManager.js";
import UserManager from "./mongoManager/UsersManager.js";
import { initMongo } from "./dbConfig.js";

export default class MongoPersistence {
  #cartsManager;
  #messageManager;
  #productManager;
  #userManager;

  constructor() {
    initMongo();
    this.#cartsManager = new CartsManager();
    this.#messageManager = new MessageManager();
    this.#productManager = new ProductsManager();
    this.#userManager = new UserManager();
  }

  async getCarts() {
    return this.#cartsManager.getCarts();
  }

  async getCartById(idCart) {
    return this.#cartsManager.getCartById(idCart);
  }

  async addCart(cart) {
    return this.#cartsManager.addCart(cart);
  }

  async addProductCart(cid, pid) {
    return this.#cartsManager.addProductCart(cid, pid);
  }

  async deleteCart(idCart) {
    return this.#cartsManager.deleteCart(idCart);
  }

  async deleteProductCart(cid, pid) {
    return this.#cartsManager.deleteProductCart(cid, pid);
  }

  async deleteProductsCart(cid) {
    return this.#cartsManager.deleteProductsCart(cid);
  }

  async updateCartProduct(cid, products) {
    return this.#cartsManager.updateCartProduct(cid, products);
  }

  async updateCartProductQuantity(cid, pid, cantidad) {
    return this.#cartsManager.updateCartProductQuantity(cid, pid, cantidad);
  }

  async getMessages() {
    return this.#messageManager.getMessages();
  }

  async addMessage(message) {
    return this.#messageManager.addMessage(message);
  }

  async getProducts_() {
    return this.#productManager.getProducts_();
  }

  async getProducts(limit, page, query, sort) {
    return this.#productManager.getProducts(limit, page, query, sort);
  }

  async getProductById(id) {
    return this.#productManager.getProductById(id);
  }

  async addProduct(producto) {
    return this.#productManager.add(producto);
  }

  async updateProduct(id, producto) {
    return this.#productManager.updateProduct(id, producto);
  }

  async deleteProduct(id) {
    return this.#productManager.deleteProduct(id);
  }

  async getUserById(email){
    return this.#userManager.getUserById(email)
  }

  async createUser(user) {
    return this.#userManager.createUser(user);
  }

  async createUserPassport(user) {
    return this.#userManager.createUserPassport(user);
  }

  async loginUser(user) {
    return this.#userManager.loginUser(user);
  }
}
