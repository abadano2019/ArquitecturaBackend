import {
  getProductsService,
  getProducts_Service,
} from "../services/products.services.js";

import { getCartByIdService } from "../services/carts.services.js";

export const viewProductsController = async (req, res) => {
  console.log(req.query);
  const { page = 1 } = req.query;
  const { user } = req.session;
  const { sessionID } = req.sessionID;
  const productsPag = await getProductsService(5, page);
  console.log(productsPag);
  //const { sessionID } = req.sessionID
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
  const productsPag = await getProductsService(5, page);
  console.log(productsPag);
  const productsPaginate = {
    user: user.first_name + " " + user.last_name,
    productsPag: productsPag,
  };
  res.render("productsJWT", { productsPaginate, layout: "products" });
  console.log("hice el render");
};

export const viewChatController = async (req, res) => {
  res.render("chat", { layout: "chat" });
};

export const viewProductsRealTimeController = async (req, res) => {
  const products = await getProducts_Service();
  res.render("realTimeProducts", { products, layout: "realTime" });
};

export const viewProductsRealTime2Controller = async (req, res) => {
  const products = await getProducts_Service();
  res.render("realTimeProducts2", { products, layout: "altaProducto" });
};

export const viewListProductsController = async (req, res) => {
  const products = await getProducts_Service();
  console.log(products);
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
  const cart = await getCartByIdService(cid);
  console.log(cart);
  res.render("carts", { cart, layout: "carts" });
};
