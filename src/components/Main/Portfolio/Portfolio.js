import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>

        <li className='portfolio__item'>
          <a className='link portfolio__item-link' href="https://simfart.github.io/russian-travel/" target="_blank" rel="noopener noreferrer">
            <p className='portfolio__item-title'>Статичный сайт</p>
            <div>&#8599;</div>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='link portfolio__item-link' href="https://simfart.github.io/russian-travel/" target="_blank" rel="noopener noreferrer">
            <p className='portfolio__item-title'>Адаптивный сайт</p>
            <div>&#8599;</div>
          </a>
        </li>

        <li className='portfolio__item'>
          <a className='link portfolio__item-link' href="https://simfart.github.io/russian-travel/" target="_blank" rel="noopener noreferrer">
            <p className='portfolio__item-title'>Одностраничное приложение</p>
            <div>&#8599;</div>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
