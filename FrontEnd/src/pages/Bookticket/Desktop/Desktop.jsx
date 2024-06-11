import "./desktop.scss";
import StepCheckout from "./StepCheckout/StepCheckout";
import ListSeat from "../ListSeat/ListSeat";
import PayMent from "../PayMent/PayMent";

const Desktop = () => {
  return (
    <div className="book-ticked">
      <div className="book-left">
        <StepCheckout />
        <ListSeat />
      </div>
      <div className="book-right">
        <PayMent />
      </div>
    </div>
  );
};

export default Desktop;
