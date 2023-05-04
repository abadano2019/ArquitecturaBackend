import usersServices from "../services/users.services.js";

export const getAuthAdmin = function (req, res, next) {
  if (req.user) {
     if (token) {
      const user = usersServices.getUserByIdService(mail);
      const user_role = user.role;
      let allow = false;
      if (user_role == "admin") {
        allow = true;
      }

      if (allow) next();
      else {
        res.status(403).send({ error: "access denied" });
      }
    }
  } else {
    res.status(400).send({ error: "invalid token" });
  }
};

export const getAuthUser = async function (req, res, next) {
  if (req.user) {
    console.log(req.user.email)
    const user = await usersServices.getUserByIdService(req.user.email);
    console.log("usuario:", user)
    let user_role = user.role;
    console.log(user_role)
    let allow = false;
    if (user_role === "user") {
      allow = true;
    }
    if (allow) next();
    else {
      res.status(403).send({ error: "access denied" });
    }
  }
};

export const getAuthUserSession = async function (req, res, next) {
  if (req.session.email) {
    console.log(req.session.email)
    const user = await usersServices.getUserByIdService(req.session.email);
    console.log("usuario:", user)
    let user_role = user.role;
    console.log(user_role)
    let allow = false;
    if (user_role === "user") {
      allow = true;
    }
    if (allow) next();
    else {
      res.status(403).send({ error: "access denied" });
    }
  }
};

export const getAuthAdminSession = async function (req, res, next) {
  if (req.session.email) {
    console.log(req.session.email)
    const user = await usersServices.getUserByIdService(req.session.email);
    console.log("usuario:", user)
    let user_role = user.role;
    console.log(user_role)
    let allow = false;
    if (user_role === "admin") {
      allow = true;
      console.log("soy Admin")
    }
    if(allow) {
      console.log("next OK")
      next();
    }
    else {
      res.status(403).send({ error: "access denied" });
    }
  }
};
