import { Input, Modal, Select, Form } from "antd";
import PropTypes from "prop-types";
import { cityService } from "../../../services/CityService";
import { cinemaService } from "../../../services/CinemaService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Filter `option.label` match the user type `input`

const CinemaEdit = ({ isOpen, onClose, record, setIsModalEditOpen }) => {
  const [form] = Form.useForm();
  const [cites, setCities] = useState();

  const fetchDataCity = () => {
    cityService.getListCity().then((result) => {
      setCities(result.data);
    });
  };

  useEffect(() => {
    fetchDataCity();
  }, [cites]);

  const onChange = (value) => {};
  const onSearch = (value) => {};

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleUpdateCinema = async () => {
    form.validateFields().then((values) => {
      const cinemaData = {
        cinemaName: values.cinemaName,
        cinemaAddress: values.cinemaAddress,
        cityID: values.cinemaCity,
      };

      cinemaService
        .updateCinema(record.cinemaID, cinemaData)
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
      cinemaName: record.cinemaName,
      cinemaAddress: record.cinemaAddress,
      cinemaCity: record.cityID,
    });
  }, [record]);

  return (
    <>
      <Modal
        title={` Chỉnh sửa thông tin rạp ${record.cinemaName}`}
        open={isOpen}
        onCancel={onClose}
        width={800}
        cancelText="Cancel"
        okText="Cập nhật"
        okType="default"
        onOk={handleUpdateCinema}
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{
            span: 4,
          }}
        >
          <Form.Item
            label="Tên rạp"
            name="cinemaName"
            rules={[{ required: true, message: "Vui lòng nhập tên rạp chiếu" }]}
          >
            <Input name="name" placeholder="Nhập tên rạp chiếu" />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="cinemaAddress"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input
              name="address"
              placeholder="VD: Số 1, Xuân Thuỷ, Cầu Giấy, Hà Nội"
            />
          </Form.Item>
          <Form.Item
            label="Tỉnh/Thành phố"
            name="cinemaCity"
            rules={[
              { required: true, message: "Vui lòng chọn Tỉnh/Thành phố" },
            ]}
          >
            <Select
              showSearch
              placeholder="Chọn Tỉnh/Thành phố"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              style={{
                width: 200,
              }}
              options={cites?.map((city) => ({
                value: city.cityID,
                label: city.cityName,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
CinemaEdit.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default CinemaEdit;
