import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export default function GalleryLightbox({ isOpen, images = [], currentIndex = 0, onClose, setCurrentIndex }) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images]);

  const handlePrev = () => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 backdrop-blur-md select-none"
      >
        {/* Top Controls Overlay */}
        <div className="absolute top-0 inset-x-0 h-20 flex items-center justify-between px-6 md:px-12 bg-gradient-to-b from-black/50 to-transparent z-50">
          <div className="text-sm font-montserrat tracking-widest text-white/60">
            <span className="text-brand-pink font-semibold">{currentIndex + 1}</span> / {images.length}
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="text-white/80 hover:text-brand-pink transition-colors p-2"
              title="Zoom Toggle"
            >
              {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-brand-pink transition-colors p-2 bg-white/5 rounded-full"
              title="Close (ESC)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-8 z-50 text-white/70 hover:text-brand-pink transition-colors p-3 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Main Image Container */}
        <div className="w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden">
          <motion.img
            key={currentIndex}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ 
              scale: isZoomed ? 1.5 : 1, 
              opacity: 1,
              transition: { type: 'spring', stiffness: 200, damping: 25 }
            }}
            exit={{ scale: 0.95, opacity: 0 }}
            src={images[currentIndex]}
            alt={`Wedding Portfolio image ${currentIndex + 1}`}
            className={`max-w-full max-h-[85vh] object-contain rounded shadow-2xl transition-transform ${
              isZoomed ? 'cursor-zoom-out overflow-auto' : 'cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-8 z-50 text-white/70 hover:text-brand-pink transition-colors p-3 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Thumbnails list at bottom (hidden on small screens) */}
        <div className="absolute bottom-6 inset-x-0 hidden md:flex justify-center space-x-2 z-50 max-w-2xl mx-auto overflow-x-auto px-4 py-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsZoomed(false);
                setCurrentIndex(idx);
              }}
              className={`w-14 h-14 rounded overflow-hidden flex-shrink-0 border-2 transition-all ${
                idx === currentIndex ? 'border-brand-pink scale-110 shadow-lg' : 'border-transparent opacity-40 hover:opacity-80'
              }`}
            >
              <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
