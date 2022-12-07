import React, { useEffect, useState } from "react";
import axios from "../api/axios";
export default function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchMovieData();
  }, []);
  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    console.log(request, "request");
  };
  return <div></div>;
}
