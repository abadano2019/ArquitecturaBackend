import File from "./fileSystem/fileSystem.persistence.js";
import Memory from "./memory/memory.persistence.js";
import Mongodb from "./mongodb/mongo.persistence.js";
import Sql from "./sql/sql.persistence.js";
import config from '../config.js';

let persistence;
let argv = process.argv[2];

switch (argv) {
  case "fs":
    const path = "src/persistence/fileSystem/";
    persistence = new File(path + "carts.json", path + "products.json");
    console.log(argv);
    break;
  case "mongo":
    persistence = new Mongodb();
    console.log(argv);
    console.log(config.CLIENTE_SECRET_GOOGLE)
    console.log(config.CLIENT_ID_GOOGLE)
    break;
  case "memory":
    persistence = new Memory();
    console.log(argv);
    break;
  case "sql":
    persistence = new Sql();
    console.log(argv);
    break;
  default:
    persistence = new Mongodb();
    console.log("Conectado por defecto a Mongodb");
    break;
}

export async function getCarts() {
  return persistence.getCarts();
}

export async function getCartById(idCart) {
  return persistence.getCartById(idCart);
}

export async function addCart(cart) {
  return persistence.addCart(cart);
}

export async function addProductCart(cid, pid) {
  return persistence.addProductCart(cid, pid);
}

export async function deleteCart(idCart) {
  return persistence.deleteCart(idCart);
}

export async function deleteProductCart(cid, pid) {
  return persistence.deleteProductCart(cid, pid);
}

export async function deleteProductsCart(cid) {
  return persistence.deleteProductsCart(cid);
}

export async function updateCartProduct(cid, products) {
  return persistence.updateCartProduct(cid, products);
}

export async function updateCartProductQuantity(cid, pid, cantidad) {
  return persistence.updateCartProductQuantity(cid, pid, cantidad);
}

export async function getMessages() {
  return persistence.getMessages();
}

export async function addMessage(message) {
  return persistence.addMessage(message);
}

export async function getProducts_() {
  return persistence.getProducts_();
}

export async function getProducts(limit, page, query, sort) {
  return persistence.getProducts(limit, page, query, sort);
}

export async function getProductById(id) {
  return persistence.getProductById(id);
}

export async function addProduct(producto) {
  return persistence.addProduct(producto);
}

export async function updateProduct(id, producto) {
  return persistence.updateProduct(id, producto);
}

export async function deleteProduct(id) {
  return persistence.deleteProduct(id);
}

export async function getUserById(email){
  return persistence.getUserById(email)
}

export async function createUser(user) {
  return persistence.createUser(user);
}

export async function createUserPassport(user) {
  return persistence.createUserPassport(user);
}

export async function loginUser(user) {
  return persistence.loginUser(user);
}
