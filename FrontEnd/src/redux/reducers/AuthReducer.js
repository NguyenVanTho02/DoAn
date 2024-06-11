import { jwtDecode } from "jwt-decode";
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET_ERROR_LOGIN_REGISTER,
  LOGIN_SUCCESS,
  LOGOUT,
  RESET_REGISTER_REPONSE,
} from "../constrants/Auth";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
let currentUser = null;
if (token) {
  const decoded = jwtDecode(`${token}`);
  const expirationDate = decoded.exp;
  const currentTime = Date.now() / 1000;

  if (expirationDate < currentTime) {
    localStorage.removeItem("token");
  } else {
    const id =
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    const name =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    const role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const email =
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ];

    currentUser = {
      userId: id,
      userName: name,
      userRole: role,
      userEmail: email,
    };
  }
}
const initialState = {
  currentUser: currentUser,
  loadingLogin: false,
  errorLogin: null,
  responseRegister: null,
  loadingRegister: false,
  errorRegister: null,
};
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, loadingLogin: true, errorLogin: null }; // error: null trong trường error đang báo lỗi, nhấn đăng nhập lại thì cần reset lại không báo lỗi nữa
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload.data,
        loadingLogin: false,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        errorLogin: action.payload.error,
        loadingLogin: false,
      };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      return {
        ...state,
        currentUser: null,
        error: null,
        loading: false,
        responseRegister: null,
      };
    }
    case REGISTER_REQUEST: {
      return { ...state, loadingRegister: true, errorRegister: null };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        responseRegister: action.payload.data,
        loadingRegister: false,
      };
    }
    case REGISTER_FAIL: {
      return {
        ...state,
        errorRegister: action.payload.error,
        loadingRegister: false,
      };
    }
    case RESET_ERROR_LOGIN_REGISTER: {
      return {
        ...state,
        errorRegister: null,
        errorLogin: null,
      };
    }
    case RESET_REGISTER_REPONSE: {
      return {
        ...state,
        responseRegister: null,
      };
    }
    default:
      return state;
  }
};
export default AuthReducer;
