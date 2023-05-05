import cartsServices from "../services/carts.services.js";
import productsServices from "../services/products.services.js";

export const viewProductsController = async (req, res) => {
  console.log(req.query);
  const { page = 1 } = req.query;
  const { user } = req.session;
  console.log("User Session", req.session);
  const { sessionID } = req.sessionID;
  const productsPag = await productsServices.getProductsService(5, page);
  console.log(productsPag);
  console.log("sessionID", sessionID);
  const productsPaginate = {
    user: user,
    productsPag: productsPag,
  };
  res.render("products", { productsPaginate, layout: "products" });
};

export const viewProductsCookiesController = async (req, res) => {
  const { page = 1 } = req.query;
  const user = req.user;
  console.log("user cookie", user);
  const productsPag = await productsServices.getProductsService(5, page);
  console.log(productsPag);
  const productsPaginate = {
    user: user.first_name + " " + user.last_name,
    productsPag: productsPag,
  };
  res.render("productsJWT", { productsPaginate, layout: "products" });
};

export const viewChatController = async (req, res) => {
  res.render("chat", { layout: "chat" });
};

export const viewProductsRealTimeController = async (req, res) => {
  const products = await productsServices.getProducts_Service();
  res.render("realTimeProducts", { products, layout: "realTime" });
};

export const viewProductsRealTime2Controller = async (req, res) => {
  const products = await productsServices.getProducts_Service();
  res.render("realTimeProducts2", { products, layout: "altaProducto" });
};

export const deleteProductsRealTime2Controller = async (req, res) => {
  res.render("realTimeProductsDelete", { layout: "deleteProduct" });
};

export const modifyProductsRealTime2Controller = async (req, res) => {
  res.render("realTimeProductsModify", { layout: "modifyProduct" });
};

export const viewListProductsController = async (req, res) => {
  const products = await productsServices.getProducts_Service();
  res.render("home", { products, layout: "home" });
};

export const viewGetUpFileController = async (req, res, next) => {
  res.render("upfile", { layout: "upfile" });
};

export const viewPutUpFileController = async (req, res, next) => {
  let pagina =
    "<!doctype html><html><head></head><body>" +
    "<p>Se subieron las fotos</p>" +
    '<br><a href="/">MENU</a></body></html>' +
    '<br><a href="/views/upfile">Subir más fotos</a></body></html>';
  res.send(pagina);
};

export const viewCartByIdController = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartsServices.getCartByIdService(cid);
  console.log(cart);
  res.render("carts", { cart, layout: "carts" });
};
