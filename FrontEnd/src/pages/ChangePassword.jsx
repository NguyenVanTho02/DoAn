import { Form, Input, Modal } from "antd";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { applicationUserService } from "../services/ApplicationUserService";
import { toast } from "react-toastify";

const ChangePassword = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const { currentUser } = useSelector((state) => state.AuthReducer);
  const handleChangePassword = async () => {
    const values = await form.validateFields();
    const changePasswordVm = {
      email: currentUser.userEmail,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };
    try {
      const result = await applicationUserService.changePassword(
        changePasswordVm
      );
      if (result.data.status == 200) {
        toast.success("Thay đổi mật khẩu thành công");
      }
    } catch (error) {
      if (error.response.data.status == 111) {
        toast.error("Mật khẩu mới không khớp với mật khẩu xác nhận!");
      }
      if (error.response.data.status == 110) {
        toast.error("Mật khẩu hiện tại không đúng!");
      }
    }
  };
  return (
    <>
      <Modal
        title="Thay đổi mật khẩu"
        open={isOpen}
        onCancel={onClose}
        width={600}
        cancelText="Cancel"
        okText="Đổi mật khẩu "
        okType="default"
        onOk={handleChangePassword}
      >
        <Form
          form={form}
          layout="vertical"
          labelCol={{
            span: 8,
          }}
        >
          <Form.Item
            label="Mật khẩu hiện tại"
            name="currentPassword"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu hiện tại" },
            ]}
          >
            <Input.Password
              name="currentPassword"
              placeholder="Nhập mật khẩu hiện tại"
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }]}
          >
            <Input.Password
              name="newPassword"
              placeholder="Nhập mật khẩu mới"
            />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            rules={[{ required: true, message: "Nhập xác nhận mật khẩu mới" }]}
          >
            <Input.Password
              name="confirmPassword"
              placeholder="Nhập xác nhận mật khẩu mới"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
ChangePassword.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default ChangePassword;
