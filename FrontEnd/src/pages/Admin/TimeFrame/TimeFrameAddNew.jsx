import { DatePicker, Modal, Form } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTimeFrameAction } from "../../../redux/actions/TimeFrame";
import { toast } from "react-toastify";
const TimeFrameAddNew = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const { successAddTimeFrame } = useSelector(
    (state) => state.TimeFrameReducer
  );
  const handleStartTime = (date, dateString) => {
    setStartTime(dateString);
  };
  const handleEndTime = (date, dateString) => {
    setEndTime(dateString);
  };
  const handleAddTimeFrame = () => {
    const timeFrame = {
      startTime: startTime,
      endTime: endTime,
    };
    form
      .validateFields()
      .then(dispatch(addTimeFrameAction(timeFrame)))
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const [form] = Form.useForm();
  useEffect(() => {
    if (successAddTimeFrame) {
      toast.success("Thêm thành công");
      form.resetFields();
    }
  }, [successAddTimeFrame]);
  return (
    <>
      <Modal
        title="Thêm TimeFrame"
        open={isOpen}
        onCancel={onClose}
        width={800}
        cancelText="Hủy"
        okText="Thêm"
        okType="default"
        onOk={handleAddTimeFrame}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Thời gian bắt đầu"
            name="startTime"
            rules={[
              {
                required: true,
                message: "Hãy chọn thời gian bắt đầu!",
              },
            ]}
          >
            <DatePicker
              onChange={handleStartTime}
              picker="time"
              style={{ zIndex: 10000, width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Thời gian kết thúc"
            name="endTime"
            rules={[
              {
                required: true,
                message: "Hãy chọn thời gian kết thúc!",
              },
            ]}
          >
            <DatePicker
              onChange={handleEndTime}
              picker="time"
              style={{ zIndex: 10000, width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
TimeFrameAddNew.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
export default TimeFrameAddNew;
