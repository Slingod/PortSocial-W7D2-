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
        {profile.bio && (
          <p className="overview-card__bio">{profile.bio}</p>
        )}

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

// Composant pour une carte de dépôt
function RepoCard({ repo }) {
  return (
    <div className="repo-card">
      <div className="repo-card__header">
        <h3 className="repo-card__name">{repo.name}</h3>
        <span className="repo-card__stars">⭐ {repo.stargazers_count}</span>
      </div>
      {repo.description && (
        <p className="repo-card__desc">{repo.description}</p>
      )}
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

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [topRepos, setTopRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      <GitHubOverview profile={profile} />

      <div className="repos-section">
        <h2 className="repos-section__title">Dépôts populaires</h2>
        <div className="repos-section__grid">
          {topRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
}