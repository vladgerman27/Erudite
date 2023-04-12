import './Cart.css'

import React, { useState } from 'react';

import {books} from '../Books'

import plus from '../images/plus.png'
import minus from '../images/minus.png'
import bin from '../images/bin.png'
import favorite from '../images/favorite2.png'
  
export default function Cart() {
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [count, setCount] = useState({});
  const [sum, setSum] = useState(books.filter(book => book.inCart === true).reduce((total, book) => total + book.cost, 0));
  const [cartStatus, setCartStatus] = useState(false);

  function handleCheckboxChangeAll(event) {
    setIsCheckedAll(event.target.checked);
    if (event.target.checked) {
      setIsChecked(books.filter((book) => book.inCart === true).map((book) => book.id));
    } else {
      setIsChecked([]);
    }
  }

  function handleCheckboxChange(event, id) {
    if (event.target.checked) {
      setIsChecked([...isChecked, id]);
    } else {
      setIsChecked(isChecked.filter((item) => item !== id));
    }
  }

  function countPlus(id) {
    const book = books.find((book) => book.id === id);
    if (count[id] !== book.available) {
      setCount({ ...count, [id]: (count[id] || 1) + 1 });
      setSum(sum + book.cost);
    }
  } 

  function countMinus(id) {
    const book = books.find((book) => book.id === id);
    if (count[id] > 1) {
      setCount({ ...count, [id]: (count[id] || 0) - 1 });
      setSum(sum - book.cost);
    }
  } 

  function removeCart(id) {
    const index = books.findIndex(book => book.id === id);
    const book = books.find((book) => book.id === id);
    if (index !== -1) {
      const newBooks = [...books];
      newBooks[index].inCart = false;
      setSum(sum - book.cost);
      setCartStatus(true);
    }
  }

  function removeChecked() {
    const newBooks = [...books];
    isChecked.forEach((id) => {
      const index = newBooks.findIndex((book) => book.id === id);
      if (index !== -1) {
        newBooks[index].inCart = false;
      }
    });
    setCartStatus(true);
    setSum(newBooks.filter(book => book.inCart === true).reduce((total, book) => total + book.cost, 0));
  }

  return (
    <div className='Cart'>
      <nav>Корзина</nav>
      <div className="cart-info">
        <div className='cart-books'>
          <label className='all'><input type="checkbox" checked={isCheckedAll} onChange={handleCheckboxChangeAll} /><span></span><nav>Выбрать все</nav></label>
          {books.filter(book => book.inCart === true).map((book) => (
            <div key={book.id} className='cart-book'>
              <label><input type="checkbox" checked={isChecked.includes(book.id)} onChange={(e) => handleCheckboxChange(e, book.id)} /><span></span></label>
              <img src={book.img} />
              <div className='ta'>
                <nav>{book.author}</nav>
                <nav>{book.title}</nav>
                <div className='cart-buttons'>
                  <button><img src={favorite} /></button>
                  <button key={books.id} onClick={() => removeCart(book.id)}><img src={bin} /></button>
                </div>
              </div>
              <button onClick={() => countPlus(book.id)}><img src={plus} /></button>
              <nav className='count'>{count[book.id] || 1}</nav>
              <button onClick={() => countMinus(book.id)}><img src={minus} /></button>
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
