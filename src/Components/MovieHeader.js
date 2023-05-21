import React from 'react'
import './header.css'
const MovieHeader = (props) => {
  return (
    <div className='container-header'>
        <h1>{props.header}</h1>

    </div>
  )
}

export default MovieHeader