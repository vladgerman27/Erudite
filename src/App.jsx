import './App.css'

import Main from './modules/Main/Main'
import AboutUs from './modules/AboutUs/AboutUs'
import Contacts from './modules/Contacts/Contacts'
import Page from './modules/Page/Page'
import Popular from './modules/Page/Popular'
import ModalBooks from './modules/UI/ModalWindow/ModalWindow'
import Cart from './modules/Cart/Cart'
import CartButton from './modules/UI/CartButton'
import Favorites from './modules/Favorites/Favorites'
import FavoriteButton from './modules/UI/FavoriteButton'
import Profile from './modules/Profile/Profile'
import Payment from './modules/Payment/Payment'
import Card from './modules/Payment/Card'

import React, { useState, useEffect } from 'react';
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
  import PropTypes from "prop-types";

  import Company_logo from './modules/images/Mask_group.png'
  import Search from './modules/images/Search.png'
  import Instagram from './modules/images/Instagram.png'
  import Facebook from './modules/images/Facebook.png'
  import Vk from './modules/images/Vk.png'
  import pageCart from './modules/images/pageCart.png'
  import pageFavorites from './modules/images/pageFavorites.png'

  import "@fontsource/merriweather";
  
function App() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  
  const token = localStorage.getItem('isAuth');
  const [sum, setSum] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/cart', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(response => {
        setCart(response.data);
        setSum(response.data.reduce((total, book) => total + book.bookCost * book.bookCount, 0));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const hudLitBooks = books.filter(book => book.genre === 'hud-lit')
  const buisnessBooks = books.filter(book => book.genre === 'buisness')
  const phylosophyBooks = books.filter(book => book.genre === 'phylosophy')
  const fantasticBooks = books.filter(book => book.genre === 'fantastic')
  const childBooks = books.filter(book => book.genre === 'child')
  const studyBooks = books.filter(book => book.genre === 'study')
  const scienceBooks = books.filter(book => book.genre === 'science')
  const medecineBooks = books.filter(book => book.genre === 'medecine')
  const natureBooks = books.filter(book => book.genre === 'nature')
  const sportBooks = books.filter(book => book.genre === 'sport')
  const comicsBooks = books.filter(book => book.genre === 'comics')

  const categories = [
    {
      name: 'Художественная литература',
      path: 'hud-lit',
      serverPath: '/hud-lit',
      genre: hudLitBooks
    },
    {
      name: 'Бизнес литература',
      path: 'buisness',
      serverPath: '/buisness',
      genre: buisnessBooks
    },
    {
      name: 'Психология и философия',
      path: 'phylosophy',
      serverPath: '/phylosophy',
      genre: phylosophyBooks
    },
    {
      name: 'Фантакстика',
      path: 'fantastic',
      serverPath: '/fantastic',
      genre: fantasticBooks
    },
    {
      name: 'Детская литература',
      path: 'child',
      serverPath: '/child',
      genre: childBooks
    },
    {
      name: 'Учебная литература',
      path: 'study',
      serverPath: '/study',
      genre: studyBooks
    },
    {
      name: 'Научная литература',
      path: 'science',
      serverPath: '/science',
      genre: scienceBooks
    },
    {
      name: 'Медецина и здоровье',
      path: 'medecine',
      serverPath: '/medecine',
      genre: medecineBooks
    },
    {
      name: 'Исскуство и история',
      path: 'nature',
      serverPath: '/nature',
      genre: natureBooks
    },
    {
      name: 'Спорт',
      path: 'sport',
      serverPath: '/sport',
      genre: sportBooks
    },
    {
      name: 'Комиксы и манга',
      path: 'comics',
      serverPath: '/comics',
      genre: comicsBooks
    },
  ];

  function Navigation() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('Каталог');

    function handleCategoryChange(event) {
      setSelectedCategory(event.target.value);
      const selected = categories.find(category => category.name === event.target.value);
      if (selected) {
        navigate(selected.serverPath);
      }
    }

    return (
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option key="/">Каталог</option>
        {categories.map(category => (
          <option key={category.path}>{category.name}</option>
        ))}
      </select>
    )
  }
  const [searchQuery, setSearchQuery] = useState('');

  function Category({ genre }) {
    const filteredBooks = genre.filter((book) => {
      return (
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  
    return (
      <div className='books'>
        {filteredBooks.map((book) => (
          <div key={book._id} className='book'>
            <FavoriteButton book={book}/>
            <img src={require(`./modules/images/books/${book.img}.png`)} />
            <nav><b>{book.title}</b></nav>
            <nav>{book.author}</nav>
            <div className='buttons'>
              <ModalBooks book={book}/>
              <CartButton book={book} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const handleSetIsAuth = (token) => {
    setIsAuth(token);
  };

  //Or you can use whatsapp newsletter instead of card payment. Uncomment the bottom lines of code.
  
  // const handleSendMessage = () => {
  //   const message = cart.map(book => `${book.bookTitle}, ${book.bookAuthor}, ${book.bookCost}тг, ${book.bookCount} штука`).join('\n');
  //   const formattedMessage = encodeURIComponent(`Здравствуйте, хочу заказать:\n${message}`);
  //   const phoneNumber = '+77718619001';

  //   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${formattedMessage}`;
  //   window.open(whatsappUrl, '_blank');
  // };

  return (
    <Router className="App">
      <header className='header'>
        <NavLink to="/"><img className='logo' src={Company_logo}/></NavLink>

        <div className='header-part'>
          <div className='header-top'>
            <div className='input'>
              <input placeholder='Поиск...' value={searchQuery} onChange={handleSearch} />
              <img src={Search}/>
            </div>

            <div className='actions'>
              <NavLink to="/favorites"><img src={pageFavorites} /></NavLink>
              <NavLink to="/cart"><img src={pageCart} /></NavLink>
              <Profile element={isAuth} handleSetIsAuth={handleSetIsAuth}/>
            </div>
          </div>

          <div className='header-bottom'>
            <Navigation/>
            <NavLink to="/popular">Популярные</NavLink>
            <NavLink to="/aboutus">О нас</NavLink>
            <NavLink to="/contacts">Контакты</NavLink>
            <nav>Алматы, ул. Жарокова, 137 блок В1 ЖК "Арай"</nav>
          </div>
        </div>
      </header>

      <Routes>
        <Route key="/" path="/" element={<Main />} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/favorites" element={<Favorites/>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/card" element={<Card/>} />
      
        {categories.map(category =>
          <Route key={category.path} path={category.path} element={
            <Page 
              name={category.name}
              path={category.serverPath}
              genre={<Category genre={category.genre} />}
            />
          } />
        )}
      </Routes>

      <div className='bottom'>
        <NavLink to="/"><img src={Company_logo}/></NavLink>

        <div className='info'>
          <NavLink to="/aboutus">О нас</NavLink>
          <NavLink to="/contacts">Контакты</NavLink>
          <NavLink /*onClick={handleSendMessage}*/ to="/payment">Оплата и доставка</NavLink> 
          <nav>Г. Алматы ул. Байтурсынова 22</nav>
          <div className='time'>
            <nav>пн-пт 10:00 — 21:00</nav>
            <nav>сб-вс 11:00 — 20:00 </nav>
          </div>
          <nav>+7 775 120 90 89</nav>
          <div className='links'>
            <a href='https://www.instagram.com/'><img className='inst' src={Instagram} /></a>
            <a href='https://ru-ru.facebook.com/'><img src={Facebook} /></a>
            <a href='https://vk.com/'><img src={Vk} /></a>
          </div>
          <nav>@Все права защищены</nav>
        </div>
      </div>
    </Router>
  );
}

export default App;

App.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      serverPath: PropTypes.string.isRequired,
      genre: PropTypes.isRequired
    })
  ).isRequired
};