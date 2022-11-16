import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { CDBFooter, CDBBox} from "cdbreact";

import "../home/Home.css";
import React, { useState, useEffect } from "react";
import { fetchMovieDetail } from "../../apilists";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import ReactStars from "react-rating-stars-component";
import "./Detail.css"
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
          <h1 className="button">{g.name}</h1>
        </li>
      );
    });
  }
  const url ="http://image.tmdb.org/t/p/original/"
console.log(genresList)
  return (
    <>
      <Navbar bg="light" className="navbar fixed-top navbar-light bg-light">
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
          <div style={{ width: "100%", marginTop:"90px" }}>
            <img
              className="img-fluid"
              src={`${url}${detail.backdrop_path}`}
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
        <CDBFooter className="shadow">
          <CDBBox
            display="flex"
            justifyContent="between"
            alignItems="center"
            className="mx-auto py-4 flex-wrap"
            style={{ width: "100%" }}
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
