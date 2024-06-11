import Header from "../../layouts/MainLayout/Header/Header";
import Footer from "../../layouts/MainLayout/Footer";
import { useSelector } from "react-redux";

const PriceTicket = () => {
  const { cinemaID, cinemaName } = useSelector((state) => state.CinemaReducer);
  return (
    <div className="mt-[120px]">
      <Header />
      <div className="max-w-[1120px] mx-auto">
        <h1 className="text-[30px] mb-10">Giá vé rạp {cinemaName}</h1>
        <img className="mb-[40px]" src="/img/gia-ve.png" alt="" />
      </div>
      <Footer />
    </div>
  );
};

export default PriceTicket;
