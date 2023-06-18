import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import './Header.css';
import icon from '../../images/Icon.svg';
import HeaderProfile from './HeaderProfile/HeaderProfile';

function Header({ loggedIn, openMenu}) {
  return (
    <header className='header'>
      <Link to='/' className='btn header__logo'> <img src={icon} alt='Лого' /></Link>
      <>
        {loggedIn ? (
          <div className='header_auth'>
            <div className='header__menu'>
              <nav>
                <NavLink to='/movies' className={({ isActive }) => `link header__menu__link ${isActive ? 'link header__menu__link_active' : ''}`}>Фильмы</NavLink>
                <NavLink to='/saved-movies' className={({ isActive }) => `link header__menu__link ${isActive ? 'link header__menu__link_active' : ''}`}>Сохранённые фильмы</NavLink>
              </nav>
              <Link to='/profile' className='header__menu__profile'><HeaderProfile/></Link>
            </div>
          {  <button className='btn header__burger' aria-label='Меню' onClick={openMenu}></button>}
       
          </div>
        ) : (
          <nav className='header_not-auth'>
            <NavLink to='/signup' className='link header__link'>Регистрация</NavLink>
            <NavLink to='/signin' className='link header__link link header__link_active'>Войти</NavLink>
          </nav>
        )}
      </>
    </header>
  );
}

export default Header;

