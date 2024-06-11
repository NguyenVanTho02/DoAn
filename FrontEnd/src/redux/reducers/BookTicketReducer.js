import {
  CHANGE_LISTSEAT,
  GET_SHOWINFO_FAIL,
  GET_SHOWINFO_REQUEST,
  GET_SHOWINFO_SUCCESS,
  INIT_DATA,
  RESET_DATA_BOOKTICKET,
  SET_STEP,
  CHANGE_PAYMETHOD
} from "../constrants/BookTicket";

const initialState = {
  // get showInfo
  loadingGetShowInfo: false,
  showInfo: {},
  errorGetShowInfo: null,
  // selecting seat
  listSeat: [],
  isSelectedSeat: false,
  listSeatSelected: [],
  listTicket: [],
  amount: 0,

  timeOut: false,
  isMobile: false,
  refreshKey: Date.now(),

  showID: null,
  userName: null,
  alertOver10: false,

  // payment
  userEmail: "",
  paymentMethod: "",
  isReadyPayment: false,
  activeStep: 0,
};

const BookTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    // initialization data
    case GET_SHOWINFO_REQUEST: {
      return {
        ...state,
        loadingGetShowInfo: true,
        errorGetShowInfo: null,
      };
    }
    case GET_SHOWINFO_SUCCESS: {
      return {
        ...state,
        showInfo: action.payload.data,
        loadingGetShowInfo: false,
      };
    }
    case GET_SHOWINFO_FAIL: {
      return {
        ...state,
        errorGetShowInfo: action.payload.error,
        loadingGetShowInfo: false,
      };
    }
    case RESET_DATA_BOOKTICKET: {
      return {
        ...state,
        showInfo: {},
        paymentMethod: "",
        isReadyPayment: false,
        isSelectedSeat: false,
        listSeatSelected: [],
        timeOut: false,
        activeStep: 0,
        listTicket: [],
        refreshKey: Date.now(),
        amount: 0,
        alertOver10: false,
      };
    }
    case INIT_DATA: {
      return {
        ...state,
        listSeat: action.payload.listSeat,
        showID: action.payload.showID,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail,
      };
    }
    case CHANGE_LISTSEAT: {
      return {
        ...state,
        listSeat: action.payload.listSeat,
        isSelectedSeat: action.payload.isSelectedSeat,
        listSeatSelected: action.payload.listSeatSelected,
        listTicket: action.payload.listTicket,
        amount: action.payload.amount,
      };
    }
    case CHANGE_PAYMETHOD: {

      return {
        ...state,
        paymentMethod:action.payload.paymentMethod
      };
    }
    case SET_STEP: {
      return {
        ...state,
        activeStep: action.payload.activeStep,
      };
    }

    default:
      return state;
  }
};

export default BookTicketReducer;
