import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Grid } from 'lucide-react';
import { heroSlides } from '../../data/mockData';
import GalleryLightbox from '../../components/GalleryLightbox/GalleryLightbox';
import Footer from '../../components/Footer/Footer';

export default function Galleries() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Extract all 12 slider image URLs for the packery layout
  const images = heroSlides.map((slide) => slide.image);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const packeryItems = [
    { spanClass: 'md:col-span-1 md:row-span-2 h-full' },
    { spanClass: 'md:col-span-1 md:row-span-1 h-full' },
    { spanClass: 'md:col-span-1 md:row-span-1 h-full' },
    { spanClass: 'md:col-span-2 md:row-span-1 h-full' },
    { spanClass: 'md:col-span-1 md:row-span-1 h-full' },
    { spanClass: 'md:col-span-1 md:row-span-1 h-full' },
    { spanClass: 'md:col-span-1 md:row-span-2 h-full' },
    { spanClass: 'md:col-span-2 md:row-span-1 h-full' },
    { spanClass: 'md:col-span-1 md:row-span-2 h-full' },
    { spanClass: 'md:col-span-2 md:row-span-1 h-full' },
    { spanClass: 'md:col-span-1 md:row-span-1 h-full' },
    { spanClass: 'md:col-span-1 md:row-span-1 h-full' },
  ];

  return (
    <div className="min-h-screen bg-bg-dark pt-24 text-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-light text-black tracking-wide uppercase">
            Packery Gallery #2
          </h1>
          <p className="text-xs text-text-muted font-light leading-relaxed">
            Exposure is the key concept in photography. Met, understanding what an exposure is you can hardly learn to take good pictures.
          </p>
        </div>

        {/* 3-Column Native Packery Grid (No gaps, fits perfectly) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 auto-rows-[250px] md:auto-rows-[290px] overflow-hidden rounded-xl border border-black/5 bg-white p-2">
          {packeryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              onClick={() => handleOpenLightbox(idx)}
              className={`${item.spanClass} relative overflow-hidden cursor-pointer group`}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/45 transition-colors duration-300 z-10" />
              
              {/* Eye zoom indicator icon */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full border border-white/60 bg-black/60 flex items-center justify-center text-white">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              <img
                src={images[idx]}
                alt={`Wedding Packery item ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
            </motion.div>
          ))}
        </div>

      </div>

      {/* Embedded Lightbox */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        images={images}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        setCurrentIndex={setLightboxIndex}
      />

      <Footer />
    </div>
  );
}
