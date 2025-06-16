import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = 'change_me'; // Clé secrète utilisée pour signer les tokens
const users = [
  { id: 1, username: 'alice', password: 'pwd', isAdmin: false },
  { id: 2, username: 'bob', password: 'pwd', isAdmin: true },
];

// Route pour se connecter
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign(
    { sub: user.id, username: user.username, isAdmin: user.isAdmin },
    JWT_SECRET,
    { expiresIn: '24h' } // Augmente la durée de validité à 24 heures
  );
  res.json({ token });
});

// Route pour s'inscrire
router.post('/register', (req, res) => {
  const { email, username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  const newUser = { id: users.length + 1, email, username, password, isAdmin: false };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
});

export default router;