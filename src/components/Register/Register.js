import React from 'react';
import Form from '../Form/Form';

import './Register.css';

function Register() {

  return (
    <Form
      title={'Добро пожаловать!'}
      isRegister={true}
      btnName={'Зарегистрироваться'}
      linkText={'Уже зарегистрированы?'}
    />
  );
}

export default Register;
