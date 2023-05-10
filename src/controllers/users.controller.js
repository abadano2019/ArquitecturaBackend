import createUserService from "../services/carts.services.js";
import logger from "../logger/winston.js"
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

  const user = await usersServices.loginUserService(req.body);
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
