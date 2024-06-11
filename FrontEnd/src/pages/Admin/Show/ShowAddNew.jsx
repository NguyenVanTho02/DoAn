import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DatePicker, TimePicker, Modal, Form, Select } from "antd";
import { toast } from "react-toastify";
import { cityService } from "../../../services/CityService";
import { cinemaService } from "../../../services/CinemaService";
import { theaterService } from "../../../services/TheaterService";
import { movieSevice } from "../../../services/MovieService";
import { showService } from "../../../services/ShowService";

const ShowAddNew = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [cites, setCities] = useState();
  const [cinemas, setCinemas] = useState();
  const [theaters, setTheaters] = useState();
  const [movies, setMovies] = useState();
  const [valueCity, setValueCity] = useState(0);
  const [valueCinema, setValueCinema] = useState(0);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [showDate, setShowDate] = useState();

  const timeFormat = "HH:mm";

  const getDataCity = () => {
    cityService.getListCity().then((result) => {
      setCities(result.data);
    });
  };

  const getCinemaByCity = (values) => {
    cinemaService.getCinemaByCity(values).then((result) => {
      setCinemas(result.data.data);
    });
  };

  const getTheaterByCinema = (values) => {
    theaterService.getTheaterByCinema(values).then((result) => {
      setTheaters(result.data);
    });
  };

  const getListMovie = () => {
    movieSevice.getListMovie().then((result) => {
      setMovies(result.data.items);
    });
  };

  useEffect(() => {
    getDataCity();
  }, []);

  useEffect(() => {
    getCinemaByCity(valueCity);
  }, [valueCity]);

  useEffect(() => {
    getTheaterByCinema(valueCinema);
  }, [valueCinema]);

  useEffect(() => {
    getListMovie();
  }, []);

  const onSelectCity = (value) => {
    setValueCity(value);
  };

  const onSelectCinema = (value) => {
    setValueCinema(value);
  };

  const onSelectTheater = (value) => {};

  const onSelectMovie = () => {};

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const selectDateShow = (date, dateString) => {
    setShowDate(dateString);
  };

  const handleStartTime = (date, timeString) => {
    setStartTime(timeString);
  };
  const handleEndTime = (date, timeString) => {
    setEndTime(timeString);
  };

  const handleAddShow = async () => {
    form.validateFields().then((values) => {
      const showData = {
        theaterID: values.theater,
        movieID: values.movie,
        showDate: showDate,
        startTime: startTime,
        endTime: endTime,
      };

      showService
        .createNewShow(showData)
        .then(() => {
          toast.success("Thêm thành công");
        })
        .catch(() => {
          toast.error("Lỗi");
        });
    });
  };

  return (
    <>
      <Modal
        title="Thêm lịch chiếu"
        open={isOpen}
        onCancel={onClose}
        width={800}
        cancelText="Hủy"
        okText="Thêm mới"
        okType="default"
        onOk={handleAddShow}
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{
            span: 6,
          }}
        >
          <Form.Item
            label="Chọn Tỉnh/Thành phố"
            name="city"
            rules={[
              { required: true, message: "Vui lòng chọn Tỉnh/Thành phố" },
            ]}
          >
            <Select
              showSearch
              placeholder="Chọn Tỉnh/Thành phố"
              onSelect={onSelectCity}
              filterOption={filterOption}
              style={{
                width: 400,
              }}
              options={cites?.map((city) => ({
                value: city.cityID,
                label: city.cityName,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Chọn rạp chiếu"
            name="cinema"
            rules={[
              { required: true, message: "Vui lòng chọn rạp chiếu phim" },
            ]}
          >
            <Select
              showSearch
              placeholder="Chọn rạp chiếu phim"
              onChange={onSelectCinema}
              filterOption={filterOption}
              style={{
                width: 400,
              }}
              options={cinemas?.map((item) => ({
                value: item.cinemaID,
                label: item.cinemaName,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Chọn phòng chiếu"
            name="theater"
            rules={[{ required: true, message: "Vui lòng chọn phòng chiếu" }]}
          >
            <Select
              showSearch
              placeholder="Chọn phòng chiếu"
              onChange={onSelectTheater}
              filterOption={filterOption}
              style={{
                width: 400,
              }}
              options={theaters?.map((item) => ({
                value: item.theaterID,
                label: item.theaterName,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Chọn phim"
            name="movie"
            rules={[{ required: true, message: "Vui lòng chọn tên phim" }]}
          >
            <Select
              showSearch
              placeholder="Chọn tên phim"
              onSelect={onSelectMovie}
              filterOption={filterOption}
              style={{
                width: 400,
              }}
              options={movies?.map((item) => ({
                value: item.movieID,
                label: item.movieName,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Chọn ngày chiếu"
            name="showDate"
            rules={[{ required: true, message: "Vui lòng chọn ngày chiếu" }]}
          >
            <DatePicker
              onChange={selectDateShow}
              style={{
                zIndex: 100,
                width: 400,
              }}
            />
          </Form.Item>

          <Form.Item
            label="Bắt đầu"
            name="startTime"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thời gian bắt đầu chiếu",
              },
            ]}
          >
            <TimePicker
              format={timeFormat}
              onChange={handleStartTime}
            />
          </Form.Item>

          <Form.Item
            label="Kết thúc"
            name="endTime"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thời gian kết thúc chiếu",
              },
            ]}
          >
            <TimePicker
              format={timeFormat}
              onChange={handleEndTime}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
ShowAddNew.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default ShowAddNew;
