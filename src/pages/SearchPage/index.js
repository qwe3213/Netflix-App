import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import "./SearchPage.css";
export default function SearchPage() {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const searchTerm = query.get("q"); //nav.js 에서 q=~~로 설정했기에 q를 가져오는 것

  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (searchTerm) {
      fetchSearchMoive(searchTerm);
    }
  }, [searchTerm]);
  const fetchSearchMoive = async (searchTerm) => {
    //검색시 데이터 가져오고 에러일경우 에러 보여주기 기능
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  const renderSearchResults = () => {
    return searchResults.length > 0 ? ( //1글자이상 검색하였을떼
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path; //검색하여 맞는 이미지
            return (
              <div className="movie">
                <div className="movie__column-poster" />
                <img
                  src={movieImageUrl}
                  alt="moive"
                  className="moive__poster"
                />
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자하는 검색어"{searchTerm}"에 맞는 영화가 없습니다.</p>{" "}
          {/* 검색하였는데 맞는 데이터가 없을경우 */}
        </div>
      </section>
    );
  };
  return renderSearchResults();
}
