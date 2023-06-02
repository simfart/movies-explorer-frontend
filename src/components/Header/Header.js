import React from 'react';
import { useState, useEffect } from 'react';
import icon from '../../images/Icon.svg';
import profile from '../../images/profile.svg';
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div  className="header__nav"  >
      <Link to="/" > <img className="header__logo" src={icon} alt="Лого"/></Link>
      <div>
      <p className="header__nav__text">Фильмы</p>
      <p className="header__nav__text">Сохранённые фильмы</p>
      </div>
      </div>
      <div className="header_profile">
      <img className="header__logo" src={profile} alt="Лого" />
      </div>
    </div>
  );
}


// import { useState, useEffect } from 'react';
// import headerLogo              from '../images/header__logo.svg';

// function Header({ loggedIn, children }) {

//   const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

//   function toggleAccountInfo() {
//     if (!isBurgerMenuOpen && loggedIn) {
//       setBurgerMenuOpen(true);
//     } else setBurgerMenuOpen(false);
//   }

//   useEffect(() => {
//     setBurgerMenuOpen(false);
//   }, [loggedIn]);

//   return (
//     <header className={`header ${loggedIn && 'header_logged-in'}`}>
//       <div className="header__icons">
//         <img className="header__logo"
//              src={headerLogo}
//              alt="Логотип Место" />
//         {loggedIn &&
//         <div className="burger">
//           <input className="burger__switcher"
//                  id="burgerSwitcher"
//                  type="checkbox"
//                  onChange={toggleAccountInfo} />
//           <label className="burger__button"
//                  htmlFor="burgerSwitcher">
//             <span className="burger__line"></span>
//           </label>
//         </div>
//         }
//       </div>
//       <div className={`header__account ${loggedIn &&
//                       'header__account_logged-in'} ${isBurgerMenuOpen &&
//                       'header__account_visible'}`}>
//         {children}
//       </div>
//     </header>
//   )
// }


export default Header;
