import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DatePicker, TimePicker, Modal, Form, Select } from "antd";
import { toast } from "react-toastify";
import { showService } from "../../../services/ShowService";
import moment from "moment";

const ShowEdit = ({ isOpen, onClose, record, setIsEditModalOpen }) => {
  const [form] = Form.useForm();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [showDate, setShowDate] = useState();

  console.log(record);

  const selectDateShow = (date, dateString) => {
    setShowDate(dateString);
  };

  const handleStartTime = (date, timeString) => {
    setStartTime(timeString);
  };
  const handleEndTime = (date, timeString) => {
    setEndTime(timeString);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleUpdateShow = async () => {
    form.validateFields().then((values) => {
      const showData = {
        theaterID: values.theater,
        showDate: showDate,
        startTime: startTime,
        endTime: endTime,
      };

      console.log(record);

      showService
        .updateCinema(record.showID, showData)
        .then(() => {
          setIsEditModalOpen(false);
          toast.success("Cập nhật thành công");
        })
        .catch(() => {
          toast.error("Lỗi");
        });
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      theater: record.theaterID,
      movie: record.movieName,
    });
  }, [record]);

  return (
    <>
      <Modal
        title="Thêm lịch chiếu"
        open={isOpen}
        onCancel={onClose}
        width={800}
        cancelText="Hủy"
        okText="Cập nhật"
        okType="default"
        onOk={handleUpdateShow}
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{
            span: 6,
          }}
        >
          <Form.Item
            label="Chọn phòng chiếu"
            name="theater"
            rules={[{ required: true, message: "Vui lòng chọn phòng chiếu" }]}
          >
            <Select
              showSearch
              disabled={true}
              placeholder="Chọn phòng chiếu"
              filterOption={filterOption}
              style={{
                width: 400,
              }}
              options={[
                {
                  value: 1,
                  label: 1,
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Chọn phim"
            name="movie"
            rules={[{ required: true, message: "Vui lòng chọn tên phim" }]}
          >
            <Select
              showSearch
              disabled={true}
              placeholder="Chọn tên phim"
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
              // format={dateFormat}
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
            <TimePicker onChange={handleStartTime} />
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
            <TimePicker onChange={handleEndTime} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
ShowEdit.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default ShowEdit;
