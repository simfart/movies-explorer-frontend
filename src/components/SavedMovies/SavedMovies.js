import React from 'react';

import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

function SavedMovies({ loggedIn, openMenu, onCheckbox, movies, onSaveMovie, numberOfMovies }) {
  return (
    <>
      <Header loggedIn={loggedIn} openMenu={openMenu} />
      <main className='movies saved-movies'>
        <SearchForm onCheckbox={onCheckbox} />
        <MoviesCardList
          movies={movies}
          onSaveMovie={onSaveMovie}
          numberOfMovies={numberOfMovies}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
