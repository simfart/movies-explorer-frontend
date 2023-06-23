import React from 'react';
import './Movies.css';

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';


function Movies({openMenu, loggedIn, onCheckbox, isChecked, onSaveMovie, movies,toFindText}) {

  return (
    <>
      <Header loggedIn={loggedIn} openMenu={openMenu} />
      <main className='movies'>
        <SearchForm onCheckbox={onCheckbox} isChecked={isChecked} toFindText={toFindText} />
        <MoviesCardList
          movies={movies}
          onSaveMovie={onSaveMovie}
          pass={'Movies'}
        />
       </main>
      <Footer />
    </>
  );
}

export default Movies;
