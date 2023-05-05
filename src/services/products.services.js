import productsRepository from "../repositories/products.repository.js";

class ProductsServices {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  getProductsService = async (limit, page, query, sort) => {
    try {
      const products = await this.#repository.getProductsRepository(
        limit,
        page,
        query,
        sort
      );
      return products;
    } catch (error) {}
  };

  getProducts_Service = async () => {
    try {
      const products = await this.#repository.getProducts_Repository();
      return products;
    } catch (error) {}
  };

  getProductByIdService = async (id) => {
    try {
      console.log("entre en el servicio", id);
      const product = await this.#repository.getProductByIdRepository(id);
      console.log("producto del servicio", product);
      return product;
    } catch (error) {
      CustomError(
        ErrorsName.PRODUCT_DATA_ERROR,
        ErrorsCause.PRODUCT_DATA_ERROR,
        ErrorsMessage.PRODUCT_DATA_ERROR,
        500,
        "Contact Administrator - Service error"
      );
    }
  };

  addProductService = async (producto) => {
    try {
      const product = await this.#repository.addProductRepository(producto);
      return product;
    } catch (error) {}
  };

  updateProductService = async (id, producto) => {
    try {
      const product = await this.#repository.updateProductRepository(
        id,
        producto
      );
      return product;
    } catch (error) {}
  };

  deleteProductService = async (id) => {
    try {
      const product = await this.#repository.deleteProductRepository(id);
      return product;
    } catch (error) {}
  };

  updateStock = async (id, stock) => {
    try {
      await this.#repository.updateStock(id, stock);
    } catch (error) {}
  };
}

export default new ProductsServices(productsRepository);
