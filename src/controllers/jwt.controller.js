import {generateToken} from "../utils.js";
import { loginUserService } from "../services/users.services.js";

export const loginJwtController = async (req, res) => {
  const user = await loginUserService(req.body);
  if (user) {
    console.log("------");
    const token = generateToken(user);
    return res.cookie("token", token, { httpOnly: true }).json({ token });
  }
  res.json({ message: "Usuario no existe" });
};
