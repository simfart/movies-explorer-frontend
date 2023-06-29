import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from "react";

import * as auth from "../../utils/Auth";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import moviesApi from '../../utils/MoviesApi.js';
import mainApi from '../../utils/MainApi';
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

import { ERRSEARCH, ERRNOMOVIE, ERRWORDSEARCH } from '../../utils/constants';

import './App.css'

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(true);
  // const [registered, setregistered] = useState();
  const [currentUser, setCurrentUser] = useState({});

  const [menuOpened, setmenuOpened] = useState(false);
  const [preloader, setPreloader] = useState(false)

  const [allmovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesToFilter, setSavedMoviesToFilter] = useState([]);
  const [searchTextInSaved, setsearchTextInSaved]=useState()
  
  const [numberAllMovies, setNumberAllMovies] = useState(0);
  const [filterMoviesByText, setFilterMoviesByText] = useState([]);
  const [filterMovieByCheckBox, setFilterMovieByCheckBox] = useState([]);

  const [filterSavedMoviesByText, setFilterSavedMoviesByText] = useState([]);
  const [filterSavedMovieByCheckBox, setFilterSavedMovieByCheckBox] = useState([]);
  
  const [checkbox, setCheckbox] = useState(false);

  const [messagePopup, setMessagePopup] = useState('');

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSavedMovie, setIsSavedMovie] = useState(false);

  const showInfoTooltip = useCallback(() => setIsInfoTooltipOpen(true), [])

  const setPopupMessage = useCallback(
    (message) => setMessagePopup(message),
    []
  );

  // Data API
  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getInitialUserInfo(), mainApi.getInitialUserMovies()])
        .then(([resUserInfo, resMovies]) => {
          setCurrentUser(resUserInfo);
          setSavedMovies(resMovies);
          setSavedMoviesToFilter(resMovies)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);


  // Registration
  const handleRegister = useCallback(
    (values) => {
      auth
        .register(values)
        .then((res) => {
          handleLogin({
            email: values.email,
            password: values.password
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }, []);

  // Login
  const handleLogin = useCallback(
    (values) => {
      auth
        .authorize(values.email, values.password)
        .then((res) => {
          if (!res) {
            throw new Error("Ошибка аутентификации");
          }
          if (res.token) {
            localStorage.setItem("jwt", res.token);
            setLoggedIn(true);
            // setUserEmail(values.email);
            navigate("/movies", { replace: true });
          }
        })
    }, [navigate]);

  // Log out
  const logOut = useCallback(
    async (values) => {
      localStorage.removeItem("jwt");
      setLoggedIn(false);
      // setUserEmail("");
      const res = await auth.logout().catch((err) => {
        console.log(err);
        return true;
      });
      if (!res) {
        throw new Error("Ошибка : Выйти не получилось");
      }
      // setIsLoad(false);
    },
    [navigate]
  );

  // burger menu
  const openMenu = useCallback(() => {
    setmenuOpened(!menuOpened);
  }, [menuOpened]);

  useEffect(() => {
    checkbox
      ? setNumberAllMovies(filterMovieByCheckBox.length)
      : setNumberAllMovies(filterMoviesByText.length)
  }, [checkbox, filterMovieByCheckBox, filterMoviesByText])

  // from local Storage movies & checkbox
  useEffect(() => {
    const moviesState = JSON.parse(localStorage.getItem('filmsFilterByText'))
    const checkboxState = JSON.parse(localStorage.getItem('checkbox'))
    moviesState ? setFilterMoviesByText(moviesState) : setFilterMoviesByText([])
    checkboxState ? setCheckbox(checkboxState) : setCheckbox(false)
  }, [setFilterMoviesByText, setCheckbox])


  // time filtering with a checkbox
  function filterCheckbox(movies) {
    if (checkbox) {
      const filmsFilterByTime = movies.filter(function (film) {
        return film.duration <= 40
      })
      setFilterMovieByCheckBox(filmsFilterByTime)
      setFilterSavedMovieByCheckBox(filmsFilterByTime)
      localStorage.setItem("checkbox", JSON.stringify(checkbox));
    }
  }

  // checkbox btn
  function onCheckbox() { 
    setCheckbox(!checkbox)
    filterCheckbox(filterMoviesByText)
    localStorage.setItem("checkbox", JSON.stringify(!checkbox));
  }

  const  filmsFilterMovies =(mas, text) => mas.filter(function (film) {
    return film.nameRU.toLowerCase().includes(text)
  });

  // btn to search in Movies page
  function toSearchMovies(textToFind) {
    setPreloader(true)
    moviesApi.getMovies()
      .then((movies) => {
        const filmsFilterByText = filmsFilterMovies(movies, textToFind )
        if (filmsFilterByText.length === 0) {
          setIsInfoTooltipOpen(true)
          setMessagePopup(ERRNOMOVIE)
        } else {
          setFilterMoviesByText(filmsFilterByText)
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

  function onSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies])  
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function onDeleteMovie(movie) {
    // console.log(movie, movie)
    const selectedMovie = savedMovies.find((i) => i.movieId === (movie.id||movie.movieId))
    mainApi
      .deleteMovie(selectedMovie._id)
      .then(() => {
        const filtered = savedMovies.filter((newCard) => newCard.movieId !== (movie.id||movie.movieId));
        setSavedMovies(filtered);
       })
      .catch((err) => {
        console.log(err);
      })
  }

  function onCloseInfoTooltip() {
    setIsInfoTooltipOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {/* <Header loggedIn={loggedIn} openMenu={openMenu}/> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <Movies
                movies={checkbox ? filterMovieByCheckBox : filterMoviesByText}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                onCheckbox={onCheckbox}
                openMenu={openMenu}
                loggedIn={loggedIn}
                toFindText={toSearchMovies}
                isChecked={checkbox}
                savedMovies={savedMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                showTooltip={showInfoTooltip}
                setPopupMessage={setPopupMessage}
                openMenu={openMenu}
                loggedIn={loggedIn}
                // onCheckbox={onCheckbox}
                savedMovies={savedMovies}
                onDeleteMovie={onDeleteMovie}
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
              />
            }
          />
          <Route path="/signin" element={<Login toLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register toRegister={handleRegister} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Navigation menuOpened={menuOpened} onClose={openMenu} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={onCloseInfoTooltip}
          messagePopup={messagePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
