import React from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import * as auth from '../../utils/Auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import moviesApi from '../../utils/MoviesApi.js';
import mainApi from '../../utils/MainApi';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Navigation from '../Navigation/Navigation';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Movies/Preloader/Preloader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../../utils/ProtectedRoute';

import { ERR_SEARCH, SUCCESS_MESSAGE } from '../../utils/constants';

import './App.css';

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [menuOpened, setmenuOpened] = useState(false);
  const [preloader, setPreloader] = useState(false);

  const filterMovies = useCallback((movies, text, isShort) => {
    let result = movies;

    if (text) {
      result = result.filter((movie) =>
        movie.nameRU.toLowerCase().includes(text),
      );
    }

    if (isShort) {
      result = result.filter((movie) => movie.duration <= 40);
    }

    return result;
  }, []);

  const searchMovies = useCallback(async (search, isShortFilm) => {
    try {
      setPreloader(true);

      const movies = await moviesApi.getMovies();

      const filteredMovies = filterMovies(movies, search, isShortFilm);

      return filteredMovies;
    } catch (error) {
      setIsInfoTooltipOpen(true);
      setMessagePopup(ERR_SEARCH);

      return [];
    } finally {
      setPreloader(false);
    }
  }, [filterMovies]);

  const [savedMovies, setSavedMovies] = useState([]);
  const [messagePopup, setMessagePopup] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const showInfoTooltip = useCallback(() => setIsInfoTooltipOpen(true), []);
  const closeInfoTooltip = useCallback(() => setIsInfoTooltipOpen(false), []);

  const setPopupMessage = useCallback(
    (message) => setMessagePopup(message),
    [],
  );

  // Data API
  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        mainApi.getInitialUserInfo(),
        mainApi.getInitialUserMovies(),
      ])
        .then(([resUserInfo, resMovies]) => {
          setCurrentUser(resUserInfo.data);
          setSavedMovies(resMovies);
        })
        .catch((err) => {
          console.log(err);
          showInfoTooltip();
          setPopupMessage(err.message);
        })
        .finally(() => {
          setPreloader(false);
        });
    }
  }, [loggedIn]);

  // Login
  const handleLogin = useCallback(
    async (values) => {
      try {
        const { token } = await auth.authorize(values.email, values.password);
        if (!token) {
          throw new Error('Ошибка аутентификации');
        } else {
          setLoggedIn(true);
          setErrMessage('');
          navigate('/movies', { replace: true });
        }
      } catch (err) {
        console.log(err);
        setErrMessage(err.message);
      }
    },
    [navigate, setLoggedIn],
  );

  // Registration
  const handleRegister = useCallback(
    async (values) => {
      try {
        await auth.register(values);
        handleLogin({
          email: values.email,
          password: values.password,
        });
      } catch (err) {
        console.log(err);
        setErrMessage(err.message);
      }
    },
    [handleLogin],
  );

  // Log out
  const logOut = useCallback(async () => {
    try {
      await mainApi.logout();
      navigate('/', { replace: true });
      setLoggedIn(false);
      localStorage.clear();
    } catch (err) {
      console.log(err);
      showInfoTooltip();
      setPopupMessage(err.message);
    } finally {
      setPreloader(false);
    }
  }, [navigate, setPopupMessage, showInfoTooltip]);

  // Token Check
  const checkToken = useCallback(async () => {
    setPreloader(true);
    try {
      const res = await auth.checkToken();
      if (res) {
        setLoggedIn(true);
      }
    } catch (err) {
      console.log(err);
      setPopupMessage(err.message);
      setLoggedIn(false);
    } finally {
      setPreloader(false);
    }
  }, []);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  // editing a profile
  const editUser = useCallback(async (values) => {
    setPreloader(true);
    try {
      const res = await mainApi.editlUserInfo(values);
      setCurrentUser(res.data);
      setErrMessage('');
      showInfoTooltip();
      setPopupMessage(SUCCESS_MESSAGE);
    } catch (err) {
      console.log(err);
      setErrMessage(err.message);
    } finally {
      setPreloader(false);      
    }
  }, []);

  // burger menu
  const openMenu = useCallback(() => {
    setmenuOpened(!menuOpened);
  }, [menuOpened]);

  const onSaveMovie = useCallback(
    async (movie) => {
      try {
        const savedMovie = await mainApi.saveMovie(movie);
        setSavedMovies([savedMovie, ...savedMovies]);
      } catch (err) {
        console.log(err);
      }
    },
    [savedMovies],
  );

  const onDeleteMovie = useCallback(
    async (movie) => {
      try {
        const selectedMovie = savedMovies.find(
          (i) => i.movieId === (movie.id || movie.movieId),
        );
        await mainApi.deleteMovie(selectedMovie._id);
        const filtered = savedMovies.filter(
          (newCard) => newCard.movieId !== (movie.id || movie.movieId),
        );
        setSavedMovies(filtered);
      } catch (err) {
        console.log(err);
      }
    },
    [savedMovies],
  );

  if (preloader) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<Main loggedIn={loggedIn} openMenu={openMenu} />}
          />
          <Route
            element={
              <ProtectedRoute
                isloggedIn={loggedIn}
                showInfoTooltip={showInfoTooltip}
              />
            }
          >
            <Route
              path="/movies"
              element={
                <Movies
                  loggedIn={loggedIn}
                  openMenu={openMenu}
                  onSaveMovie={onSaveMovie}
                  onDeleteMovie={onDeleteMovie}
                  savedMovies={savedMovies}
                  showTooltip={showInfoTooltip}
                  setPopupMessage={setPopupMessage}

                  searchMovies={searchMovies}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies
                  showTooltip={showInfoTooltip}
                  setPopupMessage={setPopupMessage}
                  savedMovies={savedMovies}
                  onDeleteMovie={onDeleteMovie}
                  loggedIn={loggedIn}
                  openMenu={openMenu}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  openMenu={openMenu}
                  loggedIn={loggedIn}
                  logOut={logOut}
                  onSubmitEdit={editUser}
                  errMessage={errMessage}
                />
              }
            />
          </Route>
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Login toLogin={handleLogin} errMessage={errMessage} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register
                  handleRegister={handleRegister}
                  errMessage={errMessage}
                />
              )
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Navigation menuOpened={menuOpened} onClose={openMenu} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltip}
          messagePopup={messagePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
