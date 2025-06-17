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

  // Fonction pour gérer les différents formats d’ID
  const getPostId = (post) => post._id || post.id || null;

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

  const deletePost = (id) => {
    if (!id) {
      setError('ID du post manquant.');
      return;
    }

    if (!window.confirm('Voulez-vous vraiment supprimer ce post ?')) return;

    fetch(`${API}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur lors de la suppression. Code ${res.status}`);
        setPosts(posts.filter((post) => getPostId(post) !== id));
      })
      .catch((err) => {
        console.error(err);
        setError('Erreur lors de la suppression du post.');
      });
  };

  const likePost = (id) => {
    if (!id) {
      setError('ID du post manquant.');
      return;
    }

    fetch(`${API}/posts/${id}/like`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du like.');
        return res.json();
      })
      .then((updatedPost) => {
        setPosts(posts.map((post) => getPostId(post) === id ? updatedPost : post));
      })
      .catch(() => setError('Erreur lors du like.'));
  };

  const dislikePost = (id) => {
    if (!id) {
      setError('ID du post manquant.');
      return;
    }

    fetch(`${API}/posts/${id}/dislike`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du dislike.');
        return res.json();
      })
      .then((updatedPost) => {
        setPosts(posts.map((post) => getPostId(post) === id ? updatedPost : post));
      })
      .catch(() => setError('Erreur lors du dislike.'));
  };

  return (
    <div className="social-page">
      <h1>Social</h1>
      {user && <h2 className="greeting">Bonjour {user.username}</h2>}
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
            {posts.map((post) => {
              const postId = getPostId(post);
              return (
                <li key={postId} className="post-card">
                  <div className="post-header">
                    <h3>{post.title}</h3>
                    <small>Auteur: {post.author}</small>
                    {user?.username === post.author && (
                      <button
                        className="delete-btn"
                        onClick={() => deletePost(postId)}
                        title="Supprimer ce post"
                      >
                        🗑
                      </button>
                    )}
                  </div>
                  <p>{post.content}</p>
                  <div className="post-actions">
                    <button onClick={() => likePost(postId)}>👍 {post.likes || 0}</button>
                    <button onClick={() => dislikePost(postId)}>👎 {post.dislikes || 0}</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>Vous devez être connecté pour voir et gérer les posts.</p>
      )}
    </div>
  );
}
