import './App.css'

import Main from './modules/Main/Main'
import AboutUs from './modules/AboutUs/AboutUs'
import Contacts from './modules/Contacts/Contacts'
import Page from './modules/Page/Page'
import Popular from './modules/Page/Popular'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
    NavLink,
    BrowserRouter
  } from "react-router-dom"
  import PropTypes from "prop-types";

  import Company_logo from './modules/images/Mask_group.png'
  import Search from './modules/images/Search.png'
  import Favorites from './modules/images/Favorites.png'
  import Cart from './modules/images/Cart.png'
  import Profile from './modules/images/Profile.png'
  import Instagram from './modules/images/Instagram.png'
  import Facebook from './modules/images/Facebook.png'
  import Vk from './modules/images/Vk.png'
  
  import {books} from './modules/Books'

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
      serverPath: 'hud-lit',
      genre: hudLitBooks
    },
    {
      name: 'Бизнес литература',
      path: 'buisness',
      serverPath: 'buisness',
      genre: buisnessBooks
    },
    {
      name: 'Психология и философия',
      path: 'phylosophy',
      serverPath: 'phylosophy',
      genre: phylosophyBooks
    },
    {
      name: 'Фантакстика',
      path: 'fantastic',
      serverPath: 'fantastic',
      genre: fantasticBooks
    },
    {
      name: 'Детская литература',
      path: 'child',
      serverPath: 'child',
      genre: childBooks
    },
    {
      name: 'Учебная литература',
      path: 'study',
      serverPath: 'study',
      genre: studyBooks
    },
    {
      name: 'Научная литература',
      path: 'science',
      serverPath: 'science',
      genre: scienceBooks
    },
    {
      name: 'Медецина и здоровье',
      path: 'medecine',
      serverPath: 'medecine',
      genre: medecineBooks
    },
    {
      name: 'Исскуство и история',
      path: 'nature',
      serverPath: 'nature',
      genre: natureBooks
    },
    {
      name: 'Спорт',
      path: 'sport',
      serverPath: 'sport',
      genre: sportBooks
    },
    {
      name: 'Комиксы и манга',
      path: 'comics',
      serverPath: 'comics',
      genre: comicsBooks
    },
  ];


  function Category({ genre }) {
    return (
      <div className='books'>
        {genre.map((book) => (
          <div key={book.id} className='book'>
            <button className='favorites'><img src={Favorites} /></button>
            <img src={book.img} />
            <nav><b>{book.title}</b></nav>
            <nav>{book.author}</nav>
            <div className='buttons'>
              <button className='buy'>{book.cost}</button>
              <button className='cart'><img src={Cart} /></button>
            </div>
          </div>
        ))}
      </div>
    );
  }

function App() {
  return (
    <Router className="App">
      <header className='header'>
        <NavLink to="/"><img className='logo' src={Company_logo}/></NavLink>

        <div className='header-part'>
          <div className='header-top'>
            <div className='input'>
              <input placeholder='Поиск...'/>
              <img src={Search}/>
            </div>

            <div className='actions'>
              <NavLink to="/favorites"><img src={Favorites} /></NavLink>
              <NavLink to="/cart"><img src={Cart} /></NavLink>
              <NavLink to="/profile"><img src={Profile} /></NavLink>
            </div>
          </div>

          <div className='header-bottom'>
            <select>
              <option><Link to='/'>Каталог</Link></option>
              <option><Link to='hud-lit'>Художественная литература</Link></option>
              <option>Бизнес литература</option>
              <option>Психологическая литература</option>
              <option>Фантастика</option>
              <option>Детская литература</option>
              <option>Учебная литература</option>
              <option>Научная литература</option>
              <option>Медицина. Здоровье</option>
              <option>Искусство. История</option>
              <option>Комиксы и манга</option>
            </select>
            <NavLink to="/popular">Популярные</NavLink>
            <NavLink to="/aboutus">О нас</NavLink>
            <NavLink to="/contacts">Контакты</NavLink>
            <nav>Алматы, ул. Жарокова, 137 блок В1 ЖК "Арай"</nav>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/popular" element={<Popular/>} />
      
        {categories.map(category =>
          <Route path={category.path} element={
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
          <NavLink to="">Преимущества</NavLink>
          <NavLink to="/contacts">Контакты</NavLink>
          <NavLink to="">Оплата и доставка</NavLink>
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