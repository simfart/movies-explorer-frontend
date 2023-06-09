import React from 'react';
import './Portfolio.css';
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'> 
       <p className='portfolio__item__title'>Статичный сайт</p>
       <a className='portfolio__item__link' href="https://simfart.github.io/russian-travel/" target="_blank" rel="noopener noreferrer">&#8599;</a>
        </li>
        <li className='portfolio__item'> 
       <p className='portfolio__item__title'>Адаптивный сайт</p>
       <a className='portfolio__item__link' href="https://simfart.github.io/russian-travel/" target="_blank" rel="noopener noreferrer">&#8599;</a>
        </li>
        <li className='portfolio__item'> 
       <p className='portfolio__item__title'>Одностраничное приложение</p>
       <a className='portfolio__item__link' href="https://simfart.github.io/russian-travel/" target="_blank" rel="noopener noreferrer">&#8599;</a>
        </li>
        </ul>
    </section>  
  );
}

export default Portfolio;
