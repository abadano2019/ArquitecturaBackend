import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../error/errors.enum.js";
import {
  comparePasswords,
  decodeToken,
  expiredToken,
  generateToken,
  hashPassword,
} from "../utils.js";

import CustomError from "../error/CustomError.js";
import config from "../config.js";
import createUserService from "../services/carts.services.js";
import logger from "../logger/winston.js";
import { transporter } from "../nodemailer.js";
import usersServices from "../services/users.services.js";

export const createUserController = async (req, res) => {
  return createUserService(user);
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (email === "") {
    logger.error("loginUserController: email is missing");
    CustomError(
      ErrorsName.USER_DATA_ERROR,
      ErrorsCause.USER_DATA_ERROR,
      ErrorsMessage.USER_DATA_ERROR,
      500,
      "missing input parameters"
    );
  }

  if (password === "") {
    logger.error("loginUserController: password is missing");
    CustomError(
      ErrorsName.USER_DATA_ERROR,
      ErrorsCause.USER_DATA_ERROR,
      ErrorsMessage.USER_DATA_ERROR,
      500,
      "missing input parameters"
    );
  }

  /*const user = await usersServices.loginUserService(req.body);
  logger.info("loginUserController: finded user:", user);
  if (user) {
    req.session.email = user.email;
    req.session.user = user.fullName;
    if (email === "adminCoder@coder.com") {
      req.session.isAdmin = true;
      logger.info("loginUserController: admin is loged in:", email);
      res.redirect("/");
    } else {
      req.session.isAdmin = false;
      logger.info("loginUserController: user is loged in:", email);
      res.redirect(`/views/products/`);
    }
  } else {
    logger.warning("loginUserController: user not exist:");
    res.redirect("/views/errorLogin");
  }*/

  const user = await usersServices.loginUserService(req.body);
  logger.info("loginUserController: user finded:", user);
  if (user) {
    req.session.email = user.email;
    logger.info("loginUserController: email user session:", req.session.email)
    req.session.user = user.fullName;
    if (user.role === "admin") {
      req.session.isAdmin = true;
      logger.info("loginUserController: Role admin is loged in:", email);
      res.redirect("/");
    } else if (user.role === "premium"){
      req.session.isAdmin = false;
      logger.info("loginUserController: Role premium is loged in:", email);
      res.redirect("/");
    }else{
      req.session.isAdmin = false;
      logger.info("loginUserController: Role user is loged in:", email);
      res.redirect(`/views/products/`);
    }
  } else {
    logger.warning("loginUserController: user not exist:");
    res.redirect("/views/errorLogin");
  }

};

export const logOutUserController = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      logger.error("logOutUserController: error loged out", error);
      res.json({ message: error });
    } else {
      logger.info("logOutUserController: user loged out");
      res.redirect("/views/login");
    }
  });
};

export const forgotPasswordController = async (req, res, next) => {
  try {
    if (req.body.email === "") {
      logger.warning("forgotPasswordController: email is missing");
      CustomError(
        ErrorsName.USER_DATA_ERROR,
        ErrorsCause.USER_DATA_ERROR,
        ErrorsMessage.USER_DATA_ERROR,
        400,
        "missing input parameters"
      );
    }
    const user = await usersServices.getUserByIdService(req.body.email);
    if (!user) {
      logger.error("forgotPasswordController: user not exist");
      CustomError(
        ErrorsName.USER_DATA_NO_EXIST,
        ErrorsCause.USER_DATA_NO_EXIST,
        ErrorsMessage.USER_DATA_NO_EXIST,
        400,
        "user not exist"
      );
    }

    const tokenPassword = generateToken(user.email);
    await usersServices.updateUserTokenService(user.email, tokenPassword);
    const PORT = config.PORT;

    const mail = await transporter.sendMail({
      from: "BAZAR 5A",
      to: user.email,
      subject: "Reset password",
      text: `http://localhost:${PORT}/views/resetpassword/${user.email}/token/${tokenPassword}`,
    });

    logger.info(`forgotPasswordController: sended mail reset password`);
    res.status(200).send({ message: "Verify your email password reset" });
  } catch (error) {
    logger.fatal("Error in forgotPasswordController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    const { email, token } = req.params;
    const { password } = req.body;
    console.log("contraseña", password);
    console.log("email", email);

    const user = await usersServices.getUserByIdService(email);
    if (!user) {
      logger.error("resetPasswordController: user not exist");
      CustomError(
        ErrorsName.USER_DATA_NO_EXIST,
        ErrorsCause.USER_DATA_NO_EXIST,
        ErrorsMessage.USER_DATA_NO_EXIST,
        400,
        "user not exist"
      );
    }

    if (user.tokenResetPassword != token) {
      logger.error("resetPasswordController: token not valid");
      CustomError(
        ErrorsName.USER_DATA_ERROR,
        ErrorsCause.USER_DATA_ERROR,
        ErrorsMessage.USER_DATA_ERROR,
        400,
        "token not valid"
      );
    }

    if (await comparePasswords(password, user.password)) {
      logger.error(
        "resetPasswordController: password must be different than the previous one"
      );
      CustomError(
        ErrorsName.USER_DATA_ERROR,
        ErrorsCause.USER_DATA_ERROR,
        ErrorsMessage.USER_DATA_ERROR,
        400,
        "invalid new password, must be differente than the previuous one"
      );
    }

    if (expiredToken(token)) {
      const data = {
        text: "Token expired - request a new one",
      };
      console.log("explired token");
      res.render("resetPassword", { data });
    } else {
      const userUpdated = await usersServices.updateUserPasswordService(
        email,
        password,
        token
      );
      logger.info("resetPasswordController: password reset successfully");
      res.status(200).send({ message: "password reset" });
    }
  } catch (error) {
    logger.fatal("Error in resetPasswordController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};

export const changeUserRoleController = async (req, res, next) => {
  try {
    const { email } = req.params;

    console.log("email", email);

    const user = await usersServices.getUserByIdService(email);
    if (!user) {
      logger.error("changeUserRoleController: user not exist");
      CustomError(
        ErrorsName.USER_DATA_NO_EXIST,
        ErrorsCause.USER_DATA_NO_EXIST,
        ErrorsMessage.USER_DATA_NO_EXIST,
        400,
        "user not exist"
      );
    }

    if (user.role === "admin") {
      logger.warning("user role is admin, not allowed to change it");
      res
        .status(403)
        .send({ message: "user role is admin, not allowed to change it" });
    } else {
      const userUpdated = await usersServices.updateUserRoleService(
        email
      );
      logger.info("changeUserRoleController: role changed successfully");
      res.status(200).send({ message: "role changed successfully" });
    }
  } catch (error) {
    logger.fatal("Error in resetPasswordController, Log detail:", error);
    logger.fatal(error.name);
    logger.fatal(error.message);
    logger.fatal(error.cause);
    logger.fatal(error.Number);
    next(error);
  }
};
