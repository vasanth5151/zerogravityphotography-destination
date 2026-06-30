import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

const Pinterest = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0" />
  </svg>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileDestinationsOpen, setIsMobileDestinationsOpen] = useState(false);
  const [isMobileGalleriesOpen, setIsMobileGalleriesOpen] = useState(false);
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

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsMobileDestinationsOpen(false);
    setIsMobileGalleriesOpen(false);
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
    ? (isScrolled
      ? 'text-black bg-white border-b border-black/5 shadow-sm py-4'
      : 'text-white bg-transparent pt-8 pb-6')
    : 'text-black bg-white border-b border-black/5 shadow-sm py-4';

  const logoColorClass = isMobileMenuOpen
    ? (isHomePage
      ? (isScrolled ? 'text-black' : 'text-black lg:text-white')
      : 'text-black')
    : (isHomePage
      ? (isScrolled ? 'text-black' : 'text-white')
      : 'text-black');

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
          <div className="hidden lg:flex items-center space-x-5">
            {navLinks.map((link) => {
              if (link.name === 'Destination') {
                return (
                  <div key={link.name} className="relative group py-2">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `relative py-2 text-[13px] font-heading tracking-[0.1em] uppercase transition-colors duration-300 font-medium ${isActive
                          ? 'text-brand-pink'
                          : isHomePage
                            ? (isScrolled ? 'text-black/90 hover:text-brand-pink' : 'text-white hover:text-white')
                            : 'text-black/90 hover:text-brand-pink'
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
                              to={`/destination/${slug}`}
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
              if (link.name === 'Galleries') {
                return (
                  <div key={link.name} className="relative group py-2">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `relative py-2 text-[13px] font-heading tracking-[0.1em] uppercase transition-colors duration-300 font-medium ${isActive
                          ? 'text-brand-pink'
                          : isHomePage
                            ? (isScrolled ? 'text-black/90 hover:text-brand-pink' : 'text-white hover:text-white')
                            : 'text-black/90 hover:text-brand-pink'
                        }`
                      }
                    >
                      {link.name} +
                    </NavLink>
                    {/* Dropdown Menu Container */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white/95 backdrop-blur-md border border-black/5 rounded-xl shadow-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="flex flex-col space-y-2 text-left">
                        <NavLink
                          to="/galleries/candid-moments"
                          className="text-xs font-heading tracking-wider uppercase text-neutral-900 hover:text-brand-pink hover:translate-x-1 transition-all duration-200 block py-1 font-semibold"
                        >
                          Candid Moments
                        </NavLink>
                        <NavLink
                          to="/galleries/couple-portraits"
                          className="text-xs font-heading tracking-wider uppercase text-neutral-900 hover:text-brand-pink hover:translate-x-1 transition-all duration-200 block py-1 font-semibold"
                        >
                          Couple Portraits
                        </NavLink>
                        <NavLink
                          to="/galleries/outdoor-images"
                          className="text-xs font-heading tracking-wider uppercase text-neutral-900 hover:text-brand-pink hover:translate-x-1 transition-all duration-200 block py-1 font-semibold"
                        >
                          Outdoor Images
                        </NavLink>
                        <NavLink
                          to="/galleries/videos"
                          className="text-xs font-heading tracking-wider uppercase text-neutral-900 hover:text-brand-pink hover:translate-x-1 transition-all duration-200 block py-1 font-semibold"
                        >
                          Videos
                        </NavLink>
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
                    `relative py-2 text-[13px] font-heading tracking-[0.1em] uppercase transition-colors duration-300 font-medium ${isActive
                      ? 'text-brand-pink'
                      : isHomePage
                        ? (isScrolled ? 'text-black/90 hover:text-brand-pink' : 'text-white hover:text-white')
                        : 'text-black/90 hover:text-brand-pink'
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
            {!isMobileMenuOpen && (
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 transition-colors duration-300 ${isHomePage
                  ? (isScrolled ? 'text-black/70 hover:text-brand-pink' : 'text-white hover:text-brand-pink')
                  : 'text-black/70 hover:text-brand-pink'
                  }`}
                aria-label="Search site"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Hamburger Button (Mobile / Global layout toggle) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors duration-300 z-50 ${isMobileMenuOpen
                ? 'text-brand-pink hover:text-brand-pink/80'
                : isHomePage
                  ? (isScrolled ? 'text-black/70 hover:text-brand-pink' : 'text-white hover:text-brand-pink')
                  : 'text-black/70 hover:text-brand-pink'
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
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white border-l border-black/5 z-[999] shadow-2xl flex flex-col p-8 pt-24 overflow-y-auto"
          >
            {/* Mobile Only Navigation Links */}
            <div className="flex flex-col space-y-6 lg:hidden">
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
                                  to={`/destination/${slug}`}
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
                  ) : link.name === 'Galleries' ? (
                    <div className="flex flex-col">
                      <button
                        onClick={() => setIsMobileGalleriesOpen(!isMobileGalleriesOpen)}
                        className="text-xs font-heading tracking-[0.2em] uppercase transition-colors duration-300 flex items-center justify-between py-2 text-black/70 hover:text-black pl-3 w-full text-left font-semibold"
                      >
                        <span>{link.name}</span>
                        <span className="text-brand-pink text-sm font-semibold pr-2">{isMobileGalleriesOpen ? '−' : '+'}</span>
                      </button>
                      <AnimatePresence>
                        {isMobileGalleriesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-6 flex flex-col space-y-2.5 overflow-hidden py-2"
                          >
                            {[
                              { label: 'Candid Moments', tab: 'candid-moments' },
                              { label: 'Couple Portraits', tab: 'couple-portraits' },
                              { label: 'Outdoor Images', tab: 'outdoor-images' },
                              { label: 'Videos', tab: 'videos' },
                            ].map((item) => (
                              <NavLink
                                key={item.tab}
                                to={`/galleries/${item.tab}`}
                                className="text-xs font-heading tracking-wider uppercase text-neutral-900 hover:text-brand-pink block py-1.5 border-b border-black/5 font-semibold"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {item.label}
                              </NavLink>
                            ))}
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
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name} +
                    </NavLink>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Desktop Only Info Drawer (Map, Address, Socials) */}
            <div className="hidden lg:flex flex-col text-black h-full space-y-6">
              {/* International Weddings */}
              <div>
                <p className="text-[10px] font-heading tracking-[0.2em] text-brand-pink uppercase mb-2 font-semibold">
                  International Weddings
                </p>
                <p className="text-[11px] text-black/50 font-light">
                  United States • Singapore • Malaysia • Paris •
                  Maldives • Dubai
                </p>
              </div>

              {/* Office Location & Address */}
              <div className="space-y-1.5 text-left">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-pink" />
                  <span className="text-[10px] font-heading tracking-[0.2em] text-black uppercase font-bold">
                    Chennai Head Office
                  </span>
                </div>
                <p className="text-[11px] text-black/60 font-light leading-relaxed">
                  Zero Gravity Photography, Nungambakkam, Chennai - 600034
                </p>
                <p className="text-[10px] text-black/50 font-light">
                  +91 90030 11999 • info@zerogravityphotography.com
                </p>
              </div>

              {/* Google Map Iframe */}
              <div className="w-full h-44 rounded-xl overflow-hidden border border-black/5 shadow-inner relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4622.078958875185!2d80.24200035445166!3d13.055417376145295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526644fb145589%3A0xecc6216b122e39a!2sZero%20Gravity%20Photography%20-%20Wedding%20Photography%20In%20Chennai!5e0!3m2!1sen!2sin!4v1782391740014!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Zero Gravity Head Office Location"
                />
              </div>

              {/* Social Media Icons */}
              <div className="pt-4 border-t border-black/5 text-center mt-auto">
                <p className="text-[9px] font-heading tracking-[0.25em] text-black/45 uppercase mb-3 font-semibold">
                  Follow Our Journey
                </p>
                <div className="flex justify-center items-center space-x-3 text-black/60">
                  <a
                    href="https://www.instagram.com/zerogravityphotography/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:text-brand-pink hover:border-brand-pink transition-all duration-300"
                    title="Instagram"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://in.pinterest.com/zerogravityphotography/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:text-brand-pink hover:border-brand-pink transition-all duration-300"
                    title="Pinterest"
                  >
                    <Pinterest className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.facebook.com/zerogravitystudios/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:text-brand-pink hover:border-brand-pink transition-all duration-300"
                    title="Facebook"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://x.com/zerogravityfoto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:text-brand-pink hover:border-brand-pink transition-all duration-300"
                    title="Twitter"
                  >
                    <X className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.youtube.com/c/ZeroGravityPhotography"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:text-brand-pink hover:border-brand-pink transition-all duration-300"
                    title="Youtube"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
