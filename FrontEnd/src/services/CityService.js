import { baseService } from "./baseService";

export class CityService extends baseService {
  getListCity = () => {
    return this.get("City/List-city");
  };
  getNameCity = (id) => {
    return this.get(`City/Name-city/${id}`);
  };
  getListCinemaCity = () => {
    return this.get(`City/List-cinema`);
  };
}

export const cityService = new CityService();
