import React from 'react';

function Techs() {
  return (
    <section className='techs'>
      <h2 className='main__subtitle'>Технологии</h2>
      <div className='main__line main__line_dark '></div>
      <h2 className='main__title techs__title'>7 технологий</h2>
      <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
<ul className='techs__list'>
  <li className='techs__list__item'>HTML</li>
  <li className='techs__list__item'>CSS</li>
  <li className='techs__list__item'>JS</li>
  <li className='techs__list__item'>React</li>
  <li className='techs__list__item'>Git</li>
  <li className='techs__list__item'>Express.js</li>
  <li className='techs__list__item'>mongoDB</li>
</ul>
    </section>

  );
}

export default Techs;
