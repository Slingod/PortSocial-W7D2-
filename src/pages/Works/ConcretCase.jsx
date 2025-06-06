import React from 'react';
import Card from '../../components/Card';

export default function ConcretCase() {

  const projects = [
    {
      id: 'site',
      title: 'Site Web',
      url: 'http://217.154.16.16:3001/',
    },
    {
      id: 'influenbot',
      title: 'InfluenBOT',
      url: 'https://github.com/Slingod/InfluenBOT',
    },
    {
      id: 'rpgbot',
      title: 'RPG-BOT',
      url: 'https://github.com/Slingod/RPG-BOT',
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