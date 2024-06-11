import { baseService } from "./baseService";

export class TheaterService extends baseService {
  getListSTheater = (param) => {
    return this.get(`Theater/ListTheater?${param}`)
  }

  getTheaterByCinema = (id) => {
    return this.get(`Theater/TheatersByCinema?cinemaID=${id}`)
  }

  createTheater = (datajson) => {
    return this.post (
      `Theater/CreateTheater`,
      datajson
    )
  }

  removeTheater = (id) => {
    return this.delete(`Theater/DeleteTheater/${id}`)
  }

  updateTheater = (id, datajson) => {
    return this.put(
      `Theater/UpdateTheater/${id}`, 
      datajson
      )
  }
}

export const theaterService = new TheaterService()


