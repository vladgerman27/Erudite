import './Contacts.css'
import React from 'react'

export default function Contacts() {
  return (
    <div className='Contacts'>
      <nav>Контакты</nav>
      <div className='contact'>
        <div className='contacts-info'>
            <nav>Адресс</nav>
            <span>г. Алматы, ул. Жарокова, 137 блок В1 ЖК "Арай", </span>
            <span>уг. ул. Мынбаева</span>
            
            <nav>Режим работы</nav>
            <span>Пн. - Пт.: 10:00 – 21:00</span>
            <span>Суб.: 10:00 – 20:00</span>
            <span>Вос.: 11:00 – 19:00</span>
            
            <nav>Телефон</nav>
            <span>+7 (727) 265-90-97 (офис)</span>
            <span>+7 (727) 265-90-30,</span>
            <span>+ 7 (727) 265-90-70 (отдел продаж)</span>
            <span>+7 (701) 918-83-88</span>
        </div>

        <div className='map'></div>
      </div>
    </div>
  )
}
