import { movieSevice } from "../../services/MovieService";
import { SET_DANH_SACH_PHIM } from "../constrants/Movie";

export const getListMovieAction = () => {
  return async (dispatch) => {
    try {
      const result = await movieSevice.getListMovie();
      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilm: result.data.data,
      });
    } catch (errors) {
      console.log("errors", errors);
    }
  };
};
