import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Input, Modal, Form, DatePicker } from "antd";
import { toast } from "react-toastify";
import { applicationUserService } from "../../../services/ApplicationUserService";

const ModalUserEdit = ({ isOpen, onClose, record, setIsModalEditOpen }) => {
  const [form] = Form.useForm();
  const [date, setDate] = useState();

  useEffect(() => {
    form.setFieldsValue({
      phoneNumber: record.phoneNumber,
      // birthday: record.birthday,
    });
  }, [record]);

  const handleUpdateUser = async () => {
    form.validateFields().then((values) => {
      const userData = {
        id: record.id,
        userName: record.userName,
        email: record.email,
        phoneNumber: values.phoneNumber,
        birthday: date,
      };
      applicationUserService
        .updateInfoUser(userData)
        .then(() => {
          setIsModalEditOpen(false);
          toast.success("Cập nhật thành công", { autoClose: 1000 });
        })
        .catch(() => {
          toast.error("Lỗi! Cập nhật thất bại", { autoClose: 1000 });
        });
    });
  };
  const selectBirthday = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <Modal
      title={` Chỉnh sửa thông tin rạp ${record.userName}`}
      open={isOpen}
      onCancel={onClose}
      width={800}
      cancelText="Cancel"
      okText="Cập nhật"
      okType="default"
      onOk={handleUpdateUser}
    >
      <Form
        form={form}
        layout="horizontal"
        labelCol={{
          span: 4,
        }}
      >
        <Form.Item label="Tên đăng nhập" name="userName">
          <Input name="userName" placeholder={record.userName} disabled />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input name="email" placeholder={record.email} disabled />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phoneNumber">
          <Input name="phoneNumber" placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item label="Ngày sinh" name="birthday">
          <DatePicker
            onChange={selectBirthday}
            style={{
              width: 200,
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

ModalUserEdit.PropTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ModalUserEdit;
