import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "../../api/axios";
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
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log(request);
      setSearchResults(request.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  return <div></div>;
}
