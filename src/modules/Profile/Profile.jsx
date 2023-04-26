import './Profile.css'

import React, {useState} from 'react'
import Modal from 'react-modal';
import axios from 'axios'

import ProfileImg from '../images/Profile.png'
import Cross from '../images/Cross.png'

export default function Profile({ handleSetIsAuth }) {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [loginIsOpen, setLoginIsOpen] = useState(false)
    const [singupIsOpen, setSingupIsOpen] = useState(false)
    const [account, setAccount] = useState(false)

    const [loginMis, setLoginMis] = useState("")
    const [singupMis, setSingupMis] = useState("")

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const Login = async (e) => {
      e.preventDefault();
      if (email === "" || password === "") {
        setSingupMis("Пропущено поле для заполнения.")
      }

      try {
        const response = await axios.post("http://localhost:8080/login", { email, password, name});
        localStorage.setItem("isAuth", response.data.token);
        handleSetIsAuth(response.data.token);
        setName(response.data.name);
        setLoginIsOpen(false);
        setAccount(true);
      } catch (error) {
        console.error(error);
        setLoginMis("Неверный логин или пароль");
      }
    }

    const Register = async (e) => {
      e.preventDefault();
      if (name === "" || email === "" || password === "" || confirmPassword === "" || confirmPassword !== password) {
        setSingupMis("Пропущено поле или введен неверный пароль. Повторите ввод.")
      }

      try {
        const response = await axios.post('http://localhost:8080/register', { email, password});
        localStorage.setItem('isAuth', response.data.token);
        handleSetIsAuth(response.data.token);
        setSingupIsOpen(false);
        setAccount(true);
      }catch (error) {
        console.error(error);
        setSingupMis("Пользователь с таким email уже зарегистрирован");
      }
    }
    
    function profileIsOpen() {
      if (localStorage.getItem('isAuth') !== null) {
        setAccount(true);
      } else {
        setModalIsOpen(true);
      }
    }

    const handleLogout = () => {
      localStorage.removeItem('isAuth');
      window.location.reload();
    };

  return (
    <div className='Profile'>
        <button className='profile' onClick={() =>profileIsOpen(true)}><img src={ProfileImg} /></button>

        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className='ModalProfile'>
          <button onClick={() => setModalIsOpen(false)} className='closeProfile'><img src={Cross} /></button>
          <nav className='titleProfile'>Авторизация</nav>
          <button className='logBtn' onClick={() => {setLoginIsOpen(true); setModalIsOpen(false); }}>Войти</button>
          <button className='logBtn' onClick={() => {setSingupIsOpen(true); setModalIsOpen(false); }}>Зарегистрироваться</button>
        </Modal>

        <Modal isOpen={loginIsOpen} onRequestClose={() => setLoginIsOpen(false)} className='ModalProfile'>
          <button onClick={() => setLoginIsOpen(false)} className='closeProfile'><img src={Cross} /></button>
          <nav className='titleProfile'>Вход</nav>
          <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input placeholder='Пароль' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <nav className='question'>Забыли пароль? <button className='a'>Восстановить</button></nav>
          <nav className='mistake'>{loginMis}</nav>
          <button className='logBtn' onClick={Login}>Войти</button>
          <nav className='question'>Не регистрировались? <button className='a' onClick={() => {setSingupIsOpen(true); setLoginIsOpen(false); }}>Зарегистрироваться</button></nav>
        </Modal>

        <Modal isOpen={singupIsOpen} onRequestClose={() => setSingupIsOpen(false)} className='ModalProfile'>
          <button onClick={() => setSingupIsOpen(false)} className='closeProfile'><img src={Cross} /></button>
          <nav className='titleProfile'>Регистрация</nav>
          <input placeholder='Имя' value={name} onChange={(e) => setName(e.target.value)}/>
          <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input placeholder='Пароль' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <input placeholder='Повторите пароль' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          <nav className='mistake'>{singupMis}</nav>
          <button className='logBtn' onClick={Register}>Зарегистрироваться</button>
        </Modal>

        <Modal isOpen={account} onRequestClose={() => setAccount(false)} className='ModalProfile'>
          <button onClick={() => setAccount(false)} className='closeProfile'><img src={Cross} /></button>
          <nav className='titleProfile'>Добро пожаловать, {name}!</nav>
          <button className='logBtn' onClick={handleLogout}>Выйти</button>
        </Modal>
    </div>
  )
}
