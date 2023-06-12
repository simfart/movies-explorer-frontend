import React from 'react';
import './Movies.css';

import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCard from './MoviesCard/MoviesCard';
import Header from '../Header/Header';


function Movies({openMenu,userEmail,loggedIn,onCheckbox, isSaved, saveClick, movies}) {
  return (
    <>
    <Header loggedIn={loggedIn} openMenu={openMenu} userEmail={userEmail}/>
    <div className='movies'>

    <SearchForm onCheckbox={onCheckbox}/>
    <MoviesCardList isSaved={isSaved} saveClick={saveClick} movies={movies}/>
 
  </div>
  </>
  );
}

export default Movies;
