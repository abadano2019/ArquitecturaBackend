import Factory from "../persistence/factory.js";
import productsDTOPersistence from '../persistence/DTOs/products.DTO/productDTOPersistence.js';
import productsDTOResponse from '../persistence/DTOs/products.DTO/productDTOResponse.js';

class ProductsRepository {
  #dao;

  constructor(){
    const factory = Factory.getInstance();
    const productDAO = factory.getProductsDAO();
    this.#dao = productDAO
  }

  getProductsRepository = async(limit, page, query, sort) => {
    const products = await this.#dao.getProducts(limit, page, query, sort); 
    const productsResponse = [];
    
    (products.payload).forEach((product) => {
      const productResp = new productsDTOResponse(product)
      productsResponse.push(productResp)
    })
    return productsResponse
  }

  getProducts_Repository = async() => {
    const products = await this.#dao.getProducts_()
    const productsResponse = [];
    
    (products).forEach((product) => {
      const productResp = new productsDTOResponse(product)
      productsResponse.push(productResp)
    })
    return productsResponse
  }
  
  getProductByIdRepository = async(id) => {
    const product = await this.#dao.getProductById(id);
    let productDTO = undefined
    if(product){
       productDTO = new productsDTOResponse(product)  
    }
    return productDTO
  }
  
  addProductRepository = async(producto) => {
    const productDTO = new productsDTOPersistence(producto)
    const product = await this.#dao.addProduct(productDTO); 
    return product
  }
  
  updateProductRepository = async(id, producto) =>{
    const productDTO = new productsDTOPersistence(producto)
    const product = await this.#dao.updateProduct(id, productDTO); 
    return product
  }
  
  deleteProductRepository = async(id) => {
    const product = await this.#dao.deleteProduct(id);
    const productDTO = new productsDTOResponse(product)
    return productDTO
  }

  updateStock = async(id,stock) => {
    await this.#dao.updateStock(id,stock)
  }

}

export default new ProductsRepository()
