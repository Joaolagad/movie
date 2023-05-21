import React from 'react';
import { Box } from '@mui/material';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  currentgenrePage,
  genretotalPages,
  onGenrePageChange
}) => {
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const handlegenrePageChange = (genrepage) => {
    if (genrepage < 1 || genrepage > genretotalPages) return;
    onGenrePageChange(genrepage);
  };

  return (
    <Box>
      {!currentgenrePage ? (
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            style={buttonStyle}
          >
            Previous
          </button>
          <span style={pageNumberStyle}>{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            style={buttonStyle}
          >
            Next
          </button>
        </div>
      ) : (
        <div style={genreButtonContainerStyle}>
          <button
            onClick={() => handlegenrePageChange(currentgenrePage - 1)}
            style={buttonStyle}
          >
            Previous
          </button>
          <span style={pageNumberStyle}>{currentgenrePage}</span>
          <button
            onClick={() => handlegenrePageChange(currentgenrePage + 1)}
            style={buttonStyle}
          >
            Next
          </button>
        </div>
      )}
    </Box>
  );
};

const buttonStyle = {
  background: 'transparent',
  color: 'white',
  padding: '10px 20px',
  border: '2px solid rgba(0, 0, 0, 0.2)',
  borderRadius: '5px',
  margin: '0 5px',
  cursor: 'pointer',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)',
  transition: 'background-color 0.3s ease',
};

const genreButtonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '20px 0',
};

const pageNumberStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 5px',
  display: 'inline-block',
  borderRadius: '50%',
  backgroundColor: 'gold',
  color: 'black',
  width: '30px',
  height: '30px',
  textAlign: 'center',
  lineHeight: '30px',
};

export default Pagination;
