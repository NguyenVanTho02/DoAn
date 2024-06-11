import { Typography } from "antd";
import { useLocation } from "react-router-dom";
import { applicationUserService } from "../services/ApplicationUserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const { Title } = Typography;
const ConfirmEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const token = searchParams.get("token").replaceAll(" ", "+");
  const handleConfirmEmail = () => {
    let emailVm = {
      userId: userId,
      token: token,
    };
    applicationUserService
      .confirmEmail(emailVm)
      .then(() => {
        toast.success("Xác nhận email thành công");
        navigate("/sign-in");
      })
      .catch(() => {
        toast.error("Xác nhận không thành công!");
      });
  };
  return (
    <div className="bg-[#ccc] h-screen flex items-center">
      <div className="w-[800px] h-[500px] m-auto px-20 bg-white rounded-xl">
        <div className="flex justify-center">
          <img src="/img/mail.png" />
        </div>
        <div className="flex justify-center">
          <Title>Xác nhận địa chỉ Email</Title>
        </div>
        <div className="flex justify-center mt-12">
          <Button
            className="bg-[#FFB90F] text-white"
            onClick={handleConfirmEmail}
          >
            Nhấn vào đây để xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
