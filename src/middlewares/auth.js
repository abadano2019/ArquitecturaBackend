import usersServices from "../services/users.services.js";

/*const getAuth = (req, res, next) => {
    if(req.user) {
  // query to get the user role's  permissions for a resource
      if(token){
      // handle jwt token authenticity and decrypt payload
      // get permission handler
      const user = usersServices.getUserByIdService(mail)
      const user_role = user.role
      //db.getPerms({ role_id: req.user.role_id, resource_id: req.resource.id})
      //.then((perms) => {
         const allow = false;
         // mapping of methods to permissions
         perms.forEach(function(perm){
             if (req.method == "POST" && perms.create) allow = true;
             else if (req.method == "GET" && perms.read) allow = true;
             else if (req.method == "PUT" && perms.write) allow = true;
             else if (req.method == "DELETE" && perm.delete) allow = true;
  })
         if (allow) next();
         else {
              res.status(403).send({error: 'access denied'});
          }
      })
      .catch((err)=> {
         //handle your reject and catch here
      })
  } else{
      res.status(400).send({error: 'invalid token'})
  }
   */

export const getAuthAdmin = function (req, res, next) {
  if (req.user) {
    // query to get the user role's  permissions for a resource
    if (token) {
      // handle jwt token authenticity and decrypt payload
      // get permission handler
      const user = usersServices.getUserByIdService(mail);
      const user_role = user.role;
      const allow = false;
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
    const user_role = user.role;
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
