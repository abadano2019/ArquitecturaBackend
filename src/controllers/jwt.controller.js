import {generateToken} from "../utils.js";
import usersService from "../services/users.services.js";

export const loginJwtController = async (req, res) => {
  const user = await usersService.loginUserService(req.body);
  if (user) {
    console.log("------");
    const token = generateToken(user);
    return res.cookie("token", token, { httpOnly: true }).json({ token });
  }
  res.json({ message: "Usuario no existe" });
};
