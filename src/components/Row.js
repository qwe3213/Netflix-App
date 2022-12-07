import React, { useEffect, useState } from "react";
import axios from "../api/axios";
export default function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchMovieData();
  }, []);
  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl); //fetchUrl -> api/requests.js->에서 app.js으로 가져오고 다시 Row로 가져온 것
    setMovies(request.data.results); //위의 데이터 정보 movies에 다넣기
    console.log(request, "request");
  };
  return (
    <section>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span className="arrow">{"<"}</span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`} // isLargeRow 일경우 화면이 크게나오기위해 movie.poster_path <-라고 있음그냥 아닐경우 movie.backdrop_path <-이것도 그냥 이런 것 이있음.
              alt={movie.name}
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span className="allow">{">"}</span>
        </div>
      </div>
    </section>
  );
}
