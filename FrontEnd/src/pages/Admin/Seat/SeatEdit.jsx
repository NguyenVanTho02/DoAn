import { Form, Input, Modal, Select } from "antd";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { seatService } from "../../../services/SeatService";
import { toast } from "react-toastify";
const SeatEdit = ({ isOpen, onClose, record }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        seatID: record.seatID,
        seatName: record.seatName,
        theaterID: record.theaterID,
        seatType: record.seatType,
      });
    }
  }, [record, form]);
  const handleUpdateSeat = async () => {
    try {
      const values = await form.validateFields();
      const seatVm = {
        seatName: values.seatName,
        seatType: values.seatType,
      };
      await seatService.updateSeat(values.seatID, seatVm);
      toast.success("Cập nhật thành công");
    } catch (error) {
      toast.error("Lỗi! Cập nhật thất bại");
    }
  };
  return (
    <>
      <Modal
        title={` Chỉnh sửa thông tin ghế`}
        open={isOpen}
        onCancel={onClose}
        width={800}
        cancelText="Cancel"
        okText="Cập nhật"
        okType="default"
        onOk={handleUpdateSeat}
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{
            span: 4,
          }}
        >
          <Form.Item label="Mã ghế" name="seatID">
            <Input name="seatID" disabled />
          </Form.Item>
          <Form.Item label="Tên ghế" name="seatName">
            <Input name="seatName" />
          </Form.Item>
          <Form.Item label="Mã phòng chiếu" name="theaterID">
            <Input name="theaterID" disabled />
          </Form.Item>
          <Form.Item label="Loại ghế" name="seatType">
            <Select
              style={{
                width: 288,
              }}
              //   onChange={handleChange}
              options={[
                {
                  value: "Normal",
                  label: "Normal",
                },
                {
                  value: "Vip",
                  label: "Vip",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
SeatEdit.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  record: PropTypes.object,
};
export default SeatEdit;
