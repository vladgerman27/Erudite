import './Favorites.css'

import React, { useState } from 'react';

import {books} from '../Books'
import ModalBooks from '../UI/ModalWindow/ModalWindow';
import CartButton from '../UI/CartButton';

import RedFavorite from '../images/RedFavorite.png'
import Cross from '../images/WhiteCross.png'
import bin from '../images/bin.png'

export default function Favorites() {
  const [cartStatus, setCartStatus] = useState(false);

  function removeFavorite(id) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
      const newBooks = [...books];
      newBooks[index].inFavorites = false;
      setCartStatus(true);
    }
  }

  function removeAll() {
    const newBooks = books.map(book => {
      book.inFavorites = false;
      return book;
    });
    setCartStatus(true);
  }

  return (
    <div className='Favorites'>
        <nav className='favnav'>Избранное</nav>
        <button className='removeChecked' onClick={() => removeAll()}>Удалить всё <img src={bin} /></button>
        <div className='books'>
            {books.filter(book => book.inFavorites === true).map((book) => (
            <div key={book.id} className='book'>
                <button className='cross' key={books.id} onClick={() => removeFavorite(book.id)}><img src={Cross} /></button>
                <button className='favorites' ><img src={RedFavorite} /></button>
                <img src={book.img} />
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
