import { baseService } from "./baseService";

export class ApplicationUserService extends baseService {
  signIn = (user) => {
    return this.post(`User/SignIn`, user);
  };

  signUp = (user) => {
    return this.post(`User/SignUp`, user);
  };

  confirmEmail = (mailVm) => {
    return this.post(`User/ConfirmEmail`, mailVm);
  };

  getListUser = (param) => {
    return this.get(`User/Users?${param}`);
  };

  getUserByUserName = (value) => {
    return this.get(`User/${value}`);
  };

  updateInfoUser = (userData) => {
    return this.put(`User/UpdateUser`, userData);
  };
  getBookingHistory = (userVm) => {
    return this.post(`User/BookingHistory`, userVm);
  };
  forgotPassword = (passwordVm) => {
    return this.post(`User/ForgotPassword`, passwordVm);
  };
  changePassword = (changePasswordVm) => {
    return this.post(`User/ChangePassword`, changePasswordVm);
  };
}
export const applicationUserService = new ApplicationUserService();
