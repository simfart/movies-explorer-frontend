import React from 'react';
import './Login.css';
import Form from '../Form/Form';
import { useForm } from '../../hooks/useForm';


function Login({ toLogin}) {
  const { values, handleChange, setValues, isValid, setIsValid, errors, setErrors } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    toLogin(values)
    setValues({ email: '', password: '' });
  }

  React.useEffect(() => {
    setValues({});
    setErrors({});
    setIsValid(true)
  }, [setValues, setErrors, setIsValid]);

  return (
    <Form
    title={'Рады видеть!'}
    btnName={'Войти'}
    linkText={'Ещё не зарегистрированы?'}
    handleSubmit={handleSubmit}
    handleChange={handleChange} 
    />
  );
}

export default Login;
