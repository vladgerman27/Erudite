import React, { useState, useEffect } from 'react';

import FavoritesImg from '../images/Favorites.png'
import RedFavorite from '../images/RedFavorite.png'

export default function FavoriteButton({book}) {
  const [books, setBooks] = useState([]);
  const [inFavorites, setInFavorites] = useState(false);

  useEffect(() => {
    setInFavorites(book.inFavorites);
  }, [book.inFavorites]);

  function addFavorite(_id) {
    fetch(`http://localhost:8080/books/${_id}/favorite`, { method: 'PUT' })
      .then(res => res.json())
      .then(data => {
        setInFavorites(true);
      })
      .catch(error => console.log(error));
  }  

  return (
    <button key={books._id} className='favorites' onClick={() => addFavorite(book._id)}>
      <img src={book.inFavorites ? RedFavorite : FavoritesImg} />
    </button>
  )
}