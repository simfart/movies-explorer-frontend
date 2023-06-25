import React from 'react';
import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';


function Movies({openMenu, loggedIn, onCheckbox, isChecked, onSaveMovie, onDeleteMovie, movies,toFindText, savedMovies, isSavedButton}) {
  // console.log('savedMovies in movies.js', savedMovies)
  return (
    <>
      <Header loggedIn={loggedIn} openMenu={openMenu} />
      <main className='movies'>
        <SearchForm onCheckbox={onCheckbox} isChecked={isChecked} toFindText={toFindText} />
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          pass={'Movies'}
          isSavedButton={isSavedButton}
        />
       </main>
      <Footer />
    </>
  );
}

export default Movies;
