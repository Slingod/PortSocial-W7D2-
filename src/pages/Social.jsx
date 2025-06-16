import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import './Social.scss';

const API = 'http://localhost:4002';

export default function Social() {
  const { user, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setPosts)
      .catch(() => setError('Impossible de charger les posts.'));
  }, [token]);

  const createPost = () => {
    if (!newContent.trim()) {
      setError('Le contenu du post ne peut pas être vide.');
      return;
    }

    fetch(`${API}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newTitle || 'Sans titre',
        content: newContent,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) throw new Error('Non autorisé. Veuillez vous reconnecter.');
          if (res.status === 403) throw new Error('Token invalide ou expiré.');
          if (res.status === 400) throw new Error('Requête invalide.');
          throw new Error('Erreur inconnue.');
        }
        return res.json();
      })
      .then((post) => {
        setPosts([post, ...posts]);
        setNewContent('');
        setNewTitle('');
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Erreur lors de la création du post.');
      });
  };

  const likePost = (id) => {
    fetch(`${API}/posts/${id}/like`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du like.');
        return res.json();
      })
      .then((updatedPost) => {
        setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
      })
      .catch(() => setError('Erreur lors du like.'));
  };

  const dislikePost = (id) => {
    fetch(`${API}/posts/${id}/dislike`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du dislike.');
        return res.json();
      })
      .then((updatedPost) => {
        setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
      })
      .catch(() => setError('Erreur lors du dislike.'));
  };

  return (
    <div className="social-page">
      <h1>Social</h1>
      {error && <p className="error">{error}</p>}
      {user ? (
        <>
          <input
            type="text"
            placeholder="Titre du post"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            placeholder="Écrivez votre post ici..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button onClick={createPost}>Publier</button>
          <ul>
            {posts.map((post) => (
              <li key={post.id} className="post-card">
                <div className="post-header">
                  <h3>{post.title}</h3>
                  <small>Auteur: {post.author}</small>
                </div>
                <p>{post.content}</p>
                <div className="post-actions">
                  <button onClick={() => likePost(post.id)}>👍 {post.likes}</button>
                  <button onClick={() => dislikePost(post.id)}>👎 {post.dislikes}</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Vous devez être connecté pour voir et gérer les posts.</p>
      )}
    </div>
  );
}
