import React from 'react';
import{ Link } from 'react-router-dom';
import icon from '../../images/Icon.svg';

import './Form.css';

function Form({ title, isRegister, btnName, linkText }) {
  return (
    <div className='form'>
      <Link to='/' className='btn form__logo'> <img src={icon} alt='Лого' /></Link>
      <h2 className='form__title'>{title}</h2>

      <form id='form'>
        {isRegister ? (<div className='form-field'>
          <label className='form-field__label' for='name'>Имя</label>
          <input className='form-field__input' type='text' name='name' id='name' required />
          <div className='form-field__message'></div>
        </div>) : ''}
        <div className='form-field'>
          <label className='form-field__label' for='email'>E-mail</label>
          <input className='form-field__input' type='email' name='email' id='email' required />
          <div className='form-field__message'></div>
        </div>
        <div className='form-field'>
          <label className='form-field__label' for='password'>Пароль</label>
          <input className='form-field__input form-field__input_invalid' type='password' name='password' id='password' required />
          {isRegister ? (<div className='form-field__message'>При регистрации пользователя произошла ошибка</div>) : ''}
        </div>
        
        <button className={`form__btn ${isRegister? 'form__btn_register': '' }`} type='submit' >{btnName}</button>
        <div className='form-links'>
          <span className='form-links__text'>{linkText}</span>
          {isRegister ? (<Link to='/signin' className='link form-links__link'>Войти</Link>) : (<Link to='/signup' className='link form-links__link'>Регистрация</Link>)}
        </div>
      </form>

    </div>
  );
}

export default Form;
