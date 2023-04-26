import productsRepository from "../repositories/products.repository.js";

class ProductsServices {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  getProductsService = async (limit, page, query, sort) => {
    const products = await this.#repository.getProductsRepository(
      limit,
      page,
      query,
      sort
    );
    return products;
  };

  getProducts_Service = async () => {
    const products = await this.#repository.getProducts_Repository();
    return products;
  };

  getProductByIdService = async (id) => {
    const product = await this.#repository.getProductByIdRepository(id);
    return product;
  };

  addProductService = async (producto) => {
    const product = await this.#repository.addProductRepository(producto);
    return product;
  };

  updateProductService = async (id, producto) => {
    const product = await this.#repository.updateProductRepository(
      id,
      producto
    );
    return product;
  };

  deleteProductService = async (id) => {
    const product = await this.#repository.deleteProductRepository(id);
    return product;
  };

  updateStock = async(id,stock) => {
    await this.#repository.updateStock(id,stock)
  }


}

export default new ProductsServices(productsRepository);
