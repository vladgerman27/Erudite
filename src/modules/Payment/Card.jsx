import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
    NavLink,
    BrowserRouter,
    useNavigate
  } from "react-router-dom"

export default function Card() {
  const token = localStorage.getItem('isAuth');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const [number, setNumber] = useState('')
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8080/cart', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        setCart(response.data);
        setSum(response.data.reduce((total, book) => total + book.bookCost * book.bookCount , 0));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const Pay = async (e) => {
    e.preventDefault();
    if (number === "" || date ==="" || name === "" || code === "" || phone === "" || email === "") {
        setErr("Пропущено поле для заполнения")
      } else {
        try {
          for (const book of cart) {
            if (book.paymentMethod === "cash") {
              const response = await axios.patch(`http://localhost:8080/books/${book._id}`, {
                available: book.available - book.bookCount
              });
            }
          }
    
          const response = await axios.patch('http://localhost:8080/cart/delete', {
            paymentMethod
          }, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setCart([]);
          navigate('/');
        } catch (error) {
          console.error(error);
          setErr('Ошибка на сервере');
        }
      }
  }

  return (
    <div className='Card'>
        <nav className='pay-nav'>Оплата заказа </nav>
        <input value={number} onChange={(e) => setNumber(e.target.value)} className='pay-input' placeholder='Номер карты' />
        <input value={date} onChange={(e) => setDate(e.target.value)} className='pay-input' placeholder='Срок действия карты' />
        <input value={name} onChange={(e) => setName(e.target.value)} className='pay-input' placeholder='Имя' />
        <input value={code} onChange={(e) => setCode(e.target.value)} className='pay-input' placeholder='Код CCV2' />
        
        <nav className='pay-nav'>Доставка</nav>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className='pay-input' placeholder='Email' />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className='pay-input' placeholder='Телефон' />

        <nav className='err'>{err}</nav>
        <div className='cart-sum-card'>
          <nav>Общая стоимость</nav>
          <nav>{sum}тг</nav>
        </div>

        <button onClick={Pay}>Оплатить</button>
    </div>
  )
}
