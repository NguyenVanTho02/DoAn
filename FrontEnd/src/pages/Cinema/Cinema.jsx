import { useEffect, useState } from "react";
import Header from "../../layouts/MainLayout/Header/Header";
import Footer from "../../layouts/MainLayout/Footer";
import { useSelector } from "react-redux";
import { cinemaService } from "../../services/CinemaService";

const Cinema = () => {
  const { cinemaID, cinemaName } = useSelector((state) => state.CinemaReducer);
  const [detailCinema, setDetailCinema] = useState();

  const getCinemaByID = (id) => {
    cinemaService.getCinemaByID(id).then((result) => {
      setDetailCinema(result.data.data);
    });
  };

  useEffect(() => {
    getCinemaByID(cinemaID);
  }, [cinemaID]);

  return (
    <div className="mt-[120px]">
      <Header />
      <div className="max-w-[1120px] mx-auto mb-[50px]">
        <h1 className="text-[30px] mb-10">{cinemaName}</h1>
        <img
          src="https://files.betacorp.vn/media/images/2024/04/05/thumbnail-1-144816-050424-68.jpeg"
          alt=""
          className="w-full"
        />
        <p className="text-justify mt-[20px] text-[16px]">
          {cinemaName} có vị trí trung tâm, tọa lạc tại <span> </span>
          {detailCinema?.cinemaAddress}. Rạp tự hào là rạp phim tư nhân duy nhất
          và đầu tiên sở hữu hệ thống phòng chiếu phim đạt chuẩn Hollywood.
        </p>
        <p className="text-justify mt-[20px] text-[16px]">
          Rạp được trang bị hệ thống máy chiếu, phòng chiếu hiện đại với 100%
          nhập khẩu từ nước ngoài, với 4 phòng chiếu tương được 200 ghế ngồi. Hệ
          thống âm thanh Dolby 7.1 và hệ thống cách âm chuẩn quốc tế đảm bảo
          chất lượng âm thanh sống động nhất cho từng thước phim bom tấn.
        </p>
        <p className="text-justify mt-[20px] text-[16px]">
          Mức giá xem phim tại {cinemaName} rất cạnh tranh: giá vé chỉ từ 50.000
          VNĐ đến 80.000 VNĐ. Không chỉ có vậy, rạp còn có nhiều chương trình
          khuyến mại, ưu đãi hàng tuần như đồng giá vé 40.000 vào các ngày Thứ 3
          vui vẻ, Thứ 4 funny, đồng giá vé cho Học sinh sinh viên, người cao
          tuổi, trẻ em.....
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Cinema;
