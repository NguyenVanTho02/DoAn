import { useDispatch, useSelector } from "react-redux";
import Button from "../components/button/Button";
import FromGroup from "../components/common/FromGroup";
import useToggleValue from "../components/hooks/useToggleValue";
import IconEyeToggle from "../components/icons/IconEyeToggle";
import Input from "../components/input/Input";
import { Label } from "../components/label";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { signInAction } from "../redux/actions/AuthAction";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ForgotPassword from "./ForgotPassword";
const schema = yup.object({
  email: yup.string().required("Email không được bỏ trống"),
  password: yup.string().required("Mật khẩu không được bỏ trống"),
});
const SignInPage = () => {
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const { currentUser, errorLogin, loadingLogin } = useSelector(
    (state) => state.AuthReducer
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.userRole == "Admin") {
        navigate("/admin/dashboard");
      } else if (currentUser.userRole == "Customer") {
        navigate("/");
      } else {
        navigate(-1);
      }
      toast.success("Đăng nhập thành công", { autoClose: 700 });
    }
  }, [currentUser]);
  useEffect(() => {
    if (errorLogin == 101) {
      toast.error("Tài khoản hoặc mật khẩu không đúng", { autoClose: 700 });
    }
    if (errorLogin == 107) {
      toast.error("Vui lòng xác nhận email của bạn", { autoClose: 700 });
    }
  }, [errorLogin]);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();
  const handleSignIn = (values) => {
    const user = {
      email: values.email,
      password: values.password,
    };
    dispatch(signInAction(user));
    navigate;
  };
  const handleSignIngg = async () => {
    const res11 = await axios.get(
      "https://localhost:43999/api/User/googlelogin"
    );
  };
  const handleCloseForgotPassword = () => {
    setIsForgotPasswordModalOpen(false);
  };
  const handleOnFogotPassword = () => {
    setIsForgotPasswordModalOpen(true);
  };
  return (
    <>
      <div>
        <form
          method="POST"
          action={`https://localhost:43999/api/User/googlelogin`}
        >
          <Button
            type="submit"
            className="flex items-center bg-[#ffffff] justify-center w-full py-4 mb-5 text-base font-semibold border gap-x-3 border-[#e5e5e5] rounded-xl text-text2 dark:text-white dark:border-darkStroke"
          >
            <img srcSet="/img/google.png 2x" alt="icon-google" />
            <span>Đăng nhập bằng google</span>
          </Button>
        </form>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <FromGroup>
            <Label htmlFor="email">Email *</Label>
            <Input
              control={control}
              name="email"
              placeholder="email"
              error={errors.email?.message}
            ></Input>
          </FromGroup>
          <FromGroup>
            <Label htmlFor="password">Mật khẩu *</Label>
            <Input
              control={control}
              name="password"
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Mật khẩu"
              error={errors.password?.message}
            >
              <IconEyeToggle
                open={showPassword}
                onClick={handleTogglePassword}
              ></IconEyeToggle>
            </Input>
          </FromGroup>
          <FromGroup>
            {errorLogin == 107 && (
              <div className="text-left">
                <span className="inline-block text-sm font-medium text-[#337ab7]">
                  Vui lòng xác nhận email của bạn
                </span>
              </div>
            )}
            <div className="text-right">
              <span
                onClick={handleOnFogotPassword}
                className="inline-block text-sm font-medium text-[#337ab7] cursor-pointer"
              >
                Quên mật khẩu
              </span>
            </div>
          </FromGroup>
          <Button
            className="w-full bg-[#337ab7] text-white"
            type="submit"
            isLoading={loadingLogin}
          >
            Đăng nhập
          </Button>
        </form>
      </div>
      {isForgotPasswordModalOpen && (
        <ForgotPassword
          isOpen={isForgotPasswordModalOpen}
          onClose={handleCloseForgotPassword}
        ></ForgotPassword>
      )}
    </>
  );
};

export default SignInPage;
