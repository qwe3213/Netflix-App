import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import "./Banner.css";
import styled from "styled-components";
export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
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
    //eslint-disable-next-line no-unused-vars
    // const truncate = (str, n) => {
    //   return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    // };
    // 배너 스크립트의 글자수가 100자가 넘으면 99자 이후 ...이 나오도록 설정

    // 정의하고 return에서 함수 실행을 하는데 오류떠서 잠시 제거 1. eslint가 읽지못하여 옆에 주석처리후 작성 시도 ->실패
  };
  if (!isClicked) {
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
          <h1 className="banner__title">
            {" "}
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div className="banner__buttons">
            <button
              className="banner__button play"
              onClick={() => setIsClicked(true)}
            >
              Play{" "}
            </button>
            <button className="banner__button info">More Information</button>
          </div>
          <h1 className="banner__description">{movie.overview}</h1>
        </div>
        <div className="banner__fadeBottom" />
      </header>
    );
  } else {
    return (
      <Container>
        <HomeContainer>clicked</HomeContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
