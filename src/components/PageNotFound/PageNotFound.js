import React from 'react';
import { useNavigate } from "react-router-dom";

import './PageNotFound.css';

function PageNotFound() {

    const navigate = useNavigate();
  
  return (
    <div className="not-found">
    <h3 className="not-found__title">
     <span>404</span>Страница не найдена
    </h3>
    {/* <Link className="link not-found__link" to="/">Назад</Link> */}
    <button className="btn not-found__btn" onClick={() => navigate(-1)}>Назад</button>
  </div>
  );
}

export default PageNotFound;
