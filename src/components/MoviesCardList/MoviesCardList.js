import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, onSaveMovie, numberOfMovies, pass }) {
  const filteredMovies = movies.slice(0, numberOfMovies);
  // console.log('numberOfMovies', numberOfMovies)
  // console.log('movies', movies)

  // console.log(' filteredMovies', filteredMovies)

  return (
    <section>
      <div className="cardlist">
        {
          filteredMovies.map((movieItem) => (
            <MoviesCard
              onSaveMovie={onSaveMovie}
              movie={movieItem}
              key={movieItem.id}
              pass={pass}
            />
          )
          )}
      </div>
      {pass === 'Movies' && (<button className='movies__btn btn' type="button">Ещё</button>)}
    </section>
  );
}

export default MoviesCardList;
