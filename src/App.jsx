import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Works from './pages/Works/Works';
import Exercises from './pages/Works/Exercises';
import CaseStudy from './pages/Works/CaseStudy';
import ConcretCase from './pages/Works/ConcretCase';
import Social from './pages/Social';
import Auth from './pages/Auth'; // Page dédiée pour Connexion et Inscription

import AuthProvider from './contexts/AuthProvider';

export default function App() {
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <AuthProvider>
      <div className={`app app--${theme}`}>
        <Header theme={theme} toggleTheme={toggleTheme} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/works" element={<Works />}>
              <Route path="exercises" element={<Exercises />} />
              <Route path="case-study" element={<CaseStudy />} />
              <Route path="concret-case" element={<ConcretCase />} />
            </Route>
            <Route path="/contact" element={<Contact />} />
            <Route path="/social" element={<Social />} />
            <Route path="/auth" element={<Auth />} /> {/* Page Connexion/Inscription */}
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}
