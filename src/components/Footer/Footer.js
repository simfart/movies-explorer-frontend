import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__line' />
      <div className='footer__block'>
        <p className="footer__block__copyright">{`© ${new Date().getFullYear()}`}</p>
        <ul className='footer__block__items'>
          <li className='footer__block__item'>Яндекс.Практикум</li>
          <li className='footer__block__item'>Github</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
