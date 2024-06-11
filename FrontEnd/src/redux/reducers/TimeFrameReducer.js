import {
  ADD_TIMEFRAME_FAIL,
  ADD_TIMEFRAME_REQUEST,
  ADD_TIMEFRAME_SUCCESS,
  GET_TIMEFRAME_LIST_FAIL,
  GET_TIMEFRAME_LIST_REQUEST,
  GET_TIMEFRAME_LIST_SUCCESS,
  UPDATE_TIMEFRAME_FAIL,
  UPDATE_TIMEFRAME_REQUEST,
  UPDATE_TIMEFRAME_SUCCESS,
} from "../constrants/TimeFrame";

const initialState = {
  timeFrameList: [],
  loadingTimeFrameList: false,
  errorTimeFrameList: null,

  successUpdateTimeFrame: "",
  loadingUpdateTimeFrame: false,
  errorUpdateTimeFrame: null,

  successDeleteTimeFrame: "",
  loadingDeleteTimeFrame: false,
  errorDeleteTimeFrame: null,

  successAddTimeFrame: "",
  loadingAddTimeFrame: false,
  errorAddTimeFrame: null,
};
const TimeFrameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIMEFRAME_LIST_REQUEST: {
      return {
        ...state,
        loadingTimeFrameList: true,
        errorTimeFrameList: null,
      };
    }
    case GET_TIMEFRAME_LIST_SUCCESS: {
      return {
        state,
        timeFrameList: action.payload.data.items,
        loadingTimeFrameList: false,
      };
    }
    case GET_TIMEFRAME_LIST_FAIL: {
      return {
        ...state,
        errorTimeFrameList: action.payload.error,
        loadingTimeFrameList: false,
      };
    }
    case ADD_TIMEFRAME_REQUEST: {
      return {
        ...state,
        loadingAddTimeFrame: true,
        errorAddTimeFrame: null,
      };
    }
    case ADD_TIMEFRAME_SUCCESS: {
      return {
        ...state,
        successAddTimeFrame: action.payload.data,
        loadingAddTimeFrame: false,
      };
    }
    case ADD_TIMEFRAME_FAIL: {
      return {
        ...state,
        errorAddTimeFrame: action.payload.error,
        loadloadingAddTimeFrame: false,
      };
    }
    case UPDATE_TIMEFRAME_REQUEST: {
      return {
        ...state,
        loadingUpdateTimeFrame: true,
        errorUpdateTimeFrame: null,
      };
    }
    case UPDATE_TIMEFRAME_SUCCESS: {
      return {
        ...state,
        loadingUpdateTimeFrame: false,
      };
    }
    case UPDATE_TIMEFRAME_FAIL: {
      return {
        ...state,
        errorUpdateTimeFrame: action.payload.errorr,
      };
    }
    default:
      return state;
  }
};

export default TimeFrameReducer;
