import React, {useState} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({isSaved, saveClick}) {
  return (
    <section className="cardlist">      
 <MoviesCard isSaved={isSaved} saveClick={saveClick}/>
 <MoviesCard />
 <MoviesCard />
 <MoviesCard />
 <MoviesCard />
 <MoviesCard />
 <MoviesCard />
  </section>
  );
}

export default MoviesCardList;
