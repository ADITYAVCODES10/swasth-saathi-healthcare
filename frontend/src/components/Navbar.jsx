import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Sun, Moon, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Navbar = ({ language, setLanguage, darkMode, setDarkMode, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' }
  ];

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/register', label: t.nav.register },
    { to: '/login', label: t.nav.login },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.contact }
  ];

  const roleLinks = [
    { to: '/migrant', label: t.nav.migrant, color: 'bg-blue-600 hover:bg-blue-700' },
    { to: '/doctor', label: t.nav.doctor, color: 'bg-green-600 hover:bg-green-700' },
    { to: '/admin', label: t.nav.admin, color: 'bg-purple-600 hover:bg-purple-700' }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  const changeLanguage = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem('language', langCode);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-white dark:bg-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {t.brand.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-medium transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Role Quick Access (Desktop) */}
          <div className="hidden lg:flex items-center space-x-2">
            {roleLinks.map((role) => (
              <Link key={role.to} to={role.to}>
                <Button 
                  size="sm" 
                  className={`${role.color} text-white hover:scale-105 transition-transform`}
                >
                  {role.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {languages.find(l => l.code === language)?.nativeName}
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={language === lang.code ? 'bg-blue-50 dark:bg-blue-900' : ''}
                  >
                    {lang.nativeName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark Mode Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
            <div className="py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-2 font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t dark:border-gray-800 pt-4 space-y-2">
                {roleLinks.map((role) => (
                  <Link
                    key={role.to}
                    to={role.to}
                    className="block px-4"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button size="sm" className={`${role.color} text-white w-full`}>
                      {role.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;