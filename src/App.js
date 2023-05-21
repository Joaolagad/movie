import React, { useState, useEffect } from 'react';
import MovieList from './Components/MovieList';
import MovieHeader from './Components/MovieHeader';
import SearchBox from './Components/SearchBox';
import { useNavigate } from 'react-router-dom';
import Pagination from './Components/Pagination';

import { Box, Select, MenuItem } from '@mui/material';
import './App.css';
import MoviePopular from './Components/MoviePopular';
import DetailsMovie from './Pages/DetailsMovie';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [popularMovies, setPopularMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [popularMoviesPage, setPopularMoviesPage] = useState(1)
  const [totalPopularMoviesPages, setTotalPopularMoviesPages] = useState(0);

  const navigate = useNavigate();

  const getMovieRequest = async (page) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}`;

    if (selectedGenre) {
      url += `&with_genres=${selectedGenre}`;
    }

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson && responseJson.results && responseJson.results.length > 0) {
      setMovies(responseJson.results);
      
    }
  };

  const getPopularMovies = async (page) => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data && data.results && data.results.length > 0) {
        setPopularMovies(data.results);
      }
  
      if (data && data.total_pages) {
        setTotalPopularMoviesPages(data.total_pages);
      }
    } catch (error) {
      console.log('Error fetching popular movies:', error);
    }
  };

  const getGenres = async () => {
    let genresurl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}`;

    const response = await fetch(genresurl);
    const responseJson = await response.json();

    if (responseJson && responseJson.genres && responseJson.genres.length > 0) {
      setGenres(responseJson.genres);
    }

  };

  const handlePopularMoviesPagination = (page) => {
    setPopularMoviesPage(page);
    getPopularMovies(page);
  };

  


  useEffect(() => {
    getGenres()
    getPopularMovies(popularMoviesPage);
  }, [popularMoviesPage]);

 

  useEffect(() => {
    getMovieRequest();
    getPopularMovies();

  }, [searchValue, selectedGenre]);

  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <MovieHeader header="Movies" />
      <Box sx={{ mt: 2 }}>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        {searchValue === '' ? (
          <>
            <Box sx={{ mt: 2 }}>
              <Select
                defaultValue=""
                value={selectedGenre}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setSelectedGenre(selectedValue);
                  setSearchValue('');

                  if (selectedValue) {
                    navigate(`/genre/${selectedValue}`);
                  } else {
                    navigate('/');
                  }
                }}
                sx={{
                  position: 'absolute',
                  color: 'white',
                  right: '49%',
                  '& .MuiSelect-root': {
                    color: 'white',
                  },
                  '& .MuiSelect-icon': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'golden',
                    },
                  },
                }}
              >
                <MenuItem value="">All Genres</MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ backgroundColor: 'black', padding: '20px', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <MoviePopular />
            </Box>
               <MovieList movies={popularMovies} className="popular-movie-list" />
          </>
        ) : (
          <MovieList movies={movies} className="search-movie-list" />
        )}
      </Box>


      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {selectedMovie && <DetailsMovie selectedMovie={selectedMovie} />}
      </Box>
      <Pagination
        currentPage={popularMoviesPage}
        totalPages={totalPopularMoviesPages}
        onPageChange={handlePopularMoviesPagination}
       
      />
    </Box>
  );
};

export default App;
