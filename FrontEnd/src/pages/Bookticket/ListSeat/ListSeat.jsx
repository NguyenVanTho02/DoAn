import "./listSeat.scss";
import { NameOfTheater } from "../../../components";
import TimeCountdown from "../TimeCountdown/TimeCountdown";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../../util/formatDate";
import { CHANGE_LISTSEAT } from "../../../redux/constrants/BookTicket";
const ListSeat = () => {
  const {
    listSeat,
    showInfo: { movieInfo },
  } = useSelector((state) => state.BookTicketReducer);
  const dispatch = useDispatch();
  const handleSelectedSeat = (seatSelected) => {
    if (seatSelected.seatStatus == 2) {
      return;
    }
    // đổi lại giá trị selected của ghế đã chọn
    let newListSeat = listSeat.map((seat) => {
      if (seatSelected.seatID === seat.seatID) {
        return { ...seat, selected: !seat.selected };
      }
      return seat;
    });
    const newListSeatSelected = newListSeat?.reduce(
      (newListSeatSelected, seat) => {
        if (seat.selected) {
          return [...newListSeatSelected, seat.seatName];
        }
        return newListSeatSelected;
      },
      []
    );
    // cập nhật lại danhSachVe dùng để booking
    const listTicket = newListSeat?.reduce((listTicket, seat) => {
      if (seat.selected) {
        return [...listTicket, { seatID: seat.seatID, price: seat.price,showSeat:seat.showSeatID }];
      }
      return listTicket;
    }, []);
    // cập nhật biến kiểm tra đã có ghế nào được chọn chưa
    const isSelectedSeat = newListSeatSelected.length > 0 ? true : false;
    // tính lại tổng tiền
    const amount = newListSeat?.reduce((amount, seat) => {
      if (seat.selected) {
        return (amount += seat.price);
      }
      return amount;
    }, 0);
    dispatch({
      type: CHANGE_LISTSEAT,
      payload: {
        listSeat: newListSeat,
        isSelectedSeat,
        listSeatSelected: newListSeatSelected,
        listTicket,
        amount,
      },
    });
  };
  const domToSeatElement = useRef(null);
  const color = (seat) => {
    let color;
    if (seat.seatType === "Normal") {
      color = "#3e515d";
    }
    if (seat.seatType === "Vip") {
      color = "#f7b500";
    }
    if (seat.selected) {
      color = "#44c020";
    }
    if (seat.seatStatus == 2) {
      color = "#99c5ff";
    }
    return color;
  };

  return (
    <div className="list-seat">
      {/* Thông tin phim */}
      <div className="info-countdown">
        <div className="info-theater">
          <img
            src={"/img/mvLogo.png"}
            alt="phim"
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
          <div className="text">
            <NameOfTheater nameOfTheater={movieInfo?.cinemaName} />
            {/* <p className="text-time">Thứ năm - 06:05 - Rạp 6</p> */}
            <p className="text-time">{`${
              movieInfo && formatDate(movieInfo?.showDate).dayToday
            } - ${movieInfo?.startTime} - ${movieInfo?.theaterName}`}</p>
          </div>
        </div>
        <div className="count-down">
          <p className="time-title">Thời gian giữ ghế</p>
          <TimeCountdown />
        </div>
      </div>

      <div className="overflow-seat">
        <div className="invariant-width">
          {/* Mô phỏng màn hình */}
          <img
            className="screen"
            src="/img/bookticket/screen.png"
            alt="screen"
          />
          {/* Danh sách ghế */}
          <div className="seat-select">
            {listSeat?.map((seat, i) => (
              <div className="seat" key={seat.seatID} ref={domToSeatElement}>
                {/* Label A, B, C,... đầu mỗi hàng ghế */}
                {(i === 0 || i % 10 === 0) && (
                  <div className="label">{seat?.seatName?.slice(0, 1)}</div>
                )}

                {/* Số thứ tự */}
                <p className="seat-name">{seat.seatName}</p>

                {/* label ghế đã có người đặt */}
                {seat.daDat && (
                  <img
                    className="seat-locked"
                    src="/img/bookticket/notchoose.png"
                    alt="notchoose"
                  />
                )}
                {/* icon ghế */}
                <div
                  style={{ backgroundColor: color(seat) }}
                  className="seat-icon"
                ></div>
                {/* đường viền chỉ vùng ghế */}
                {/* {seat.label === "E08" && (
                  <img
                    className="view-center"
                    src="/img/bookticket/seatcenter.png"
                    alt="seatcenter"
                  />
                )} */}
                {/* vùng bắt sự kiện click */}
                <div
                  className="area-click"
                  onClick={() => handleSelectedSeat(seat)}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* thông tin các loại ghế */}
      <div className="note-seat">
        <div className="type-seats">
          <div className="box-note">
            <div
              className="item-note"
              style={{ backgroundColor: "#3e515d" }}
            ></div>
            <p>Ghế thường</p>
          </div>
          <div className="box-note">
            <div
              className="item-note"
              style={{ backgroundColor: "#f7b500" }}
            ></div>
            <p>Ghế vip</p>
          </div>
          <div className="box-note">
            <div
              className="item-note"
              style={{ backgroundColor: "#44c020" }}
            ></div>
            <p>Ghế đang chọn</p>
          </div>
          <div className="box-note">
            <div
              className="item-note"
              style={{ backgroundColor: "#99c5ff" }}
            ></div>
            <p>Ghế đã được mua</p>
          </div>
        </div>
        <div className="position-view">
          <span className="line">
            <span className="line-beautiful" />
            <span>Vùng trung tâm</span>
          </span>
        </div>
      </div>

      {/* modalleft */}
      <div className="modal-left">
        <div className="opacity-img"></div>
      </div>
    </div>
  );
};

export default ListSeat;
