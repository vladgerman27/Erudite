import React, { useState } from 'react';

import FavoritesImg from '../images/Favorites.png'
import RedFavorite from '../images/RedFavorite.png'

import { books } from '../Books';

export default function FavoriteButton({book}) {
  const [favoriteStatus, setFavoriteStatus] = useState(false);

  function addFavorite(id) {
  const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
    const newBooks = [...books];
    newBooks[index].inFavorites = true;
    setFavoriteStatus(true);
    }
  }  

  return (
    <button key={books.id} className='favorites' onClick={() => addFavorite(book.id)}>
      <img src={book.inFavorites ? RedFavorite : FavoritesImg} />
    </button>
  )
}