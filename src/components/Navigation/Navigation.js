import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import HeaderProfile from '../Header/HeaderProfile/HeaderProfile';
import './Navigation.css'

function Navigation({ menuOpened, onClose }) {

  return (
    <aside className={`navigation ${menuOpened ? 'navigation_opened' : ''}`}>
      <div className={`navigation__conteiner ${menuOpened ? 'navigation__conteiner_opened' : ''}`}>
        <nav className='navigation__menu'>
          <NavLink to='/' className={({ isActive }) => `link navigation__link ${isActive ? 'navigation__link_active' : ''}`} onClick={onClose}>Главная</NavLink>
          <NavLink to='/movies' className={({ isActive }) => `link navigation__link ${isActive ? 'navigation__link_active' : ''}`} onClick={onClose}>Фильмы</NavLink>
          <NavLink to='/saved-movies' className={({ isActive }) => `link navigation__link ${isActive ? 'navigation__link_active' : ''}`} onClick={onClose}>Сохранённые фильмы</NavLink>
        </nav>
        <Link to='/profile' className='header__menu__profile' onClick={onClose}><HeaderProfile /></Link>
        <button
          onClick={onClose}
          className='btn navigation__btn-close '
          aria-label='Закрыть'
          type='button'
        />
      </div>
    </aside >
  );
}

export default Navigation;
