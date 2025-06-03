import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Works from './pages/Works/Works';
import Exercises from './pages/Works/Exercises';
import CaseStudy from './pages/Works/CaseStudy';
import ConcretCase from './pages/Works/ConcretCase';

export default function App() {
  return (
    <div className="app-container">
      <nav className="nav-main">
        <Link to="/" className="nav-main__link">Accueil</Link>
        <Link to="/about" className="nav-main__link">À Propos</Link>
        <Link to="/works" className="nav-main__link">Travaux</Link>
        <Link to="/contact" className="nav-main__link">Contact</Link>
      </nav>

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