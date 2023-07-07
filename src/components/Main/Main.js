import React, { useRef } from 'react'

import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Main.css'

function Main({loggedIn, openMenu}) {

  const aboutProjectnClickRef = useRef(null);
  const techsOnClickRef = useRef(null);
  const aboutMeOnClickRef = useRef(null);

  return (
    <>
    <Header loggedIn={loggedIn} openMenu={openMenu} />
      <main>
        <Promo
          aboutProjectnClickRef={aboutProjectnClickRef}
          techsOnClickRef={techsOnClickRef}
          aboutMeOnClickRef={aboutMeOnClickRef}
        />
        <AboutProject ref={aboutProjectnClickRef} />
        <Techs ref={techsOnClickRef} />
        <AboutMe ref={aboutMeOnClickRef} />
        <Portfolio />
      </main >
      <Footer />

    </>
  );
}

export default Main;
