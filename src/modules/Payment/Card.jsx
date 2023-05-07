import React from 'react'

export default function Card() {
    

  return (
    <div className='Card'>
        <nav className='pay-nav'>Оплата заказа </nav>
        <input className='pay-input' placeholder='Номер карты' />
        <input className='pay-input' placeholder='Срок действия карты' />
        <input className='pay-input' placeholder='Имя' />
        <input className='pay-input' placeholder='Код CCV2' />
        
        <nav className='pay-nav'>Доставка</nav>
        <input className='pay-input' placeholder='Email' />
        <input className='pay-input' placeholder='Телефон' />
    </div>
  )
}
