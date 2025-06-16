import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import './Auth.scss';

export default function Auth() {
  const { user, login, register } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      await register(email, username, password);
    } else {
      await login(username, password);
    }
  };

  if (user) {
    return <Navigate to="/social" />;
  }

  return (
    <div className="auth-page">
      <h1>{isRegistering ? 'Créer un compte' : 'Connexion'}</h1>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? 'S\'inscrire' : 'Se connecter'}</button>
      </form>

      <button
        className="toggle-auth-btn"
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering ? (
          <>
            <span>Déjà un compte ?</span>
            <span style={{ marginLeft: '0.4rem' }}>Connectez-vous</span>
          </>
        ) : (
          <>
            <span>Pas de compte ?</span>
            <span style={{ marginLeft: '0.4rem' }}>Créez-en un</span>
          </>
        )}
      </button>
    </div>
  );
}
