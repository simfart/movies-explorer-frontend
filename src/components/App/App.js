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

import useScreenWidth from '../../hooks/useScreenWidth';
import moviesApi from '../../utils/MoviesApi.js';

import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(true); //for Header
  const [menuOpened, setmenuOpened] = useState(false);
  const [preloader, setPreloader] = useState(false)

  const [allmovies, setAllMovies] = useState([]);
  const [savedmovies, setSavedMovies] = useState([]);
  const [numberOfMovies, setnumberOfMovies] = useState(0);
  const [selectedCard, setSelectedCard] = useState('');


  const [textToFind, setTextToFind] = useState();

  const [filteredMoviesByText, setFilteredMoviesByText] = useState([]);
  const [filteredByCheckBox, setFilteredByCheckBox] = useState([]);
  const [checkbox, setCheckbox] = useState(false);


  const [checkBoxState, setcheckBoxState] = useState();
  const [moviesState, setmoviesState] = useState([]);

  const widthSize = useScreenWidth()

  useEffect(() => {
    const breakpointMiddle = 1024
    const breakpointSmall = 625
    if (widthSize >= breakpointMiddle) {
      setnumberOfMovies(12)
      setSavedMovies(3)
    } else if (widthSize >= breakpointSmall) {
      setnumberOfMovies(8)
    } else {
      setnumberOfMovies(5)
      setSavedMovies(2)
    }
  }, [widthSize])

  const openMenu = useCallback(() => {
    setmenuOpened(!menuOpened);
  }, [menuOpened]);

 
  useEffect(() => {
    const moviesState = JSON.parse(localStorage.getItem('filmsFilterByText'))
    const checkboxState = JSON.parse(localStorage.getItem('checkbox'))
    setCheckbox(checkboxState)
    setFilteredMoviesByText(moviesState)
  }, [setFilteredMoviesByText, setCheckbox])

  function filterCheckbox(movies){
    if (checkbox) {
      const filmsFilterByTime = movies.filter(function (film) {
        return film.duration <= 40
      })
      setFilteredByCheckBox(filmsFilterByTime)
      localStorage.setItem("checkbox", JSON.stringify(checkbox));
    }
  }

  useEffect(() => {
    filterCheckbox(filteredMoviesByText)
    // if (checkbox) {
    //   const filmsFilterByTime = filteredMoviesByText.filter(function (film) {
    //     return film.duration <= 40
    //   })
    //   setFilteredByCheckBox(filmsFilterByTime)
    // } else { setFilteredByCheckBox([]) }
  }, [checkbox]);


  function set(textToFind) {
    setPreloader(true)
    moviesApi.getMovies()
      .then((movies) => {
        const filmsFilterByText = movies.filter(function (film) {
          return film.nameRU.toLowerCase().includes(textToFind)
        });
        setFilteredMoviesByText(filmsFilterByText)
        localStorage.setItem("filmsFilterByText", JSON.stringify(filmsFilterByText));
        filterCheckbox(filmsFilterByText)
        // if (checkbox) {
        //   const filmsFilterByTime = filmsFilterByText.filter(function (film) {
        //     return film.duration <= 40
        //   })
        //   setFilteredByCheckBox(filmsFilterByTime)
        //   localStorage.setItem("checkbox", JSON.stringify(checkbox));
        // }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPreloader(false)
      })
  }


  function onCheckbox() {
    setCheckbox(!checkbox)
    localStorage.setItem("checkbox", JSON.stringify(!checkbox));
  }

  if (preloader) {
    return <Preloader />;
  }



  function selectMovie(movie) {
    setSelectedCard(movie);
  }

  return (
    <div className="app">
      {/* <Header loggedIn={loggedIn} openMenu={openMenu}/> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={
          <Movies
            movies={checkbox ? filteredByCheckBox : filteredMoviesByText}

            numberOfMovies={numberOfMovies}
            onSaveMovie={selectMovie}
            onCheckbox={onCheckbox}
            openMenu={openMenu}
            loggedIn={loggedIn}
            toFindText={set}
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
    </div>
  );
}

export default App;
