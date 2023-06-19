import React from 'react';
import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';


function Movies({ toggleDone, openMenu, userEmail, loggedIn, onCheckbox, onSaveMovie, movies, numberOfMovies, }) {

  return (
    <>
      <Header loggedIn={loggedIn} openMenu={openMenu} userEmail={userEmail} />
      <main className='movies'>
        <SearchForm onCheckbox={onCheckbox} />
        <MoviesCardList
          movies={movies}
          onSaveMovie={onSaveMovie}
          numberOfMovies={numberOfMovies}
          toggleDone={toggleDone}
          pass={'Movies'}
        />
       </main>
      <Footer />
    </>
  );
}

export default Movies;
