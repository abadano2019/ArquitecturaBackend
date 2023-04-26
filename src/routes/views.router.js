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

import { Router } from "express";
import passport from "passport";
import { upload } from "../middlewares/multer.js";
import { viewChatController } from "../controllers/views.controller.js";

const router = new Router();

// Vista para ser utilizada con protocalo http, layout home,
router.get("/", viewListProductsController);

// Vista para ser utilizada con protocolo WebSocket, layount home, implementación de un Chat
router.get("/chat", viewChatController);

// Vista para ser utilizada para visualizar los productos paginados
router.get("/products", viewProductsController);

// Vista para ser utilizada para visualizar los productos paginados
router.get(
  "/productsCookies",
  passport.authenticate("current", { session: false }),
  viewProductsCookiesController
);

// Vista para ser utilizada con protocolo WebSocket, layount home
router.get("/realtimeproducts", viewProductsRealTimeController);

// Vista para ser utilizada con protocolo WebSocket, layount home
router.get("/realtimeproducts2", viewProductsRealTime2Controller);

router.get("/realTimeProductsDelete", deleteProductsRealTime2Controller);

router.get("/realTimeProductsModify", modifyProductsRealTime2Controller);

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

export default router;
