import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../../../../error/errors.enum.js";
import { comparePasswords, hashPassword } from "../../../../utils.js";

import CustomError from "../../../../error/CustomError.js"
import logger from "../../../../logger/winston.js";
import { userModel } from "../../../mongodb/models/users.model.js";

export default class UsersManager {
  async getUserById(email) {
    const user = await userModel.findOne({ email: email });
    return user;
  }

  createUserPassport = async (user) => {
    const newuserDB = await userModel.create(user);
    return newuserDB;
  };

  createUser = async (user) => {
    const { email, password } = user;
    try {
      const existeUsuario = await userModel.find({ email });
      let roleUser = "user";
      console.log("existe", existeUsuario);
      if (existeUsuario.length === 0) {
        console.log(email);
        if (email === "adminCoder@coder.com") {
          roleUser = "admin";
        }
        const hashNewPassword = await hashPassword(password);
        const newUser = {
          ...user,
          password: hashNewPassword,
          role: roleUser,
          cart: user.cart,
        };
        await userModel.create(newUser);
        return newUser;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  loginUser = async (user) => {
    const { email, password } = user;
    const usuario = await userModel.findOne({ email });

    if (usuario) {
      const isPassword = await comparePasswords(password, usuario.password);
      if (isPassword) {
        console.log("son iguales");
        return usuario;
      }
    }
    return null;
  };

  updateUserToken = async (email, token) => {
    try {
      console.log("enté en el DAO", email);
      let user = await userModel.findOne({ email });
      console.log("encontré el usuario", user);
      if (user) {
        console.log("user", user);
        user.tokenResetPassword = token;
        await user.save();
        logger.info(
          "Level DAO - updateUserToken: token resete password updated"
        );
      } else {
        logger.warning("Level DAO - updateUserToken: user not exist");
      }
      return user;
    } catch (error) {
      logger.warning("Level DAO - updateUserToken: user not exist");
      logger.fatal("Error in updateUserToken, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

  updateUserPassword = async (email, password, token) => {
    try {
      const passwordEncrypt = await hashPassword(password);
      let user = await userModel.findOne({ email });
      if (user) {
        console.log(user.tokenResetPassword);

        if (user.tokenResetPassword === token) {
          user.password = passwordEncrypt;
          user.tokenResetPassword = "";
          await user.save();
          logger.info("Level DAO - updateUserPassword: password updated");
        } else {
          logger.error("Level DAO - updateUserPassword: invalid token");
          CustomError(
            ErrorsName.USER_DATA_ERROR,
            ErrorsCause.USER_DATA_ERROR,
            ErrorsMessage.USER_DATA_ERROR,
            400,
            "token no valid"
          );
        }
      } else {
        CustomError(
          ErrorsName.USER_DATA_NO_EXIST,
          ErrorsCause.USER_DATA_NO_EXIST,
          ErrorsMessage.USER_DATA_NO_EXIST,
          400,
          "User not exist"
        );
      }
      return user;
    } catch (error) {
      logger.warning("Level DAO - updateUserPassword: user not exist");
      logger.fatal("Error in updateUserPassword, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };


updateUserRole = async (email) => {
    try {
      console.log("enté en el DAO", email);
      let user = await userModel.findOne({ email });
      console.log("encontré el usuario", user);
      if (user) {
        console.log("user", user);
        if (user.role === "user"){
          user.role = "premium";
          "Level DAO - updateUserRole: user role updated to premium role"
        }else{
          user.role = "user"
          "Level DAO - updateUserRole: user role updated to user role"
        }
        await user.save();
        logger.info(
          "Level DAO - updateUserRole: user role updated"
        );
      } else {
        logger.warning("Level DAO - updateUserRole: user not exist");
      }
      return user;
    } catch (error) {
      logger.warning("Level DAO - updateUserRole: user not exist");
      logger.fatal("Error in updateUserRole, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };
}