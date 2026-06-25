import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileDestinationsOpen, setIsMobileDestinationsOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (isHomePage) {
      setIsScrolled(false);
    } else {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage, location.pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsMobileDestinationsOpen(false);
  }, [location.pathname]);

  const destinations = [
    'United States',
    'New Jersey',
    'Singapore',
    'Paris',
    'Muscat',
    'Jaipur',
    'Goa',
    'Bali',
    'Srilanka',
    'Andaman',
    'Kerala'
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Destination', path: '/destination' },
    { name: 'Galleries', path: '/galleries' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: "${searchQuery}"...`);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // Determine navbar text/icon color depending on page scroll state
  const isLightHeader = !isHomePage && isScrolled;
  const navColorClass = isHomePage
    ? 'text-white pt-12 pb-6'
    : isScrolled
      ? 'text-black bg-white/90 border-b border-black/5 backdrop-blur-md shadow-sm py-4'
      : 'text-black bg-transparent border-b border-black/5 py-6';

  const logoColorClass = isHomePage ? 'text-white' : 'text-black';

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 w-full z-1000 transition-all duration-300 ${navColorClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo - Zero Gravity Photography PNG Logo */}
          <NavLink to="/" className="flex items-center space-x-3 group">
            <img src="/logo.png" alt="Zero Gravity Photography Logo" className="w-10 h-10 object-contain rounded-full flex-shrink-0" />
            <span className={`font-heading text-sm md:text-sm font-normal tracking-[0.2em] ${logoColorClass} uppercase`}>
              Zero Gravity <br /> Photography
            </span>
          </NavLink>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              if (link.name === 'Destination') {
                return (
                  <div key={link.name} className="relative group py-2">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `relative py-2 text-[10px] font-heading tracking-[0.2em] uppercase transition-colors duration-300 font-semibold ${isActive
                          ? 'text-brand-pink'
                          : isHomePage
                            ? 'text-white/95 hover:text-white'
                            : 'text-black/90 hover:text-black'
                        }`
                      }
                    >
                      {link.name} +
                    </NavLink>
                    {/* Dropdown Menu Container */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white/95 backdrop-blur-md border border-black/5 rounded-xl shadow-xl p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-left">
                        {destinations.map((loc) => {
                          const slug = loc.toLowerCase().replace(/\s+/g, '-');
                          return (
                            <NavLink
                              key={loc}
                              to={`/destination?loc=${slug}`}
                              className="text-xs font-heading tracking-wider uppercase text-neutral-900 hover:text-brand-pink hover:translate-x-1 transition-all duration-200 block py-1 font-semibold"
                            >
                              {loc}
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative py-2 text-[10px] font-heading tracking-[0.2em] uppercase transition-colors duration-300 font-semibold ${isActive
                      ? 'text-brand-pink'
                      : isHomePage
                        ? 'text-white/95 hover:text-white'
                        : 'text-black/90 hover:text-black'
                    }`
                  }
                >
                  {link.name} +
                </NavLink>
              );
            })}
          </div>

          {/* Right Toolbar */}
          <div className="flex items-center space-x-6">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 transition-colors duration-300 ${isHomePage ? 'text-white/80 hover:text-brand-pink' : 'text-black/70 hover:text-brand-pink'
                }`}
              aria-label="Search site"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Hamburger Button (Mobile / Global layout toggle) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors duration-300 ${isHomePage ? 'text-white/80 hover:text-brand-pink' : 'text-black/70 hover:text-brand-pink'
                }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/98 z-[9999] flex flex-col items-center justify-center px-6"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-black/60 hover:text-brand-pink transition-colors p-3 bg-black/5 hover:bg-black/10 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full max-w-2xl text-center">
              <p className="font-heading text-[10px] tracking-[0.3em] uppercase text-brand-pink mb-4">
                Explore Lumina Galleries
              </p>
              <h2 className="font-heading text-2xl md:text-4xl text-black font-light mb-8">
                Search Weddings, Places, or Journals
              </h2>
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  placeholder="Enter keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-black/20 focus:border-brand-pink text-black text-lg md:text-2xl font-light py-4 px-2 outline-none transition-colors placeholder:text-black/20 text-center"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/60 hover:text-brand-pink transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer (Light themed slide-out menu) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white border-l border-black/5 z-[999] shadow-2xl flex flex-col p-8 pt-24"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                >
                  {link.name === 'Destination' ? (
                    <div className="flex flex-col">
                      <button
                        onClick={() => setIsMobileDestinationsOpen(!isMobileDestinationsOpen)}
                        className="text-xs font-heading tracking-[0.2em] uppercase transition-colors duration-300 flex items-center justify-between py-2 text-black/70 hover:text-black pl-3 w-full text-left font-semibold"
                      >
                        <span>{link.name}</span>
                        <span className="text-brand-pink text-sm font-semibold pr-2">{isMobileDestinationsOpen ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {isMobileDestinationsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-6 flex flex-col space-y-2.5 overflow-hidden py-2"
                          >
                            {destinations.map((loc) => {
                              const slug = loc.toLowerCase().replace(/\s+/g, '-');
                              return (
                                <NavLink
                                  key={loc}
                                  to={`/destination?loc=${slug}`}
                                  className="text-xs font-heading tracking-wider uppercase text-neutral-900 hover:text-brand-pink block py-1.5 border-b border-black/5 font-semibold"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {loc}
                                </NavLink>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `text-xs font-heading tracking-[0.2em] uppercase transition-colors duration-300 block py-2 font-semibold ${isActive ? 'text-brand-pink border-l-2 border-brand-pink pl-3' : 'text-black/70 hover:text-black pl-3'
                        }`
                      }
                    >
                      {link.name} +
                    </NavLink>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-auto border-t border-black/5 pt-8 text-center text-black">
              <p className="text-[10px] font-heading tracking-[0.2em] text-brand-pink uppercase mb-3 font-semibold">
                International Weddings
              </p>
              <p className="text-[11px] text-black/50 font-light mb-6">
                Lake Como • Santorini • Amalfi • Paris
              </p>
              <div className="flex justify-center space-x-4 text-xs font-heading text-black/40">
                <a href="#instagram" className="hover:text-brand-pink">IG</a>
                <span>•</span>
                <a href="#pinterest" className="hover:text-brand-pink">PIN</a>
                <span>•</span>
                <a href="#vimeo" className="hover:text-brand-pink">VIM</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
