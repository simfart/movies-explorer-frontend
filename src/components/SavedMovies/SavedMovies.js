import React from 'react';

import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

function SavedMovies({ loggedIn, openMenu, onCheckbox, movies, onSaveMovie, numberOfMovies }) {
  return (
    <section>
      <Header loggedIn={loggedIn} openMenu={openMenu} />
      <div className='movies saved-movies'>
        <SearchForm onCheckbox={onCheckbox} />
        <MoviesCardList
          movies={movies}
          onSaveMovie={onSaveMovie}
          numberOfMovies={numberOfMovies}
        />
      </div>
      <Footer />
    </section>
  );
}

export default SavedMovies;
