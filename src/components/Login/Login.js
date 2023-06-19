import React from 'react';
import './Login.css';
import Form from '../Form/Form';

function Login() {
  return (
    <Form
    title={'Рады видеть!'}
    btnName={'Войти'}
    linkText={'Ещё не зарегистрированы?'} 
    />
  );
}

export default Login;
