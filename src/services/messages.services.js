import messagesRepository from "../repositories/messages.repository";

class MessagesServices{
  #respository
  constructor(respository){
    this.#drepository = respository;
  }

  getMessagesService = async() => {
    return await this.#respository.getMessagesRepository();
  }
  
  addMessageService = async(message) =>{
    return await this.#respository.addMessageRepository(message);
  }
}

export default new MessagesServices(messagesRepository)