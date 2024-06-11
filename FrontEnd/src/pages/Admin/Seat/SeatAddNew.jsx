import { Form, InputNumber, Modal, Select } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { cityService } from "../../../services/CityService";
import { cinemaService } from "../../../services/CinemaService";
import { seatService } from "../../../services/SeatService";
import { toast } from "react-toastify";
import { listSeatDefault } from "../../Bookticket/ListSeat/fakeListSeat";
function onSearch(value) {
  console.log("search:", value);
}
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const SeatAddNew = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [cites, setCities] = useState();
  const [cityValue, setCityValue] = useState();
  const [cinemaValue, setCinemaValue] = useState();
  const [cinemas, setCinemas] = useState();
  const fetchDataCity = () => {
    cityService.getListCity().then((result) => {
      setCities(result.data);
    });
  };
  const fetchCinema = () => {
    cinemaService.getCinemaByCity(cityValue).then((result) => {
      setCinemas(result.data.data);
    });
  };
  useEffect(() => {
    fetchDataCity();
  }, []);
  useEffect(() => {
    if (cityValue) {
      fetchCinema();
    }
  }, [cityValue]);
  const onChangeCity = (value) => {
    setCityValue(value);
  };
  const onChangeCinema = (value) => {
    setCinemaValue(value);
  };
  let listTheater = cinemas?.find(
    (cinema) => cinema.cinemaID === cinemaValue
  )?.listTheater;
  const handleAddSeat = () => {
    form.validateFields().then(async (values) => {
      const seatVm = {
        theaterID: values.theater,
        qtySeat: values.qtySeat,
      };
      try {
        await seatService.createListSeat(seatVm);
        await updateListSeat(seatVm.theaterID);
        toast.success("Thêm thành công");
        form.resetFields();
      } catch (error) {
        console.error("Error adding seat:", error);
        if (error.response.data.status == 106) {
          toast.error("Đã tồn tại 50 ghế của rạp");
        } else {
          toast.error("Thêm không thành công");
        }
      }
    });
  };
  const updateListSeat = async (theaterID) => {
    try {
      const response = await seatService.getListSeatByTheater(theaterID);
      const seats = response.data.data;
      const updatedListSeat = listSeatDefault.map((item, index) => ({
        ...item,
        seatID: seats[index].seatID,
        theaterID: seats[index].theaterID,
      }));
      const formData = new FormData();
      formData.append("datajson", JSON.stringify(updatedListSeat));
      await seatService.updateListSeat(formData);
    } catch (error) {
      console.error("Error updating list seat:", error);
      throw error;
    }
  };
  return (
    <>
      <Modal
        title="Thêm ghế"
        open={isOpen}
        onCancel={onClose}
        width={800}
        cancelText="Hủy"
        okText="Thêm"
        okType="default"
        onOk={handleAddSeat}
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{
            span: 5,
          }}
        >
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
              onChange={onChangeCity}
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
          <Form.Item
            label="Chọn Rạp"
            name="cinema"
            rules={[{ required: true, message: "Vui lòng chọn rạp" }]}
          >
            <Select
              showSearch
              placeholder="Chọn rạp"
              optionFilterProp="children"
              onChange={onChangeCinema}
              onSearch={onSearch}
              filterOption={filterOption}
              style={{
                width: 200,
              }}
              options={cinemas?.map((item) => ({
                value: item.cinemaID,
                label: item.cinemaName,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Phòng chiếu"
            name="theater"
            rules={[
              { required: true, message: "Vui lòng chọn Tỉnh/Thành phố" },
            ]}
          >
            <Select
              showSearch
              placeholder="Chọn phòng chiếu"
              optionFilterProp="children"
              // onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              style={{
                width: 200,
              }}
              options={listTheater?.map((item) => ({
                value: item.theaterID,
                label: item.theaterName,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Số ghế cần thêm"
            name="qtySeat"
            rules={[
              {
                required: true,
                message: "Hãy chọn thời lượng phim!",
              },
            ]}
          >
            <InputNumber name="qtySeat" min={1} max={100} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
SeatAddNew.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default SeatAddNew;
