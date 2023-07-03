import React, { useState, useEffect } from 'react';
import './MoviesCard.css';

function MoviesCard({ movie, onSaveMovie,onDeleteMovie, pass, isVis, savedMovies}) {

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (savedMovies.some((i) => i.movieId === movie.id || i === movie.id )) {
      setIsSaved(true)
    } else {setIsSaved(false)}
  }, [movie.id, savedMovies]);

  const movieDuration = (duration) => {
    return `${Math.floor(duration / 60)}ч ${duration % 60}м`
  }

    function handleSave() {
      onSaveMovie(movie) 
    }

    function handleDelete() {
      onDeleteMovie(movie)
    }
  
  return (
    <figure className={`moviecard ${isVis && 'moviecard_visible'}`}>
      <div className='moviecard__conteiner'>
        <a className='link moviecard__link' href={pass === 'Movies'? movie.trailerLink: movie.trailer } target="_blank" rel="noopener noreferrer">
        <img className='moviecard__photo' src={pass === 'Movies'? `https://api.nomoreparties.co${movie.image.url}` : movie.image} alt={movie.nameRU} /></a>
        {pass === 'Movies'
          ? (<button className={`moviecard__btn ${isSaved && 'moviecard__btn_active'}`} onClick={isSaved? handleDelete: handleSave} type="button">Сохранить</button>)
          : (<button className='moviecard__btn moviecard__btn_saved' type="button" onClick={handleDelete} ></button>)}
      </div>
      <figcaption className='moviecard__description'>
        <span className='moviecard__title'>{movie.nameRU}</span>
        <div className='moviecard__time'>{movieDuration(movie.duration)}</div>
      </figcaption>
    </figure>
  );
}

export default MoviesCard;

