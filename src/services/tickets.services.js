import ticketsRepository from "../repositories/tickets.repository.js";

class TicketsServices {
  #repository
  constructor(repository){
    this.#repository = repository;
  }

  getTicketByUserService = async(email) => {
    return await this.#repository.getTicketByUserRepository(email);
  }
  
  addTicketService = async(ticket) =>{
    return await this.#repository.addTicketRepository(ticket);
  }
}

export default new TicketsServices(ticketsRepository)