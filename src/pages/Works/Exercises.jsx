import React from 'react';
import Card from '../../components/Card';

export default function Exercises() {

  const projects = [
    {
      id: 'passwordgen',
      title: 'PasswordGen',
      url: 'https://github.com/Slingod/HardWarPass',
    },
    {
      id: 'projet-chaton',
      title: 'Projet-Chaton',
      url: 'https://github.com/Slingod/Projet-Chaton',
    },
    {
      id: 'filmfinder',
      title: 'FilmFinder',
      url: 'https://github.com/Slingod/FilmFinder',
    },
  ];

  return (
    <div className="works-subpage">
      {projects.map((proj) => (
        <a
          key={proj.id}
          href={proj.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <Card title={proj.title} />
        </a>
      ))}
    </div>
  );
}