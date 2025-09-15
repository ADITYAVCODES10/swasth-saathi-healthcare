import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MigrantWorker from '../pages/MigrantWorker';
import Doctor from '../pages/Doctor';
import Admin from '../pages/Admin';
import Login from '../pages/Login';
import Register from '../pages/Register';
import About from '../pages/About';
import Contact from '../pages/Contact';

const AppRouter = ({ language, setLanguage, darkMode, setDarkMode, t }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} t={t} />} />
        <Route path="/migrant" element={<MigrantWorker language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} t={t} />} />
        <Route path="/doctor" element={<Doctor language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} t={t} />} />
        <Route path="/admin" element={<Admin language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} t={t} />} />
        <Route path="/login" element={<Login language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} t={t} />} />
        <Route path="/register" element={<Register language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} t={t} />} />
        <Route path="/about" element={<About language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} t={t} />} />
        <Route path="/contact" element={<Contact language={language} setLanguage={setLanguage} darkMode={darkMode} setDarkMode={setDarkMode} t={t} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;