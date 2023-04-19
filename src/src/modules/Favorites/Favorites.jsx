import './Favorites.css'

import React, { useState, useEffect } from 'react';

import ModalBooks from '../UI/ModalWindow/ModalWindow';
import CartButton from '../UI/CartButton';

import RedFavorite from '../images/RedFavorite.png'
import Cross from '../images/WhiteCross.png'
import bin from '../images/bin.png'

export default function Favorites() {
  const [books, setBooks] = useState([]);
  const [cartStatus, setCartStatus] = useState(false);

  const [inFavorites, setInFavorites] = useState(true);
  const [favoriteStatus, setFavoriteStatus] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(error => console.log(error));
  }, []);

  function removeFavorite(_id) {
    fetch(`http://localhost:8080/books/${_id}/unfavorite`, { method: 'PUT' })
    .then(res => res.json())
    .then(data => {
      setInFavorites(false);
    })
    .catch(error => console.log(error));
  }  

  function removeAll() {
    const favoriteBooks = books.filter(book => book.inFavorites === true);
    favoriteBooks.forEach(book => {
      fetch(`http://localhost:8080/books/${book._id}/unfavorite`, { method: 'PUT' })
      .then(res => res.json())
      .then(data => {
        setBooks(prevBooks => {
          const updatedBooks = prevBooks.map(prevBook => {
            if (prevBook._id === book._id) {
              return {
                ...prevBook,
                inFavorites: false
              };
            }
            return prevBook;
          });
          return updatedBooks;
        });
      })
      .catch(error => console.log(error));
    });
  }

  return (
    <div className='Favorites'>
        <nav className='favnav'>Избранное</nav>
        <button className='removeChecked' onClick={() => removeAll()}>Удалить всё <img src={bin} /></button>
        <div className='books'>
            {books.filter(book => book.inFavorites === true).map((book) => (
            <div key={book._id} className='book'>
                <button className='cross' key={books._id} onClick={() => removeFavorite(book._id)}><img src={Cross} /></button>
                <button className='favorites' ><img src={RedFavorite} /></button>
                <img src={require(`../images/books/${book.img}.png`)} />
                <nav><b>{book.title}</b></nav>
                <nav>{book.author}</nav>
                <div className='buttons'>
                    <ModalBooks book={book}/>
                    <CartButton book={book} />
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}