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
  Youtube,
  X
} from 'lucide-react';
import { heroSlides } from '../../data/mockData';

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
    <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0"/>
  </svg>
);

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

          {/* <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extralight text-white/85 leading-tight tracking-wide">
            Capturing Stories Through Timeless Visuals
          </h1> */}

        </div>
      </div>

      {/* Floating Bottom Navigation Strip (Styled precisely after Oni Photography) */}
      <div className="absolute inset-x-0 bottom-16 z-30 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 select-none">

        {/* Left Side: Share Icon & Project Info wrapped in elegant transparent glass pill */}
        <div className="flex items-center space-x-4 bg-white/10 border border-white/20 shadow-lg rounded-full p-2 pr-6 select-none w-full md:w-auto">
          <div className="relative">
            <button
              onClick={handleShareClick}
              className="p-2.5 hover:bg-brand-pink hover:text-white text-white/90 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center"
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

          <div className="w-[1px] h-6 bg-white/20" />

          <div className="text-left font-heading">
            <div className="text-sm font-bold text-white tracking-widest uppercase">
              {currentSlide.title}
            </div>
            <div className="text-[9px] text-white/70 tracking-[0.2em] uppercase mt-1 font-semibold">
              {currentSlide.location}
            </div>
          </div>
        </div>

        {/* Center: Slide Switch Control Nodes wrapped in elegant transparent glass pill */}
        <div className="flex items-center space-x-6 bg-white/10 border border-white/20 shadow-lg rounded-full px-6 py-2">
          {/* Grid Layout Link */}
          <Link to="/galleries" className="text-white/80 hover:text-brand-pink transition-colors cursor-pointer" title="View Grid Galleries">
            <Grid className="w-4 h-4" />
          </Link>

          <span className="w-[1px] h-4 bg-white/20" />

          {/* Prev slide */}
          <button
            onClick={() => changeSlide('prev')}
            className="text-white/80 hover:text-brand-pink transition-colors p-1 cursor-pointer"
            title="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Play/Pause slide autoplay */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white hover:text-brand-pink transition-colors p-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer"
            title={isPlaying ? 'Pause Autoplay' : 'Start Autoplay'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          {/* Next slide */}
          <button
            onClick={() => changeSlide('next')}
            className="text-white/80 hover:text-brand-pink transition-colors p-1 cursor-pointer"
            title="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right Side: Horizontal Slide Progress Line and Fullscreen Control wrapped in elegant transparent glass pill */}
        <div className="flex items-center space-x-6 bg-white/10 border border-white/20 shadow-lg rounded-full p-2 pl-6 select-none w-full md:w-auto justify-between md:justify-end">
          {/* Slider Line Indicator */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-heading font-bold tracking-widest text-brand-pink">
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
            <span className="text-sm font-heading tracking-widest text-white/60 font-semibold">
              {formatNumber(heroSlides.length)}
            </span>
          </div>

          <div className="w-[1px] h-6 bg-white/20" />

          {/* Fullscreen request button */}
          <button
            onClick={toggleFullscreen}
            className="p-2.5 hover:bg-brand-pink hover:text-white text-white/90 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center"
            title="Toggle fullscreen mode"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Floating Bottom Left Corner: Copyright wrapped in transparent glass pill */}
      <div className="absolute left-8 bottom-6 z-30 hidden lg:block select-none">
        <div className="bg-white/10 border border-white/20 shadow-lg rounded-full py-1.5 px-4 text-[9px] font-heading tracking-[0.2em] text-white/80 uppercase font-bold">
          © {new Date().getFullYear()} — ZERO GRAVITY PHOTOGRAPHY
        </div>
      </div>

      {/* Floating Bottom Right Corner: Horizontal Social Icons wrapped in transparent glass pill */}
      <div className="absolute right-8 bottom-6 z-30 hidden lg:flex items-center space-x-2 bg-white/10 border border-white/20 shadow-lg rounded-full py-1.5 px-4 text-white/80">
        <a href="https://www.instagram.com/zerogravityphotography/" className="hover:text-brand-pink transition-colors p-1" title="Instagram"><Instagram className="w-3.5 h-3.5" /></a>
        <a href="https://www.facebook.com/zerogravitystudios/" className="hover:text-brand-pink transition-colors p-1" title="Facebook"><Facebook className="w-3.5 h-3.5" /></a>
        <a href="https://x.com/zerogravityfoto" className="hover:text-brand-pink transition-colors p-1" title="Twitter"><X className="w-3.5 h-3.5" /></a>
        <a href="https://www.youtube.com/c/ZeroGravityPhotography" className="hover:text-brand-pink transition-colors p-1" title="Youtube"><Youtube className="w-3.5 h-3.5" /></a>
        <a href="https://in.pinterest.com/zerogravityphotography/" className="hover:text-brand-pink transition-colors p-1" title="Pinterest"><Pinterest className="w-3.5 h-3.5" /></a>
      </div>

    </div>
  );
}
