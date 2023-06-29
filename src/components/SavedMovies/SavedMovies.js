import React, {useState, useCallback, useEffect} from 'react';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import { ERRNOMOVIE } from '../../utils/constants';

import './SavedMovies.css';

function SavedMovies({
  loggedIn,
  openMenu,
  savedMovies,
  onDeleteMovie,
  showTooltip,
  setPopupMessage,
}) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (savedMovies) {
      setFilteredMovies(filterMovies(savedMovies, search, isShortFilm));
    }
  }, [savedMovies])

  const filterMovies = useCallback((movies, text, isShort) => {
    let result = movies;

    if (text) {
      result = result.filter((movie) =>
        movie.nameRU.toLowerCase().includes(text)
      );
    }

    if (isShort) {
      result = result.filter((movie) => movie.duration <= 40);
    }

    return result;
  }, []);

  const isShortFilmChange = useCallback(() => {
    const newValue = !isShortFilm;

    setFilteredMovies(filterMovies(savedMovies, search, newValue));
    setIsShortFilm(newValue);
  }, [filterMovies, savedMovies, search, isShortFilm])

  const onSubmitSearch = useCallback(
    (search) => {
      setSearch(search)
      const filteredFilms = filterMovies(savedMovies, search, isShortFilm);

      if (filteredFilms.length === 0) {
        setPopupMessage(ERRNOMOVIE);
        showTooltip();
      } else {
        setFilteredMovies(filteredFilms);
      }
    },
    [
      savedMovies,
      showTooltip,
      setPopupMessage,
      setFilteredMovies,
      filterMovies,
      isShortFilm
    ]
  );

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
