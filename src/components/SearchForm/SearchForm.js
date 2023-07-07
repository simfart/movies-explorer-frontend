import { useEffect } from "react";
import "./SearchForm.css";
import { useForm } from "../../hooks/useForm";
import { ERR_KEY_WORD } from "../../utils/constants";

import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";

function SearchForm({ onFormSubmit, onCheckbox, isChecked, pass }) {

  const { values, handleChange, setValues, isValid, setIsValid, setErrors } = useForm({});

  useEffect(() => {
    setIsValid(true);
    if (pass === 'Movies') {
      setValues({ film: localStorage.getItem('search') });
    }
  }, [pass, setErrors, setIsValid, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!values || !values.film) {
      setIsValid(false);
    } else {
      onFormSubmit(values.film.toLowerCase());
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
            type="text"
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
      <div className="searchform__message">{isValid ? "" : ERR_KEY_WORD}</div>
      <FilterCheckbox onCheckbox={onCheckbox} isChecked={isChecked} />
    </section>
  );
}

export default SearchForm;
