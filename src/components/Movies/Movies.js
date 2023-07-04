import React, { useState, useCallback } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
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
  searchMovies
}) {
  const [isShortFilm, setIsShortFilm] = useState(
    JSON.parse(localStorage.getItem('isShortFilm')),
  );
  const [search, setSearch] = useState(localStorage.getItem('search'));
  const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) ?? []);

  const isShortFilmChange = useCallback(() => {
    setIsShortFilm((prev) => {
      const newState = !prev;
      localStorage.setItem('isShortFilm', newState);

      return newState;
    });
  }, []);

  const onSubmitSearch = useCallback(async (search) => {
    setSearch(search);
    localStorage.setItem('search', search);

    const filteredMovies = await searchMovies(search, isShortFilm);
    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
    setFilteredMovies(filteredMovies);

    if (!filteredMovies.length) {
      setPopupMessage(ERR_NO_MOVIE);
      showTooltip();
    }
  }, [searchMovies, setPopupMessage, showTooltip, isShortFilm]);

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
