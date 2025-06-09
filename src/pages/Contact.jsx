import React from 'react';
import EnvelopeAnimation from '../components/EnvelopeAnimation';
import './Contact.scss';  // si vous avez des styles spécifiques

export default function Contact() {
  return (
    <div className="page page--contact">
      <h1 className="page__title">Contact</h1>

      {/* Animation enveloppe */}
      <EnvelopeAnimation />

      <p className="page__text">
        N’hésitez pas à me contacter à l’adresse suivante :<br/>
        <a href="mailto:slingo.drisca@gmail.com">
          slingo.drisca@gmail.com
        </a>
      </p>
    </div>
  );
}