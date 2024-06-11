import Button from "../components/button/Button";
import IconEyeToggle from "../components/icons/IconEyeToggle";
import Input from "../components/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../components/label";
import FromGroup from "../components/common/FromGroup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useToggleValue from "../components/hooks/useToggleValue";
import { registerState, signUpAction } from "../redux/actions/AuthAction";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required("Tên tài khoản không được bỏ trống!"),
  email: yup
    .string()
    .email("Định dạng email không chính xác")
    .required("Email không được bỏ trống"),
  password: yup
    .string()
    .required("Mật khẩu không được trống")
    .min(8, "Mật khẩu tối thiểu 8 ký tự")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
      "Mật khẩu phải chứa ít nhất một chữ hoa và một ký tự đặc biệt"
    ),
});
const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errorRegister, responseRegister, loadingRegister } = useSelector(
    (state) => state.AuthReducer
  );
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
  const handleSignUp = (values) => {
    var user = {
      username: values.name,
      email: values.email,
      password: values.password,
    };
    console.log(user);
    dispatch(signUpAction(user));
  };
  console.log("responseRegister", responseRegister);
  useEffect(() => {
    if (responseRegister) {
      toast.success("Đăng ký thành công");
      navigate("/sign-in");
      dispatch(registerState());
    }
  }, [responseRegister]);
  useEffect(() => {
    if (errorRegister == 102) {
      toast.error("Tên tài khoản đã tồn tại");
    }
    if (errorRegister == 103) {
      toast.error("Email đã tồn tại");
    }
  }, [errorRegister]);
  return (
    <div>
      <button className="flex items-center bg-[#ffffff] justify-center w-full py-4 mb-5 text-base font-semibold border gap-x-3 border-[#e5e5e5] rounded-xl text-text2 dark:text-white dark:border-darkStroke">
        <img srcSet="/img/google.png 2x" alt="icon-google" />
        <span>Đăng nhập bằng google</span>
      </button>

      <form onSubmit={handleSubmit(handleSignUp)}>
        <FromGroup>
          <Label htmlFor="name">Tên tài khoản *</Label>
          <Input
            control={control}
            name="name"
            placeholder="Tên tài khoản"
          ></Input>
          {errors.name && (
            <Alert variant="outlined" severity="error">
              {errors.name?.message}
            </Alert>
          )}
        </FromGroup>
        <FromGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            control={control}
            name="email"
            type="email"
            placeholder="Email"
          ></Input>
          {errors.email && (
            <Alert variant="outlined" severity="error">
              {errors.email?.message}
            </Alert>
          )}
        </FromGroup>
        <FromGroup>
          <Label htmlFor="password">Mật khẩu *</Label>
          <Input
            control={control}
            name="password"
            type={`${showPassword ? "text" : "password"}`}
            placeholder="Mật khẩu"
          >
            <IconEyeToggle
              open={showPassword}
              onClick={handleTogglePassword}
            ></IconEyeToggle>
          </Input>
          {errors.password && (
            <Alert variant="outlined" severity="error">
              {errors.password?.message}
            </Alert>
          )}
        </FromGroup>
        <Button
          className="w-full bg-[#337ab7] text-white"
          type="submit"
          isLoading={loadingRegister}
        >
          Đăng ký tài khoản
        </Button>
      </form>
    </div>
  );
};

export default SignUpPage;
