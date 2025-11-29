/**
 * Root React component with routing and theme support
 */

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Language } from './api/client';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import LandingPage from './pages/LandingPage';
import LanguageSelector from './components/LanguageSelector';
import NewSoilWizard from './pages/NewSoilWizard';

function App() {
  const [language, setLanguage] = useState<Language | null>(null);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
  };

  const handleReset = () => {
    setLanguage(null);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ThemeToggle />
        <Routes>
          {/* Landing Page - Default Route */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Language Selection & Wizard */}
          <Route
            path="/app"
            element={
              !language ? (
                <LanguageSelector onSelect={handleLanguageSelect} />
              ) : (
                <NewSoilWizard language={language} onReset={handleReset} />
              )
            }
          />
          
          {/* Redirect any unknown routes to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
