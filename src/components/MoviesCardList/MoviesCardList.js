import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import useScreenWidth from '../../hooks/useScreenWidth';
import { breakpointMiddle, breakpointSmall } from '../../utils/constants';

function MoviesCardList({ movies, onSaveMovie, onDeleteMovie, pass, savedMovies, isSavedButton}) {
  const [numAddMovies, setNumAddMovies] = useState()
  const [numVisMovies, setNumVisMovies] = useState()
  const [visMovies, setVisMovies] = useState([])

  const widthSize = useScreenWidth()

  useEffect(() => {
    if (widthSize >= breakpointMiddle) {
      setNumVisMovies(12)
      setNumAddMovies(3)
    } else if (widthSize >= breakpointSmall) {
      setNumVisMovies(8)
      setNumAddMovies(2)
    } else {
      setNumVisMovies(5)
      setNumAddMovies(2)
    }
  }, [widthSize])

  function showMore() {
    setNumVisMovies(numVisMovies+numAddMovies)
  }

  useEffect(() => {
    setVisMovies(movies.slice(0, numVisMovies))
  }, [movies, numVisMovies])

  // function checkingSave(savedMovies, movie) {
  //   return savedMovies.find(i => i.movieId === movie.id)
  // }

  //  //* Сравнение фильмов и проверка на лайк
  //  function getSavedMovieCard(savedMoviesList, movie) {
  //   return savedMoviesList.find(savedMovie => savedMovie.movieId === movie.id)
  // };

    // useEffect(() => {
  //   if (savedMovies.some((i) => i.movieId === movie.id || i === movie.id )) {
  //   }
  // }, [movie.id, savedMovies]);


  return (
    <section>
      <div className="cardlist">
        {
          visMovies.map((movieItem) => (
            <MoviesCard
              movie={movieItem}
              // isSaved={checkingSave(savedMovies, movieItem)}
              savedMovies={savedMovies}
              pass={pass}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
              isSavedButton={isSavedButton}
              key={movieItem.id||movieItem._id}
             
            />
          )
          )}
      </div>
      {movies.length>=numVisMovies && (<button className='movies__btn btn' type="button" onClick={showMore}>Ещё</button>)}
    </section>
  );
}

export default MoviesCardList;
