import React, { useEffect, useState } from 'react';
import './Home.scss';

function GitHubOverview({ profile }) {
  return (
    <div className="overview-card">
      <img
        className="overview-card__avatar"
        src={profile.avatar_url}
        alt={`${profile.login} avatar`}
      />
      <div className="overview-card__info">
        <h1 className="overview-card__name">
          {profile.name || profile.login}
        </h1>
        {profile.bio && <p className="overview-card__bio">{profile.bio}</p>}

        <div className="overview-card__stats">
          {profile.location && (
            <div className="overview-card__stat-item">
              <span className="overview-card__icon">🌍</span>
              {profile.location}
            </div>
          )}
          <div className="overview-card__stat-item">
            <span className="overview-card__icon">👥</span>
            {profile.followers} followers · {profile.following} following
          </div>
          <div className="overview-card__stat-item">
            <span className="overview-card__icon">🏢</span>
            {profile.company || '–'}
          </div>
        </div>
        <a
          className="overview-card__btn"
          href={profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir mon GitHub
        </a>
      </div>
    </div>
  );
}

function RepoCard({ repo }) {
  return (
    <div className="repo-card">
      <div className="repo-card__header">
        <h3 className="repo-card__name">{repo.name}</h3>
        <span className="repo-card__stars">⭐ {repo.stargazers_count}</span>
      </div>
      {repo.description && <p className="repo-card__desc">{repo.description}</p>}
      <div className="repo-card__footer">
        <span className="repo-card__forks">🍴 {repo.forks_count}</span>
        <a
          className="repo-card__link"
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir le dépôt
        </a>
      </div>
    </div>
  );
}

// ─── IMPORTS ICÔNES “COMPÉTENCES” ────────────────────────────────
import nodejsIcon from '../assets/nodejs-icon.svg';
import reactjsIcon from '../assets/reactjs-icon.svg';
import vitejsIcon from '../assets/vitejsdev-icon.svg';
import figmaIcon from '../assets/figma-icon.svg';
import uxIcon from '../assets/figma-icon.svg';
import cssIcon from '../assets/w3_css-official.svg';
import scssIcon from '../assets/scss-svgrepo-com.svg';
import flexboxIcon from '../assets/tailwindcss-icon.svg';
import html5Icon from '../assets/w3_html5-icon.svg';
import jsIcon from '../assets/javascript-icon.svg';
import rubyOnRailsIcon from '../assets/ruby-lang-vertical.svg';
import rubyIcon from '../assets/ruby-lang-vertical.svg';
// ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [topRepos, setTopRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const resProfile = await fetch('https://api.github.com/users/Slingod');
        if (!resProfile.ok) {
          throw new Error(`Erreur profil GitHub (${resProfile.status})`);
        }
        const dataProfile = await resProfile.json();

        const resRepos = await fetch(
          'https://api.github.com/users/Slingod/repos?sort=stargazers_count&per_page=6'
        );
        if (!resRepos.ok) {
          throw new Error(`Erreur dépôts GitHub (${resRepos.status})`);
        }
        const dataRepos = await resRepos.json();

        setProfile(dataProfile);
        setTopRepos(dataRepos);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    }
    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className="page page--home">
        <p className="loading-text">Chargement des données GitHub…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page page--home">
        <p className="error-text">
          Erreur lors de la récupération des données GitHub : {error}
        </p>
      </div>
    );
  }

  return (
    <div className="page page--home">
      {/* ─── Section Profil ─────────────── */}
      <GitHubOverview profile={profile} />

      {/* ─── Section Dépôts populaires ─────────── */}
      <div className="repos-section">
        <h2 className="repos-section__title">Dépôts populaires</h2>
        <div className="repos-section__grid">
          {topRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>

      {/* ─── Section Compétences ─────── */}
      <section className="skills-section">
        <h2 className="skills-section__title">Compétences</h2>

        {/* ── LANGAGES ────── */}
        <div className="skills-section__category">
          <h3 className="skills-section__subtitle">Langages</h3>
          <div className="skills-section__grid">
            <div className="skill-item">
              <img src={rubyIcon} alt="Ruby" className="skill-item__icon" />
              <span className="skill-item__label">Ruby</span>
            </div>
            <div className="skill-item">
              <img src={jsIcon} alt="JavaScript" className="skill-item__icon" />
              <span className="skill-item__label">JavaScript</span>
            </div>
            <div className="skill-item">
              <img src={html5Icon} alt="HTML5" className="skill-item__icon" />
              <span className="skill-item__label">HTML5</span>
            </div>
          </div>
        </div>

        {/* ── BIBLIOTHÈQUES & FRAMEWORKS FRONTEND ────────── */}
        <div className="skills-section__category">
          <h3 className="skills-section__subtitle">Bibliothèques & Frameworks Frontend</h3>
          <div className="skills-section__grid">
            <div className="skill-item">
              <img src={cssIcon} alt="CSS" className="skill-item__icon" />
              <span className="skill-item__label">CSS</span>
            </div>
            <div className="skill-item">
              <img src={scssIcon} alt="SCSS" className="skill-item__icon" />
              <span className="skill-item__label">SCSS</span>
            </div>
            <div className="skill-item">
              <img src={flexboxIcon} alt="CSS Flexbox" className="skill-item__icon" />
              <span className="skill-item__label">CSS Flexbox</span>
            </div>
            <div className="skill-item">
              <img src={reactjsIcon} alt="React" className="skill-item__icon" />
              <span className="skill-item__label">React</span>
            </div>
            <div className="skill-item">
              <img src={vitejsIcon} alt="Vite" className="skill-item__icon" />
              <span className="skill-item__label">Vite</span>
            </div>
          </div>
        </div>

        {/* ── OUTILS DE DESIGN ───── */}
        <div className="skills-section__category">
          <h3 className="skills-section__subtitle">Outils de Design</h3>
          <div className="skills-section__grid">
            <div className="skill-item">
              <img src={uxIcon} alt="UX Design" className="skill-item__icon" />
              <span className="skill-item__label">UX Design</span>
            </div>
            <div className="skill-item">
              <img src={figmaIcon} alt="Figma" className="skill-item__icon" />
              <span className="skill-item__label">Figma</span>
            </div>
          </div>
        </div>

        {/* ── BACKEND ──────*/}
        <div className="skills-section__category">
          <h3 className="skills-section__subtitle">Backend</h3>
          <div className="skills-section__grid">
            <div className="skill-item">
              <img
                src={rubyOnRailsIcon}
                alt="Ruby on Rails"
                className="skill-item__icon"
              />
              <span className="skill-item__label">Ruby on Rails</span>
            </div>
            <div className="skill-item">
              <img src={nodejsIcon} alt="Node.js" className="skill-item__icon" />
              <span className="skill-item__label">Node.js</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section Expériences ──── */}
      <section className="experience-section">
        <h2 className="experience-section__title">Expériences</h2>

        {/* Compétences Techniques */}
        <div className="experience-section__category">
          <h3 className="experience-section__subtitle">Compétences Techniques</h3>
          <ul className="experience-section__list">
            <li><strong>Langages de Programmation :</strong> JavaScript, HTML5, Ruby</li>
            <li><strong>Frameworks et Bibliothèques :</strong> React, Node.js, Ruby on Rails</li>
            <li><strong>Outils de Construction :</strong> Vite</li>
            <li><strong>Styling :</strong> CSS, SCSS, CSS Flexbox</li>
            <li><strong>Design :</strong> Figma, UX Design</li>
          </ul>
        </div>

        {/* Expérience Professionnelle */}
        <div className="experience-section__category">
          <h3 className="experience-section__subtitle">Expérience Professionnelle</h3>
          <p className="experience-section__text">
            <strong>Développeur Full Stack :</strong> Expérience dans le développement d'applications web complètes, de la conception à la mise en œuvre, en utilisant une variété de technologies frontend et backend.
          </p>
        </div>

        {/* Projets */}
        <div className="experience-section__category">
          <h3 className="experience-section__subtitle">Projets</h3>
          <p className="experience-section__text">
            <strong>Site de Nouvelle Ère Lissoise :</strong> Développement en équipe d'un site web pour Nouvelle Ère Lissoise, impliquant la conception, le développement frontend avec React et le backend avec Node.js ou Ruby on Rails, ainsi que la gestion de projet et la collaboration d'équipe.
          </p>
        </div>

        {/* Formation */}
        <div className="experience-section__category">
          <h3 className="experience-section__subtitle">Formation</h3>
          <p className="experience-section__text">
            <strong>The Hacking Project (THP) :</strong> Diplôme RNCP de niveau +5 (équivalent Bac +2) en Développement Web, couvrant à la fois le développement frontend et backend.<br/>
            <strong>Durée :</strong> 6 Janvier 2025 - 19 Septembre 2025<br/>
            <strong>Compétences acquises :</strong> Développement d'applications web complètes, gestion de bases de données, travail en équipe, gestion de projet, et bien plus.
          </p>
        </div>

        {/* Certifications */}
        <div className="experience-section__category">
          <h3 className="experience-section__subtitle">Certifications</h3>
          <p className="experience-section__text">
            <strong>Certification RNCP :</strong> Niveau +5 en Développement Web et Mobile, obtenue à l'issue de la formation à The Hacking Project.
          </p>
        </div>

        {/* Autres Compétences */}
        <div className="experience-section__category">
          <h3 className="experience-section__subtitle">Autres Compétences</h3>
          <ul className="experience-section__list">
            <li><strong>Travail d'équipe :</strong> Expérience de travail en équipe sur des projets complexes, avec une bonne communication et collaboration.</li>
            <li><strong>Résolution de problèmes :</strong> Capacité à diagnostiquer et résoudre des problèmes techniques de manière efficace.</li>
            <li><strong>Gestion de projet :</strong> Expérience dans la gestion de projets de développement web, de la planification à la livraison.</li>
          </ul>
        </div>
      </section>

      {showScrollTop && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Retour en haut"
        >
          ↑
        </button>
      )}
    </div>
  );
}
