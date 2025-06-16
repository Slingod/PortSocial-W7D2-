import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import AuthContext from '../contexts/AuthContext';

export default function Header({ theme, toggleTheme }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <h1>Mon Portfolio</h1>
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
        {user && (
          <NavLink
            to="/social"
            className={({ isActive }) =>
              isActive ? 'nav-main__link nav-main__link--active' : 'nav-main__link'
            }
          >
            Réseau Social
          </NavLink>
        )}
        <div className="spacer" />
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {user ? (
          <button className="logout-btn" onClick={logout}>Déconnexion</button>
        ) : (
          <NavLink to="/auth" className="nav-main__link">Connexion</NavLink>
        )}
      </nav>
    </header>
  );
}
