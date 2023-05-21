import React from 'react'
import { Box, Input } from '@mui/material';
import './search.css'
const SearchBox = (props) => {
  return (
    <Box display="flex" justifyContent="center">
      <div className='search-container'>
        <Input
            className='form-control'
            value={props.searchValue}
            onChange={(event) => props.setSearchValue(event.target.value)}
            placeholder='Type your movie'
        
        >
        </Input>
      </div>

    </Box>
  )
}

export default SearchBox