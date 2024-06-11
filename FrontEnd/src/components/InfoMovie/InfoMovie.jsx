import PropTypes from "prop-types";
import { HOST } from "../../constrants/config";
import { Genre } from "../../constrants/genre";
const InfoMovie = ({ movie }) => {
  const posterPaths = `${HOST + movie.poster}`;
  return (
    <div className="mt-[130px] mb-10 max-w-[1120px] mx-auto">
      <div className="info flex gap-x-8 font-bold text-[30px] leading-[30px]">
        <div className="info-thumb w-3/12 h-[350px] rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={posterPaths}
            alt="poster"
          />
        </div>
        <div className="info-main w-9/12">
          <h2 className="movie-title uppercase">{movie?.movieName}</h2>
          <p className="movie-description text-[14px] mt-5 text-justify font-normal">
            {movie.summary}
          </p>
          <div className="flex mt-3">
            <p className="w-4/12 uppercase text-[16px]">Đạo diễn:</p>
            <p className="w-8/12 text-[16px] font-normal">{movie?.directors}</p>
          </div>
          <div className="flex">
            <p className="w-4/12 uppercase text-[16px]">Diễn viên</p>
            <p className="w-8/12 text-[16px] font-normal">{movie?.actors}</p>
          </div>
          <div className="flex">
            <p className="w-4/12 uppercase text-[16px]">Thể loại:</p>
            <p className="w-8/12 text-[16px] font-normal">
              {Genre[movie?.genreID]}
            </p>
          </div>
          <div className="flex">
            <p className="w-4/12 uppercase text-[16px]">Thời lượng:</p>
            <p className="w-8/12 text-[16px] font-normal">{movie?.duration}</p>
          </div>
          <div className="flex">
            <p className="w-4/12 uppercase text-[16px]">Ngôn ngữ: </p>
            <p className="w-8/12 text-[16px] font-normal">{movie?.language}</p>
          </div>
          <div className="flex">
            <p className="w-4/12 uppercase text-[16px]">Ngày khởi chiếu: </p>
            <p className="w-8/12 text-[16px] font-normal">
              {movie?.releaseDate?.substring(0, 10)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
InfoMovie.propTypes = {
  movie: PropTypes.object,
};

export default InfoMovie;
