import React, { useState, useCallback, useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ERR_NO_MOVIE } from '../../utils/constants';
import useMoviesFilter from '../../hooks/useMoviesFilter';

import './SavedMovies.css';

function SavedMovies({
  savedMovies,
  onDeleteMovie,
  showTooltip,
  setPopupMessage,
  loggedIn,
  openMenu,
}) {
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [search, setSearch] = useState('');

  const filteredMovies = useMoviesFilter(savedMovies, search, isShortFilm);

  const isShortFilmChange = useCallback(() => {
    setIsShortFilm((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!filteredMovies.length && !search) {
      setPopupMessage(ERR_NO_MOVIE);
      showTooltip();
    }
  }, [filteredMovies, search, setPopupMessage, showTooltip]);

  const onSubmitSearch = useCallback((search) => {
    setSearch(search);
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn} openMenu={openMenu} />
      <main className="movies saved-movies">
        <SearchForm
          onCheckbox={isShortFilmChange}
          isChecked={isShortFilm}
          onFormSubmit={onSubmitSearch}
        />
        <MoviesCardList
          movies={filteredMovies}
          savedMovies={savedMovies}
          onDeleteMovie={onDeleteMovie}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
