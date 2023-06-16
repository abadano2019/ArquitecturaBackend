import cartsServices from "../services/carts.services.js";
import logger from "../logger/winston.js";
import productsServices from "../services/products.services.js";
import usersServices from "../services/users.services.js";

export const viewProductsController = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const { user } = req.session;
    if (user) {
      const { sessionID } = req.sessionID;
      logger.info("viewProductsController: SessionID:", sessionID);
      const productsPag = await productsServices.getProductsService(5, page);
      logger.info("viewProductsController: finded products:", productsPag);

      const productsPaginate = {
        user: user,
        productsPag: productsPag,
      };
      logger.info(
        "viewProductsController: finded products paginate:",
        productsPaginate
      );
      res.render("products", { productsPaginate, layout: "products" });
    } else {
      logger.error("viewProductsController: user not exist");
      CustomError(
        ErrorsName.USER_DATA_NO_EXIST,
        ErrorsCause.USER_DATA_NO_EXIST,
        ErrorsMessage.USER_DATA_NO_EXIST,
        500,
        "User not exist"
      );
    }
  } catch (error) {
    logger.fatal("Error in viewProductsController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const viewProductsCookiesController = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const user = req.user;
    if (user) {
      logger.info("viewProductsCookiesController: user cookie:", user);
      const productsPag = await productsServices.getProductsService(5, page);
      logger.info(
        "viewProductsCookiesController: finded products:",
        productsPag
      );
      const productsPaginate = {
        user: user.first_name + " " + user.last_name,
        productsPag: productsPag,
      };
      logger.info(
        "viewProductsCookiesController: finded products paginate:",
        productsPaginate
      );
      res.render("productsJWT", { productsPaginate, layout: "products" });
    } else {
      logger.error("viewProductsCookiesController: user not exist");
      CustomError(
        ErrorsName.USER_DATA_NO_EXIST,
        ErrorsCause.USER_DATA_NO_EXIST,
        ErrorsMessage.USER_DATA_NO_EXIST,
        500,
        "User not exist"
      );
    }
  } catch (error) {
    logger.fatal("Error in viewProductsCookiesController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const viewChatController = async (req, res) => {
  logger.info("viewChatController: executed chat view");
  res.render("chat", { layout: "chat" });
};

export const viewProductsRealTimeController = async (req, res) => {
  const products = await productsServices.getProducts_Service();
  logger.info(
    "viewProductsRealTimeController: executed products realtime view"
  );
  res.render("realTimeProducts", { products, layout: "realTime" });
};

export const viewProductsRealTime2Controller = async (req, res) => {
  const products = await productsServices.getProducts_Service();
  logger.info(
    "viewProductsRealTime2Controller: executed productos realtime2 view"
  );
  res.render("realTimeProducts2", { products, layout: "altaProducto" });
};

export const deleteProductsRealTime2Controller = async (req, res) => {
  logger.info(
    "deleteProductsRealTime2Controller: executed delete realtime view"
  );
  res.render("realTimeProductsDelete", { layout: "deleteProduct" });
};

export const modifyProductsRealTime2Controller = async (req, res) => {
  logger.info(
    "modifyProductsRealTime2Controller: executed modify realtime view"
  );
  res.render("realTimeProductsModify", { layout: "modifyProduct" });
};

export const viewListProductsController = async (req, res) => {
  const products = await productsServices.getProducts_Service();
  logger.info("viewListProductsController: executed list products view");
  res.render("home", { products, layout: "home" });
};

export const viewGetUpFileDocumentsController = async (req, res, next) => {
  logger.info("viewGetUpFileController: executed view getup file view");
  res.render("upfile_documents", { layout: "upfile" });
};

export const viewGetUpFileProductsController = async (req, res,next) => {
  logger.info("viewGetUpFileProductsController: executed view getup file view");
  res.render("upfile_products", { layout: "upfile" });
}

export const viewGetUpFileController = async (req, res, next) => {
  logger.info("viewGetUpFileController: executed view getup file view");
  res.render("upfile", { layout: "upfile" });
};

export const viewPutUpFileController = async (req, res, next) => {
  
  let pagina =
    "<!doctype html><html><head></head><body>" +
    "<p>Se subieron las fotos</p>" +
    '<br><a href="/">MENU</a></body></html>' +
    '<br><a href="/views/upfile">Subir más fotos</a></body></html>';
  logger.info("viewPutUpFileDocumentsController: executed put up file view");
  res.send(pagina);
};

export const putUpFileProductsController = async (req, res, next) =>{
  const files = req.files
  if(!files){
    const error = new Error("Please choose files")
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(files)
}

export const viewGetUpFileProfilesController = async (req, res,next) => {
  logger.info("viewGetUpFileProfilesController: executed view getup file view");
  res.render("upfile_profiles", { layout: "upfile" });
}

export const putUpFileProfilesController = async (req, res, next) =>{
  const files = req.files
  if(!files){
    const error = new Error("Please choose files")
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(files)
}

export const viewPutUpFileDocumentsController = async (req, res, next) => {
  
  const id_ = req.session.id_;
  const add = req.session.add;
  const edc = req.session.edc;

  console.log("Archivo id_",id_)
  console.log("Archivo add", add)
  console.log("Archivo edc", edc)
  
  const uid = req.session.email

  console.log("email", uid)

  const docs = {
    id_doc: id_,
    address: add,
    edc: edc,
  };

  console.log(docs)

  const user = await usersServices.setDocumentsService(uid, docs)
  
  console.log("USER USER", user)

  let pagina =
    "<!doctype html><html><head></head><body>" +
    "<p>Se subieron las fotos</p>" +
    '<br><a href="/">MENU</a></body></html>' +
    '<br><a href="/views/upfile">Subir más fotos</a></body></html>';
  logger.info("viewPutUpFileDocumentsController: executed put up file view");
  res.send(pagina);
};

export const viewCartByIdController = async (req, res) => {
  try {
    const { cid } = req.params;

    if (cid === "") {
      logger.error(
        "viewCartByIdController: id cart input parameter is missing"
      );
      CustomError(
        ErrorsName.CART_DATA_ERROR,
        ErrorsCause.CART_DATA_ERROR,
        ErrorsMessage.CART_DATA_ERROR,
        500,
        "missing input parameters"
      );
    }

    const cart = await cartsServices.getCartByIdService(cid);
    if (cart) {
      logger.info("viewCartByIdController: finded cart", cart);
      res.render("carts", { cart, layout: "carts" });
    } else {
      logger.warning("viewCartByIdController: cart not exist");
      CustomError(
        ErrorsName.CART_DATA_NO_EXIST,
        ErrorsCause.CART_DATA_NO_EXIST,
        ErrorsMessage.CART_DATA_NO_EXIST,
        500,
        "Cart not exist"
      );
    }
  } catch (error) {
    logger.fatal("Error in viewCartByIdController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};
