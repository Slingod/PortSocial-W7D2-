# Portfolio de Julien Sicard

Bienvenue dans le dépôt de mon portfolio personnel ! Cet espace regroupe :

- La présentation générale du portfolio (site web React/SCSS).
- L’ensemble de mes projets « Exercices » (PasswordGen, Projet-Chaton, FilmFinder).
- Mes « Case Studies » (Tic Tak To, Puissance 4).
- Mes « Works » concrets (Portfolio hébergé, InfluenBOT, RPG-BOT).
- Une description détaillée de la structure, des technologies employées et des instructions pour lancer ou déployer le tout.

---

## Table des matières

1. [Introduction](#introduction)
2. [Structure générale du repository](#structure-générale-du-repository)
   1. [Arborescence principale](#arborescence-principale)
   2. [Fichiers et dossiers importants](#fichiers-et-dossiers-importants)
3. [Stack technologique](#stack-technologique)
   1. [Front-end principal (Portfolio)](#front-end-principal-portfolio)
   2. [Outils et librairies](#outils-et-librairies)
4. [Lancer le projet en local](#lancer-le-projet-en-local)
   1. [Prérequis](#prérequis)
   2. [Installation et démarrage](#installation-et-démarrage)
5. [Détails des pages React](#détails-des-pages-react)
   1. [Page d’accueil (Home)](#page-daccueil-home)
   2. [Page “About”](#page-about)
   3. [Page “Works” (section mère)](#page-works-section-mère)
      1. [Sub-page “Exercices”](#sub-page-exercices)
      2. [Sub-page “Case Study”](#sub-page-case-study)
      3. [Sub-page “Concret Case”](#sub-page-concret-case)
   4. [Page “Contact”](#page-contact)
6. [Description des projets “Exercices”](#description-des-projets-exercices)
   1. [PasswordGen](#1-passwordgen)
   2. [Projet-Chaton](#2-projet-chaton)
   3. [FilmFinder](#3-filmfinder)
7. [Description des “Case Studies”](#description-des-case-studies)
   1. [Tic Tak To](#1-tic-tak-to)
   2. [Puissance 4](#2-puissance-4)
8. [Description des “Works” concrets](#description-des-works-concrets)
   1. [Portfolio hébergé (http://217.154.16.16:3001/)](#1-portfolio-hébergé-http217154161631/)
   2. [InfluenBOT](#2-influenbot)
   3. [RPG-BOT](#3-rpg-bot)
9. [Structure SCSS et design system](#structure-scss-et-design-system)
   1. [Dossier `styles/`](#dossier-styles)
   2. [Fichiers partiels (\_variables, \_mixins)](#fichiers-partiels-variables-mixins)
   3. [Organisation SCSS par page/composant](#organisation-scss-par-pagecomposant)
10. [Composants réutilisables](#composants-réutilisables)
11. [Card.jsx (Carte de projet)](#cardjsx-carte-de-projet)
12. [Navigation principale](#navigation-principale)
13. [Détails de configuration Vite](#détails-de-configuration-vite)
14. [`vite.config.js`](#viteconfigjs)
15. [Alias, optimisation et build](#alias-optimisation-et-build)
16. [Déploiement et hébergement](#déploiement-et-hébergement)
17. [Options recommandées (Vercel, Netlify)](#options-recommandées-vercel-netlify)
18. [GitHub Pages (alternatif)](#github-pages-alternatif)
19. [Annexes](#annexes)
20. [Liens rapides vers les dépôts GitHub](#liens-rapides-vers-les-dépôts-github)
21. [Licences et crédits](#licences-et-crédits)

---

## Introduction

Ce repository contient mon portfolio personnel mis en place avec React.js (via Vite) et SCSS, structuré autour de plusieurs sections :

- **Home** : page d’accueil minimaliste (titre « Home »).
- **About** : présentation personnelle, liens vers GitHub et LinkedIn.
- **Works** : section principale permettant d’accéder à trois sous-catégories :
  1. **Exercices** : trois petits projets typiquement orientés apprentissage (générateur de mot de passe, chaton aléatoire, recherche de films).
  2. **Case Study** : deux projets plus aboutis, faisant office d’études de cas.
  3. **Concret Case** : trois projets « en conditions réelles » (hébergement de portfolio, bots Discord basés sur Node.js).
- **Contact** : informations et formulaire de contact (au besoin).

Chaque sous-page affiche des **cartes** (`Card.jsx`) cliquables, ouvrant le lien vers le projet hébergé ou le dépôt GitHub correspondant. Le design s’appuie sur un **système SCSS** avec :

- Variables de couleurs, typographie et espacements.
- Mixins pour faciliter la mise en page (Flex, etc).
- Fichiers SCSS modulaires par page ou composant.

Le routing est géré par **React Router v6**, permettant un rendu imbriqué (`<Outlet />`) pour la section “Works”. La structure du projet est optimisée grâce à **Vite**, qui gère les imports d’assets (images WebP, SVG, etc.) et permet un rechargement rapide lors du développement.

---

## Structure générale du repository

### Arborescence principale

```text
mon-portfolio/
├─ public/
│   ├─ index.html
│   └─ assets/
│       ├─ Githublogo.webp
│       └─ linkedinlogo.webp
├─ src/
│   ├─ assets/                             ← images/ressources (si besoin d’autres)
│   ├─ components/                         ← domaines de réutilisation React
│   │   ├─ Card.jsx
│   │   └─ Card.scss
│   ├─ pages/                              ← toutes les pages du portfolio
│   │   ├─ Home.jsx
│   │   ├─ About.jsx
│   │   ├─ About.scss
│   │   ├─ Contact.jsx
│   │   ├─ Works/                          ← section “Works” avec routing imbriqué
│   │   │   ├─ Works.jsx
│   │   │   ├─ Works.scss
│   │   │   ├─ Exercises.jsx
│   │   │   ├─ CaseStudy.jsx
│   │   │   └─ ConcretCase.jsx
│   ├─ styles/                             ← SCSS global & partiels
│   │   ├─ _variables.scss
│   │   ├─ _mixins.scss
│   │   └─ main.scss
│   ├─ App.jsx                             ← configuration des Routes & Nav principale
│   ├─ main.jsx                            ← point d’entrée avec BrowserRouter & import SCSS global
│   └─ vite-env.d.ts                       ← TypeScript env (si TS, sinon ignorez)
├─ .gitignore
├─ package.json
├─ README.md                              ← (ce fichier)
└─ vite.config.js
```

## Annexes

**Liens rapides vers les dépôts GitHub**

- Portfolio (ce dépôt) :
  https://github.com/Slingod/mon-portfolio

- PasswordGen :
  https://github.com/Slingod/HardWarPass

- Projet-Chaton :
  https://github.com/Slingod/Projet-Chaton

- FilmFinder :
  https://github.com/Slingod/FilmFinder

- Tic Tak To :
  https://github.com/Slingod/Tic-Tak-To

- Puissance 4 :
  https://github.com/Slingod/Puissance-IA4

- InfluenBOT :
  https://github.com/Slingod/InfluenBOT

- RPG-BOT :
  https://github.com/Slingod/RPG-BOT

```bash
git clone https://github.com/Slingod/mon-portfolio.git
cd mon-portfolio
npm install
npm run dev
```

**Merci d’avoir consulté mon portfolio et mes projets !**
N’hésitez pas à ouvrir une issue sur GitHub ou à me contacter via LinkedIn (https://www.linkedin.com/in/Slingod) pour toute question, suggestion ou opportunité de collaboration.

Julien Sicard – Développeur Front-end et Back-end


# Portfolio Social App

Ce projet est une application web de type réseau social, développée avec **React** (frontend) et **Node.js/Express** (backend), permettant la création de posts, l’authentification, les likes/dislikes, et la gestion des utilisateurs.

---

## 🚀 Fonctionnalités principales

- Création de compte utilisateur (inscription/connexion)
- Création, suppression, affichage de posts
- Like/Dislike sur chaque post (1 seul like ou dislike par utilisateur et par post)
- Suppression de ses propres posts
- Suppression de son compte (à venir)
- Gestion des droits (seul l’auteur ou un admin peut supprimer un post)
- Mode jour/nuit, effets visuels, PWA (à venir)

---

## 🗂️ Structure du projet

```
Portfolio/
├── services/
│   ├── auth/         # Service d'authentification (Express)
│   ├── posts/        # Service de gestion des posts (Express)
│   ├── server.js     # Point d'entrée backend (monte les routes)
├── src/
│   ├── pages/        # Pages React (Social, Auth, etc.)
│   ├── contexts/     # Contexts React (AuthProvider, etc.)
│   ├── styles/       # Fichiers SCSS/variables
│   └── main.jsx      # Entrée frontend
├── App.jsx           # Routing principal React
├── package.json      # Dépendances frontend
└── .env              # Variables d'environnement (à créer)
```

---

## ⚙️ Prérequis

- [Node.js](https://nodejs.org/) (v18+ recommandé)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

---

## 🛠️ Installation

1. **Clone le dépôt**

   ```bash
   git clone git@github.com:Slingod/PortSocial-W7D2-.git
   cd portfolio-social-app/Portfolio
   ```

   ou

   ```bash
   git clone https://github.com/Slingod/PortSocial-W7D2-.git
   cd portfolio-social-app/Portfolio
   ```

2. **Installe les dépendances du frontend**

   ```bash
   npm install
   ```

3. **Installe les dépendances du backend (pour chaque service)**

   ```bash
   cd services/auth
   npm install
   cd ../posts
   npm install
   cd ../..   # Reviens à la racine Portfolio
   ```

4. **Crée un fichier `.env` à la racine de Portfolio**

   ```env
   JWT_SECRET=change_me
   PORT=4002
   ```

---

## ▶️ Lancement du projet

### 1. **Lancer le backend**

Depuis le dossier `Portfolio` :

```bash
node services/server.js
```

Le backend sera disponible sur [http://localhost:4002](http://localhost:4002).

### 2. **Lancer le frontend**

Dans un autre terminal, toujours dans `Portfolio` :

```bash
npm run dev
```

Le frontend sera disponible sur [http://localhost:5173](http://localhost:5173).

---

## 👤 Authentification

- **Inscription** : via `/auth/register` (frontend ou API)
- **Connexion** : via `/auth/login` (frontend ou API)
- Un token JWT est utilisé pour sécuriser les routes protégées (création/suppression de posts, like/dislike, etc.)

---

## 📦 Commandes utiles

- `npm run dev` : démarre le frontend en mode développement (Vite)
- `node services/server.js` : démarre le backend (Express)
- `npm install` : installe les dépendances du frontend
- `npm install` (dans chaque dossier de service) : installe les dépendances backend

---

## 📝 Variables d’environnement

Crée un fichier `.env` à la racine de `Portfolio` :

```env
JWT_SECRET=change_me
PORT=4002
```

---

## 🧹 Nettoyage & bonnes pratiques

- Les fichiers sensibles et volumineux (`node_modules`, `.env`, etc.) sont ignorés grâce au `.gitignore`.
- Les tokens JWT sont à garder secrets (ne pas versionner le `.env`).
- Pour la production, change la valeur de `JWT_SECRET` !

---

## 📱 Fonctionnalités à venir

- PWA (Progressive Web App)
- Page de profil utilisateur
- Suppression de compte utilisateur
- Améliorations visuelles et accessibilité

---

## 🙋‍♂️ Auteur

Projet réalisé par [Slingod](https://github.com/Slingod>).

---

## 📄 Licence

Ce projet est sous licence MIT.

---

> Pour toute question ou suggestion, ouvre une issue ou contacte-moi sur GitHub !

W7/D3/Portfolio$ node services/server.js "Backend"
DEV/W7/D3/Portfolio$ npm run dev "Front"

Aujourd'hui je doit : Mettre le PWA
La page Profile
Supprimé le compte si j'en suis l'autheur
supprimé mon Post si j'en suis l'autheur
