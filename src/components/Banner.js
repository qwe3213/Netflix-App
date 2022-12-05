import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
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
  };
  return;
}
