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
