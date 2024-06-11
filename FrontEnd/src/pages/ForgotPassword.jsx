import { Form, Input, Modal } from "antd";
import PropTypes from "prop-types";
import { applicationUserService } from "../services/ApplicationUserService";
import { toast } from "react-toastify";

const ForgotPassword = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const handleForgotPassword = async () => {
    const values = await form.validateFields();
    const passwordVm = {
      email: values.email,
    };
    try {
      const result = await applicationUserService.forgotPassword(passwordVm);
      console.log("result", result);
      toast.success(
        "Lấy lại mật khẩu thành công vui lòng kiểm tra email của bạn"
      );
    } catch (error) {
      if (error.response.data.status == 108) {
        toast.error("Email không tồn tại");
      }
    }
  };
  return (
    <>
      <Modal
        title="Lấy lại mật khẩu"
        open={isOpen}
        onCancel={onClose}
        width={600}
        cancelText="Cancel"
        okText="Lấy lại mật khẩu"
        okType="default"
        onOk={handleForgotPassword}
      >
        <Form
          form={form}
          layout="vertical"
          labelCol={{
            span: 4,
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input name="email" placeholder="email" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
ForgotPassword.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default ForgotPassword;
