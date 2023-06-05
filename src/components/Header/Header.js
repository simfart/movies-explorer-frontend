import React from 'react';
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import icon from '../../images/Icon.svg';
import burger from '../../images/burger.svg';

import HeaderProfile from './HeaderProfile/HeaderProfile';

function Header({ loggedIn, openMenu, userEmail }) {
  return (
    <header className="header">
      <Link to="/profile" > <img className="header__logo" src={icon} alt="Лого" /></Link>
      <>
        {loggedIn ? (
          <div className="header_auth">
            <div className="header__menu">
              <nav>
                <NavLink to="/movies" className={({ isActive }) => `header__menu__link ${isActive ? "header__menu__link_active" : ""}`}>Фильмы</NavLink>
                <NavLink to="/saved-movies" className={({ isActive }) => `header__menu__link ${isActive ? "header__menu__link_active" : ""}`}>Сохранённые фильмы</NavLink>
              </nav>
              <HeaderProfile userEmail={userEmail} />
            </div>
            <button className="header__burger" aria-label='Меню' onClick={openMenu}><img src={burger} className="header__burger__img" alt="Меню" /></button>
          </div>
        ) : (
          <nav className="header_not-auth">
            <NavLink to="/signup" className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}>Регистрация</NavLink>
            <NavLink to="/signin" className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}>Войти</NavLink>
          </nav>
        )}
      </>
    </header>
  );
}

export default Header;
