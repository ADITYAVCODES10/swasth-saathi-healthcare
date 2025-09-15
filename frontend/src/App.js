import React, { useState, useEffect } from 'react';
import "./App.css";
import AppRouter from './routes/AppRouter';
import { Toaster } from './components/ui/toaster';

// Translation files
import en from './i18n/en.json';
import hi from './i18n/hi.json';
import ml from './i18n/ml.json';

const translations = { en, hi, ml };

function App() {
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [t, setT] = useState(translations.en);

  // Load saved preferences
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    setLanguage(savedLanguage);
    setDarkMode(savedDarkMode);
    setT(translations[savedLanguage] || translations.en);
  }, []);

  // Update translations when language changes
  useEffect(() => {
    setT(translations[language] || translations.en);
  }, [language]);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="App">
      <AppRouter 
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        t={t}
      />
      <Toaster />
    </div>
  );
}

export default App;
