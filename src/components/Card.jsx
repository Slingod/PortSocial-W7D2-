import React from 'react';
import './Card.scss';

export default function Card({ title, image }) {
  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card__image" />}
      <h3 className="card__title">{title}</h3>
    </div>
  );
}