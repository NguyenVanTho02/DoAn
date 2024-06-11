import "./itemMovieByCinema.scss";
import { Link, useNavigate } from "react-router-dom";
import SellIcon from "@mui/icons-material/Sell";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PropTypes from "prop-types";
import { HOST } from "../../constrants/config";
import { toast } from "react-toastify";
const ItemMovieByCinema = ({ movie }) => {
  const posterPaths = `${HOST + movie.poster}`;
  const listShow = movie.listShow;
  const navigate = useNavigate();
  const currentTime = new Date();
  const filteredShows = listShow.filter((show) => {
    const showDate = new Date(show.showDate);
    const year = showDate.getFullYear();
    const month = (showDate.getMonth() + 1).toString().padStart(2, "0");
    const day = showDate.getDate().toString().padStart(2, "0");
    const showDateISO = `${year}-${month}-${day}`;
    const startTime = new Date(`${showDateISO}T${show.startTime}`);
    return (
      showDate > currentTime ||
      (showDate.toDateString() === currentTime.toDateString() &&
        startTime > currentTime)
    );
  });
  const handleBookshow = (showID) => {
    if (localStorage.getItem("token") === null) {
      toast.error("Bạn vui lòng đăng nhập");
      navigate("/sign-in");
      return;
    }
    navigate(`/book-tickets/${showID}`);
  };
  console.log("listShow", listShow);
  return (
    <div className="w-full flex gap-4">
      <div className="w-5/12">
        <img
          src={posterPaths}
          alt=""
          className="w-full h-[338px] object-cover rounded-lg"
        />
      </div>
      <div className="w-7/12">
        <Link
          to={`/detail-film/${movie.movieID}`}
          className="text-[#03599d] font-bold text-[30px]"
        >
          {movie.movieName}
        </Link>
        <div className="category-time flex">
          <div className="mr-[10px] flex items-center">
            <SellIcon className="text-[#03599d] item-icon mr-[2px]" />
            <span className="text-[15px]">{movie.genreName}</span>
          </div>
          <div className="flex items-center">
            <AccessTimeIcon className="text-[#03599d] item-icon mr-[2px]" />
            <span className="text-[15px]">{movie.duration} phút</span>
          </div>
        </div>

        <div className="list-time flex flex-wrap">
          {filteredShows &&
            filteredShows.map((show) => (
              <div
                key={show.showID}
                onClick={() => {
                  handleBookshow(show.showID);
                }}
                className="w-[80px] h-[40px] mt-5 bg-gray-300 bg-cover text-gray-700 inline-block font-oswald text-sm grid-auto-rows auto text-center uppercase cursor-pointer rounded-sm mr-4"
              >
                <p className="leading-[40px]">{show.startTime}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
ItemMovieByCinema.propTypes = {
  movie: PropTypes.object,
};
export default ItemMovieByCinema;
