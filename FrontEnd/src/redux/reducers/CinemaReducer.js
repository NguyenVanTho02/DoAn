import { SELECT_CINEMA } from "../constrants/Cinema";

const initState = {
  cinemaID: 0,
  cinemaName: "Chọn rạp chiếu phim",
};
const CinemaReducer = (state = initState, action) => {
  switch (action.type) {
    case SELECT_CINEMA:
      return {
        ...state,
        cinemaID: action.payload.cinemaID,
        cinemaName:action.payload.cinemaName
      };
    default:
      return state;
  }
};

export default CinemaReducer;
