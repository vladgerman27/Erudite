import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FavoritesImg from '../images/Favorites.png'
import RedFavorite from '../images/RedFavorite.png'

export default function FavoriteButton({book}) {
  const [isFavorite, setIsFavorite] = useState(false);

  function addFavorite() {
    const token = localStorage.getItem('isAuth');
    axios.post('http://localhost:8080/favorites', {
        bookId: book._id,
        bookImg: book.img,
        bookTitle: book.title,
        bookAuthor: book.author,
        bookCost: book.cost
      },
      { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        console.log('Книга успешно добавлена в избранные');
        setIsFavorite(true);
      })
      .catch(error => { console.error(error); });
  }

  useEffect(() => {
    const token = localStorage.getItem('isAuth');
    axios.get(`http://localhost:8080/isFavorite/${book._id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        setIsFavorite(response.data.isFavorite);
      })
      .catch(error => { console.error(error); });
  }, [book._id]);

  return (
    <button className='favorites' onClick={addFavorite}>
      {isFavorite ? <img src={RedFavorite} /> : <img src={FavoritesImg} />}
    </button>
  )
}