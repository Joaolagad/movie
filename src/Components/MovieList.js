import React from "react";
import "./list.css";
import { Link } from "react-router-dom";

const MovieList = (props) => {
  return (
    <div className={`movie-list-container ${props.className}`}>
      {props.movies.map((movie, index) => (
        <Link to={`/movies/${movie.id}`} key={movie.id}>
          <div className="image-container" key={index}>
            <div className="movie-score">{movie.vote_average}</div> {/* Add score value */}
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="movie" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
