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
    const user = await this.#dao.getUserById(email);
    let userDTO = undefined
    if(user){
      userDTO= new usersDTOResponse(user)
    }
    return userDTO;
  };

  createUserRepository = async (user,cart) => {
    console.log("user normal", user)
    const userDTO = new usersDTOPersistence(user,cart)
    const createdUser = await this.#dao.createUser(userDTO);
    return createdUser;
  };

  createUserPassportRepository = async (user,cart) => {
    console.log("user passport", user)
    const userDTO = new usersDTOPersistence(user,cart)
    console.log("USER DTO ", userDTO)
    const createdUser = await this.#dao.createUserPassport(userDTO);
    return createdUser;
  };

  loginUserRepository = async (user) => {
    const loginUser = await this.#dao.loginUser(user);
    let userDTO = undefined
    if(loginUser){
      userDTO = new usersDTOResponse(loginUser)
    }
      return userDTO;
  };
}

export default new UsersRepository();
