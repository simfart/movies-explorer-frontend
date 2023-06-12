import React, { useRef } from 'react'

import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';

import Header from '../Header/Header';

function Main() {

  const aboutProjectnClickRef = useRef(null);
  const techsOnClickRef = useRef(null);
  const aboutMeOnClickRef = useRef(null);

//to delete
const loggedIn = false

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <Promo 
      aboutProjectnClickRef={aboutProjectnClickRef}
        techsOnClickRef={techsOnClickRef}
        aboutMeOnClickRef={aboutMeOnClickRef}
        />
      <AboutProject ref = { aboutProjectnClickRef }/>
      <Techs ref = { techsOnClickRef }/>
      <AboutMe ref = { aboutMeOnClickRef  }/>
      <Portfolio/>
   
    </>
  );
}

export default Main;
