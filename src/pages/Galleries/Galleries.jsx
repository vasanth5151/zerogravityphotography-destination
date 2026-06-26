import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Grid, Play, Share2, Facebook, Mail, ArrowLeft, ArrowRight, Compass, Camera, Sparkles, Film } from 'lucide-react';
import { heroSlides } from '../../data/mockData';
import GalleryLightbox from '../../components/GalleryLightbox/GalleryLightbox';
import Footer from '../../components/Footer/Footer';
// Candid Moments images
import cm1 from '../../assets/candid-moments/candid-moments-1.webp';
import cm2 from '../../assets/candid-moments/candid-moments-2.webp';
import cm3 from '../../assets/candid-moments/candid-moments-3.webp';
import cm4 from '../../assets/candid-moments/candid-moments-4.webp';
import cm5 from '../../assets/candid-moments/candid-moments-5.webp';
import cm6 from '../../assets/candid-moments/candid-moments-6.webp';
import cm7 from '../../assets/candid-moments/candid-moments-7.webp';
import cm8 from '../../assets/candid-moments/candid-moments-8.webp';
import cm9 from '../../assets/candid-moments/candid-moments-9.webp';
import cm10 from '../../assets/candid-moments/candid-moments-10.webp';
import cm11 from '../../assets/candid-moments/candid-moments-11.webp';
import cm12 from '../../assets/candid-moments/candid-moments-12.webp';
import cm13 from '../../assets/candid-moments/candid-moments-13.webp';
// Couple Portraits images
import cp1 from '../../assets/couple-portraits/couple-portraits-1.webp';
import cp2 from '../../assets/couple-portraits/couple-portraits-2.webp';
import cp3 from '../../assets/couple-portraits/couple-portraits-3.webp';
import cp4 from '../../assets/couple-portraits/couple-portraits-4.webp';
import cp5 from '../../assets/couple-portraits/couple-portraits-5.webp';
import cp6 from '../../assets/couple-portraits/couple-portraits-6.webp';
import cp7 from '../../assets/couple-portraits/couple-portraits-7.webp';
import cp8 from '../../assets/couple-portraits/couple-portraits-8.webp';
import cp9 from '../../assets/couple-portraits/couple-portraits-9.webp';
import cp10 from '../../assets/couple-portraits/couple-portraits-10.webp';
import cp11 from '../../assets/couple-portraits/couple-portraits-11.webp';
// Outdoor images
import od1 from '../../assets/out-door/out-door1.webp';
import od2 from '../../assets/out-door/out-door2.webp';
import od3 from '../../assets/out-door/out-door3.webp';
import od4 from '../../assets/out-door/out-door4.webp';
import od5 from '../../assets/out-door/out-door5.webp';
import od6 from '../../assets/out-door/out-door6.webp';
import od7 from '../../assets/out-door/out-door7.webp';
import od8 from '../../assets/out-door/out-door8.webp';
import od9 from '../../assets/out-door/out-door9.webp';
import od10 from '../../assets/out-door/out-door110.webp';

const PinterestIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0"/>
  </svg>
);

const XLogoIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

