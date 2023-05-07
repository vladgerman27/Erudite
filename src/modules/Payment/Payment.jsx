import './Payment.css'

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

export default function Payment() {
  const token = localStorage.getItem('isAuth');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [adress, setAdress] = useState('')

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

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const Continue = async (e) => {
    e.preventDefault();
    if (name === "" || surname ==="" || phone === "" || email === "" || adress === "") {
      setErr("Пропущено поле для заполнения")
      } else if (!document.querySelector("input[name='paymentMethod']:checked")) {
      setErr("Выберите способ оплаты")
      } else {
  // try {
  //         const response = await axios.post('http://localhost:8080/register', { email, password});
  //         localStorage.setItem('isAuth', response.data.token);
  //         handleSetIsAuth(response.data.token);
  //         setSingupIsOpen(false);
  //         setAccount(true);
  //       }catch (error) {
  //         console.error(error);
  //         setSingupMis("Пользователь с таким email уже зарегистрирован");
  //       }
      navigate('/card')
    }
  }

  return (
    <div className='Payment'>
      <div className='order-info'>
        <nav className='pay-nav'>Оформление заказа</nav>
        <nav className='pay-nav'>Личные данные</nav>

        <input value={name} onChange={(e) => setName(e.target.value)} className='pay-input' placeholder='Имя' />
        <input value={surname} onChange={(e) => setSurname(e.target.value)} className='pay-input' placeholder='Фамилия' />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className='pay-input' placeholder='Телефон' />
        <input value={email} onChange={(e) => setEmail(e.target.value)} className='pay-input' placeholder='Email' />

        <nav className='pay-nav'>Доставка</nav>
        <input value={adress} onChange={(e) => setAdress(e.target.value)} className='pay-input' placeholder='Улица/Дом/Квартира' />

        <nav className='pay-nav'>Оплата</nav>
        <label>
          <input
            type="checkbox"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === "card"}
            onChange={handlePaymentMethodChange}
          />
          <span></span><nav>Оплата платежной картой на сайте</nav>
        </label>
        <label>
          <input
            type="checkbox"
            name="paymentMethod"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={handlePaymentMethodChange}
          />
          <span></span><nav>Оплата при получении</nav>
        </label>

        <nav className='err'>{err}</nav>

        <button onClick={Continue}>Продолжить</button>
      </div>

      <div className='your-cart'>
        <nav className='your-cart-nav'>Ваш заказ</nav>
        <div className='cart-scroll'>
          {cart.map(book => (
              <div className='cartBook'>
                  <img src={require(`../images/books/${book.bookImg}.png`)}/>
                  <div>
                    <nav>{book.bookAuthor}</nav>
                    <nav>{book.bookTitle}</nav>
                    <div className='cart-cost'>
                      <nav>{book.bookCount}шт</nav>
                      <nav>{book.bookCost}тг</nav>
                    </div>
                  </div>
              </div>
          ))}   
        </div>
        <div className='cart-sum'>
          <nav>Общая стоимость</nav>
          <nav>{sum}тг</nav>
        </div>
      </div>
    </div>
  )
}
