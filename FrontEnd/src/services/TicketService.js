import { baseService } from "./baseService";

export class TicketService extends baseService {
  getTicketInfo = (param) => {
    return this.get(`Payment/Tickets?${param}`);
  };
  getTicketDetail = (ticketVm) => {
    return this.post(`Payment/TicketDetail`, ticketVm);
  };
}

export const ticketService = new TicketService();
