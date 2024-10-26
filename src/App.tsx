import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PatternBuilder from './pages/PatternBuilder';
import SavedPatterns from './pages/SavedPatterns';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import Footer from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#fdf6f0]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pattern-builder" element={<PatternBuilder />} />
            <Route path="/pattern-builder/:id" element={<PatternBuilder />} />
            <Route path="/saved-patterns" element={<SavedPatterns />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}