import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './details.css';
import { Button, Dialog, DialogContent } from '@mui/material';

const DetailsMovie = () => {
  const { id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showOverview, setShowOverview] = useState(false);
  const [officialTrailer, setOfficialTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
        const response = await fetch(url);
        const movieData = await response.json();
        setSelectedMovie(movieData);

        const trailersUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}`;
        const trailersResponse = await fetch(trailersUrl);
        const trailersData = await trailersResponse.json();

        const officialTrailerData = trailersData.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setOfficialTrailer(officialTrailerData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!selectedMovie) {
    return <div>Loading...</div>;
  }

  const { title, poster_path, overview } = selectedMovie;

  const handleOverviewToggle = () => {
    setShowOverview(!showOverview);
  };

  return (
    <div className='details-container'>
      <img src={`https://image.tmdb.org/t/p/w400/${poster_path}`} alt="Movie Poster" />
      <div className='content'>
        <h2>{title}</h2>
        <div>
          <Button
            onClick={handleOverviewToggle}
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#FF4081',
              color: '#FFFFFF',
              '&hover': {
                backgroundColor: '#D81B60',
              },
            }}
          >
            {showOverview ? 'Hide Overview' : 'Show Overview'}
          </Button>
          <Dialog open={showOverview} onClose={handleOverviewToggle}>
            <DialogContent>
              <p>{overview}</p>
            </DialogContent>
          </Dialog>
        </div>
        {officialTrailer && (
          <div>
            <h3>Official Trailer</h3>
            <iframe
              title="Official Trailer"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${officialTrailer.key}`}
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsMovie;
