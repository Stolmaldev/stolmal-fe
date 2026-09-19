import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './shared/layouts/MainLayout';
import Home from './features/home';
import Process from './features/process';
import Gallery from './features/gallery';
import Contact from './features/contact';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/process" element={<Process />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
