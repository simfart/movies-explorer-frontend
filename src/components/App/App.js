import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { useEffect, useState, useCallback } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
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

import useScreenWidth from '../../hooks/useScreenWidth';

import moviesApi from '../../utils/MoviesApi.js';


function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [menuOpened, setmenuOpened] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedCard, setSelectedCard] = useState();
  const [currentUser, setCurrentUser] = useState({});

  const [numberOfMovies, setnumberOfMovies] = useState(0);
  const [userEmail, setUserEmail] = useState('11111@11.ru');
  const widthSize = useScreenWidth()

  useEffect(() => {
    const breakpointMiddle = 1024
    const breakpointSmall = 625

    widthSize >= breakpointMiddle ? setnumberOfMovies(12) :
      widthSize >= breakpointSmall ? setnumberOfMovies(8) : setnumberOfMovies(5)
  }, [numberOfMovies, widthSize]
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

  console.log(selectedCard)


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {/* <Header loggedIn={loggedIn} openMenu={openMenu} userEmail={userEmail}/> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies
            movies={movies}
            numberOfMovies={numberOfMovies}
            onSaveMovie={selectMovie}

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
    </CurrentUserContext.Provider>
  );
}

export default App;
