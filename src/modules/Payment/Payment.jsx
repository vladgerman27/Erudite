import './Payment.css'

import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Payment() {
  const token = localStorage.getItem('isAuth');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);
  const [count, setCount] = useState({});
  const [err, setErr] = useState('')

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
        setSum(response.data.reduce((total, book) => total + book.bookCost, 0));
        setCount(response.data.reduce((total, book) => total + book.bookCost, 0));
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
    }
  }

  return (
    <div className='Payment'>
      <div className='order-info'>
        <nav className='pay-nav'>Оформление заказа</nav>
        <nav className='pay-nav'>Личные данные</nav>

        <input className='pay-input' placeholder='Имя' />
        <input className='pay-input' placeholder='Фамилия' />
        <input className='pay-input' placeholder='Телефон' />
        <input className='pay-input' placeholder='Email' />

        <nav className='pay-nav'>Доставка</nav>
        <input className='pay-input' placeholder='Улица/Дом/Квартира' />

        <nav className='pay-nav'>Оплата</nav>
        <label>
          <input
            type="radio"
            checked={paymentMethod}
            onChange={handlePaymentMethodChange}
          />
          <span></span><nav>Оплата платежной картой на сайте</nav>
        </label>
        <label>
          <input
            type="radio"
            checked={paymentMethod}
            onChange={handlePaymentMethodChange}
          />
          <span></span><nav>Оплата при получении</nav>
        </label>

        <nav className='err'>{err}</nav>

        <button onClick={Continue}>Продолжить</button>
      </div>

      <div className='your-cart'>
        <nav className='your-cart-nav'>Ваш заказ</nav>
        {cart.map(book => (
            <div className='cartBook'>
                <img src={require(`../images/books/${book.bookImg}.png`)}/>
                <div>
                  <nav>{book.bookAuthor}</nav>
                  <nav>{book.bookTitle}</nav>
                  <div className='cart-cost'>
                    {/* <nav>{count}</nav> */}
                    <nav>{book.bookCost}тг</nav>
                  </div>
                </div>
            </div>
        ))}   
        <div className='cart-sum'>
          <nav>Общая стоимость</nav>
          <nav>{sum}тг</nav>
        </div>
      </div>
    </div>
  )
}
