import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

// Assurez-vous que moon.svg et sun.svg se trouvent bien dans src/assets/
import moonIcon from '../assets/moon.svg';
import sunIcon from '../assets/sun.svg';

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="header">
      <nav className="nav-main">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'nav-main__link nav-main__link--active' : 'nav-main__link'
          }
        >
          Accueil
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'nav-main__link nav-main__link--active' : 'nav-main__link'
          }
        >
          À Propos
        </NavLink>
        <NavLink
          to="/works"
          className={({ isActive }) =>
            isActive ? 'nav-main__link nav-main__link--active' : 'nav-main__link'
          }
        >
          Travaux
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? 'nav-main__link nav-main__link--active' : 'nav-main__link'
          }
        >
          Contact
        </NavLink>

        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? (
            <img src={moonIcon} alt="Passer en mode Nuit" className="theme-toggle-btn__icon" />
          ) : (
            <img src={sunIcon} alt="Passer en mode Jour" className="theme-toggle-btn__icon" />
          )}
        </button>
      </nav>
    </header>
  );
}