import { applyMiddleware, combineReducers, createStore } from "redux";
import ModalTrailerReducer from "./reducers/ModalTrailerReducer";
import AuthReducer from "./reducers/AuthReducer";
import TimeFrameReducer from "./reducers/TimeFrameReducer";
import { thunk } from "redux-thunk";
import CinemaReducer from "./reducers/CinemaReducer";
import BookTicketReducer from "./reducers/BookTicketReducer";

const rootReducer = combineReducers({
  ModalTrailerReducer,
  AuthReducer,
  TimeFrameReducer,
  CinemaReducer,
  BookTicketReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
