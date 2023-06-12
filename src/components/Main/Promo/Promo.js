import React from 'react';
import NavTab from '../NavTab/NavTab';

function Promo({ aboutProjectnClickRef, techsOnClickRef, aboutMeOnClickRef }) {
  return (
    <section className="promo">
      <h1 className="main__title promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <NavTab
        aboutProjectnClickRef={aboutProjectnClickRef}
        techsOnClickRef={techsOnClickRef}
        aboutMeOnClickRef={aboutMeOnClickRef}
      />
    </section>
  );
}

export default Promo;
