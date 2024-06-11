import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input, Modal, Select, Form, InputNumber } from "antd";
import { theaterService } from "../../../services/TheaterService";
import { toast } from "react-toastify";

const TheaterEdit = ({ isOpen, onClose, record, setIsModalEditOpen }) => {
  const [form] = Form.useForm();

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleUpdateTheater = async () => {
    form.validateFields().then((values) => {
      const theaterData = {
        theaterName: values.theaterName,
        cinemaID: values.cinemaID,
        qtySeat: values.qtySeat,
      };

      theaterService
        .updateTheater(record.theaterID, theaterData)
        .then(() => {
          setIsModalEditOpen(false);
          toast.success("Cập nhật thành công");
        })
        .catch(() => {
          toast.error("Lỗi! Cập nhật thất bại");
        });
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      theaterName: record.theaterName,
      cinemaID: record.cinemaID,
      qtySeat: record.qtySeat,
    });
  }, [record]);

  return (
    <>
      <Modal
        title={`Chỉnh sửa thông tin phòng chiếu ${record.theaterName}`}
        open={isOpen}
        onCancel={onClose}
        width={800}
        cancelText="Hủy"
        okText="Cập nhật"
        okType="default"
        onOk={handleUpdateTheater}
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{
            span: 5,
          }}
        >
          <Form.Item
            label="Tên phòng chiếu"
            name="theaterName"
            rules={[
              { required: true, message: "Vui lòng nhập tên phòng chiếu" },
            ]}
          >
            <Input name="name" placeholder="Nhập tên phòng chiếu" />
          </Form.Item>

          <Form.Item
            label="Chọn tên rạp"
            name="cinemaID"
            rules={[{ required: true, message: "Vui lòng chọn tên rạp" }]}
          >
            <Select
              showSearch
              disabled={true}
              placeholder="Chọn tên rạp"
              optionFilterProp="children"
              filterOption={filterOption}
              style={{
                width: 400,
              }}
              options={[
                {
                  value: record.cinemaID,
                  label: record.cinemaName,
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Nhập số lượng ghế"
            name="qtySeat"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng ghế của phòng chiếu",
              },
            ]}
          >
            <InputNumber
              name="seat"
              style={{
                width: 60,
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

TheaterEdit.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default TheaterEdit;
