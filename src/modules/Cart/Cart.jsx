import './Cart.css'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import plus from '../images/plus.png'
import minus from '../images/minus.png'
import bin from '../images/bin.png'
import favorite from '../images/favorite2.png'
import RedFavorite from '../images/RedFavorite.png'
  
export default function Cart() {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem('isAuth');

  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [count, setCount] = useState({});
  const [sum, setSum] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/cart', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        setCart(response.data);
        setSum(response.data.reduce((total, book) => total + book.bookCost, 0));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  function handleCheckboxChangeAll(event) {
    setIsCheckedAll(event.target.checked);
    if (event.target.checked) {
      setIsChecked(cart.map(book => book.bookId));
    } else {
      setIsChecked([]);
    }
  }

  function handleCheckboxChange(event, bookId) {
    if (event.target.checked) {
      setIsChecked([...isChecked, bookId]);
    } else {
      setIsChecked(isChecked.filter((item) => item !== bookId));
    }
  }

  function countPlus(bookId) {
    const book = cart.find(book => book.bookId === bookId);
    if (count[bookId] !== book.bookAvailable) {
      setCount({ ...count, [bookId]: (count[bookId] || 1) + 1 });
      setSum(sum + book.bookCost);
    }
  } 

  function countMinus(bookId) {
    const book = cart.find((book) => book.bookId === bookId);
    if (count[bookId] > 1) {
      setCount({ ...count, [bookId]: (count[bookId] || 0) - 1 });
      setSum(sum - book.bookCost);
    }
  } 

  function removeCart(bookId) {
    axios({ method: 'POST', url: 'http://localhost:8080/cart/delete',
      headers: { 'Authorization': `Bearer ${token}`, 'X-HTTP-Method-Override': 'DELETE' },
      data: { bookId }
    })
    .then(response => {
      setCart(cart.filter(book => book.bookId !== bookId));
      setSum(sum - cart.find(book => book.bookId === bookId).bookCost);
    })
    .catch(error => {
      console.error(error);
    });
  }

  function removeChecked() {
    const updatedCart = cart.filter(book => !isChecked.includes(book.bookId));

  axios({ method: 'PUT', url: 'http://localhost:8080/cart',
    headers: { 'Authorization': `Bearer ${token}` },
    data: { cart: updatedCart }
  })
  .then(response => {
    setCart(updatedCart);
    setIsChecked([]);
  })
  .catch(error => {
    console.error(error);
  });
  }

  function addFavorite(bookId, bookImg, bookTitle, bookAuthor, bookCost) {
    const token = localStorage.getItem('isAuth');
    axios.post('http://localhost:8080/favorites', {
        bookId: bookId,
        bookImg: bookImg,
        bookTitle: bookTitle,
        bookAuthor: bookAuthor,
        bookCost: bookCost
      },
      { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        console.log('Книга успешно добавлена в избранные');
        const updatedCart = cart.map(book => {
          if (book.bookId === bookId) {
            return {
              ...book,
              isFavorite: true
            };
          }
          return book;
        });
        setCart(updatedCart);
      })
      .catch(error => { console.error(error); });
  }

  useEffect(() => {
    const token = localStorage.getItem('isAuth');
    cart.forEach(book => {
      axios.get(`http://localhost:8080/isFavorite/${book.bookId}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          const updatedCart = cart.map(b => {
            if (b.bookId === book.bookId) {
              return {
                ...b,
                isFavorite: response.data.isFavorite
              };
            }
            return b;
          });
          setCart(updatedCart);
        })
        .catch(error => { console.error(error); });
    });
  }, [cart]);

  return (
    <div className='Cart'>
      <nav>Корзина</nav>
      <div className="cart-info">
        <div className='cart-books'>
          <label className='all'><input type="checkbox" checked={isCheckedAll} onChange={handleCheckboxChangeAll} /><span></span><nav>Выбрать все</nav></label>
          {cart.map(book => (
            <div key={book.bookId} className='cart-book'>
              <label><input type="checkbox" checked={isChecked.includes(book.bookId)} onChange={(e) => handleCheckboxChange(e, book.bookId)} /><span></span></label>
              <img src={require(`../images/books/${book.bookImg}.png`)} />
              <div className='ta'>
                <nav>{book.bookAuthor}</nav>
                <nav>{book.bookTitle}</nav>
                <div className='cart-buttons'>
                  <button onClick={() => addFavorite(book.bookId, book.bookImg, book.bookTitle, book.bookAuthor, book.bookCost)}>
                    {book.isFavorite ? <img src={RedFavorite} /> : <img src={favorite} />}
                  </button>
                  <button onClick={() => removeCart(book)}><img src={bin} /></button>
                </div>
              </div>
              <button onClick={() => countPlus(book.bookId)}><img src={plus} /></button>
              <nav className='count'>{count[book.bookId] || 1}</nav>
              <button onClick={() => countMinus(book.bookId)}><img src={minus} /></button>
              <nav className='cost'>{book.bookCost}тг</nav>
            </div>
            ))}
        </div>

        <div className='shops'>
          <button className='buy2'>Купить</button>
          <nav>Общая стоимость <span>{sum}</span></nav>
          <button onClick={removeChecked} className='removeChecked'>Удалить выделенное <img src={bin} /></button>
        </div>
      </div>
    </div>
  )
}
