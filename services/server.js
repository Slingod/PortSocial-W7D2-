/* eslint-env node */
/* eslint-disable */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './auth/index.js'; // Import des routes d'authentification
import postRoutes from './posts/index.js'; // Import des routes des posts

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173'], // Autorise le frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Routes d'authentification
app.use('/auth', authRoutes); // Montre les routes d'authentification sur /auth

// Routes des posts
app.use('/posts', postRoutes); // Montre les routes des posts sur /posts

// Route principale
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur principal !');
});

// Middleware global de gestion des erreurs
app.use((err, req, res, next) => {
  console.error('💥 Erreur serveur :', err.stack);
  res.status(500).send('Erreur interne du serveur');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});