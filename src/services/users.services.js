import usersRepository from "../repositories/users.repository.js"

class UsersServices {
  #repository

  constructor(repository) {
    this.#repository = repository;
  }

  getUserByIdService = async (email) => {
    try{
    const user = await this.#repository.getUserByIdRepository(email); 
    return user
    }catch(error){}
  };

  createUserService = async (user,cart) => {
    try{
    const createdUser = await this.#repository.createUserRepository(user,cart); 
    return createdUser
    }catch(error){}
  };

  createUserPassportService = async (user,cart) => {
    try{
    const createdUser = await this.#repository.createUserPassportRepository(user,cart);
    console.log(createdUser)
    return createdUser
    }catch(error){}
  };

  loginUserService = async (user) => {
    try{
    const loginUser = await this.#repository.loginUserRepository(user); 
    return loginUser
    }catch(error){}
  };
}

export default new UsersServices(usersRepository);
