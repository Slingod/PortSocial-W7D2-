import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="header">
      <nav className="header__nav">

        <Link to="/" className="header__link">Accueil</Link>
        <Link to="/about" className="header__link">À Propos</Link>
        <Link to="/works" className="header__link">Projets</Link>
        <Link to="/contact" className="header__link">Contact</Link>

        <button
          className="header__theme-btn"
          onClick={toggleTheme}
        >
          {theme === 'light' ? 'Mode Nuit' : 'Mode Jour'}
        </button>
      </nav>
    </header>
  );
}