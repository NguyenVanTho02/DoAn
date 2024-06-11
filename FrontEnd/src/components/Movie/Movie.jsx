import BtnPlay from "../BtnPlay/BtnPlay";
import "./movie.scss";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { HOST } from "../../constrants/config";
import { Genre } from "../../constrants/genre";
import { useNavigate } from "react-router-dom";

const Movie = ({ movie }) => {
  const poster = `${HOST + movie.poster}`;
  const navigate = useNavigate();
  const handleDetailMovie = () => {
    navigate(`/detail-film/${movie.movieID}`);
  };
  console.log("movie", movie);
  return (
    <div
      style={{
        padding: "7px",
        cursor: "pointer",
      }}
    >
      <div className="film mb-10">
        <div className="film__img w-full h-full min-w-[228px] min-h-[360px]">
          <div className="film__poster w-full h-full">
            <img
              src={poster}
              alt=""
              className="w-full h-full rounded-[20px] min-w-[228px] min-h-[360px]"
            />
            <div
              className="age"
              style={{ position: "absolute", top: "10px", left: "10px" }}
            >
              T{movie.age}
            </div>
            <div className="film__overlay rounded-[20px]" />
            <div className="play__trailer">
              {/* class play lấy từ Carousel component*/}
              <BtnPlay
                cssRoot={"play"}
                width={48}
                height={48}
                urlYoutube={movie.trailer}
              />
            </div>
          </div>
          {/* <BlockRating danhGia={movie.danhGia} /> */}
        </div>
        <div className="film__content min-w-[228px]">
          <div className="film__name">
            <div className="name">
              <div
                className="cursor-pointer movie-name"
                onClick={handleDetailMovie}
              >
                {movie.movieName}
              </div>
            </div>
            <div className="line">
              <span className="titlle">Thể loại: &nbsp;</span>
              <span className="text_info">{Genre[movie.genreID]}</span>
            </div>
            <div className="line">
              <span className="titlle">Thời lượng: &nbsp;</span>
              <span className="text_info">{movie.duration} phút</span>
            </div>
          </div>
          <div className="film__button">
            {!movie.commingSoon && ( // Kiểm tra điều kiện
              <Button
                className="film__button"
                variant="contained"
                onClick={handleDetailMovie}
              >
                MUA VÉ
              </Button>
            )}
            {/* nếu thoiLuong = undefined => phim hiện không có lịch chiếu */}

            {/* <span
              style={{ background: "#fb4226" }}
              // to={{
              //   pathname: `/phim/${movie.maPhim}`,
              //   state: { comingMovie },
              // }}
            >
              MUA VÉ
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};
Movie.propTypes = {
  movie: PropTypes.node,
  comingMovie: PropTypes.node,
};
export default Movie;
