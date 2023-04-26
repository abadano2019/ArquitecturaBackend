import usersFileSystem from "./usersManager/usersFileSystem.js";
import usersMemory from "./usersManager/usersMemory.js";
import usersMongo from "./usersManager/usersMongo.js";
import usersSQL from "./usersManager/usersSQL.js";

export default class UsersDAO {
  #usersDAO;

  constructor(argv) {
    switch (argv) {
      case "fs":
        const path = "src/persistence/fileSystem/";
        this.#usersDAO = new usersFileSystem(path + "users.json");
        break;
      case "mongo":
        this.#usersDAO = new usersMongo();
        break;
      case "memory":
        this.#usersDAO = new usersMemory();
        break;
      case "sql":
        this.#usersDAO = new usersSQL();
        break;
      default:
        this.#usersDAO = new usersMongo();
        break;
    }
  }

  async getUserById(email) {
    return this.#usersDAO.getUserById(email);
  }

  async createUser(user, cart) {
    return this.#usersDAO.createUser(user, cart);
  }

  async createUserPassport(user, cart) {
    return this.#usersDAO.createUserPassport(user, cart);
  }

  async loginUser(user) {
    return this.#usersDAO.loginUser(user);
  }
}
