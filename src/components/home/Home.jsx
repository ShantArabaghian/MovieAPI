import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import "./Home.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import RBCarousel from "react-bootstrap-carousel";
import ReactStars from "react-rating-stars-component";

import { fetchMovies, fetchGenre, fetchMovieByGenre } from "../../apilists";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import "./Home.css";
import AOS from "aos";
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

  const handleGenreClick = async (genreId) => {
    setMovieByGenre(await fetchMovieByGenre(genreId, page));
    setGenreid(genreId);
  };

  const genreList = genres.map((item, index) => {
    return (
      <li
        className="list-inline-item"
        style={{
          display: "grid",
          gridTemplateColumns: "auto",
          gridtemplaterows: "auto",
          textAlign: "center",
          width: "100%",
        }}
        key={index}
      >
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
      <div data-aos="zoom-in" className="col-md-4 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img
              className="img-fluid"
              src={item.poster}
              alt={item.title}
            ></img>
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
        </div>
      </div>
    );
  });
  const movies = nowPlaying.slice(0, 6).map((item, index) => {
    return (
      <div style={{ height: 500, width: "100%" }} key={index}>
        <div className="carousel-center">
          <Link to={`/movie/${item.id}`}>
            {" "}
            <img
              style={{ height: 600 }}
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
      <Navbar bg="light" expand="lg">
        <Container style={{ textAlign: "center" }}>
          <Navbar.Brand to="/">MOVIEDB</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <NavDropdown title="Genres" id="basic-nav-dropdown">
                <NavDropdown.Item>{genreList}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container">
        <div className="col">
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
        <div>
          <div>
            <div className="col"></div>
          </div>
        </div>

        <div className="row mt-3">{movieList}</div>

        <button
          style={{ marginBottom: "10px" }}
          className="btn btn-outline-success"
          onClick={loadMore}
        >
          Load more...
        </button>
      </div>
    </>
  );
}
