import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import useScreenWidth from '../../hooks/useScreenWidth';
import { breakpointMiddle, breakpointSmall } from '../../utils/constants';

function MoviesCardList({ movies, onSaveMovie, pass}) {
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

  return (
    <section>
      <div className="cardlist">
        {
          visMovies.map((movieItem) => (
            <MoviesCard
              onSaveMovie={onSaveMovie}
              movie={movieItem}
              key={movieItem.id}
              pass={pass}
            />
          )
          )}
      </div>
      {movies.length>=numVisMovies && (<button className='movies__btn btn' type="button" onClick={showMore}>Ещё</button>)}
    </section>
  );
}

export default MoviesCardList;
