import React from 'react';
import './Login.css';
import Form from '../Form/Form';

function Login({ toLogin, errMessage}) {

  const handleSubmit = ( values) => {
    if (!values.email || !values.password) {
      return;
    }
    toLogin(values)
  }

  return (
    <Form
    title={'Рады видеть!'}
    btnName={'Войти'}
    linkText={'Ещё не зарегистрированы?'}
    formSubmit={handleSubmit}
    pass={'/signup'}
    linkName={'Регистрация'}
    errMessage={errMessage}
    />
  );
}

export default Login;
