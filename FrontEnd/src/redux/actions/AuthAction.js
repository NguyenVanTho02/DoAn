import { jwtDecode } from "jwt-decode";
import { applicationUserService } from "../../services/ApplicationUserService";

import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_REGISTER_REPONSE,
} from "../constrants/Auth";

export const signInAction = (user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });
      const result = await applicationUserService.signIn(user);
      if (result.data.code == 200) {
        localStorage.setItem("token", result.data.data);
        const decoded = jwtDecode(`${result.data.data}`);
        const id =
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];
        const name =
          decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        const role =
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        const email =
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ];
        const currentUser = {
          userId: id,
          userName: name,
          userRole: role,
          userEmail: email,
        };
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            data: currentUser,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          error: error.response?.data
            ? error.response.data.status
            : error.message,
        },
      });
    }
  };
};
export const logOutAction = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    });
  };
};
export const signUpAction = (user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });
      const result = await applicationUserService.signUp(user);
      if (result.data.status == 200) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: {
            data: result.data.status,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: error.response?.data
            ? error.response.data.status
            : error.message,
        },
      });
    }
  };
};
export const registerState = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_REGISTER_REPONSE,
    });
  };
};
// export const resetErrorLoginRegister = () => {
//   return (dispatch) => {
//     dispatch({
//       type: RESET_ERROR_LOGIN_REGISTER,
//     });
//   };
// };
