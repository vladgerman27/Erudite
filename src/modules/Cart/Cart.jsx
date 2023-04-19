import './Cart.css'

import React, { useState, useEffect } from 'react';

import plus from '../images/plus.png'
import minus from '../images/minus.png'
import bin from '../images/bin.png'
import favorite from '../images/favorite2.png'
import RedFavorite from '../images/RedFavorite.png'
  
export default function Cart() {
  const [books, setBooks] = useState([]);

  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [count, setCount] = useState({});
  const [sum, setSum] = useState(0);
  const [cartStatus, setCartStatus] = useState(false);
  const [favoriteStatus, setFavoriteStatus] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setSum(data.filter(book => book.inCart === true).reduce((total, book) => total + book.cost, 0));
      })
      .catch(error => console.log(error));
  }, []);

  function handleCheckboxChangeAll(event) {
    setIsCheckedAll(event.target.checked);
    if (event.target.checked) {
      setIsChecked(books.filter((book) => book.inCart === true).map((book) => book._id));
    } else {
      setIsChecked([]);
    }
  }

  function handleCheckboxChange(event, _id) {
    if (event.target.checked) {
      setIsChecked([...isChecked, _id]);
    } else {
      setIsChecked(isChecked.filter((item) => item !== _id));
    }
  }

  function countPlus(_id) {
    const book = books.find((book) => book._id === _id);
    if (count[_id] !== book.available) {
      setCount({ ...count, [_id]: (count[_id] || 1) + 1 });
      setSum(sum + book.cost);
    }
  } 

  function countMinus(_id) {
    const book = books.find((book) => book._id === _id);
    if (count[_id] > 1) {
      setCount({ ...count, [_id]: (count[_id] || 0) - 1 });
      setSum(sum - book.cost);
    }
  } 

  function removeCart(_id) {
    fetch(`http://localhost:8080/books/${_id}/uncart`, { method: 'PUT' })
    .then(res => res.json())
    .then(data => {
      setCartStatus(false);
    })
    .catch(error => console.log(error));
  }

  function removeChecked() {
    books.forEach(book => {
      if (isChecked.includes(book._id)) {
        book.inCart = false;
        fetch(`http://localhost:8080/books/${book._id}/uncart`, { method: 'PUT', })
        .then(res => res.json())
        .then(data => {
        })
        .catch(error => {
        });
      }
    });
    setIsChecked([]);
  }

  function addFavorite(_id) {
    fetch(`http://localhost:8080/books/${_id}/favorite`, { method: 'PUT' })
    .then(res => res.json())
    .then(data => {
      setFavoriteStatus(true);
    })
    .catch(error => console.log(error));
  }

  return (
    <div className='Cart'>
      <nav>Корзина</nav>
      <div className="cart-info">
        <div className='cart-books'>
          <label className='all'><input type="checkbox" checked={isCheckedAll} onChange={handleCheckboxChangeAll} /><span></span><nav>Выбрать все</nav></label>
          {books.filter(book => book.inCart === true).map((book) => (
            <div key={book._id} className='cart-book'>
              <label><input type="checkbox" checked={isChecked.includes(book._id)} onChange={(e) => handleCheckboxChange(e, book._id)} /><span></span></label>
              <img src={require(`../images/books/${book.img}.png`)} />
              <div className='ta'>
                <nav>{book.author}</nav>
                <nav>{book.title}</nav>
                <div className='cart-buttons'>
                  <button key={books._id} onClick={() => addFavorite(book._id)}>
                    <img src={book.inFavorites ? RedFavorite : favorite} />
                  </button>
                  <button key={books._id} onClick={() => removeCart(book._id)}><img src={bin} /></button>
                </div>
              </div>
              <button onClick={() => countPlus(book._id)}><img src={plus} /></button>
              <nav className='count'>{count[book._id] || 1}</nav>
              <button onClick={() => countMinus(book._id)}><img src={minus} /></button>
              <nav className='cost'>{book.cost}тг</nav>
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
