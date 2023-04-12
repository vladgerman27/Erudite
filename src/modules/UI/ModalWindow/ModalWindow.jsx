import './ModalWindow.css'

import React, { useState } from 'react';
import Modal from 'react-modal';

import Cross from '../../images/Cross.png'
import Tick from '../../images/Tick.png'
import Card from '../../images/Card.png'
import Arrow from '../../images/Arrow.png'

export default function ModalBooks({ book }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let agree = '';
  let agreeSrc = {src: ''};;

  if (book.available > 0) {
    agree = 'Есть в наличии'
    agreeSrc.src = Tick
  } else {
    agree = 'Нет в наличии'
    agreeSrc.src = Cross
  }

  return (
    <div className='ModalBooks'>
      <button className='buy' onClick={() => setModalIsOpen(true)}>{book.cost}тг</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className='ModalWindow'>
        <button onClick={() => setModalIsOpen(false)} className='close'><img src={Cross} /></button>
        <nav><b>{book.title}</b></nav>
        <span><img src={agreeSrc.src} />{agree}</span>
        <div className='book-info'>
          <div className='left-info'>
            <img src={book.img} className='info-img' />
            <nav>Характеристики</nav>
            <span>Автор</span>
            <span>ISBN</span>
            <span>Жанр</span>
            <span>Издательство</span>
            <span>Серия книг</span>
            <span>Возраст</span>
            <span>Год изданния</span>
            <span>Переплёт</span>
            <span>Количество страниц</span>
            <span>Вес, г</span>
            <span>Размер, мм</span>
            <span>Язык</span>
          </div>

          <div className='right-info'>
            <nav>{book.cost}тг</nav>
            <button className='addCart'>Добавить в корзину</button>
            <span className='safeBuy'><img src={Card}/>Безопасная оплата</span>
            <span className='comeBack'><img src={Arrow}/>Возврат в течении 14 дней</span>
            <span>{book.author}</span>
            <span>{book.ISBN}</span>
            <span>{book.janr}</span>
            <span>{book.company}</span>
            <span>{book.series}</span>
            <span>{book.age}</span>
            <span>{book.year}</span>
            <span>{book.binding}</span>
            <span>{book.pages}</span>
            <span>{book.weight}</span>
            <span>{book.size}</span>
            <span>{book.language}</span>
          </div>
        </div>

        <nav>Аннотация</nav>
        <span>{book.annotation}</span>
      </Modal>
    </div>
  );
}
