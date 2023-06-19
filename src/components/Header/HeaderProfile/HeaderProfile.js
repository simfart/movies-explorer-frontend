import React from 'react';
import iconProfile from '../../../images/icon__profile.svg';
import './HeaderProfile.css';

function HeaderProfile() {
  return (
    <div className='header-profile'>
      <img className='header-profile-logo' src={iconProfile} alt='Иконка Аккаунт' />
      <p className='header-profile-email'>Аккаунт</p>
    </div>
  )
}

export default HeaderProfile;
