import Product from "../js/product.js";
import productsServices from "../services/products.services.js";
import { socketServer } from "../app.js";

export const getProductsController = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, ...query } = req.query;
    const products = productsServices.getProductsService(limit, page, query, sort);
    res.json({ message: "productos encontrado:", products });
  } catch (error) {
    console.log("CODIGO GETPRODS: CONTACTAR AL ADMINISTRADOR DEL SITIO");
    console.log("LOG Detallado: " + error);
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const { idProduct } = req.params;
    const product = await productsServices.getProductByIdService(idProduct);

    if (product) {
      res.json({ mesage: "Producto encontrado", product });
    } else {
      res.json({ mesage: "Producto no encontrado" });
    }
  } catch (error) {
    console.log("CODIGO GETPRODID: CONTACTAR AL ADMINISTRADOR DEL SITIO");
    console.log("LOG: " + error);
  }
};

export const getProducts_Controller = async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productsServices.getProducts_Service();

    if (limit) {
      const productSlice = products.slice(0, limit);
      res.json({ message: "productos encontrado:", productSlice });
    } else {
      res.json({ message: "productos encontrado:", products });
    }
  } catch (error) {
    console.log("CODIGO GETPROD: CONTACTAR AL ADMINISTRADOR DEL SITIO");
    console.log("LOG: " + error);
  }
};

export const addProductController = async (req, res) => {
  const dataTypeValidation = (
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category
  ) => {
    if (typeof title !== "string") {
      return "Title es un campo string";
    }
    if (typeof description !== "string") {
      return "Description es un campo string";
    }
    if (typeof code !== "string") {
      return "Code es un campo string";
    }
    if (typeof category !== "string") {
      return "Category es un campo string";
    }
    if (typeof price !== "number") {
      return "Price es un campo numerico";
    }
    if (typeof stock !== "number") {
      return "Stock es un campo numerico";
    }
    if (typeof status !== "boolean") {
      return "status es un campo booleano";
    }
    return "ok";
  };

  const createProduct = (
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category
  ) => {
    // validación de los campos, se solicita que no sean vacios
    if (
      title === "" ||
      description === "" ||
      price === "" ||
      code === "" ||
      stock === "" ||
      status === "" ||
      category === ""
    ) {
      console.log(
        "Atención 4561: Verifique los campos a ingresar (title, description, price, thumbnails, code, stock, category)"
      );
      return "Atención: Verifique los campos a ingresar (title, description, price, thumbnails, code, stock, category)";
    }
    // crear producto
    if (thumbnails === undefined) {
      thumbnails = [];
    }
    const producto = new Product(
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category
    );
    return producto;
  };

  try {

    console.log(req.body)
    const {
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category,
    } = req.body;

    const priceInt = parseInt(price)
    const stockInt = parseInt(stock)
    const statusBool = Boolean(status)
    const validation = dataTypeValidation(
      title,
      description,
      priceInt,
      thumbnails,
      code,
      stockInt,
      statusBool,
      category
    );
    if (validation === "ok") {
      const product = createProduct(
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        status,
        category
      );

      if (typeof product === "string") {
        res.json({ mensaje: product });
        return "Validation product: " + product;
      }
      const cod = await productsServices.addProductService(product);
      console.log("codigo", cod);
      if (cod === "ADDPROD-COD1") {
        res.json({
          mesage:
            "ATENCION: Verifique el campo Code, el mismo ya existe en otro producto",
        });
      } else {
        if (cod === "ADDPROD-COD2") {
          const products = await productsServices.getProducts_Service();
          console.log(products);
          socketServer.emit("productoAgregado", { products });
          res.json({ mesage: "Producto agregado", product });
        }
      }
    } else {
      res.json({ mesage: "Error: ", validation });
    }
  } catch (error) {
    console.log("CODIGO ADDPROD: CONTACTAR AL ADMINISTRADOR DEL SITIO");
    console.log("LOG: " + error);
    res.json({ mesage: error });
  }
};

export const updateProductController = async (req, res) => {
  const dataTypeValidationUpdate = (
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category
  ) => {
    if (typeof title !== "string" && title !== undefined) {
      return "Title es un campo string";
    }
    if (typeof description !== "string" && description !== undefined) {
      return "Description es un campo string";
    }
    if (typeof code !== "string" && code !== undefined) {
      return "Code es un campo string";
    }
    if (typeof category !== "string" && category !== undefined) {
      return "Category es un campo string";
    }
    if (typeof price !== "number" && price !== undefined) {
      return "Price es un campo numerico";
    }
    if (typeof stock !== "number" && stock !== undefined) {
      return "Stock es un campo numerico";
    }
    if (typeof status !== "boolean" && status !== undefined) {
      return "status es un campo booleano";
    }
    if (!Array.isArray(thumbnails) && thumbnails !== undefined) {
      return "Thumbnails es un campo que recibe un array";
    }
    return "OK";
  };

  const createProductPut = (
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category
  ) => {
    const producto = new Product(
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category
    );
    return producto;
  };

  try {
    const { idProduct } = req.params;
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    } = req.body;

    const dataCheck = dataTypeValidationUpdate(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    );
    if (dataCheck !== "OK") {
      res.json({ mesage: dataCheck });
    }

    const product = createProductPut(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    );
    const modifyProduct = await productsServices.getProductByIdService(idProduct);
    if (modifyProduct) {
      const validation = await productsServices.updateProductService(idProduct, product);
      if (validation === "OK") {
        res.json({ mesage: "Producto modificado" });
      } else {
        res.json({ mesage: validation });
      }
    } else {
      res.json({ mesage: "No existe el producto a modificar" });
    }
  } catch (error) {
    console.log("CODIGO PUTPROD: CONTACTAR AL ADMINISTRADOR DEL SITIO");
    console.log("LOG: " + error);
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { idProduct } = req.params;
    const product = await productsServices.getProductByIdService(idProduct);

    if (product) {
      productsServices.deleteProductService(idProduct);
      const products = await productsServices.getProductsService();
      socketServer.emit("productoEliminado", { products });
      res.json({ mesage: "Producto eliminado", product });
    } else {
      res.json({ mesage: "Producto no encontrado" });
    }
  } catch (error) {
    console.log("CODIGO DELPROD: CONTACTAR AL ADMINISTRADOR DEL SITIO");
    console.log("LOG: " + error);
  }
};

export const updateStock = async(id,stock) =>{
  try{
    await productsServices.updateStock(id,stock)

  }catch(error){
    console.log(error1)
  }
}
