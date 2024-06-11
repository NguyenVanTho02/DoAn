import { useEffect, useState } from "react";
import { Input, Modal, InputNumber, Button, Select, Form } from "antd";
import PropTypes from "prop-types";
import FromGroup from "../../../components/common/FromGroup";
import { Label } from "../../../components/label";
import { cinemaService } from "../../../services/CinemaService";
import { theaterService } from "../../../services/TheaterService";
import { toast } from "react-toastify";

const TheaterAddNew = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [cinemas, setCinemas] = useState();

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const fetchDataCinema = () => {
    cinemaService.getListCinema().then((result) => {
      setCinemas(result.data.items);
    });
  };

  useEffect(() => {
    fetchDataCinema();
  }, [isOpen]);

  const handleAddCinema = async () => {
    form.validateFields().then((values) => {
      const theaterData = {
        theaterName: values.theaterName,
        cinemaID: values.cinemaID,
        qtySeat: values.qtySeat,
      };

      theaterService
        .createTheater(theaterData)
        .then(() => {
          toast.success("Thêm thành công", { autoClose: 800 });
          form.resetFields();
        })
        .catch(() => {
          toast.error("Lỗi", { autoClose: 800 });
        });
    });
  };

  return (
    <>
      <Modal
        title="Thêm phòng chiếu"
        open={isOpen}
        onCancel={onClose}
        width={800}
        cancelText="Hủy"
        okText="Thêm mới"
        okType="default"
        onOk={handleAddCinema}
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
              placeholder="Chọn tên rạp"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              style={{
                width: 400,
              }}
              options={cinemas?.map((cinema) => ({
                value: cinema.cinemaID,
                label: cinema.cinemaName,
              }))}
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
TheaterAddNew.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default TheaterAddNew;
