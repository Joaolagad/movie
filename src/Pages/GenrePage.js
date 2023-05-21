import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from '../Components/MovieList';
import Pagination from '../Components/Pagination';
import './genre.css'

const GenrePage = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [genrePage, setGenrePage] = useState(1);
  const [totalGenrePage, setTotalGenrePage] = useState(0)
  const [genreName, setGenreName] = useState('')
  useEffect(() => {
    const fetchMoviesByGenre = async (genrepage) => {
      const apiKey = "6822a884c17763ff29352376024c7644";
      const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${genrepage}`;
  
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        if (data && data.results && data.results.length > 0) {
          setMovies(data.results);
        }

        if (data && data.total_pages) {
          setTotalGenrePage(data.total_pages)
        }

      } catch (error) {
        console.log(error);
      }
    };
  
    fetchMoviesByGenre(genrePage);
  }, [genrePage, genreId]);
  
  const handleGenrePagination = (genrepage) => {
    setGenrePage(genrepage);
  }

    useEffect(() => {
      const fetchGenreName = async () => {
        const apiKey = "6822a884c17763ff29352376024c7644";
        const apiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

        try {
          const response = await fetch(apiUrl)
          const data = await response.json()

          if (data && data.genres && data.genres.length > 0) {
            const genre = data.genres.find((g) => g.id === parseInt(genreId));
            if (genre) {
              setGenreName(genre.name)
            }
          }
          } catch (error) {
            console.log(error)
          } 
          
        }

        fetchGenreName()
      }, [genreId]);

  return (
    <div>
      <div className='title-genre'>
        {genreName && <h2>{genreName}</h2>}
      </div>
      <MovieList movies={movies} />
      
      <Pagination
        currentgenrePage={genrePage}
        genretotalPages={totalGenrePage}
        onGenrePageChange={handleGenrePagination}
      />
    </div>
  );
};

export default GenrePage;