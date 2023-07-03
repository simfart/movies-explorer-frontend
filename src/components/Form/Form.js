import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import icon from '../../images/Icon.svg';
import { useForm } from '../../hooks/useForm';

import './Form.css';

function Form({
  title,
  isRegisterPage,
  btnName,
  linkText,
  formSubmit,
  pass,
  linkName,
  errMessage
}) {
  const {
    values,
    handleChange,
    setValues,
    isValid,
    setIsValid,
    errors,
    setErrors,
  } = useForm({});

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    formSubmit
      ({
        name: values.name,
        email: values.email,
        password: values.password
      });
  }, [formSubmit, values.email, values.name, values.password])

  React.useEffect(() => {
    setValues({});
    setErrors({});
    setIsValid(true);
  }, [setValues, setErrors, setIsValid]);

  return (
    <div className='form'>
      <Link to='/' className='btn form__logo'>
        {''}
        <img src={icon} alt='Лого' />
      </Link>
      <h2 className='form__title'>{title}</h2>

      <form id='form' onSubmit={handleSubmit} noValidate>
        {isRegisterPage ? (
          <div className='form-field'>
            <label className='form-field__label' htmlFor='name'>
              Имя
            </label>
            <input
              className={`form-field__input ${errors?.name && 'form-field__input_invalid'
                }`}
              type='text'
              pattern='^[a-zA-ZА-Яа-яЁё\s\-]+$'
              name='name'
              id='name'
              onChange={handleChange}
              required
            />
            <div className='message'>{errors.name || ''}</div>
          </div>
        ) : (
          ''
        )}
        <div className='form-field'>
          <label className='form-field__label' htmlFor='email'>
            E-mail
          </label>
          <input
            className={`form-field__input ${errors?.email && 'form-field__input_invalid'
              }`}
            type='email'
            name='email'
            id='email'
            onChange={handleChange}
            required
          />
          <div className='message'>{errors.email || ''}</div>
        </div>
        <div className='form-field'>
          <label className='form-field__label' htmlFor='password'>
            Пароль
          </label>
          <input
            className={`form-field__input ${errors?.password && 'form-field__input_invalid'
              }`}
            type='password'
            name='password'
            id='password'
            onChange={handleChange}
            required
          />
          <div className='message'>{errors.password || ''}</div>
        </div>
        <div
          className={`message form__err ${isRegisterPage ? 'form__err_register' : ''
            }`}
        >{errMessage}</div>
        <button
          className={`btn form__btn 
            ${isValid ? '' : 'btn_invalid'}`}
          type='submit'
        >
          {btnName}
        </button>
        <div className='form-links'>
          <span className='form-links__text'>{linkText}</span>
          <Link to={pass} className='link form-links__link'>
            {linkName}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Form;
