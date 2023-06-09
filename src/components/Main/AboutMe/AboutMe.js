import React from 'react';
import myPhoto from '../../../images/photo.jpg';

function AboutMe() {
  return (
    <section className='about-me'>
      <h2 className='main__subtitle '>Студент</h2>
      <div className='main__line'></div>
      <div className='about-me__unit'>
        <div className='about-me__unit__describe'>
          <h2 className='main__title about-me__title'>Любовь</h2>
          <p className='about-me__subtitle'>Фронтенд-разработчик</p>
          <p className='about-me__text'>Я родилася в Казахстане, живу в Симферополе, работаю главным бухгалтером в охранной организации. Много друзей в сфере IT, которые замотивировали пройти курс. После окочания планирую подрабатывать в этой сфере.
          </p>
          <p className='about-me__elem'>Github</p>
        </div>
        <img className='about-me__photo' src={myPhoto} alt='myPhoto' />
      </div>
    </section>
  );
}

export default AboutMe;
