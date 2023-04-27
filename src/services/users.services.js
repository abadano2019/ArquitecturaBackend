import usersRepository from "../repositories/users.repository.js"

class UsersServices {
  #repository

  constructor(repository) {
    this.#repository = repository;
  }

  getUserByIdService = async (email) => {
    const user = await this.#repository.getUserByIdRepository(email); 
    return user
  };

  createUserService = async (user,cart) => {
    const createdUser = await this.#repository.createUserRepository(user,cart); 
    return createdUser
  };

  createUserPassportService = async (user,cart) => {
    const createdUser = await this.#repository.createUserPassportRepository(user,cart);
    console.log(createdUser)
    return createdUser
  };

  loginUserService = async (user) => {
    const loginUser = await this.#repository.loginUserRepository(user); 
    return loginUser
  };
}

export default new UsersServices(usersRepository);
