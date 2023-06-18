import React from 'react'
import './NavTab.css'

function NavTab({ aboutProjectnClickRef, techsOnClickRef, aboutMeOnClickRef }) {

  const scrollEffect = (targetRef) => {
    targetRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return (
    <ul className='navtab'>
      <button className='btn navtab__btn' onClick={() => scrollEffect(aboutProjectnClickRef)}>О проекте</button>
      <button className='btn navtab__btn' onClick={() => scrollEffect(techsOnClickRef)}>Технологии</button>
      <button className='btn navtab__btn' onClick={() => scrollEffect(aboutMeOnClickRef)}>Студент</button>
    </ul>
  );
}

export default NavTab;
