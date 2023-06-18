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

import useScreenWidth from '../../hooks/useScreenWidth';
import moviesApi from '../../utils/MoviesApi.js';

import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(true); //for Header
  const [menuOpened, setmenuOpened] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedmovies, setSavedMovies] = useState([]);
  const [numberOfMovies, setnumberOfMovies] = useState(0);
  const [selectedCard, setSelectedCard] = useState('');

  const widthSize = useScreenWidth()

  useEffect(() => {
    const breakpointMiddle = 1024
    const breakpointSmall = 625
    if(widthSize >= breakpointMiddle){
      setnumberOfMovies(12)
      setSavedMovies(3)
    } else if(widthSize >= breakpointSmall){
      setnumberOfMovies(8)
    } else{
      setnumberOfMovies(5)
      setSavedMovies(2)
    }
  }, [widthSize]
  )

  useEffect(() => {
    Promise.all([moviesApi.getMovies()])
      .then(([receivedMovies]) => {
        setMovies(receivedMovies);
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
            movies={movies}
            numberOfMovies={numberOfMovies}
            onSaveMovie={selectMovie}
            onCheckbox={onCheckbox}
            openMenu={openMenu}
            loggedIn={loggedIn}
          />}
        />
        <Route path="/saved-movies" element={
          <SavedMovies
            movies={movies}
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
