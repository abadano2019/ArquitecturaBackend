import CartManager from './fileManager/cartsManager.js'
import ProductsManager from './fileManager/productsManager.js'

export default class FileSystemPersistence {

    constructor(pathCarts, pathProducts) {
        const cartManager = new CartManager(pathCarts);
        const productsManager = new ProductsManager(pathProducts);
    }

    async getProducts(){
        return this.productsManager.getProducts();
    }

    async getProductById(idProduct) {
        return this.productsManager.getProductById(idProduct);
    }

    async addProduct(producto) {
        return this.productsManager.addProduct(producto);
    }

    async updateProduct(id, producto){
        return this.productsManager.updateProduct(id,producto);
    }

    async updateProductPut(id, title,description,price,thumbnails,code,stock,status ,category){
        return this.productsManager.updateProductPut(id, title,description,price,thumbnails,code,stock,status ,category);
    }

    async deleteProduct(id){
        return this.productsManager.deleteProduct(id);
    }

    async getCarts() {
        return this.cartManager.getCarts();
    }

    async getCartById(idCart) {
        return this.cartManager.getCartById(idCart);
    }

    async addCart(cart) {
        return this.cartManager.addCart(cart)
    }

    async addProductCart(cid,pid){
        return this.cartManager.addProductCart(cid,pid)
    }

    async deleteCart(idCart){
        return this.cartManager.deleteCart(idCart);
    }



}