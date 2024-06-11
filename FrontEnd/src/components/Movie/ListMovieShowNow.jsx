import { useEffect, useState } from "react";
import { movieSevice } from "../../services/MovieService";
import Movie from "./Movie";
const ListMovieShowNow = () => {
  const param = "showNow=true";
  const [movies, setMovies] = useState();
  useEffect(() => {
    movieSevice.getListMovieShowNow(param).then((result) => {
      setMovies(result.data.data);
    });
  }, []);
  return (
    <div className="w-full max-w-[1120px] max-h-[80%] m-auto grid grid-cols-4 gap-10 pt-10 mb-10">
      {movies &&
        movies.map((item) => <Movie key={item.movieID} movie={item}></Movie>)}
    </div>
  );
};
export default ListMovieShowNow;
