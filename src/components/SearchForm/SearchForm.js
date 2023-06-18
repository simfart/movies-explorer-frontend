import React from 'react';
import './SearchForm.css';

import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm({ onSubmit }) {
  return (
    <section className="searchform" >
      <form className="searchform__unit" onSubmit={onSubmit}>
        <fieldset className="searchform__field">
          <input className="searchform__input" placeholder='Фильм' required />
        </fieldset>
        <button className='searchform__btn' type="submit" aria-label="Найти">Найти</button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
