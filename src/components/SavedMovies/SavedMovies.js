import React from 'react';

import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies({loggedIn, openMenu,onCheckbox, movies, onSaveMovie }) {
  return (
    <section className='savedMovies'>
      <Header loggedIn={loggedIn} openMenu={openMenu} />
      <div className='movies'>
        <SearchForm onCheckbox={onCheckbox} />
        <MoviesCardList
          movies={movies}
          onSaveMovie={onSaveMovie}
          numberOfMovies={3}
                />
      </div>
    </section>
  );
}


export default SavedMovies;
