import logger from "../logger/winston.js";
import usersRepository from "../repositories/users.repository.js";

class UsersServices {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  getUserByIdService = async (email) => {
    try {
      const user = await this.#repository.getUserByIdRepository(email);
      return user;
    } catch (error) {}
  };

  createUserService = async (user, cart) => {
    try {
      const createdUser = await this.#repository.createUserRepository(
        user,
        cart
      );
      return createdUser;
    } catch (error) {}
  };

  createUserPassportService = async (user, cart) => {
    try {
      const createdUser = await this.#repository.createUserPassportRepository(
        user,
        cart
      );
      console.log(createdUser);
      return createdUser;
    } catch (error) {}
  };

  loginUserService = async (user) => {
    try {
      const loginUser = await this.#repository.loginUserRepository(user);
      return loginUser;
    } catch (error) {}
  };

  updateUserTokenService = async (user, token) => {
    try {
      const userUpdated = await this.#repository.updateUserTokenRepository(
        user,
        token
      );
      return userUpdated;
    } catch (error) {
      console.log(error);
    }
  };

  updateUserPasswordService = async (user, password, token) => {
    try {
      const userUpdated = await this.#repository.updateUserPasswordRepository(
        user,
        password,
        token
      );

      return userUpdated;
    } catch (error) {
      logger.fatal("Error in updateUserPasswordService, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

  updateUserRoleService = async (user) => {
    try {
      const userUpdated = await this.#repository.updateUserRoleRepository(user);

      return userUpdated;
    } catch (error) {
      logger.fatal("Error in updateUserRoleService, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

  userLogInOutRegistryService = async (uid, type, datetime) => {
    try {
      const userUpdated = await this.#repository.userLogInOutRegistryRepository(
        uid,
        type,
        datetime
      );

      return userUpdated;
    } catch (error) {
      logger.fatal("Error in userLogInOutRegistryService, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

  setDocumentsService = async (uid, docs) => {
    try {
      logger.info("setDocumentsService, user email:", uid);
      logger.info("setDocumentsService, user docs:", docs);
      const user = await this.#repository.setDocumentsRepository(uid,docs)
      logger.info("setDocumentsService: set documentos OK")
      return user
      
    } catch (error) {
      logger.fatal("Error in setDocumentsService, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

  validateDocumentsService = async (uid) =>{
    try{
      logger.info("validateDocumentsService, user email:", uid);
      const email = uid;
      console.log("email", email)
      const user = await this.#repository.getUserByIdRepository(email)
      console.log("user:", user)
      const docs = user.docs
      console.log(docs)
      if(docs.length == 0)
      //if((docs[0]?.id_doc == "") || (docs[0]?.address == "") || (docs[0]?.edc == "") )
        {
          logger.info("validateDocumentsService: some documents are missing")
          return false
        }
      else
      {
        logger.info("validateDocumentsService: documents OK")
        return true
      }
    }catch (error){

      logger.fatal("Error in validateDocumentsService, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);

    }
  }

}

export default new UsersServices(usersRepository);
