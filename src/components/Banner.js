import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
export default function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    // 현재 상영중인 영화  정보를 가져오기 (여러영화)
    const request = await axios.get(requests.fetchNowPlaying);
    //여러 영화 중 영화 하나의 ID 가져오기
    const movieId =
      request.data.result[
        Math.floor(Math.random() * request.data.result.length)
      ].id;
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_reponse: "videos" },
    });
    setMovie(movieDetail);
  };
  return <div></div>;
}
