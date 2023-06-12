import React from 'react';
import './MoviesCard.css';
import foto from '../../../images/pic__COLOR_pic.png';

function MoviesCard({ movie, isSaved, saveClick }) {

  // const cardLikeButtonClassName
  const cardSaveButtonClassName = (
    `moviecard__save ${isSaved && 'moviecard__save_active'}`
  );

  const movieDuration = (duration) => {
    return `${Math.floor(duration / 60)}ч ${duration % 60}м`
  }

  return (
    <figure className="moviecard">
      <div className='moviecard__conteiner'>
        <img className="moviecard__photo" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
      </div>
      {/* {isOwn && <button className='element__trash' onClick={handleDeleteClick} />}  */}
      <figcaption className="moviecard__description">
        <p className="moviecard__title">{movie.nameRU}</p>
        <div className="moviecard__time">{movieDuration(movie.duration)}</div>
      </figcaption>

      {/* <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>  */}
      <button className={cardSaveButtonClassName} onClick={saveClick} type="button">Сохранить</button>


    </figure>
  );
}

export default MoviesCard;

