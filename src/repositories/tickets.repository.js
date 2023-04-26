import Factory from "../persistence/factory.js";
import ticketDTOPersistence from "../persistence/DTOs/tickets.DTO/ticketDTOPersistence.js";
import ticketDTOResponse from "../persistence/DTOs/tickets.DTO/ticketDTOResponse.js";

class TicketsRepository {
  #dao;
  constructor() {
    const factory = Factory.getInstance();
    this.#dao = factory.getTicketsDAO();
  }

  getTicketByUserRepository = async (email) => {
    const ticket = await this.#dao.getTicketByUser(email);
    let ticketDTO = undefined; 
    if(ticket){
        ticketDTO = new ticketDTOResponse(ticket);
    }
    return ticketDTO;  
  };

  addTicketRepository = async (ticket) => {
    const messageDTO = new ticketDTOPersistence(ticket)
    const newTicket = await this.#dao.addPurchase(messageDTO);
    return newTicket 
  };
}

export default new TicketsRepository();
