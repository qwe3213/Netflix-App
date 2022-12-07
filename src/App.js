import Nav from "./components/Nav";
import "./App.css";
import Banner from "./components/Banner";
import requests from "./api/requests";
import Row from "./components/Row";

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <Row
        title="NetflixOriginal"
        id="NO"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow //화면 크기 크게하기
      />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row
        title="Action Movies"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Comedy Movies"
        id="CM"
        fetchUrl={requests.fetchComedyMovies}
      />
    </div>
  );
}

export default App;
