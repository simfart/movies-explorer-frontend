import React from "react";
import { NavLink } from "react-router-dom";
import HeaderProfile from "../Header/HeaderProfile/HeaderProfile";

function Navigation({ menuOpened, onClose, userEmail }) {

  return (
    <>
    <div className={`navigation ${menuOpened ? "navigation_opened" : ""}`}/>
      <div className={`navigation__conteiner ${menuOpened ? "navigation__conteiner_opened" : ""}`}>
        <nav className="navigation__menu">
          <NavLink to="/" className={({ isActive }) => `navigation__link ${isActive ? "navigation__link_active" : ""}`} onClick={onClose}>Главная</NavLink>
          <NavLink to="/movies" className={({ isActive }) => `navigation__link ${isActive ? "navigation__link_active" : ""}`} onClick={onClose}>Фильмы</NavLink>
          <NavLink to="/saved-movies" className={({ isActive }) => `navigation__link ${isActive ? "navigation__link_active" : ""}`} onClick={onClose}>Сохранённые фильмы</NavLink>
        </nav>
        <HeaderProfile userEmail={userEmail} />
        <button
        onClick={onClose}
        className="navigation__btn-close"
        aria-label="Закрыть"
        type="button"
      />
      </div>
      
    </>
    
  );
}

export default Navigation;
