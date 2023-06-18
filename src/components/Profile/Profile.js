import React from 'react';
import Header from '../Header/Header';
import './Profile.css';

function Profile({ loggedIn, openMenu }) {
  return (
    <>
      <Header loggedIn={loggedIn} openMenu={openMenu} />
      <form className="profile">
        <h2 className="profile__title ">Привет, Виталий!</h2>
        <fieldset className="profile__info">
          <div className="profile__field">
            <label class="profile__field__label" for="name">Имя</label>
            <input
              value='Виталий'
              type="text"
              className='profile__field__input'
              name="name"
              minLength="2"
              maxLength="40"
              required
            />
            <div class="profile__field__message"></div>
          </div>
          <div className='profile__line' />
          <div className="profile__field">
            <label class="text-field__label" for="email">E-mail</label>
            <input
              value='pochta@yandex.ru'
              type="email"
              className='profile__field__input'
              name="email"
              required
            />
          </div>
          <div class="profile__field__message"></div>
        </fieldset>
        <button className="btn profile__btn" type="submit" aria-label="Редактировать">
          Редактировать
        </button>
        <button className="btn profile__btn" type="submit" aria-label="Выйти">
          Выйти из аккаунта
        </button>

      </form>

    </>
  );
}

export default Profile;
