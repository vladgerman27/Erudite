import './ModalWindow.css'

import React from 'react'
import { Modal } from 'react-bootstrap';

import { books } from '../../Books';

export default function ModalWindow() {
  return (
    <div className='ModalWindow'>
        {books.map((book) => (
            <div key={book.id}>
                <div className='start-info'>
                <h1>{book.title}</h1>
                <nav></nav>
            </div>
            </div>
        ))}
    </div>
  )
}
