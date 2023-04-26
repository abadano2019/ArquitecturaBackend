import cartsDAO from "./DAOs/cartsDAO/cartsDAO.js";
import { initMongo } from "./mongodb/dbConfig.js";
import messagesDAO from "./DAOs/messagesDAO/messagesDAO.js";
import productsDAO from "./DAOs/productsDAO/productsDAO.js";
import ticketsDAO from "./DAOs/ticketsDAO/ticketDAO.js"
import usersDAO from "./DAOs/usersDAO/userDAO.js";

export default class Factory {
  static #instance;

  #cartsDAO;
  #messagesDAO;
  #productsDAO;
  #usersDAO;
  #ticketsDAO;

  constructor() {
    let argv = process.argv[2];

    switch (argv) {
      case "fs":
        this.#usersDAO = new usersDAO("fs");
        this.#productsDAO = new productsDAO("fs");
        this.#messagesDAO = new messagesDAO("fs");
        this.#cartsDAO = new cartsDAO("fs");
        this.#ticketsDAO = new ticketsDAO("fs");
        console.log(argv);
        break;
      case "mongo":
        initMongo();
        this.#usersDAO = new usersDAO("mongo");
        this.#productsDAO = new productsDAO("mongo");
        this.#messagesDAO = new messagesDAO("mongo");
        this.#cartsDAO = new cartsDAO("mongo");
        this.#ticketsDAO = new ticketsDAO("mongo");
        console.log(argv);
        break;
      case "memory":
        this.#usersDAO = new usersDAO("memory");
        this.#productsDAO = new productsDAO("memory");
        this.#messagesDAO = new messagesDAO("memory");
        this.#cartsDAO = new cartsDAO("memory");
        this.#ticketsDAO = new ticketsDAO("memory");
        console.log(argv);
        break;
      case "sql":
        this.#usersDAO = new usersDAO("sql");
        this.#productsDAO = new productsDAO("sql");
        this.#messagesDAO = new messagesDAO("sql");
        this.#cartsDAO = new cartsDAO("sql");
        this.#ticketsDAO = new ticketsDAO("sql");
        console.log(argv);
        break;
      default:
        initMongo();
        this.#usersDAO = new usersDAO("mongo");
        this.#productsDAO = new productsDAO("mongo");
        this.#messagesDAO = new messagesDAO("mongo");
        this.#cartsDAO = new cartsDAO("mongo");
        this.#ticketsDAO = new ticketsDAO("mongo");
        console.log("Conectado por defecto a Mongodb");
        break;
    }
  }

  static getInstance() {
    if (this.#instance) {
      console.log("Instancia Factory utilizada !!!!");
      return this.#instance;
    } else {
      this.#instance = new Factory();
      console.log("Instancia Factory creada");
      return this.#instance;
    }
  }

  getUserDAO = () => {
    return this.#usersDAO;
  }
  getMessagesDAO = () =>{
    return this.#messagesDAO;
  }
  getProductsDAO = () =>{
    return this.#productsDAO;
  }
  getCartsDAO = ()  => {
    return this.#cartsDAO;
  }
  getTicketsDAO = ()  => {
    return this.#ticketsDAO;
  }
}
