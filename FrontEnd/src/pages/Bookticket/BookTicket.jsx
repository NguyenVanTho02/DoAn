import { useParams } from "react-router-dom";
import Desktop from "./Desktop/Desktop";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getShowInfo } from "../../redux/actions/BookTicketAction";
import {
  INIT_DATA,
  RESET_DATA_BOOKTICKET,
} from "../../redux/constrants/BookTicket";

const BookTicket = () => {
  const {
    loadingGetShowInfo,
    showInfo: { movieInfo, listShowSeat },
    errorGetShowInfo,
  } = useSelector((state) => state.BookTicketReducer);
  const { currentUser } = useSelector((state) => state.AuthReducer);
  const param = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShowInfo(param.id));
    return () => {
      // xóa dữ liệu khi đóng hủy component
      dispatch({ type: RESET_DATA_BOOKTICKET });
    };
  }, []);
  useEffect(() => {
    const listSeatEdit = listShowSeat?.map((seat) => {
      // thêm flag selected: false
      return { ...seat, selected: false };
    });
    console.log("currentUser", currentUser);
    dispatch({
      type: INIT_DATA,
      payload: {
        listSeat: listSeatEdit,
        showID: movieInfo?.showID,
        userName: currentUser?.userName,
        userEmail: currentUser?.userEmail,
      },
    });
  }, [listShowSeat, currentUser]);
  if (errorGetShowInfo) {
    return <div>{errorGetShowInfo}</div>;
  }
  return (
    <div style={{ display: loadingGetShowInfo ? "none" : "block" }}>
      <Desktop />
    </div>
  );
};

export default BookTicket;
