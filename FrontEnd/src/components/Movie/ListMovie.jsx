import { useEffect, useState } from "react";
import { movieSevice } from "../../services/MovieService";
import Movie from "./Movie";
import PropTypes from "prop-types";
// const movie = [
//   {
//     movieID: 1,
//     movieName: "Gặp lại chị bầu",
//     duration: "120",
//     releaseDate: "02/02/2024",
//     genre: "Romance, Humor",
//     age: "18",
//     poster:
//       "https://files.betacorp.vn/files/media%2fimages%2f2024%2f01%2f29%2fdieu%2Dnhi%2D141116%2D290124%2D81.jpg",
//     trailer: "https://www.youtube.com/embed/Gggw9jwr1h4",
//   },
//   {
//     movieID: 2,
//     movieName: "Nhà vịt di cư",
//     duration: "110",
//     releaseDate: "02/02/2024",
//     genre: "Romance, Humor",
//     age: "16",
//     poster:
//       "https://files.betacorp.vn/files/media%2fimages%2f2024%2f01%2f26%2ftrang%2D133650%2D260124%2D79.jpg",
//     trailer: "https://www.youtube.com/embed/krgcyk2rjFc",
//   },
//   {
//     movieID: 3,
//     movieName: "Gặp lại chị bầu",
//     duration: "120",
//     releaseDate: "02/02/2024",
//     genre: "Romance, Humor",
//     age: "18",
//     poster:
//       "https://files.betacorp.vn/files/media%2fimages%2f2024%2f01%2f29%2fdieu%2Dnhi%2D141116%2D290124%2D81.jpg",
//   },
//   {
//     movieID: 4,
//     movieName: "Nhà vịt di cư",
//     duration: "110",
//     releaseDate: "02/02/2024",
//     genre: "Romance, Humor",
//     age: "16",
//     poster:
//       "https://files.betacorp.vn/files/media%2fimages%2f2024%2f01%2f26%2ftrang%2D133650%2D260124%2D79.jpg",
//   },
//   {
//     movieID: 5,
//     movieName: "Gặp lại chị bầu",
//     duration: "120",
//     releaseDate: "02/02/2024",
//     genre: "Romance, Humor",
//     age: "18",
//     poster:
//       "https://files.betacorp.vn/files/media%2fimages%2f2024%2f01%2f29%2fdieu%2Dnhi%2D141116%2D290124%2D81.jpg",
//   },
//   {
//     movieID: 6,
//     movieName: "Nhà vịt di cư",
//     duration: "110",
//     releaseDate: "02/02/2024",
//     genre: "Romance, Humor",
//     age: "16",
//     poster:
//       "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202308/11251_103_100001.jpg",
//   },
//   {
//     movieID: 7,
//     movieName: "Nhà vịt di cư",
//     duration: "110",
//     releaseDate: "02/02/2024",
//     genre: "Romance, Humor",
//     age: "16",
//     poster:
//       "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202308/11251_103_100001.jpg",
//   },
//   {
//     movieID: 8,
//     movieName: "Nhà vịt di cư",
//     duration: "110",
//     releaseDate: "02/02/2024",
//     genre: "Romance, Humor",
//     age: "16",
//     poster:
//       "https://media.lottecinemavn.com/Media/MovieFile/MovieImg/202308/11251_103_100001.jpg",
//   },
// ];
const ListMovie = ({ showNow, commingSoon }) => {
  console.log("showNow", showNow);
  console.log("commingSoon", commingSoon);
  const [param, setParam] = useState("showNow=true");
  if (showNow) {
    setParam("showNow=true");
  }
  if (commingSoon) {
    setParam("commingSoon=true");
  }
  console.log("param", param);
  const [movies, setMovies] = useState();
  useEffect(() => {
    movieSevice.getListMovieShowNow(param).then((result) => {
      setMovies(result.data.data);
    });
  }, []);
  return (
    <div className="w-full  max-h-[80%] m-auto grid grid-cols-4 gap-10 pt-10">
      {movies &&
        movies.map((item) => <Movie key={item.movieID} movie={item}></Movie>)}
    </div>
  );
};
ListMovie.propTypes = {
  showNow: PropTypes.bool,
  commingSoon: PropTypes.bool,
};
export default ListMovie;
