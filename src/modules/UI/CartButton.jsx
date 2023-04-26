import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CartImg from '../images/Cart.png';

export default function CartButton({book}) {
  function addCart() {
      const token = localStorage.getItem('isAuth');
      axios.post('http://localhost:8080/cart', { bookId: book._id, bookImg: book.img, bookTitle: book.title,
      bookAuthor: book.author, bookAvailable: book.available, bookCost: book.cost  }, 
      { headers: { Authorization: `Bearer ${token}` } })
      .then(response => { console.log('Книга успешно добавлена в корзину'); })
      .catch(error => { console.error(error); });
  }

  return (
    <button className='cart' onClick={addCart}>
      <img src={CartImg} />
    </button>
  );
}
