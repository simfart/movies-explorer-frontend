import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { useEffect, useState, useCallback } from "react";
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register'
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute';

import moviesApi from '../../utils/MoviesApi.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [menuOpened, setmenuOpened] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [movies, setMovies] = useState([]);

  const [userEmail, setUserEmail] = useState('11111@11.ru');

  useEffect(() => {
    Promise.all([moviesApi.getMovies()])
      .then(([receivedMovies]) => {
        setMovies(receivedMovies.reverse());
        console.log('movies', movies)
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

  function onSaveClick() {
    setIsSaved(!isSaved)
  }


  return (
    <div className="app">
      {/* <Header loggedIn={loggedIn} openMenu={openMenu} userEmail={userEmail}/> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies
          isSaved={onSaveClick}
          // to delete
          openMenu={openMenu}
          userEmail={userEmail}
          loggedIn={loggedIn}
          onCheckbox={onCheckbox}
        />}
        //
        />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      <Navigation
        menuOpened={menuOpened}
        onClose={openMenu}
        userEmail={userEmail}
      />
    </div>
  );
}

export default App;
