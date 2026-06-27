import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isContentExiting, setIsContentExiting] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const statuses = [
    'Calibrating lens...',
    'Focusing elements...',
    'Adjusting aperture...',
    'Capturing light...',
    'Developing visuals...',
    'Preparing canvas...'
  ];

  // Increment progress organically
  useEffect(() => {
    if (progress >= 100) {
      // Step 1: Fade out center content first
      const contentExitTimer = setTimeout(() => {
        setIsContentExiting(true);
      }, 200);

      // Step 2: Slide shutter panels open after content has faded out
      const panelsExitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 600); // 200ms delay + 400ms fadeout transition

      // Step 3: Call onComplete to mount the main site after panels slide out
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 1450); // 600ms start + 850ms duration = 1450ms

      return () => {
        clearTimeout(contentExitTimer);
        clearTimeout(panelsExitTimer);
        clearTimeout(completeTimer);
      };
    }

    // Set variable interval timing to make it feel natural
    const delay = progress > 80 ? Math.random() * 80 + 40 : Math.random() * 40 + 15;
    const timer = setTimeout(() => {
      setProgress((prev) => {
        const increment = Math.max(1, Math.floor(Math.random() * 8));
        return Math.min(100, prev + increment);
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  // Cycle status text based on progress thresholds
  useEffect(() => {
    const totalStatuses = statuses.length;
    const nextIndex = Math.min(
      totalStatuses - 1,
      Math.floor((progress / 100) * totalStatuses)
    );
    if (nextIndex !== statusIndex) {
      setStatusIndex(nextIndex);
    }
  }, [progress, statusIndex]);

  // Lock body scroll while loader is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Text Animation Variants
  const brandName = "ZERO GRAVITY";
  const subName = "PHOTOGRAPHY";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] select-none pointer-events-none">
      {/* Background Split Panels */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            key="top-shutter"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.85, ease: [0.85, 0, 0.15, 1] }}
            className="fixed top-0 left-0 w-full h-1/2 bg-[#080708] border-b border-white/5 pointer-events-auto z-[99999]"
          />
        )}
        {!isExiting && (
          <motion.div
            key="bottom-shutter"
            initial={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.85, ease: [0.85, 0, 0.15, 1] }}
            className="fixed bottom-0 left-0 w-full h-1/2 bg-[#080708] border-t border-white/5 pointer-events-auto z-[99999]"
          />
        )}
      </AnimatePresence>

      {/* Center Container Overlay (Fades out just before panels slide open) */}
      <AnimatePresence>
        {!isContentExiting && (
          <motion.div
            key="loader-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-[100000]"
          >
            {/* Ambient Occlusion Glow Effects */}
            <div className="absolute w-[300px] h-[300px] bg-[#E5A9B4]/5 rounded-full filter blur-[80px] pointer-events-none animate-pulse-slow" />
            <div className="absolute w-[200px] h-[200px] bg-[#C8A96B]/5 rounded-full filter blur-[60px] pointer-events-none animate-pulse-reverse" />

            <div className="relative flex flex-col items-center">
              {/* Circular Camera Lens Aperture Ring */}
              <div className="relative w-28 h-28 md:w-32 md:h-32 mb-6 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <defs>
                    <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E5A9B4" />
                      <stop offset="100%" stopColor="#C8A96B" />
                    </linearGradient>
                  </defs>
                  
                  {/* Outer spinning dashed ring */}
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    className="stroke-neutral-800 fill-none"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    className="stroke-brand-pink/30 fill-none loader-spin"
                    strokeWidth="1.5"
                    strokeDasharray="15 80"
                  />

                  {/* Inner Solid Progress Circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r="50"
                    fill="none"
                    stroke="url(#loaderGradient)"
                    strokeWidth="2.5"
                    strokeDasharray={2 * Math.PI * 50}
                    strokeDashoffset={2 * Math.PI * 50 * (1 - progress / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-100 ease-out"
                  />
                </svg>

                {/* Internal Brand Logo (Watermarked) */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/10 p-2">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-full h-full object-contain filter brightness-110 contrast-125 loader-pulse"
                  />
                </div>
              </div>

              {/* Staggered Brand Text Reveal */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center text-center"
              >
                {/* ZERO GRAVITY */}
                <h1 className="font-heading text-lg md:text-xl font-light tracking-[0.3em] text-white flex space-x-1 justify-center">
                  {brandName.split(" ").map((word, wIdx) => (
                    <span key={wIdx} className="flex">
                      {word.split("").map((letter, lIdx) => (
                        <motion.span key={lIdx} variants={letterVariants}>
                          {letter}
                        </motion.span>
                      ))}
                      {wIdx < brandName.split(" ").length - 1 && <span className="w-2" />}
                    </span>
                  ))}
                </h1>

                {/* PHOTOGRAPHY */}
                <p className="font-heading text-[10px] md:text-xs font-semibold tracking-[0.4em] text-[#C8A96B] mt-2 flex justify-center">
                  {subName.split("").map((letter, idx) => (
                    <motion.span
                      key={idx}
                      variants={letterVariants}
                      transition={{ delay: 0.3 + idx * 0.03 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </p>
              </motion.div>

              {/* Progress Value Counter */}
              <span className="font-heading text-2xl md:text-3xl font-extralight tracking-wider text-white/95 mt-6 tabular-nums">
                {progress}%
              </span>

              {/* Thin Sleek Linear Progress Bar */}
              <div className="w-40 md:w-48 h-[2px] bg-neutral-800 rounded-full mt-4 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-[#E5A9B4] to-[#C8A96B] rounded-full transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Animated Cycling Status Message */}
              <p className="text-[10px] md:text-[11px] font-body font-light tracking-widest text-neutral-400 mt-3 italic animate-pulse">
                {statuses[statusIndex]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
