import { useEffect, useState } from "react";
import "./SearchForm.css";
import { useForm } from "../../hooks/useForm";
import { ERRSEARCH } from "../../utils/constants";

import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

function SearchForm({ toFindText, onCheckbox, isChecked }) {
  const { values, handleChange, setValues, isValid, setIsValid, setErrors } = useForm({});

  useEffect(() => {
    setValues({film: JSON.parse(localStorage.getItem('textToFind'))});
    setIsValid(true);
  }, [setErrors, setIsValid, setValues]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    if (!values || !values.film) {
      setIsValid(false);
    } else {
      toFindText(values.film.toLowerCase());
    }
  }
  const lostInputFocus = () => setIsValid(true);

  return (
    <section className="searchform">
      <form className="searchform__unit" onSubmit={handleSubmit} noValidate>
        <fieldset className="searchform__field">
          <input
            value={values.film || ''}
            className="searchform__input"
            placeholder="Фильм"            
            onChange={handleChange}
            onBlur={lostInputFocus}
            name="film"
            required
          />
        </fieldset>
        <button
          className="btn searchform__btn"
          type="submit"
          aria-label="Найти"
          disabled={!isValid}
        >
          Найти
        </button>
      </form>
      <div className="form-field__message">{isValid ? "" : ERRSEARCH}</div>
      <FilterCheckbox onCheckbox={onCheckbox} isChecked={isChecked} />
    </section>
  );
}

export default SearchForm;
