import './Favorites.css'

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import ModalBooks from '../UI/ModalWindow/ModalWindow';
import CartButton from '../UI/CartButton';

import RedFavorite from '../images/RedFavorite.png'
import Cross from '../images/WhiteCross.png'
import bin from '../images/bin.png'
import cartImg from '../images/Cart.png'

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('isAuth');

  useEffect(() => {
    axios.get('http://localhost:8080/favorites', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  function removeFavorite(bookId) {
    axios({ method: 'POST', url: 'http://localhost:8080/favorites/delete',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-HTTP-Method-Override': 'DELETE'
      },
      data: { bookId }
    })
    .then(response => {
      setFavorites(favorites.filter(book => book.bookId !== bookId));
    })
    .catch(error => {
      console.error(error);
    });
  }  

  function removeAll() {
    axios.patch('http://localhost:8080/favorites/delete', null, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(response => {
      console.log(response.data);
      setFavorites([]);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const addCart = useCallback((bookId, bookImg, bookTitle, bookAuthor, bookCost, bookAvailable) => {
    axios.post('http://localhost:8080/cart', {
        bookId: bookId,
        bookImg: bookImg,
        bookTitle: bookTitle,
        bookAuthor: bookAuthor,
        bookCost: bookCost,
        bookAvailable: bookAvailable
      },
      { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        console.log('Книга успешно добавлена в корзину');
        const updatedCart = favorites.map(book => {
          if (book.bookId === bookId) {
            return {
              ...book,
            };
          }
          return book;
        });
        setFavorites(updatedCart);
      })
      .catch(error => { console.error(error); });
  }, [favorites, token]);

  return (
    <div className='Favorites'>
        <nav className='favnav'>Избранное</nav>
        <button className='removeChecked' onClick={() => removeAll()}>Удалить всё <img src={bin} /></button>
        <div className='books'>
            {favorites.map(book => (
            <div key={book.bookId} className='book'>
                <button className='cross' onClick={() => removeFavorite(book.bookId)}><img src={Cross} /></button>
                <button className='favorites' ><img src={RedFavorite} /></button>
                <img src={require(`../images/books/${book.bookImg}.png`)} />
                <nav><b>{book.bookTitle}</b></nav>
                <nav>{book.bookAuthor}</nav>
                <div className='buttons'>
                    <button className='buy'>{book.bookCost}тг</button>
                    <button className='cart' onClick={() => addCart(book.bookId, book.bookImg, book.bookTitle, book.bookAuthor, book.bookCost, book.bookAvailable)}>
                      <img src={cartImg} />
                    </button>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}