import React, { useState, useEffect } from 'react';
import CartImg from '../images/Cart.png';

export default function CartButton({book}) {
  const [books, setBooks] = useState([]);
  const [cartStatus, setCartStatus] = useState(false);

  useEffect(() => {
    setCartStatus(book.inCart);
  }, [book.inCart]);

  function addCart(_id) {
    if (book.available > 0) {
      fetch(`http://localhost:8080/books/${_id}/cart`, { method: 'PUT' })
      .then(res => res.json())
      .then(data => {
        setCartStatus(true);
      })
      .catch(error => console.log(error));
    }
  }

  return (
    <button key={books._id} className='cart' onClick={() => addCart(book._id)}>
      <img src={CartImg} />
    </button>
  );
}
