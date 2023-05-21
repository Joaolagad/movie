import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import MovieList from './MovieList';
import './popular.css';

const MoviePopular = () => {
  
  const [movies, setMovies] = useState([]);



  const fetchMovies = async (page) => {
    try {
      const apiKey = '6822a884c17763ff29352376024c7644';
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };


  return (
    <div className='popular-movie-list-container'>
      <h2 className='popular-movie-header'>Popular Movies</h2>
      
      <div className='popular-list'>
        <MovieList movies={movies} className="popular-movie-list" />
      </div>
    </div>
  );
};

export default MoviePopular;