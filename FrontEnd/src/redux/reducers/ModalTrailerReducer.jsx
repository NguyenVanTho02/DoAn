import { CLOSE_MODAL, OPEN_MODAL } from "../constrants/ModalTrailer";

const initialState = {
  open: false,
  urlYoutube: "",
};

const ModalTrailerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        open: action.payload.open,
        urlYoutube: action.payload.urlYoutube,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        open: action.payload.open,
        urlYoutube: "",
      };
    default:
      return state;
  }
};

export default ModalTrailerReducer;
