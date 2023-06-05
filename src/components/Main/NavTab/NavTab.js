import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


function NavTab() {

   return (
    <nav className="navtab">
    <NavLink to="/" className={({isActive}) => `menu__link ${isActive ? "menu__link_active" : ""}`}>Домой</NavLink>
<NavLink to="/reviews" className={({isActive}) => `menu__link ${isActive ? "menu__link_active" : ""}`}>Обзоры эмодзи</NavLink>
<NavLink to="/about-me" className={({isActive}) => `menu__link ${isActive ? "menu__link_active" : ""}`}>Обо мне</NavLink>
</nav>
  );
}

export default NavTab;
