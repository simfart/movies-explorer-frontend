import React from 'react';
// import union from '../images/Union.svg';
// import unionred from '../images/Union-red.svg';

import './InfoTooltip.css'

function InfoTooltip({ isOpen, onClose, messagePopup}) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__info'>
        <span className='popup__title'>{messagePopup}</span>
        <button
          onClick={onClose}
          className='popup__close'
          aria-label='Закрыть'
          type='button'
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
