import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Share2,
  Grid,
  Maximize2,
  Check,
  Instagram,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import { heroSlides } from '../../data/mockData';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const touchStartY = useRef(0);
  const autoplayTimer = useRef(null);

  // Lock scrolling on Home Page mount
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  // Autoplay Slider Cycle Logic
  useEffect(() => {
    if (isPlaying) {
      autoplayTimer.current = setInterval(() => {
        changeSlide('next');
      }, 5000);
    } else {
      clearInterval(autoplayTimer.current);
    }

    return () => clearInterval(autoplayTimer.current);
  }, [isPlaying, currentIndex]);

  const changeSlide = (direction) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    if (direction === 'next') {
      setCurrentIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    }

    // Set short transition lock (no animation, just cooldown block for scroll throttling)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  // Scroll event interceptor to change slides
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 20) {
        changeSlide(e.deltaY > 0 ? 'next' : 'prev');
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isTransitioning]);

  // Swipe gesture listeners
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchStartY.current - touchEndY;
    if (Math.abs(diffY) > 50) {
      changeSlide(diffY > 0 ? 'next' : 'prev');
    }
  };

  // Share clipboard copy
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Lumina Premium Photography',
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  // HTML5 Fullscreen display toggler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => alert(`Error entering fullscreen: ${err.message}`));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false));
    }
  };

  const currentSlide = heroSlides[currentIndex];
  const formatNumber = (num) => (num < 10 ? `0${num}` : num);

  return (
    <div
      className="relative w-full h-screen bg-[#070708] overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Carousel Slider - Loads immediately without transitions, blurs, shadows, or overlays */}
      <div className="absolute inset-0 z-0">
        <img
          key={currentIndex}
          src={currentSlide.image}
          alt={currentSlide.title}
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* Main Center Call to Action Typography - Single static text overlay */}
      <div className="absolute inset-0 z-20 flex items-center px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl space-y-4 md:space-y-6">
          <div className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">
            Premium wedding Photography
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extralight text-white leading-tight tracking-wide">
            Capturing Stories Through Timeless Visuals
          </h1>

        </div>
      </div>

      {/* Floating Bottom Navigation Strip (Styled precisely after Oni Photography) */}
      <div className="absolute inset-x-0 bottom-16 z-30 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 select-none">

        {/* Left Side: Share Icon & Project Info */}
        <div className="flex items-center space-x-6 text-white w-full md:w-auto justify-between md:justify-start">
          <div className="relative">
            <button
              onClick={handleShareClick}
              className="p-3 bg-white/5 hover:bg-brand-pink hover:text-bg-dark rounded-full transition-all duration-300"
              title="Share portfolio"
            >
              {shareCopied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {shareCopied && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-12 left-0 bg-brand-pink text-bg-dark text-[9px] font-heading font-semibold tracking-wider px-3 py-1.5 rounded uppercase whitespace-nowrap shadow-lg"
                >
                  Link copied!
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="w-[1px] h-8 bg-white/20 hidden md:block" />

          <div className="text-left font-heading">
            <div className="text-xs font-semibold text-white tracking-widest uppercase">
              {currentSlide.title}
            </div>
            <div className="text-[9px] text-white/50 tracking-[0.2em] uppercase mt-1">
              {currentSlide.location}
            </div>
          </div>
        </div>

        {/* Center: Slide Switch Control Nodes */}
        <div className="flex items-center space-x-6 bg-white/5 border border-white/10 rounded-full px-6 py-2">
          {/* Grid Layout Link */}
          <Link to="/galleries" className="text-white/55 hover:text-brand-pink transition-colors" title="View Grid Galleries">
            <Grid className="w-4 h-4" />
          </Link>

          <span className="w-[1px] h-4 bg-white/10" />

          {/* Prev slide */}
          <button
            onClick={() => changeSlide('prev')}
            className="text-white/55 hover:text-brand-pink transition-colors p-1"
            title="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Play/Pause slide autoplay */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white/85 hover:text-brand-pink transition-colors p-2 bg-white/5 hover:bg-white/15 rounded-full"
            title={isPlaying ? 'Pause Autoplay' : 'Start Autoplay'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          {/* Next slide */}
          <button
            onClick={() => changeSlide('next')}
            className="text-white/55 hover:text-brand-pink transition-colors p-1"
            title="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right Side: Horizontal Slide Progress Line and Fullscreen Control */}
        <div className="flex items-center space-x-8 text-white w-full md:w-auto justify-between md:justify-end">
          {/* Slider Line Indicator */}
          <div className="flex items-center space-x-4">
            <span className="text-xs font-heading font-medium tracking-widest text-brand-pink">
              {formatNumber(currentIndex + 1)}
            </span>
            <div className="w-20 md:w-32 h-[1px] bg-white/20 relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-brand-pink"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentIndex + 1) / heroSlides.length) * 100}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <span className="text-xs font-heading tracking-widest text-white/55">
              {formatNumber(heroSlides.length)}
            </span>
          </div>

          <div className="w-[1px] h-8 bg-white/20 hidden md:block" />

          {/* Fullscreen request button */}
          <button
            onClick={toggleFullscreen}
            className="p-3 bg-white/5 hover:bg-brand-pink hover:text-bg-dark rounded-full transition-all duration-300"
            title="Toggle fullscreen mode"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Floating Bottom Left Corner: Copyright */}
      <div className="absolute px-6 left-8 bottom-6 z-30 hidden lg:block text-[9px] font-heading tracking-[0.2em] text-white/40 uppercase">
        © {new Date().getFullYear()} — ZERO GRAVITY PHOTOGRAPHY
      </div>

      {/* Floating Bottom Right Corner: Horizontal Social Icons */}
      <div className="absolute px-6 right-8 bottom-6 z-30 hidden lg:flex items-center space-x-4 text-white/50">
        <a href="#instagram" className="hover:text-brand-pink transition-colors p-1"><Instagram className="w-3.5 h-3.5" /></a>
        <a href="#facebook" className="hover:text-brand-pink transition-colors p-1"><Facebook className="w-3.5 h-3.5" /></a>
        <a href="#twitter" className="hover:text-brand-pink transition-colors p-1"><Twitter className="w-3.5 h-3.5" /></a>
        <a href="#linkedin" className="hover:text-brand-pink transition-colors p-1"><Linkedin className="w-3.5 h-3.5" /></a>
      </div>

    </div>
  );
}
