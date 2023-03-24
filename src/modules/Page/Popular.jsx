import './Page.css'

import React from 'react'

import { books } from '../Books'

import Favorites from '../images/Favorites.png'
import Cart from '../images/Cart.png'

export default function Popular() {
  return (
    <div className='Page'>
      <h1>Популярные</h1>
        {books.filter(book => book.popular === true).map((book) => (
              <div key={book.id} className='book'>
              <button className='favorites'><img src={Favorites} /></button>
              <img src={book.img} />
              <nav><b>{book.title}</b></nav>
              <nav>{book.author}</nav>
              <div className='buttons'>
                <button className='buy'>{book.cost}</button>
                <button className='cart'><img src={Cart} /></button>
              </div>
            </div>
            ))}
    </div>
  )
}
