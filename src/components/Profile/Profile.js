import React, {useCallback} from "react";
import { useForm } from "../../hooks/useForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import "./Profile.css";

function Profile({ logOut, onSubmitEdit, errMessage, loggedIn, openMenu }) {
  const {
    values,
    handleChange,
    setValues,
    isValid,
    setIsValid,
    errors,
    setErrors,
  } = useForm({});

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
    setErrors({});
    setIsValid(true);
  }, [currentUser, setValues, setErrors, setIsValid]);


  React.useEffect(() => {
  if( values.name === currentUser.name & values.email === currentUser.email){
    setIsValid(false);
  }
  }, [currentUser.email, currentUser.name, setIsValid, values.email, values.name]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmitEdit({
      name: values.name,
      email: values.email,
    });
  }, [onSubmitEdit, values.email, values.name])

  return (
    <>
      <Header loggedIn={loggedIn} openMenu={openMenu} />
      <form className="profile" onSubmit={handleSubmit} noValidate>
        <h2 className="profile__title ">{`Привет, ${values.name} !`}</h2>
        <fieldset className="profile__info">
          <div className="profile__field">
            <label className="profile__field-label" htmlFor="name">
              Имя
            </label>
            <input
              value={values.name || ''}
              pattern="^[a-zA-ZА-Яа-яЁё\s\-]+$"
              type="text"
              className={`profile__field-input ${errors?.name && 'profile__field-input_invalid'
                }`}
              onChange={handleChange}
              name="name"
              minLength="2"
              maxLength="40"
              required
            />
          </div>
          <div className='message'>{errors.name || ''}</div>
          <div className="profile__line" />
          <div className="profile__field">
            <label className="text-field-label" htmlFor="email">
              E-mail
            </label>
            <input
              className={`profile__field-input ${errors?.email && 'profile__field-input_invalid'
                }`}
              type='email'
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              name='email'
              id='email'
              onChange={handleChange}
              value={values.email || ''}
              required
            />
          </div>
          <div className='message'>{errors.email || ''}</div>
        </fieldset>
        <div className='message'>{errMessage}</div>
        <button
          className={`btn profile__btn ${isValid ? '' : 'btn_invalid'}`}
          type='submit'
          aria-label="Редактировать"
        >
          Редактировать
        </button>
        <button
          className="btn profile__btn"
          onClick={logOut}
          type="button"
          aria-label="Выйти"
        >
          Выйти из аккаунта
        </button>
      </form>
    </>
  );
}

export default Profile;
