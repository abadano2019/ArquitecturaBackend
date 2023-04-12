import {
  createUserController,
  logOutUserController,
  loginUserController,
} from "../controllers/users.controller.js";

import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/users", (req, res) => {
  res.redirect("/views");
});

//registro con passport
router.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/views/errorRegistro",
    successRedirect: "/views/products",
    passReqToCallback: true,
  })
);

///////////////////////////////////////////
///////registro con passport gitHub////////
///////////////////////////////////////////
router.get(
  "/registroGithub",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/github", passport.authenticate("github"), (req, res) => {
  req.session.email = req.user.email;
  res.redirect("/views/perfil");
});

///////////////////////////////////////////
///////registro con passport google////////
///////////////////////////////////////////
router.get(
  "/registroGoogle",
  passport.authenticate("google", { scope: ['profile','email'] })
);

router.get("/google", passport.authenticate("google"), (req, res) => {
  req.session.email = req.user.email;
  res.redirect("/views/perfil");
});

///////////////////////////////////////////
///////registro con passport discord///////
///////////////////////////////////////////

router.get(
  "/discord",
  passport.authenticate("discord")
);

router.get("/registroDiscord", passport.authenticate("discord"), (req, res) => {
  req.session.email = req.user.email;
  res.redirect("/views/perfil");
});
////////////////////////////////////////////


router.post("/login", loginUserController);

router.get("/logout", logOutUserController);

export default router;
