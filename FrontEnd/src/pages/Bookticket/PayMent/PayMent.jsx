import { useSelector, useDispatch } from "react-redux";
import "./payMent.scss";
import formatDate from "../../../util/formatDate";
import { CHANGE_PAYMETHOD } from "../../../redux/constrants/BookTicket";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/Button";
import { useEffect } from "react";
const PayMent = () => {
  const navigate = useNavigate();
  const {
    listSeat,
    amount,
    userEmail,
    paymentMethod,
    isReadyPayment,
    listTicket,
    showInfo: { movieInfo },
    showID,
    userName,
    isSelectedSeat,
    listSeatSelected,
    loadingBookingTicket,
    successBookingTicketMessage,
    errorBookTicketMessage,
  } = useSelector((state) => state.BookTicketReducer);
  const dispatch = useDispatch();

  const chanepaymentMethod = (event) => {
    dispatch({
      type: CHANGE_PAYMETHOD,
      payload: {
        paymentMethod: event.target.value,
      },
    });
  };
  const thanhToan = async () => {
    if (userEmail == null) {
      toast.error("Bạn vui lòng đăng nhập");
      navigate("/sign-in");
      return;
    }
    var listseattick = listSeatSelected.join(", ");
    const listdata = listTicket?.map((e) => {
      return {
        PaymentDate: new Date(),
        Amount:amount,
        ShowID:showID,
        NumberOfTicket:0,
        PaymentStatus:"-1",
        PaymentMethod:paymentMethod,
        TransactionID:"",
        UserID:userName,
        ShowSeatID:e.showSeat,
        BookingDate:new Date(),
        TotalPrice:e.price,
        PaymentInfo:listseattick
      }
    })   
    switch (paymentMethod) {
      // initialization data
      case "VNPAY": {
        try {
          const res = await axios.post(
            "https://localhost:43999/api/Payment/ThanhToanVNpay",
            listdata
          );
          console.log(res);
          if (res.status === 200) {

            const newUrl = res.data;
            window.location.href = newUrl;
          } else {
            toast.error("Có lỗi xảy ra khi thanh toán");
          }
        } catch (error) {
          toast.error("Có lỗi xảy ra khi thanh toán");
        }

        return;
      }
      case "Paypal": {
        toast.error("2");
        return;
      }

      default:
        toast.error("Phương thức thanh toán không chính xác");
        return;
    }
  };
  console.log("emai", userEmail);
  return (
    <div className="payment">
      <div>
        {/* Tổng tiền thanh toán */}
        <p className="amount payment-item">
          {`${amount.toLocaleString("vi-VI")} đ`}
        </p>

        {/* Thông tin phim và rạp */}
        <div className="payment-item">
          <p className="movie-name">{movieInfo?.movieName}</p>
          <p>{movieInfo?.cinemaName}</p>
          <p>{`${
            movieInfo && formatDate(movieInfo.showDate).dayToday
          }  ${movieInfo?.showDate.slice(0, 10)} - ${movieInfo?.startTime} - ${
            movieInfo?.theaterName
          }`}</p>
        </div>

        {/* Ghế đã chọn */}
        <div className="seat-info payment-item">
          <span>{`Ghế ${listSeatSelected?.join(", ")}`}</span>
          <p className="amount-little">
            {`${amount.toLocaleString("vi-VI")} đ`}
          </p>
        </div>

        {/* Input email */}
        <div className="payment-item">
          <label htmlFor="email" className="label-email">
            E-mail
          </label>
          <input
            type="text"
            name="email"
            className="fill-in-email"
            autoComplete="off"
            defaultValue={userEmail}
            readOnly
          />
          <p className="error"></p>
        </div>

        {/* Input phonenumber
        <div className="payment-item">
          <label htmlFor="" className="label-phone">
            Phone
          </label>
          <input
            type="number"
            name="phone"
            className="fill-in-phone"
            autoComplete="off"
          />
          <p className="error"></p>
        </div>
        {/* Mã giảm giá */}
        {/* <div className="payment-item">
          <label className="label">Mã giảm giá</label>
          <input
            type="text"
            value="Tạm thời không hỗ trợ..."
            readOnly
            className="fill-in"
          />
          <button className="btn-discount">Áp dụng</button>
        </div> */}

        {/* Hình thức thanh toán */}
        <div className="selected-payment-method">
          <label htmlFor="" className="label">
            Hình thức thanh toán
          </label>
          <p className="toggle-notice">
            Vui lòng chọn ghế để hiển thị phương thức thanh toán phù hợp.
          </p>

          <div className="form-payment">
            <div className="form-payment-item">
              <input
                className="input"
                type="radio"
                name="paymentMethod"
                value="Paypal"
                onChange={chanepaymentMethod}
              />
              <img
                className="img-pay"
                src="/img/bookticket/cuahang.png"
                alt="visa"
              />
              <label>Thanh toán tại cửa hàng tiện ích</label>
            </div>
            <div className="form-payment-item">
              <input
                className="input"
                type="radio"
                name="paymentMethod"
                value="VNPAY"
                onChange={chanepaymentMethod}
              />
              <img
                className="img-pay"
                src="/img/bookticket/vnpay.jpg"
                alt="visa"
              />
              <label>Thanh toán VNPAY</label>
            </div>
          </div>
        </div>

        {/* đặt vé */}
        <div className="bottom-section" onClick={thanhToan}>
          <Button className="btn-book" type="submit">
            <p className="txt-book">Đặt Vé</p>
          </Button>
        </div>
      </div>

      {/* notice */}
      <div className="notice">
        <div className="flex justify-center">
          <img
            className="img-notice"
            src="/img/bookticket/exclamation.png"
            alt="notice"
          />
          <span>Vé đã mua không thể đổi hoặc hoàn tiền</span>
        </div>
        <p>
          Mã vé sẽ được gửi qua tin nhắn{" "}
          <span className="contact-color">ZMS</span> (tin nhắn Zalo) và{" "}
          <span className="contact-color">Email</span> đã nhập.
        </p>
      </div>
    </div>
  );
};

export default PayMent;
