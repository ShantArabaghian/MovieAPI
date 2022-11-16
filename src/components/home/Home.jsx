import React, { useState, useEffect } from "react";
import "./Home.css";
import { CDBFooter, CDBBox} from "cdbreact";
import RBCarousel from "react-bootstrap-carousel";
import ReactStars from "react-rating-stars-component";
import {
  fetchMovies,
  fetchGenre,
  fetchMovieByGenre,
} from "../../apilists";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import "./Home.css";
import AOS from "aos";
import Fade from 'react-reveal/Fade';
import "aos/dist/aos.css";

export function Home() {
  const [nowPlaying, setNowPlaying] = useState([]);

  
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  let [page, setPage] = useState(1);
  const [genreId, setGenreid] = useState();
  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies());
      setGenres(await fetchGenre());
      setMovieByGenre(await fetchMovieByGenre(28));
      AOS.init({ duration: 1000 });

    };
    fetchAPI();
  }, []);
  
  const loadMore = async () => {
    setPage((page += 1));
    const movie = await fetchMovieByGenre(genreId, page);
    const newMovies = [];
    for (let i = 0; i < movieByGenre.length; i++) {
      newMovies.push(movieByGenre[i]);
    }
    for (let i = 0; i < movie.length; i++) {
      newMovies.push(movie[i]);
    }
    setMovieByGenre(newMovies);
  };
  const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};
  const handleGenreClick = async (genreId) => {
    setMovieByGenre(await fetchMovieByGenre(genreId, page));
    setGenreid(genreId);
    removeSlide();
    goToTop()
  };
  function removeSlide() {
    const x = document.getElementById("slideremover");
  
      x.style.display = "none";
    
  }

  const genreList = genres.map((item, index) => {
    return (
     
      <li className="list-inline-item" key={index}>
        
        <button 
          type="button"
          className="btn btn-outline-success"
          onClick={() => {
            handleGenreClick(item.id);
          }}
        >
          {item.name}
        </button>
      </li>
    );
    
  });    

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 100) : text}
        <span
          onClick={toggleReadMore}
          className="read-or-hide"
          style={{ color: "green", cursor: "pointer" }}
        >
          {isReadMore ? "...Read more" : " Show less"}
        </span>
      </p>
    );
  };
  const movieList = movieByGenre.map((item, index) => {
    return (
      <div className=" col-md-3 col-sm-2" key={index}>
       <Fade bottom>  <div  style={{marginTop:'40px'}} >
          <Link   to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "600", color: "whitesmoke" }}>{item.title}</p>
          <span style={{ color: "whitesmoke" }}>
            Rated:
            <span style={{ color: "#f4c10f", padding: "5px" }}>
              {item.rating}
            </span>
            /10{" "}
            <span style={{ display: "inline-block" }}>
              {" "}
              <ReactStars count={1} size={15} color={"#f4c10f"}></ReactStars>
            </span>
          </span>
          <span style={{ color: "whitesmoke" }}>
            <ReadMore>{item.overview}</ReadMore>
          </span>
        </div></Fade> 
      </div>
    );
  });
  const movies = nowPlaying.slice(0, 6).map((item, index) => {
    return (
      <div style={{ height: 750, width: "100%" }} key={index}>
        <div className="carousel-center">
          <Link to={`/movie/${item.id}`}>
            {" "}
            <img
              style={{ height: 570 }}
              src={item.backPoster}
              alt={item.title}
            />
          </Link>
        </div>

        <div
          className="carousel-caption"
          style={{ textAlign: "center", fontSize: 35 }}
        >
          <h1>{item.title}</h1>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="navbar fixed-top bg-dark">
        <h1
          style={{
            fontSize:"20px",
            color: "white",
            textAlign: "center",
            marginBottom: "10px",
            marginLeft: "5px",
          }}
        >       <a href="/"
        style={{ color: "white", padding:"10px" , fontSize:"25px"}}
        className="ml-4 h5 mb-0 font-weight-bold"
      >
        MOVIEDB
      </a><br/>
          Select Category
        </h1>
        <div className="genrelist">
        <h2>{genreList}</h2></div>
      </div>
      <div   className="container">
        <div id="slideremover" style={{ marginTop: "125px" }}>
          <RBCarousel
            className="carrousel"
            autoplay={true}
            pauseOnVisibility={false}
            slidesshowSpeed={2000}
            version={4}
            indicators={true}
          >
            {movies}
          </RBCarousel>
        </div>
        <div   className="movieslist">
      <div className="row mt-2 ">  {movieList}</div>
      <button
          style={{ fontSize:"20px" }}
          className="btn btn-outline-success"
          onClick={loadMore}
        >
          Load more...
        </button>
        </div>
      
        <CDBFooter className="shadow">
          <CDBBox
            display="flex"
            justifyContent="between"
            alignItems="center"
            className="mx-auto py-4 flex-wrap"
            style={{ width: "90%" }}
          >
            <CDBBox display="flex" alignItems="center">
              <a href="/"
                style={{ color: "white" }}
                className="ml-4 h5 mb-0 font-weight-bold"
              >
                MOVIEDB
              </a>
            </CDBBox>
            <CDBBox>
              <small style={{ color: "white" }} className="ml-2">
                &copy; ShantA, 2022. All rights reserved.
              </small>
            </CDBBox>
          </CDBBox>
        </CDBFooter>
      </div>
    </>
  );
}
