import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Camera, User, ExternalLink, ArrowDown } from 'lucide-react';
import { portfolioWorks } from '../../data/mockData';
import Footer from '../../components/Footer/Footer';

export default function Work() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const categories = [
    { name: 'All', value: 'all' },
    { name: 'Weddings', value: 'wedding' },
    { name: 'Fashion', value: 'fashion' },
    { name: 'Editorial', value: 'editorial' },
    { name: 'Portraits', value: 'portrait' }
  ];

  // Filter items
  const filteredItems = portfolioWorks.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const displayedItems = filteredItems.slice(0, visibleCount);

  // Native Masonry sorting (divides items into columns)
  const getMasonryColumns = (items, cols) => {
    const columns = Array.from({ length: cols }, () => []);
    items.forEach((item, index) => {
      columns[index % cols].push(item);
    });
    return columns;
  };

  const handleLoadMore = () => {
    if (visibleCount >= filteredItems.length) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setIsLoadingMore(false);
    }, 1200); // Simulate API latency
  };

  // Reset page count when filter changes
  useEffect(() => {
    setVisibleCount(4);
  }, [filter]);

  return (
    <div className="min-h-screen bg-bg-dark pt-24 text-black">
      {/* Editorial Title Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-8 text-center space-y-4">
        <p className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">Featured Portfolio</p>
        <h1 className="font-heading text-4xl md:text-6xl font-light text-black tracking-wide">Timeless Vows</h1>
        <p className="text-xs text-text-muted font-light max-w-xl mx-auto leading-relaxed">
          Exploring luxury couple narratives, editorial bridal portraits, and romantic cinematic frames across the globe.
        </p>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-12 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 border-b border-black/5 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`relative px-4 py-2 text-[10px] font-heading tracking-[0.2em] uppercase transition-colors duration-300 ${
                filter === cat.value ? 'text-brand-pink font-semibold' : 'text-black/60 hover:text-black'
              }`}
            >
              {cat.name}
              {filter === cat.value && (
                <motion.span
                  layoutId="work-filter-underline"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-pink"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        {displayedItems.length === 0 ? (
          <div className="text-center py-20 text-text-muted text-xs font-light">
            No projects available under this category.
          </div>
        ) : (
          <div>
            {/* 3-Column Masonry for desktop, 2-Column for tablet, 1-Column for mobile */}
            <div className="hidden lg:grid grid-cols-3 gap-8">
              {getMasonryColumns(displayedItems, 3).map((col, cIdx) => (
                <div key={cIdx} className="flex flex-col gap-8">
                  {col.map((item) => (
                    <PortfolioCard
                      key={item.id}
                      item={item}
                      onSelect={setSelectedProject}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="hidden md:grid lg:hidden grid-cols-2 gap-8">
              {getMasonryColumns(displayedItems, 2).map((col, cIdx) => (
                <div key={cIdx} className="flex flex-col gap-8">
                  {col.map((item) => (
                    <PortfolioCard
                      key={item.id}
                      item={item}
                      onSelect={setSelectedProject}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="grid md:hidden grid-cols-1 gap-8">
              {displayedItems.map((item) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  onSelect={setSelectedProject}
                />
              ))}
            </div>

            {/* Load More Trigger Button */}
            {visibleCount < filteredItems.length && (
              <div className="mt-16 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="inline-flex items-center space-x-3 border border-black/20 hover:border-brand-pink/50 hover:bg-brand-pink/5 px-8 py-4 rounded-full text-[10px] font-heading tracking-[0.2em] text-black uppercase transition-all duration-300"
                >
                  {isLoadingMore ? (
                    <>
                      <div className="w-4 h-4 border-2 border-brand-pink border-t-transparent rounded-full animate-spin" />
                      <span>Fetching Artworks...</span>
                    </>
                  ) : (
                    <>
                      <span>Load More Stories</span>
                      <ArrowDown className="w-4 h-4 text-brand-pink" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
          >
            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border border-black/5 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col lg:flex-row shadow-2xl text-black"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2.5 bg-black/10 hover:bg-brand-pink text-black hover:text-white rounded-full transition-all"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Side: Large Portfolio Image */}
              <div className="w-full lg:w-1/2 overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[80vh]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side: Detailed Story Specifications */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-between space-y-8 overflow-y-auto">
                <div className="space-y-6">
                  {/* Category and location info */}
                  <span className="text-[9px] font-heading tracking-[0.25em] text-brand-pink uppercase font-semibold">
                    {selectedProject.category} / {selectedProject.location}
                  </span>
                  
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-black">
                    {selectedProject.title}
                  </h2>
                  
                  <p className="text-xs text-text-muted font-light leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {/* Project metadata lists */}
                  <div className="border-t border-black/5 pt-6 grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 text-xs font-light text-text-muted">
                      <User className="w-4 h-4 text-brand-pink" />
                      <span>{selectedProject.client}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-light text-text-muted">
                      <MapPin className="w-4 h-4 text-brand-pink" />
                      <span>{selectedProject.details.venue}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-light text-text-muted">
                      <Camera className="w-4 h-4 text-brand-pink" />
                      <span>{selectedProject.details.gear}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-light text-text-muted">
                      <Calendar className="w-4 h-4 text-brand-pink" />
                      <span>{selectedProject.details.date}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-black/5">
                  <p className="italic text-xs text-brand-pink-dark leading-relaxed font-light mb-6">
                    "Every details of our wedding was captured with dream-like fashion editorial quality. We couldn't have asked for more elegant visual directors."
                  </p>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-full text-center py-4 bg-black text-white hover:bg-brand-pink hover:text-bg-dark rounded-full text-[10px] font-heading tracking-[0.2em] uppercase transition-all duration-300 font-semibold"
                  >
                    Close & Keep Exploring
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

// Sub-component: Portfolio Card with parallax hover zoom (White text on hover remains for legibility)
function PortfolioCard({ item, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={() => onSelect(item)}
      className="bg-white border border-black/5 rounded-xl overflow-hidden cursor-pointer hover-trigger group hover:border-brand-pink/30 shadow-sm transition-all duration-300"
    >
      <div className="relative overflow-hidden aspect-[4/5]">
        {/* Dark overlay for hover details readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-6" />
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover parallax-bg"
        />
        
        {/* Hover content details */}
        <div className="absolute inset-x-0 bottom-0 p-6 z-20 transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white">
          <span className="text-[9px] font-heading tracking-[0.2em] text-brand-pink uppercase font-semibold">
            {item.location}
          </span>
          <h3 className="font-heading text-lg font-light text-white mt-1 mb-3">
            {item.title}
          </h3>
          <div className="flex items-center text-[10px] text-white/50 space-x-1 font-heading tracking-widest uppercase">
            <span>View Story</span>
            <ExternalLink className="w-3.5 h-3.5 text-brand-pink" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
