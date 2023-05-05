import Factory from "../persistence/factory.js";
import usersDTOPersistence from "../persistence/DTOs/users.DTO/userDTOPersistence.js";
import usersDTOResponse from "../persistence/DTOs/users.DTO/userDTOResponse.js";

class UsersRepository {
  #dao;
  constructor() {
    const factory = Factory.getInstance();
    const userDAO = factory.getUserDAO();
    this.#dao = userDAO;
  }

  getUserByIdRepository = async (email) => {
    try {
      const user = await this.#dao.getUserById(email);
      let userDTO = undefined;
      if (user) {
        userDTO = new usersDTOResponse(user);
      }
      return userDTO;
    } catch (error) {}
  };

  createUserRepository = async (user, cart) => {
    try {
      console.log("user normal", user);
      const userDTO = new usersDTOPersistence(user, cart);
      const createdUser = await this.#dao.createUser(userDTO);
      return createdUser;
    } catch (error) {}
  };

  createUserPassportRepository = async (user, cart) => {
    try {
      console.log("user passport", user);
      const userDTO = new usersDTOPersistence(user, cart);
      console.log("USER DTO ", userDTO);
      const createdUser = await this.#dao.createUserPassport(userDTO);
      return createdUser;
    } catch (error) {}
  };

  loginUserRepository = async (user) => {
    try {
      const loginUser = await this.#dao.loginUser(user);
      let userDTO = undefined;
      if (loginUser) {
        userDTO = new usersDTOResponse(loginUser);
      }
      return userDTO;
    } catch (error) {}
  };
}

export default new UsersRepository();
