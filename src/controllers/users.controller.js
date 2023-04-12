import {
  createUserService,
  loginUserService,
} from "../services/users.services.js";

export const createUserController = async (req, res) => {
  return createUserService(user);
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUserService(req.body);
  console.log(user);
  if (user) {
    req.session.email = email;
    req.session.password = password;
    req.session.user = user.first_name;
    console.log("SessionID", req.sessionID);
    if (email === "adminCoder@mail.com") {
      req.session.isAdmin = true;
      res.redirect("/");
    } else {
      req.session.isAdmin = false;
      res.redirect(`/views/products/`);
    }
  } else {
    res.redirect("/views/errorLogin");
  }
};

export const logOutUserController = async (req, res) => {
  console.log("logout");
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      res.json({ message: error });
    } else {
      res.redirect("/views/login");
    }
  });
};
