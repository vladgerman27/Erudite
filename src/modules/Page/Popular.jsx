import './Page.css'

import React, { useState, useEffect } from 'react'

import ModalBooks from '../UI/ModalWindow/ModalWindow'
import CartButton from '../UI/CartButton'
import FavoriteButton from '../UI/FavoriteButton'

export default function Popular() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='Page'>
      <nav className='h'>Популярные</nav>
      <div className='books'>
        {books.filter(book => book.popular === true).map((book) => (
              <div key={book._id} className='book'>
                <FavoriteButton book={book}/>
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
