import React, {useState} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({movies, isSaved, saveClick}) {
  return (
    <section className="cardlist">          
          {movies.map((movie) => (
           <MoviesCard isSaved={isSaved} saveClick={saveClick} movie={movie} 
           key={movie.id} />
          ))}
 
  </section>
  );
}

export default MoviesCardList;
