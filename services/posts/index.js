/* eslint-env node */
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = 'change_me';
let posts = [];

function authorize(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    console.error('Authorization header manquant');
    return res.sendStatus(401);
  }
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    console.log('Utilisateur autorisé:', req.user);
    next();
  } catch (err) {
    console.error('JWT invalide:', err.message);
    return res.sendStatus(403);
  }
}

router.get('/', (req, res) => res.json(posts));

router.post('/', authorize, (req, res) => {
  const { title = 'Sans titre', content } = req.body;
  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Contenu invalide' });
  }

  const newPost = {
    id: posts.length + 1,
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

router.post('/:id/like', authorize, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = posts.find(p => p.id === id);
  if (!post) return res.sendStatus(404);

  if (post.likedBy.includes(req.user.sub)) {
    return res.status(400).json({ error: 'Déjà liké' });
  }

  post.likedBy.push(req.user.sub);
  post.likes += 1;
  post.dislikedBy = post.dislikedBy.filter(id => id !== req.user.sub);
  post.dislikes = post.dislikedBy.length;

  res.json(post);
});

router.post('/:id/dislike', authorize, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = posts.find(p => p.id === id);
  if (!post) return res.sendStatus(404);

  if (post.dislikedBy.includes(req.user.sub)) {
    return res.status(400).json({ error: 'Déjà disliké' });
  }

  post.dislikedBy.push(req.user.sub);
  post.dislikes += 1;
  post.likedBy = post.likedBy.filter(id => id !== req.user.sub);
  post.likes = post.likedBy.length;

  res.json(post);
});

export default router;
