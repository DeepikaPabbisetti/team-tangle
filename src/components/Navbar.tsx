
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Users, Trophy, PuzzlePiece, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: <PuzzlePiece size={16} /> },
    { path: '/puzzles', label: 'Puzzles', icon: <PuzzlePiece size={16} /> },
    { path: '/leaderboard', label: 'Leaderboard', icon: <Trophy size={16} /> },
    { path: '/community', label: 'Community', icon: <Users size={16} /> },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 ease-in-out',
        scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800' 
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white font-bold transition-transform group-hover:scale-110">
                MP
              </div>
              <span className="text-lg font-semibold tracking-tight">
                MathPuzzles
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'nav-link flex items-center space-x-1 transition-colors duration-200',
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                )}
              >
                <span className="flex items-center">
                  {link.icon}
                  <span className="ml-1">{link.label}</span>
                </span>
              </Link>
            ))}
          </nav>

          {/* User Authentication */}
          <div className="hidden md:flex items-center space-x-2">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md transition-colors">
              Login
            </button>
            <button className="bg-primary hover:bg-primary/90 text-white text-sm font-medium px-4 py-2 rounded-md transition-all shadow-sm hover:shadow flex items-center space-x-1">
              <span>Sign Up</span>
              <ChevronDown size={14} />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          'md:hidden absolute w-full bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out border-b border-gray-200 dark:border-gray-800 shadow-sm',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 transition-colors',
                isActive(link.path)
                  ? 'text-primary bg-primary/5'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
              )}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-800">
            <Link 
              to="/login" 
              className="block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
            >
              <LogIn size={16} />
              <span>Login / Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
