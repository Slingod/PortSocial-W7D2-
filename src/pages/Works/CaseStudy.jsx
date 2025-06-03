import React from 'react';
import Card from '../../components/Card';

export default function CaseStudy() {
  // Liste des projets “Case Study” avec titre et URL associée
  const projects = [
    {
      id: 'tic-tak-to',
      title: 'Tic Tak To',
      url: 'https://github.com/Slingod/Tic-Tak-To',
    },
    {
      id: 'puissance-4',
      title: 'Puissance 4',
      url: 'https://github.com/Slingod/Puissance-IA4',
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