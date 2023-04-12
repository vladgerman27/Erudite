import './Page.css'

import React from 'react'

import { books } from '../Books'
import ModalBooks from '../UI/ModalWindow/ModalWindow'
import CartButton from '../UI/CartButton'
import FavoriteButton from '../UI/FavoriteButton'

export default function Popular() {
  return (
    <div className='Page'>
      <h1>Популярные</h1>
        {books.filter(book => book.popular === true).map((book) => (
              <div key={book.id} className='book'>
              <FavoriteButton book={book}/>
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
  )
}
