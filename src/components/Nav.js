import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Nav.css";
export default function Nav() {
  const [show, seTshow] = useState(false);
  const [searchValue, seTsearchValue] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log(window.scrollY);
      if (window.scrollY > 50) {
        //스크롤이 50을 넘기면 seTshow를 트루로 변환시켜 백그라운드를 검은색으로 바꾸게 할려는 기능
        seTshow(true);
      } else {
        seTshow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  const handleChange = (e) => {
    seTsearchValue(e.target.value); //값을 가져오기
    navigate(`/search?q=${e.target.value}`); //가져온 값 검색해서 이동하기
  };
  return (
    //만약 show가 트루면 검은색으로 변환
    <nav className={`nav ${show && "nav__black"}`}>
      <img //왼쪽에 있는 Neflix 로고
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
        className="nav__logo"
        onClick={() => window.location.reload()} //로고 클릭시 리로드 되게하는 기능
      />
      <input
        value={searchValue}
        onChange={handleChange}
        type="text"
        placeholder="영화를 검색해주세요"
      ></input>
      <img
        alt="User logged" //오른쪽에 있는 아바타 이미지
        src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
        className="nav__avatar"
      />
    </nav>
  );
}
