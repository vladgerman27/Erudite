import './Page.css'

import React from 'react'
import PropTypes from "prop-types";

export default function Page(props) {
  return (
    <div className='Page'>
        <h1>{props.name}</h1>
        {props.genre}
    </div>
  )
}

Page.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    genre: PropTypes.isRequired
    };