import React from 'react';
import './MoviesCard.css';
import foto from '../../../images/pic__COLOR_pic.png';

function MoviesCard({isSaved, saveClick}) {

  // const cardLikeButtonClassName
  const cardSaveButtonClassName = ( 
    `moviecard__save ${isSaved && 'moviecard__save_active'}` 
  ); 
 

  return (
    <figure className="moviecard"> 
    <div className='moviecard__conteiner'>
    <img className="moviecard__photo" src={foto} alt={'Название фильма'} />
     </div>
    {/* {isOwn && <button className='element__trash' onClick={handleDeleteClick} />}  */}
    <figcaption className="moviecard__description"> 
      <p className="moviecard__title">33 слова о дизайне</p> 
      <div className="moviecard__time">1ч 17м</div> 
      </figcaption> 
 
        {/* <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>  */}
        <button className={cardSaveButtonClassName} onClick={saveClick} type="button">Сохранить</button>
         
    
  </figure> 
  );
}

export default MoviesCard;
