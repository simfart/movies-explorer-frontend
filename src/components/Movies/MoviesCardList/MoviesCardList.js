import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, onSaveMovie, numberOfMovies }) {
  const filteredMovies = movies.slice(0, numberOfMovies);

  return (
    <section className="cardlist">
      {
        filteredMovies.map((movieItem) => (
          <MoviesCard
            onSaveMovie={onSaveMovie}
            movie={movieItem}
            key={movieItem.id}
          />
        )
        )}

    </section>
  );
}

export default MoviesCardList;
