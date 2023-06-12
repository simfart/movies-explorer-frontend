import React from 'react';
import './AboutProject.css';

const AboutProject = React.forwardRef(({},myref) => (
  <section ref={  myref }  className="project">      
      <h2 className="main__subtitle project__subtitle"> О проекте</h2>
      <div className="main__line"></div>
    
      <div className="project__diplom">
        <div className="project__diplom__item">
          <h3 className="project__diplom__title"> Дипломный проект включал 5 этапов</h3>
          <p className="project__diplom__text"> Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="project__diplom__item">
          <h3 className="project__diplom__title"> На выполнение диплома ушло 5 недель</h3>
          <p className="project__diplom__text"> У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="project__weeks" >
        <div className="project__weeks__num project__weeks__num_1">1 неделя</div>
        <div className="project__weeks__num project__weeks__num_4">4 недели</div>
        <p className="project__weeks__about">Back-end</p>
        <p className="project__weeks__about">Front-end</p>
      </div>


  </section>
))

export default AboutProject;
