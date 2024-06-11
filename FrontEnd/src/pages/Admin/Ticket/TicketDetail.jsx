import { Modal } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ticketService } from "../../../services/TicketService";
import { toast } from "react-toastify";
const TicketDetail = ({ isOpen, onClose, record }) => {
  const [data, setData] = useState();
  const fetchData = async () => {
    const ticketVm = {
      paymentID: record.paymentID,
    };
    try {
      const result = await ticketService.getTicketDetail(ticketVm);
      setData(result.data.data);
    } catch (error) {
      toast.error("Lỗi khi tải chi tiết vé");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Modal
        title=""
        open={isOpen}
        onCancel={onClose}
        width={600}
        cancelText="Cancel"
        okText="Cập nhật"
        okType="default"
      >
        <div className="flex justify-center items-center flex-col">
          <div>
            <p className="font-semibold text-2xl">Chi Tiết vé đặt</p>
          </div>
          <div className="border mt-5 w-[500px] p-5">
            <p className="font-semibold mb-1">
              Mã vé: <span className="text-gray-600">{record.ticketCode}</span>
            </p>
            <p className="font-semibold mb-1">
              Tên Phim: <span className="text-gray-600">{data?.movieName}</span>
            </p>
            <p className="font-semibold mb-1">
              Ngày đặt:{" "}
              <span className="text-gray-600">{data?.paymentDate}</span>
            </p>
            <p className="font-semibold mb-1">
              Ngày chiếu:{" "}
              <span className="text-gray-600">{data?.showDate}</span>
            </p>
            <p className="font-semibold mb-1">
              Suất chiếu:{" "}
              <span className="text-gray-600">{data?.startTime}</span>
            </p>
            <p className="font-semibold mb-1">
              Rạp: <span className="text-gray-600">{data?.cinemaName}</span>
            </p>
            <p className="font-semibold mb-1">
              Phòng chiếu:{" "}
              <span className="text-gray-600">{data?.theaterName}</span>
            </p>
            <p className="font-semibold mb-1">
              Ghế: <span className="text-gray-600">{data?.seatNames}</span>
            </p>
            <p className="font-semibold mb-1">
              Thời lượng:{" "}
              <span className="text-gray-600">{data?.duration} Phút</span>
            </p>
          </div>
          <div className="border mt-5 w-[500px] p-5">
            <p className="font-semibold text-2xl mb-2">Thông tin người đặt</p>
            <p className="font-semibold mb-1 ">
              Tên người đặt:{" "}
              <span className="text-gray-600">{record?.userName}</span>
            </p>
            <p className="font-semibold mb-1">
              Email: <span className="text-gray-600">{record.email}</span>
            </p>
            <p className="font-semibold mb-1">
              Mã thanh toán:{" "}
              <span className="text-gray-600">{record.paymentID}</span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};
TicketDetail.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  record: PropTypes.object,
};
export default TicketDetail;
