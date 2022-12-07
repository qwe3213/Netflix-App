import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal";
export default function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});
  useEffect(() => {
    fetchMovieData();
  }, []);
  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl); //fetchUrl -> api/requests.js->에서 app.js으로 가져오고 다시 Row로 가져온 것
    setMovies(request.data.results); //위의 데이터 정보 movies에 다넣기
    console.log(request, "request");
  };
  const handleClick = (movie) => {
    setModalOpen(true); //클릭시 false 였던 것이 false로 변경
    setMovieSelected(movie); //클릭시 moive의 내용 movieSelected에 전달
  };
  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80; // 클릭시 왼쪽으로 window.innerWidth - 80(윈도우 가로 크기전체-80) 만큼움직임
            }}
          >
            {"<"}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`} // poster의 크기가 큰거면(isLarge) posterLarge 아니면 poster
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`} // isLargeRow 일경우 화면이 크게나오기위해 movie.poster_path <-라고 있음그냥 아닐경우 movie.backdrop_path <-이것도 그냥 이런 것 이있음.
              alt={movie.name} //오류안뜨고 흐름안끊기게 넣기
              onClick={() => handleClick(movie)} //클릭시 함수 실행 moive를 전해줌
            />
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="allow"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>
      {modalOpen && ( //만약 modalOpen이 트루 일경우 밑에꺼 실행
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} /> //...movieSelected 객체 내의 내용 전부 표시 setModalOpen=false로 다시변경
      )}
    </section>
  );
}
