import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { useEffect, useState, useCallback } from "react";
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register'
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Navigation from '../Navigation/Navigation';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Movies/Preloader/Preloader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

import useScreenWidth from '../../hooks/useScreenWidth';
import moviesApi from '../../utils/MoviesApi.js';
import { ERRSEARCH, ERRNOMOVIE, ERRWORDSEARCH } from '../../utils/constants';

import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(true); //for Header
  const [menuOpened, setmenuOpened] = useState(false);
  const [preloader, setPreloader] = useState(false)

  const [allmovies, setAllMovies] = useState([]);
  const [savedmovies, setSavedMovies] = useState([]);
  const [numberAllMovies, setNumberAllMovies] = useState(0);
  const [selectedCard, setSelectedCard] = useState('');
  const [filteredMoviesByText, setFilteredMoviesByText] = useState([]);
  const [filteredByCheckBox, setFilteredByCheckBox] = useState([]);
  const [checkbox, setCheckbox] = useState(false);

  const [messagePopup, setMessagePopup] = useState('');

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

   // burger menu
  const openMenu = useCallback(() => {
    setmenuOpened(!menuOpened);
  }, [menuOpened]);


  useEffect(() => {
    checkbox
      ? setNumberAllMovies(filteredByCheckBox.length)
      : setNumberAllMovies(filteredMoviesByText.length)
  }, [checkbox, filteredByCheckBox, filteredMoviesByText])


  // from local Storage movies & checkbox
  useEffect(() => {
    const moviesState = JSON.parse(localStorage.getItem('filmsFilterByText'))
    const checkboxState = JSON.parse(localStorage.getItem('checkbox'))
    moviesState ? setFilteredMoviesByText(moviesState) : setFilteredMoviesByText([])
    checkboxState ? setCheckbox(checkboxState) : setCheckbox(false)
  }, [setFilteredMoviesByText, setCheckbox])


  // time filtering with a checkbox
  function filterCheckbox(movies) {
    if (checkbox) {
      const filmsFilterByTime = movies.filter(function (film) {
        return film.duration <= 40
      })
      setFilteredByCheckBox(filmsFilterByTime)
       localStorage.setItem("checkbox", JSON.stringify(checkbox));
    }
  }

  // checkbox listener
  useEffect(() => {
    filterCheckbox(filteredMoviesByText)
  }, [checkbox]);

  // checkbox btn
  function onCheckbox() {
    setCheckbox(!checkbox)
    filterCheckbox(filteredMoviesByText)
    localStorage.setItem("checkbox", JSON.stringify(!checkbox));
  }

  // btn to search
  function toSearchMovies(textToFind) {
    setPreloader(true)
    moviesApi.getMovies()
      .then((movies) => {
        const filmsFilterByText = movies.filter(function (film) {
          return film.nameRU.toLowerCase().includes(textToFind)
        });
        if (filmsFilterByText.length === 0) {
          setIsInfoTooltipOpen(true)
          setMessagePopup(ERRNOMOVIE)
        } else {
          setFilteredMoviesByText(filmsFilterByText)
          localStorage.setItem("filmsFilterByText", JSON.stringify(filmsFilterByText));
          localStorage.setItem("textToFind", JSON.stringify(textToFind));
          filterCheckbox(filmsFilterByText)
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true)
        setMessagePopup(ERRSEARCH)
        console.log(err);
      })
      .finally(() => {
        setPreloader(false)
      })
  }


  if (preloader) {
    return <Preloader />;
  }

  function selectMovie(movie) {
    setSelectedCard(movie);
  }
  function onCloseInfoTooltip() {
    setIsInfoTooltipOpen(false)
  }

  return (
    <div className="app">
      {/* <Header loggedIn={loggedIn} openMenu={openMenu}/> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={
          <Movies
            movies={checkbox ? filteredByCheckBox : filteredMoviesByText}
            onSaveMovie={selectMovie}
            onCheckbox={onCheckbox}
            openMenu={openMenu}
            loggedIn={loggedIn}
            toFindText={toSearchMovies}
            isChecked={checkbox}
          />}
        />
        <Route path="/saved-movies" element={
          <SavedMovies
            movies={allmovies}
            numberOfMovies={savedmovies}
            onSaveMovie={selectMovie}
            openMenu={openMenu}
            loggedIn={loggedIn}
            onCheckbox={onCheckbox}

          />} />
        <Route path="/profile" element={<Profile
          openMenu={openMenu}
          loggedIn={loggedIn}
        />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Navigation
        menuOpened={menuOpened}
        onClose={openMenu}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={onCloseInfoTooltip}
        messagePopup={messagePopup}
      />
    </div>
  );
}

export default App;
