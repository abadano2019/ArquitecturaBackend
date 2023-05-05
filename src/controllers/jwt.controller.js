import {
  ErrorsCause,
  ErrorsMessage,
  ErrorsName,
} from "../error/errors.enum.js";

import CustomError from "../error/CustomError.js";
import { generateToken } from "../utils.js";
import usersService from "../services/users.services.js";

export const loginJwtController = async (req, res) => {
  try {
    if (req.body === "") {
      CustomError(
        ErrorsName.USER_DATA_ERROR,
        ErrorsCause.USER_DATA_ERROR,
        ErrorsMessage.USER_DATA_ERROR,
        500,
        "input data missing"
      );
    }

    const user = await usersService.loginUserService(req.body);
    if (user) {
      const token = generateToken(user);
      return res.cookie("token", token, { httpOnly: true }).json({ token });
    }
    CustomError(
      ErrorsName.USER_DATA_NO_EXIST,
      ErrorsCause.USER_DATA_NO_EXIST,
      ErrorsMessage.USER_DATA_NO_EXIST,
      500,
      "User not exist"
    );
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.cause);
    console.log(error.Number);
    next(error);
  }
};
