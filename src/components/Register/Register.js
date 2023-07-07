import React from 'react';
import Form from '../Form/Form';
import { useForm } from '../../hooks/useForm';

import './Register.css';

function Register({handleRegister, errMessage}) {

  return (
    <Form
      title={'Добро пожаловать!'}
      isRegisterPage={true}
      btnName={'Зарегистрироваться'}
      linkText={'Уже зарегистрированы?'}
      formSubmit={handleRegister}
      pass={'/signin'}
      linkName={'Войти'}
      errMessage={errMessage}
    />
  );
}

export default Register;
