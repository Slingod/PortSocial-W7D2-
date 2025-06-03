import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Works.scss';

export default function Works() {
  return (
    <div className="works-page">
      <h1 className="works-page__title">
        Bienvenue dans mes travaux pratiques
      </h1>
      <nav className="works-page__nav">
        <Link to="exercises" className="works-page__link">Exercices</Link>
        <Link to="case-study" className="works-page__link">Étude de Cas</Link>
        <Link to="concret-case" className="works-page__link">Cas Concret</Link>
      </nav>

      <div className="works-page__outlet">
        <Outlet />
      </div>
    </div>
  );
}