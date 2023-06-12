import React from "react";


const AboutMe = React.forwardRef(({},myref) => ( 
    <section ref={myref} className='about-me'>
      <h2 className='main__subtitle about-me__subtitle'>Студент</h2>
      <div className='main__line'></div>
      <div className='about-me__unit'>
        <div className='about-me__unit__describe'>
          <h2 className='about-me__title'>Любовь</h2>
          <p className='about-me__prof'>Фронтенд-разработчик</p>
          <p className='about-me__text'>Я родилася в Казахстане, живу в Симферополе, работаю главным бухгалтером в охранной организации. Много друзей в сфере IT, которые замотивировали пройти курс. После окочания планирую подрабатывать в этой сфере.
          </p>
          <p className='about-me__elem'>Github</p>
        </div>
        <div className='about-me__photo' />
      </div>
    </section>
  ))

export default AboutMe;
