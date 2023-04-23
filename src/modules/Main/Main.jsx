import './Main.css'

import React, { useState, useRef, useEffect } from 'react'
import { useSnapCarousel } from 'react-snap-carousel'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  NavLink,
  BrowserRouter
} from "react-router-dom"

import ModalBooks from '../UI/ModalWindow/ModalWindow'
import CartButton from '../UI/CartButton'
import FavoriteButton from '../UI/FavoriteButton'

import Partners from '../images/Partners.png'

export default function Main() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(error => console.log(error));
  }, []);

  const slidesContainerRef = useRef(null);
  const slideRef = useRef(null);
  const slideWidth = slideRef.current ? slideRef.current.clientWidth : 0;
  
  function handleNextButtonClick() {
  slidesContainerRef.current.scrollLeft += slideWidth;
  }
  
  function handlePrevButtonClick() {
  slidesContainerRef.current.scrollLeft -= slideWidth;
  }

  const newBooksRef = useRef(null);
  const bestBooksRef = useRef(null);

  const { scrollRef: newBooksScrollRef, pages: newBooksPages, activePageIndex: newBooksActivePageIndex, next: newBooksNext, prev: newBooksPrev, goTo: newBooksGoTo } =
      useSnapCarousel({ ref: newBooksRef });

  const { scrollRef: bestBooksScrollRef, pages: bestBooksPages, activePageIndex: bestBooksActivePageIndex, next: bestBooksNext, prev: bestBooksPrev, goTo: bestBooksGoTo } =
      useSnapCarousel({ ref: bestBooksRef });

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='Main'>
      <section className="slider-wrapper">
        <button className="slide-arrow" id="slide-arrow-prev" onClick={handlePrevButtonClick}>&#8249;</button>
        <button className="slide-arrow" id="slide-arrow-next" onClick={handleNextButtonClick}>&#8250;</button>
        <ul className="slides-container" id="slides-container" ref={slidesContainerRef}>
          <li className="slide">
            <div className='slide-text' ref={slideRef}>
              <nav><b>Скидка 10%</b> на все учебники издательства “Мектеп”!</nav>
              <a href=''>Перейти</a>
            </div>
          </li>
        </ul>
      </section>

      <div className='categories'>
        <div className='category'>
          <nav><b>Новинки</b></nav>
          <ul
          ref={newBooksScrollRef}
          style={{
            display: 'flex',
            overflow: 'auto',
            scrollSnapType: 'x mandatory'
          }}
          >
            {books.filter(book => book.new === true).map((book) => (
              <div key={book._id} className='book'>
              <FavoriteButton book={book}/>
              <img src={require(`../images/books/${book.img}.png`)} />
              <nav><b>{book.title}</b></nav>
              <nav>{book.author}</nav>
              <div className='buttons'>
                <ModalBooks book={book}/>
                <CartButton book={book} />
              </div>
            </div>
            ))}
          </ul>
          <div className='movements'>
            <ol style={{ display: 'flex' }}>
              {newBooksPages.map((_, i) => (
                  <button className='slider-button'
                    style={i === newBooksActivePageIndex ? { backgroundColor: '#E9E9E9' } : {}}
                    onClick={() => newBooksGoTo(i)}
                  >
                  </button>
              ))}
            </ol>
            <div className='slider-tick'>
              <button onClick={() => newBooksPrev()}>&#8249;</button>
              <button onClick={() => newBooksNext()}>&#8250;</button>
            </div>
          </div>
        </div>

        <div className='category'>
          <nav><b>Лучшее за месяц</b></nav>
          <ul
          ref={bestBooksScrollRef}
          style={{
            display: 'flex',
            overflow: 'auto',
            scrollSnapType: 'x mandatory'
            
          }}
          >
            {books.filter(book => book.best === true).map((book) => (
              <div key={book._id} className='book'>
              <FavoriteButton book={book}/>
              <img src={require(`../images/books/${book.img}.png`)} />
              <nav><b>{book.title}</b></nav>
              <nav>{book.author}</nav>
              <div className='buttons'>
                <ModalBooks book={book}/>
                <CartButton book={book} />
              </div>
            </div>
            ))}
          </ul>
          <div className='movements'>
            <ol style={{ display: 'flex' }}>
              {bestBooksPages.map((_, i) => (
                  <button className='slider-button'
                    style={i === bestBooksActivePageIndex ? { backgroundColor: '#E9E9E9' } : {}}
                    onClick={() => bestBooksGoTo(i)}
                  >
                  </button>
              ))}
            </ol>
            <div className='slider-tick'>
              <button onClick={() => bestBooksPrev()}>&#8249;</button>
              <button onClick={() => bestBooksNext()}>&#8250;</button>
            </div>
          </div>
        </div>
      </div>

      <div className='genres'>
        <nav>Жанры</nav>
        <div className='cubes'>
          <div className='cube-top'>
            <div className='cube-column'>
              <div id='hud-lit'>
                <NavLink to='/hud-lit'><nav>Художественная литература</nav></NavLink>
              </div>
              <div id='scince'>
                <NavLink to='/science'><nav>Наука</nav></NavLink>
              </div>
            </div>
            <div className='cube-column'>
              <div id='phylosophy'>
                <NavLink to='/phylosophy'><nav>Психология и Философия</nav></NavLink>
              </div>
              <div id='family'>
                <NavLink to='/child'><nav>Детям и родителям</nav></NavLink>
              </div>
              <div id='sport'>
                <NavLink to='/sport'><nav>Спорт</nav></NavLink>  
              </div>
            </div>
            <div className='cube-column'>
              <div id='buisness'>
                <NavLink to='/buisness'><nav>Бизнес</nav></NavLink>
              </div>
              <div id='nature'>
                <NavLink to='/nature'><nav>Искусство</nav></NavLink>
              </div>
            </div>
          </div>

          <div className='cube-bottom'>
            <NavLink to='/comics'><nav>Комиксы и манга</nav></NavLink>
          </div>
        </div>
      </div>

      <div className='partners'><img src={Partners} /></div>
    </div>
  )
}
