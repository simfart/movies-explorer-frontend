import React from 'react';
import './Movies.css';

import Preloader from './Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';


function Movies({ toggleDone, openMenu, userEmail, loggedIn, onCheckbox, onSaveMovie, movies, numberOfMovies,  }) {

  return (
    <>
      <Header loggedIn={loggedIn} openMenu={openMenu} userEmail={userEmail} />
      <div className='movies'>
        <SearchForm onCheckbox={onCheckbox} />
        <MoviesCardList
          movies={movies}
          onSaveMovie={onSaveMovie}
          numberOfMovies={numberOfMovies}
          toggleDone={toggleDone}
          pass={'Movies'}
      
        />
      </div>
    </>
  );
}

export default Movies;
