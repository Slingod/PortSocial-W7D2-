import React from 'react';
import './About.scss';

import githubLogo from '../assets/github-tile.svg';
import linkedinLogo from '../assets/linkedin-tile.svg';

export default function About() {
  return (
    <div className="page page--about">
      <h1 className="page__title">À propos</h1>
      <p className="page__text">
        Je m’appelle Julien Sicard, développeur front-end passionné par React et le design.
        Ici, tu découvriras mon parcours, mes compétences et mes projets.
      </p>

      {/* Bloc “Mes Réseaux / Profil GitHub et LinkedIn” */}
      <div className="page--about__social">
        <h2>Retrouve-moi sur :</h2>
        <ul>
          <li>
            <a
              href="https://github.com/Slingod"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={githubLogo}
                alt="GitHub"
                className="icon icon--github"
              />
              Mon profil GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/Slingod"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedinLogo}
                alt="LinkedIn"
                className="icon icon--linkedin"
              />
              Mon profil LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}