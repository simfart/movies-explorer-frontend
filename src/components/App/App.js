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
import PageNotFound from '../PageNotFound/PageNotFound'

import useScreenWidth from '../../hooks/useScreenWidth';
import moviesApi from '../../utils/MoviesApi.js';

import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(true); //for Header
  const [menuOpened, setmenuOpened] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [allmovies, setAllMovies] = useState([]);
  const [savedmovies, setSavedMovies] = useState([]);
  const [numberOfMovies, setnumberOfMovies] = useState(0);
  const [selectedCard, setSelectedCard] = useState('');

  const [textToFind, setTextToFind] = useState();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredByCheckBox, setFilteredByCheckBox] = useState([]);

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
  }, [widthSize]
  )

  useEffect(() => {
    Promise.all([moviesApi.getMovies()])
      .then(([receivedMovies]) => {
        setAllMovies(receivedMovies);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []
  );

  const openMenu = useCallback(() => {
    setmenuOpened(!menuOpened);
  }, [menuOpened]);

  function onCheckbox() {
    setCheckbox(!checkbox) 
    console.log('checkbox', checkbox)
    // if(checkbox){
    //   const filmsFilterByTime = filteredMovies.filter(function (film) {
    //     return film.duration<=40})
    //     setFilteredByCheckBox(filmsFilterByTime)
    // }
  }

  useEffect(() => {
      if(checkbox){
      const filmsFilterByTime = filteredMovies.filter(function(film) {
        return film.duration<=40})
        setFilteredByCheckBox(filmsFilterByTime)
    } else {setFilteredByCheckBox(filteredMovies)}
  }, [checkbox]
  );

  // function toFilterMoviesByCheckBox(){
  //   const filmsFilterByTime = filteredMovies.filter(function (film) {
  //     return film.duration<=40})
  //     setFilteredByCheckBox(filmsFilterByTime)
  // }
  
  // console.log('checkbox', checkbox)

  function selectMovie(movie) {
    setSelectedCard(movie);
  }
 
  function toFilterMovies(textToFind) {
    const filmsFilterByText = allmovies.filter(function (film) {
      return film.nameRU.toLowerCase().includes(textToFind)
    });
    const filmsFilterByTime = filmsFilterByText.filter(function (film) {
      return film.duration<=40
    })
    if (checkbox) {
      setFilteredByCheckBox(filmsFilterByTime)
    } else { setFilteredMovies(filmsFilterByText) }
  }




  console.log('filteredMovies', filteredMovies)
  console.log('filteredMoviesByCheckBox',filteredByCheckBox)


  return (
    <div className="app">
      {/* <Header loggedIn={loggedIn} openMenu={openMenu}/> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={
          <Movies
            movies={allmovies}
            numberOfMovies={numberOfMovies}
            onSaveMovie={selectMovie}
            onCheckbox={onCheckbox}
            openMenu={openMenu}
            loggedIn={loggedIn}
            toFindText={toFilterMovies}

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
