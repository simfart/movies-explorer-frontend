import React, { useRef } from 'react'

import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Main.css'

function Main() {

  const aboutProjectnClickRef = useRef(null);
  const techsOnClickRef = useRef(null);
  const aboutMeOnClickRef = useRef(null);

  return (
    <>
      <Header loggedIn={false}/>
      <Promo 
      aboutProjectnClickRef={aboutProjectnClickRef}
        techsOnClickRef={techsOnClickRef}
        aboutMeOnClickRef={aboutMeOnClickRef}
        />
      <AboutProject ref = { aboutProjectnClickRef }/>
      <Techs ref = { techsOnClickRef }/>
      <AboutMe ref = { aboutMeOnClickRef  }/>
      <Portfolio/>
      <Footer/>
   
    </>
  );
}

export default Main;
