import React from 'react';
import './Movies.css';

import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';


function Movies({ openMenu, userEmail, loggedIn, onCheckbox, onSaveMovie, movies, numberOfMovies }) {

  return (
    <>
      <Header loggedIn={loggedIn} openMenu={openMenu} userEmail={userEmail} />
      <div className='movies'>
        <SearchForm onCheckbox={onCheckbox} />
        <MoviesCardList
          movies={movies}
          onSaveMovie={onSaveMovie}
          numberOfMovies={numberOfMovies}
        />
      </div>
    </>
  );
}

export default Movies;
