import Factory from "../persistence/factory.js";
import messageDTOPersistence from "../persistence/DTOs/messages.DTO/messageDTOPersistence.js";
import messageDTOResponse from "../persistence/DTOs/messages.DTO/messageDTOResponse.js";

class MessagesRepository {
  #dao;
  constructor() {
    const factory = Factory.getInstance();
    this.#dao = factory.getMessagesDAO();
  }

  getMessagesRepository = async () => {
    const message = await this.#dao.getMessages();
    const messageDTO = new messageDTOResponse(message);
    return messageDTO;  
    
  };

  addMessageRepository = async (message) => {
    const messageDTO = new messageDTOPersistence(message)
    const newMessage = await this.#dao.addMessage(messageDTO);
    return newMessage 
  };
}

export default new MessagesRepository();
