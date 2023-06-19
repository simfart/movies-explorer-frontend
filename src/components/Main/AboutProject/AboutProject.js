import React from 'react';
import './AboutProject.css';

const AboutProject = React.forwardRef(({ }, myref) => (
  <section ref={myref} className='project'>
    <h2 className='main-subtitle project__subtitle'>О проекте</h2>
    <div className='main-line'></div>

    <div className='project__diplom'>
      <div className='project__diplom-item'>
        <h3 className='project__diplom-title'>Дипломный проект включал 5 этапов</h3>
        <p className='project__diplom-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </div>
      <div className='project__diplom-item'>
        <h3 className='project__diplom-title'>На выполнение диплома ушло 5 недель</h3>
        <p className='project__diplom-text'> У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
    </div>
    <div className='project__weeks' >
      <div className='project__weeks-num project__weeks-num_1'>1 неделя</div>
      <div className='project__weeks-num project__weeks-num_4'>4 недели</div>
      <span className='project__weeks-about'>Back-end</span>
      <span className='project__weeks-about'>Front-end</span>
    </div>


  </section>
))

export default AboutProject;
