import React from 'react'

function NavTab({aboutProjectnClickRef, techsOnClickRef, aboutMeOnClickRef }) {

  const scrollEffect = ( targetRef ) =>{
    targetRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
  
  return (
     <ul className='navtab'>
          <button className='navtab__btn' onClick = { () =>scrollEffect(aboutProjectnClickRef) }>О проекте</button>
          <button className='navtab__btn' onClick = { ()=>scrollEffect(techsOnClickRef) }>Технологии</button>
          <button className='navtab__btn' onClick = { () =>scrollEffect(aboutMeOnClickRef) }>Студент</button>
 </ul>
  );
}

export default NavTab;
