import React, { useState, useEffect, useCallback } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import useMoviesFilter from '../../hooks/useMoviesFilter';
import { ERR_NO_MOVIE } from '../../utils/constants';

import './Movies.css';

function Movies({
  loggedIn,
  openMenu,
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
  showTooltip,
  setPopupMessage,
  movies,
}) {
  const [isShortFilm, setIsShortFilm] = useState(
    JSON.parse(localStorage.getItem('isShortFilm')),
  );
  const [search, setSearch] = useState(localStorage.getItem('search'));
  const filteredMovies = useMoviesFilter(movies, search, isShortFilm);
  
  const isShortFilmChange = useCallback(() => {
    setIsShortFilm((prev) => {
      const newState = !prev;
      localStorage.setItem('isShortFilm', newState);
      return newState;
    });
  }, []);

  useEffect(() => {
    if (filteredMovies.length && search ) {
      localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    } 
  }, [filteredMovies, search]);

  useEffect(() => {
    if (!filteredMovies.length && !search) {
      setPopupMessage(ERR_NO_MOVIE);
      showTooltip();
    }
  }, [filteredMovies, search]);

  const onSubmitSearch = useCallback((search) => {
    setSearch(search);
    localStorage.setItem('search', search);
    if (!filteredMovies.length && !search) {
      setPopupMessage(ERR_NO_MOVIE);
      showTooltip();
    }
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn} openMenu={openMenu} />
      <main className="movies">
        <SearchForm
          onCheckbox={isShortFilmChange}
          isChecked={isShortFilm}
          onFormSubmit={onSubmitSearch}
          pass={'Movies'}
        />
        <MoviesCardList
          movies={search ? filteredMovies : []}
          savedMovies={savedMovies}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          pass={'Movies'}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
