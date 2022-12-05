import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import "./Banner.css";
export default function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const request = await axios.get(requests.fetchNowPlaying);
    // 현재 상영중인 영화  정보를 가져오기 (여러영화)

    const movieId =
      request.data.results[
        Math.floor(Math.random() * request.data.results.length)
      ].id;
    //여러 영화 중 영화 하나의 ID 가져오기
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_reponse: "videos" },
    });
    setMovie(movieDetail);
    //data를 movieDetail로 설정후 setMovie에 movieDetail을 넣기
    //특정 영화의 더 상세정보를 가져오기(비디오 정보 포함)

    // const truncate = (str, n) => {
    //   return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    // };
  };
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <div className="banner__contents">
        <h1> {movie.title || movie.name || movie.original_name}</h1>
        <div className="banner__buttons">
          <button className="banner__button play">Play </button>
          <button className="banner__button info">More Information</button>
        </div>
        <h1 className="banner__description">{movie.overview}</h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  );
}
