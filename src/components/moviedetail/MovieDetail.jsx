import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import "../home/Home.css";
import React, { useState, useEffect } from "react";
import { fetchMovieDetail } from "../../apilists";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import ReactStars from "react-rating-stars-component";

export function MovieDetail({ match }) {
  let params = match.params;
  let genres = [];
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
    };

    fetchAPI();
  }, [params.id]);

  genres = detail.genres;

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <h1 className="btn btn-outline-success">{g.name}</h1>
        </li>
      );
    });
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container style={{ textAlign: "center" }}>
          <Link className="NavLink" to="/">
            {" "}
            <Navbar.Brand href="#home">MOVIEDB</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container">
        <div>
          <div style={{ width: "100%" }}>
            <img
              className="img-fluid"
              src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
              alt={detail.title}
            ></img>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <div style={{ fontSize: 35, color: "white", fontWeight: "600" }}>
              <h1> {detail.title}</h1>
            </div>
            <h4 style={{ color: "#dee1d1", fontWeight: "bolder" }}>GENRE</h4>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <ul className="list-inline">{genresList}</ul>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <div className="row mt-3">
              <div className="col">
                <p style={{ color: "#dee1d1", fontWeight: "bolder" }}>Rating</p>
              </div>
            </div>

            <ReactStars
              count={detail.vote_average}
              size={20}
              color={"#f4c10f"}
            ></ReactStars>

            <div className="mt-3">
              <p style={{ color: "#dee1d1", fontWeight: "bolder" }}>
                Movie Description
              </p>
              <p
                style={{
                  fontFamily: "Franklin Gothic Medium",
                  color: "whitesmoke",
                }}
              >
                {" "}
                {detail.overview}
              </p>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-3">
            <p style={{ color: "#dee1d1", fontWeight: "bolder" }}>
              RELEASE DATE
            </p>
            <p style={{ color: "green", fontSize: "20px" }}>
              {detail.release_date}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
