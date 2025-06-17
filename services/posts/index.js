/* eslint-env node */
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = 'change_me';
let posts = [];

// Middleware d'authentification
function authorize(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    console.error('Authorization header manquant');
    return res.sendStatus(401);
  }
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    console.error('JWT invalide:', err.message);
    return res.sendStatus(403);
  }
}

// Récupérer tous les posts
router.get('/', (req, res) => res.json(posts));

// Créer un post
router.post('/', authorize, (req, res) => {
  const { title = 'Sans titre', content } = req.body;
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Contenu invalide' });
  }

  const newPost = {
    id: posts.length ? posts[0].id + 1 : 1, // id auto-incrémenté
    title: title.trim(),
    content: content.trim(),
    author: req.user.username,
    likes: 0,
    dislikes: 0,
    likedBy: [],
    dislikedBy: [],
  };

  posts.unshift(newPost);
  res.status(201).json(newPost);
});

// Liker un post
router.post('/:id/like', authorize, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = posts.find(p => p.id === id);
  if (!post) return res.sendStatus(404);

  // On utilise l'id utilisateur pour l'unicité
  const userId = req.user.sub;

  if (post.likedBy.includes(userId)) {
    return res.status(400).json({ error: 'Déjà liké' });
  }

  // Retirer le dislike si présent
  post.dislikedBy = post.dislikedBy.filter(uid => uid !== userId);
  post.dislikes = post.dislikedBy.length;

  post.likedBy.push(userId);
  post.likes = post.likedBy.length;

  res.json(post);
});

// Disliker un post
router.post('/:id/dislike', authorize, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = posts.find(p => p.id === id);
  if (!post) return res.sendStatus(404);

  const userId = req.user.sub;

  if (post.dislikedBy.includes(userId)) {
    return res.status(400).json({ error: 'Déjà disliké' });
  }

  // Retirer le like si présent
  post.likedBy = post.likedBy.filter(uid => uid !== userId);
  post.likes = post.likedBy.length;

  post.dislikedBy.push(userId);
  post.dislikes = post.dislikedBy.length;

  res.json(post);
});

// Supprimer un post (seulement par l'auteur ou admin)
router.delete('/:id', authorize, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex === -1) return res.sendStatus(404);

  const post = posts[postIndex];
  if (req.user.username !== post.author && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Non autorisé à supprimer ce post.' });
  }

  posts.splice(postIndex, 1);
  res.json({ message: 'Post supprimé.' });
});

export default router;