export default function Galleries() {
  const { tab } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tabParam = tab || searchParams.get('tab');

  const [activeTab, setActiveTab] = useState(
    ['candid-moments', 'couple-portraits', 'outdoor-images', 'videos'].includes(tabParam)
      ? tabParam
      : ''
  );
  
  const [visibleCount, setVisibleCount] = useState(6);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Sync state if tabParam changes
  useEffect(() => {
    if (['candid-moments', 'couple-portraits', 'outdoor-images', 'videos'].includes(tabParam)) {
      setActiveTab(tabParam);
    } else {
      setActiveTab('');
    }
    // Reset load more state
    setVisibleCount(6);
  }, [tabParam]);

  const candidImages = [cm1, cm2, cm3, cm4, cm5, cm6, cm7, cm8, cm9, cm10, cm11, cm12, cm13];

  const portraitImages = [cp1, cp2, cp3, cp4, cp5, cp6, cp7, cp8, cp9, cp10, cp11];

  const outdoorImages = [od1, od2, od3, od4, od5, od6, od7, od8, od9, od10];

  const activeTabImages = activeTab === 'couple-portraits'
    ? portraitImages
    : activeTab === 'outdoor-images'
      ? outdoorImages
      : candidImages;

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const getPageStyles = () => {
    switch (activeTab) {
      case 'candid-moments':
        return {
          bgClass: 'bg-[#FAF8F5] text-neutral-900',
          title: 'Candid Moments',
          desc: 'Fleeting looks, shared laughter, and emotional tears captured in their raw, unposed beauty.'
        };
      case 'couple-portraits':
        return {
          bgClass: 'bg-[#fdfbf7] text-neutral-900',
          title: 'Couple Portraits',
          desc: 'Editorial fine-art portraits displaying structured high-fashion poses and classic timeless romance.'
        };
      case 'outdoor-images':
        return {
          bgClass: 'bg-[#FAF8F5] text-neutral-900',
          title: 'Outdoor Images',
          desc: 'Epic, panoramic scenes where love meets majestic nature—from Italian lakes to desert horizons.'
        };
      case 'videos':
        return {
          bgClass: 'bg-white text-black',
          title: 'Cinematic Showcase',
          desc: 'Moving frames carrying real editorial emotion. View our bespoke cinematographic elopements and films.'
        };
      default:
        return {
          bgClass: 'bg-[#FAF8F5] text-neutral-900',
          title: 'Fine Art Portfolio',
          desc: 'Explore our curated collections of editorial destination wedding stories, photography, and cinematography.'
        };
    }
  };

  const styles = getPageStyles();

  return (
    <div className={`min-h-screen pt-24 transition-colors duration-500 ${styles.bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">

        {/* Categories Hub Index page (when no tab is active) */}
        {activeTab === '' ? (
          <div className="space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">Fine Art Portfolios</span>
              <h1 className="font-heading text-4xl md:text-5xl font-light tracking-wide uppercase text-neutral-900">
                Our Gallery Collections
              </h1>
              <p className="text-[15px] font-light leading-relaxed text-neutral-500">
                Each wedding is a unique manuscript. Step into our world of cinematic imagery, structured fine-art portraiture, and documentary moments.
              </p>
            </div>

            {/* Portal Hub Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              {[
                {
                  id: 'candid-moments',
                  title: 'Candid Moments',
                  desc: 'Documentary style captures, honest emotions, and raw unposed interactions.',
                  img: candidImages[0],
                  tag: 'DOCUMENTARY'
                },
                {
                  id: 'couple-portraits',
                  title: 'Couple Portraits',
                  desc: 'High-fashion editorial posing with classical romance layouts.',
                  img: portraitImages[0],
                  tag: 'EDITORIAL'
                },
                {
                  id: 'outdoor-images',
                  title: 'Outdoor Images',
                  desc: 'Wide-angle panoramas of couples set against breathtaking local topographies.',
                  img: outdoorImages[0],
                  tag: 'LANDSCAPE'
                },
                {
                  id: 'videos',
                  title: 'Cinematic Videos',
                  desc: 'Moving films carrying real editorial motion and custom soundtracks.',
                  img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
                  tag: 'CINEMATOGRAPHY'
                }
              ].map((category, idx) => (
                <div
                  key={category.id}
                  onClick={() => {
                    setActiveTab(category.id);
                    navigate(`/galleries/${category.id}`);
                  }}
                  className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer border border-black/5 shadow-md"
                >
                  {/* Full image bg */}
                  <img
                    src={category.img}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  {/* Gradient shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent transition-opacity group-hover:opacity-90" />
                  
                  {/* Category text content */}
                  <div className="absolute bottom-8 inset-x-8 space-y-3 text-left">
                    <span className="text-[9px] font-heading tracking-widest text-brand-pink bg-black/40 border border-brand-pink/20 px-3 py-1 rounded-full uppercase">
                      {category.tag}
                    </span>
                    <h3 className="font-heading text-2xl font-light text-white tracking-wide uppercase pt-1">
                      {category.title}
                    </h3>
                    <p className="text-[15px] text-neutral-300 font-light leading-relaxed max-w-sm">
                      {category.desc}
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center space-x-2 border border-white/20 hover:border-brand-pink hover:bg-brand-pink/15 text-[9px] font-heading tracking-[0.25em] uppercase px-5 py-2.5 rounded-md text-white transition-all font-semibold">
                        <span>Enter Collection</span>
                        <ArrowRight className="w-3 h-3 text-brand-pink" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Rendering Active Tab Gallery Views
          <div>
            {/* Navigation Toolbar */}
            <div className="flex flex-wrap items-center justify-between border-b border-black/10 pb-8 mb-12 gap-4">
              <button
                onClick={() => {
                  setActiveTab('');
                  navigate('/galleries');
                }}
                className="flex items-center space-x-2 text-xs font-heading tracking-widest uppercase transition-colors font-semibold text-black hover:text-brand-pink"
              >
                <ArrowLeft className="w-4 h-4 text-brand-pink" />
                <span>All Collections</span>
              </button>
              
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'candid-moments', label: 'Candid' },
                  { id: 'couple-portraits', label: 'Portraits' },
                  { id: 'outdoor-images', label: 'Outdoors' },
                  { id: 'videos', label: 'Videos' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      navigate(`/galleries/${item.id}`);
                    }}
                    className={`px-4 py-2 rounded-full text-[9px] font-heading tracking-wider uppercase transition-all duration-300 font-bold border ${
                      activeTab === item.id
                        ? 'bg-brand-pink border-brand-pink text-white shadow-sm'
                        : 'bg-white border-black/10 text-neutral-700 hover:text-black hover:border-brand-pink/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Header Text block */}
            <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
              <span className="text-[10px] font-heading tracking-[0.25em] text-brand-pink uppercase font-semibold">Zero Gravity Photography</span>
              <h2 className="font-heading text-3xl md:text-5xl font-light tracking-wide uppercase">
                {styles.title}
              </h2>
              <p className="text-[15px] font-light leading-relaxed text-neutral-500">
                {styles.desc}
              </p>
            </div>

            {/* 1. Candid Moments Justified Grid (Dark Theme) */}
            {activeTab === 'candid-moments' && (
              <div className="space-y-12">
                {/* Masonry Columns Layout */}
                <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                  {candidImages.slice(0, visibleCount).map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleOpenLightbox(idx)}
                      className="break-inside-avoid relative overflow-hidden rounded-xl cursor-pointer group shadow-md bg-white border border-black/5"
                    >
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/15 group-hover:bg-black/40 transition-all duration-300 z-10" />
                      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 rounded-full border border-white/60 bg-black/60 flex items-center justify-center text-white">
                          <Eye className="w-4 h-4" />
                        </div>
                      </div>
                      <img
                        src={img}
                        alt={`Candid Moment ${idx + 1}`}
                        className="w-full h-auto object-cover rounded-xl transition-transform duration-700 group-hover:scale-101"
                      />
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {visibleCount < candidImages.length && (
                  <div className="text-center pt-8">
                    <button
                      onClick={() => setVisibleCount((prev) => Math.min(prev + 6, candidImages.length))}
                      className="inline-flex items-center space-x-2 border border-black/20 hover:border-brand-pink hover:bg-brand-pink/5 text-[9px] font-heading tracking-[0.25em] uppercase px-8 py-3.5 rounded-full text-black hover:text-brand-pink transition-all font-semibold"
                    >
                      <span>Load More Images</span>
                      <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 2. Couple Portraits Editorial View (Light Beige Theme) */}
            {activeTab === 'couple-portraits' && (
              <div className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {portraitImages.slice(0, visibleCount).map((img, idx) => {
                    const locations = ['Paris, France', 'Tuscany, Italy', 'Jaipur Palace', 'Amalfi Coast', 'New Jersey Manor', 'Bali Jungle', 'Santorini Cliff', 'Goa Beachfront', 'London Estate', 'Kerala Backwaters', 'Singapore Skyline', 'Muscat Dunes'];
                    const cameraSettings = ['Leica M10 // 50mm f/1.2', 'Hasselblad H6D // 80mm f/2.8', 'Sony A1 // 85mm f/1.4', 'Fujifilm GFX // 110mm f/2.0'];
                    const loc = locations[idx % locations.length];
                    const cam = cameraSettings[idx % cameraSettings.length];
                    
                    return (
                      <div
                        key={idx}
                        onClick={() => handleOpenLightbox(idx)}
                        className={`cursor-pointer group space-y-4 p-4 bg-white shadow-xs rounded-lg border border-black/5 flex flex-col justify-between ${
                          idx % 3 === 1 ? 'translate-y-0 md:translate-y-6' : ''
                        }`}
                      >
                        {/* Image framed with double border */}
                        <div className="relative overflow-hidden aspect-[4/5] rounded border border-black/10 p-1 bg-neutral-50 shadow-inner">
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10" />
                          <img
                            src={img}
                            alt={`Portrait Story ${idx + 1}`}
                            className="w-full h-full object-cover rounded-xs"
                          />
                        </div>
                        {/* Delicate Editorial Typography details */}
                        <div className="text-center pt-2 space-y-1">
                          <span className="text-[8px] font-heading tracking-widest text-brand-pink uppercase font-semibold">
                            {loc}
                          </span>
                          <p className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest font-light">
                            {cam}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Load More Button */}
                {visibleCount < portraitImages.length && (
                  <div className="text-center pt-12">
                    <button
                      onClick={() => setVisibleCount((prev) => Math.min(prev + 6, portraitImages.length))}
                      className="inline-flex items-center space-x-2 border border-black/20 hover:border-brand-pink hover:bg-brand-pink/5 text-[9px] font-heading tracking-[0.25em] uppercase px-8 py-3.5 rounded-full text-black transition-all font-semibold"
                    >
                      <span>Load More Images</span>
                      <Camera className="w-3.5 h-3.5 text-brand-pink" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 3. Outdoor Images Panoramic View (Dark Theme) */}
            {activeTab === 'outdoor-images' && (
              <div className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {outdoorImages.slice(0, visibleCount).map((img, idx) => {
                    const wideLocations = [
                      { title: 'Lakeside Elegance', desc: 'Lake Como, Italy', coords: '45.9816° N, 9.2799° E' },
                      { title: 'Cliffs of Oia', desc: 'Santorini, Greece', coords: '36.4618° N, 25.3753° E' },
                      { title: 'Desert Sunset Dunes', desc: 'Muscat, Oman', coords: '23.5859° N, 58.4059° E' },
                      { title: 'Turquoise Shores', desc: 'Goa Coastline, India', coords: '15.2993° N, 74.1240° E' },
                      { title: 'Highland Peak', desc: 'Scottish Castle, UK', coords: '56.4907° N, 4.2026° W' },
                      { title: 'Jungle Horizon Vows', desc: 'Ubud, Bali', coords: '8.5069° S, 115.2625° E' },
                      { title: 'Paris Seine Sunrise', desc: 'Paris, France', coords: '48.8566° N, 2.3522° E' },
                      { title: 'Andaman Ocean Reef', desc: 'Havelock Islands, India', coords: '11.9687° N, 92.9806° E' },
                      { title: 'Amalfi Coast Skyline', desc: 'Positano, Italy', coords: '40.6281° N, 14.4850° E' },
                      { title: 'Kerala Lagoon Vows', desc: 'Backwaters, India', coords: '9.4981° N, 76.3388° E' },
                      { title: 'Singapore City Park', desc: 'Gardens by the Bay', coords: '1.2816° N, 103.8636° E' },
                      { title: 'Grand Canyon Manor', desc: 'Arizona Estates, US', coords: '36.0544° N, 112.1401° W' }
                    ];
                    const locMeta = wideLocations[idx % wideLocations.length];
                    
                    return (
                      <div
                        key={idx}
                        onClick={() => handleOpenLightbox(idx)}
                        className="group relative overflow-hidden rounded-xl cursor-pointer border border-black/5 bg-white aspect-[16/9] shadow-md"
                      >
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/45 transition-all duration-300 z-10" />
                        
                        {/* Location Details Overlay */}
                        <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end text-white">
                          <div className="text-left space-y-1">
                            <span className="text-[8px] font-heading tracking-widest text-brand-pink uppercase font-semibold">
                              {locMeta.desc}
                            </span>
                            <h3 className="font-heading text-lg font-light tracking-wide">
                              {locMeta.title}
                            </h3>
                          </div>
                          <span className="text-[8px] font-mono text-white/50 tracking-wider hidden sm:block">
                            {locMeta.coords}
                          </span>
                        </div>

                        <img
                          src={img}
                          alt={locMeta.title}
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Load More Button */}
                {visibleCount < outdoorImages.length && (
                  <div className="text-center pt-8">
                    <button
                      onClick={() => setVisibleCount((prev) => Math.min(prev + 6, outdoorImages.length))}
                      className="inline-flex items-center space-x-2 border border-black/20 hover:border-brand-pink hover:bg-brand-pink/5 text-[9px] font-heading tracking-[0.25em] uppercase px-8 py-3.5 rounded-full text-black hover:text-brand-pink transition-all font-semibold"
                    >
                      <span>Load More Images</span>
                      <Compass className="w-3.5 h-3.5 text-brand-pink" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 4. Cinematic Videos (Light-Themed Cinema Showcase) */}
            {activeTab === 'videos' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-16"
              >
                {/* Top row: Header description and main showcase layout */}
                <div className="text-left border-b border-black/10 pb-6">
                  <h2 className="font-heading text-3xl md:text-4xl font-light text-black tracking-widest uppercase">
                    IN THE DARK
                  </h2>
                  <p className="text-[15px] font-light text-neutral-500 leading-relaxed max-w-4xl mt-3">
                    From the filmmakers and sound engineers capturing the next generation of visual memory. We provide elegant moving solutions that set new standards for luxury wedding cinema. Digital technology has made our world more connected, but raw emotional storytelling is what truly sets us apart.
                  </p>
                </div>

                {/* Grid layout for Main video player and specifications */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Side: Video Preview Frame */}
                  <div className="lg:col-span-8 group relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-lg">
                    <div className="relative overflow-hidden aspect-[16/9]">
                      <img
                        src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80"
                        alt="In the Dark Video Cover"
                        className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-700"
                      />
                      {/* Play Overlay */}
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                        <button
                          onClick={() => alert("Playing cinematic showreel...")}
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white bg-white/10 hover:bg-brand-pink hover:border-brand-pink text-white flex items-center justify-center transition-all duration-350 hover:scale-110 cursor-pointer shadow-lg"
                          title="Play Video"
                        >
                          <Play className="w-6 h-6 fill-current translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Specifications Widget Card */}
                  <div className="lg:col-span-4 bg-white border border-black/5 rounded-2xl p-8 space-y-6 shadow-xs text-left">
                    <div>
                      <span className="text-[10px] font-heading tracking-[0.25em] text-neutral-400 uppercase">Project Name</span>
                      <h4 className="font-heading text-base font-light text-black uppercase mt-1">IN THE DARK</h4>
                    </div>
                    <div className="h-[1px] bg-black/5" />
                    <div>
                      <span className="text-[10px] font-heading tracking-[0.25em] text-neutral-400 uppercase">Client</span>
                      <h4 className="font-heading text-xs font-semibold text-brand-pink uppercase mt-1">
                        BEST DESTINATION WEDDINGS BY ZEROGRAVITY PHOTOGRAPHY
                      </h4>
                    </div>
                    <div className="h-[1px] bg-black/5" />
                    <div>
                      <span className="text-[10px] font-heading tracking-[0.25em] text-neutral-400 uppercase">My Role</span>
                      <h4 className="font-heading text-xs font-light text-black uppercase mt-1">EMOTION & CINEMA</h4>
                    </div>
                    <div className="h-[1px] bg-black/5" />
                    <div>
                      <span className="text-[10px] font-heading tracking-[0.25em] text-neutral-400 uppercase mb-3 block">Share</span>
                      <div className="flex space-x-3 text-black/60">
                        <a href="#fb" className="hover:text-brand-pink p-1 transition-colors"><Facebook className="w-4 h-4" /></a>
                        <a href="#x" className="hover:text-brand-pink p-1 transition-colors"><XLogoIcon className="w-4 h-4" /></a>
                        <a href="#pin" className="hover:text-brand-pink p-1 transition-colors"><PinterestIcon className="w-4 h-4" /></a>
                        <a href="#mail" className="hover:text-brand-pink p-1 transition-colors"><Mail className="w-4 h-4" /></a>
                      </div>
                    </div>
                    <div className="h-[1px] bg-black/5" />
                    <div>
                      <span className="text-[10px] font-heading tracking-[0.25em] text-neutral-400 uppercase mb-2 block">Tags</span>
                      <div className="flex flex-wrap gap-2">
                        {['CINEMA', 'WEDDING', 'STORY', 'FINE-ART'].map((tag) => (
                          <span key={tag} className="text-[8px] font-heading tracking-widest text-neutral-600 border border-neutral-200 px-3 py-1 rounded bg-neutral-50 font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional details column row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                  <div className="overflow-hidden rounded-xl border border-black/5 aspect-[16/10] shadow-xs">
                    <img
                      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                      alt="Sunset Silhouette Reader"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-xl border border-black/5 aspect-[16/10] shadow-xs">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                      alt="Emotional Close-up portrait"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

      </div>

      {/* Embedded Lightbox */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        images={activeTabImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        setCurrentIndex={setLightboxIndex}
      />

      <Footer />
    </div>
  );
}
