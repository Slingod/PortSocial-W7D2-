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

export default function App() {
  // ——— Gestion du thème (Jour/Nuit) ———

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
    <div className="app-container">

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
        </Routes>
      </main>
    </div>
  );
}