import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <span className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</span>
      <div className='footer__line' />
      <div className='footer__block'>
        <span className='footer__block-copyright'>{`© ${new Date().getFullYear()}`}</span>
        <ul className='footer__block-items'>
          <li className='footer__block-item'>Яндекс.Практикум</li>
          <li className='footer__block-item'>Github</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
