import logger from "../logger/winston.js"
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
      const userUpdated = await this.#repository.updateUserRoleRepository(
        user
      );
      
      return userUpdated;
    } catch (error) {
      logger.fatal("Error in updateUserRoleService, Log detail:", error);
      logger.fatal(error.name);
      logger.fatal(error.message);
      logger.fatal(error.cause);
      logger.fatal(error.Number);
    }
  };

}

export default new UsersServices(usersRepository);
