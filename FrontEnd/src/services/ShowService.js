import { baseService } from "./baseService";

export class ShowService extends baseService {
  getListShow = (param) => {
    return this.get(`Show/Shows?${param}`);
  };

  createNewShow = (datajson) => {
    return this.post(`Show/CreateShow`, datajson);
  };

  removeShow = (id) => {
    return this.delete(`Show/DeleteShow?id=${id}`);
  };

  updateCinema = (id, datajson) => {
    return this.put(`Show/${id}`, datajson);
  };
  getListShowByMovie = (showVm) => {
    return this.post(`Show/GetListShowByMovie`, showVm);
  };
  getInfoShow = (showID) => {
    return this.get(`Show/${showID}`);
  };
  getMoviebyCinema = (showVm) => {
    return this.post(`Show/GetListMovieByCinema`, showVm);
  };
}

export const showService = new ShowService();
