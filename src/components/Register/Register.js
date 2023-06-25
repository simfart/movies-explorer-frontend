import React from 'react';
import Form from '../Form/Form';
import { useForm } from '../../hooks/useForm';

import './Register.css';

function Register({toRegister}) {

  const { values, handleChange, setValues, isValid, setIsValid, errors, setErrors } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();
    toRegister
    ({   
      name: values.name,
      email: values.email,
      password: values.password
    });
  }

  React.useEffect(() => {
    setValues({});
    setErrors({});
    setIsValid(true)
  }, [setValues, setErrors, setIsValid]);


  return (
    <Form
      title={'Добро пожаловать!'}
      isRegisterPage={true}
      btnName={'Зарегистрироваться'}
      linkText={'Уже зарегистрированы?'}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}

export default Register;
