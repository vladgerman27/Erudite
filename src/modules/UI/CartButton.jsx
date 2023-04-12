import React, { useState } from 'react';
import CartImg from '../images/Cart.png';
import { books } from '../Books';

export default function CartButton({book}) {
  const [cartStatus, setCartStatus] = useState(false);

  function addCart(id) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
      const newBooks = [...books];
      newBooks[index].inCart = true;
      setCartStatus(true);
    }
  }

  return (
    <button key={books.id} className='cart' onClick={() => addCart(book.id)}>
      <img src={CartImg} />
    </button>
  );
}
