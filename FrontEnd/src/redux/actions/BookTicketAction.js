import { showService } from "../../services/ShowService";
import {
  GET_SHOWINFO_FAIL,
  GET_SHOWINFO_REQUEST,
  GET_SHOWINFO_SUCCESS,
} from "../constrants/BookTicket";

export const getShowInfo = (showID) => {
  return (dispatch) => {
    dispatch({
      type: GET_SHOWINFO_REQUEST,
    });
    showService
      .getInfoShow(showID)
      .then((result) => {
        dispatch({
          type: GET_SHOWINFO_SUCCESS,
          payload: { data: result.data.data },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_SHOWINFO_FAIL,
          payload: {
            error: error.response?.data
              ? error.response.data.status
              : error.message,
          },
        });
      });
  };
};
