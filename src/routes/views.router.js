import {
  deleteProductsRealTime2Controller,
  modifyProductsRealTime2Controller,
  viewCartByIdController,
  viewGetUpFileController,
  viewListProductsController,
  viewProductsController,
  viewProductsCookiesController,
  viewProductsRealTime2Controller,
  viewProductsRealTimeController,
  viewPutUpFileController,
} from "../controllers/views.controller.js";
import { getAuthAdminPremiumSession, getAuthAdminSession, getAuthUserSession } from "../middlewares/auth.middleware.js";

import { Router } from "express";
import logger from "../logger/winston.js"
import passport from "passport";
import { upload } from "../middlewares/multer.middleware.js";
import { viewChatController } from "../controllers/views.controller.js";

const router = new Router();

// Vista para ser utilizada con protocalo http, layout home,
router.get("/", viewListProductsController);

// Vista para ser utilizada con protocolo WebSocket, layount home, implementación de un Chat
router.get("/chat", getAuthUserSession, viewChatController);

// Vista para ser utilizada para visualizar los productos paginados
router.get("/products", getAuthUserSession, viewProductsController);

// Vista para ser utilizada para visualizar los productos paginados
router.get(
  "/productsCookies",
  passport.authenticate("current", { session: false }),
  viewProductsCookiesController
);

// Vista para ser utilizada con protocolo WebSocket, layount home
router.get("/realtimeproducts", viewProductsRealTimeController);

// Vista para ser utilizada con protocolo WebSocket, layount home
router.get("/realtimeproducts2", getAuthAdminPremiumSession, viewProductsRealTime2Controller);

router.get("/realTimeProductsDelete", getAuthAdminPremiumSession, deleteProductsRealTime2Controller);

router.get("/realTimeProductsModify", getAuthAdminSession, modifyProductsRealTime2Controller);

// Vista para ser utilizada para visualizar los productos de un carrito dado
router.get("/carts/:cid", viewCartByIdController);

// Vista para ser utilizada con protocolo WebSocket, layount home
router.get("/upfile", viewGetUpFileController);

router.post("/upfile", upload.array("foto", 2), viewPutUpFileController);

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/registro", (req, res) => {
  res.render("registro");
});

router.get("/resetPassword", (req, res) => {
  res.render("resetPassword");
});

router.get("/resetPassword/:email/token/:token", (req,res) => {
  const {email,token} = req.params
  const data = {
    email: email,
    token: token,
  }
  res.render("setNewPassword", {data})
});

router.get("/errorRegistro", (req, res) => {
  res.render("errorRegistro");
});

router.get("/errorLogin", (req, res) => {
  res.render("errorLogin");
});

router.get("/perfil", (req, res) => {
  res.render("perfil");
});

router.get("/jwtLoginFront", (req, res) => {
  res.render("jwt");
});

router.get("/loggerTest", (req, res) => {
  
  logger.fatal("Prueba de logger fatal")
  logger.error("Prueba de logger error")
  logger.warning("Prueba de logger warning")
  logger.info("Prueba de logger info")
  logger.http("Prueba de logger http")
  logger.debug("Prueba de logger debug")

  res.status(200).json("Winston test ejecutado")

});

export default router;
