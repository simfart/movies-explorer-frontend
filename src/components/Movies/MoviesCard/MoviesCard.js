import React, { useState } from 'react';
import './MoviesCard.css';

function MoviesCard({ movie, onSaveMovie }) {

  const [savedIcon, setSavedIcon] = useState(false);

  const cardSaveButtonClassName = (
    `moviecard__save ${savedIcon && 'moviecard__save_active'}`
  );

  const movieDuration = (duration) => {
    return `${Math.floor(duration / 60)}ч ${duration % 60}м`
  }

  function handleSaveBtnClick() {
    setSavedIcon(!savedIcon)
    onSaveMovie(movie)
  }

  return (
    <figure className="moviecard">
      <div className='moviecard__conteiner'>
        <img className="moviecard__photo" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
      </div>
      <figcaption className="moviecard__description">
        <p className="moviecard__title">{movie.nameRU}</p>
        <div className="moviecard__time">{movieDuration(movie.duration)}</div>
      </figcaption>
      <button className={cardSaveButtonClassName} onClick={handleSaveBtnClick} type="button">Сохранить</button>
    </figure>
  );
}

export default MoviesCard;

