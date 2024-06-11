import { baseService } from "./baseService";
export class SeatService extends baseService {
  createListSeat = (seatVm) => {
    return this.post(`Seat/CreateListSeat`, seatVm);
  };
  getListSeatByTheater = (theaterID) => {
    return this.get(`Seat/ListSeatByTheater?theaterID=${theaterID}`);
  };
  updateListSeat = (datajson) => {
    return this.put(`Seat/UpdateSeats`, datajson);
  };
  updateSeat = (seatID, seatVm) => {
    return this.put(`Seat/UpdateSeat/${seatID}`, seatVm);
  };
}
export const seatService = new SeatService();
