import React from 'react';
import iconProfile from '../../../images/icon__profile.svg';

function HeaderProfile({userEmail}) {
  return (
        <div className='header__profile'>
      <img className="header__profile__logo" src={iconProfile} alt="Иконка Аккаунт" />
      <p className="header__profile__e-mail">{userEmail}</p>
    </div>
  )
}

export default HeaderProfile;
