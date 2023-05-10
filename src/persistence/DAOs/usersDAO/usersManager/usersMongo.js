import { comparePasswords, hashPassword } from "../../../../utils.js";

import { userModel } from "../../../mongodb/models/users.model.js";

export default class UsersManager {
  async getUserById(email) {
    const user = await userModel.findOne({ email: email });
    return user;
  }

  async createUserPassport(user) {
    const newuserDB = await userModel.create(user);
    return newuserDB;
  }

  async createUser(user) {
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
  }

  async loginUser(user) {
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
  }
}
