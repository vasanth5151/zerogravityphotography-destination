import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Camera, Star, ArrowRight } from 'lucide-react';
import Footer from '../../components/Footer/Footer';

// Sample visual assets for premium destination wedding page
const VENUES = [
  {
    id: 'scorrier',
    title: 'SCORRIER HOUSE',
    location: 'ENGLAND & WALES',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80',
    category: 'united-kingdom'
  },
  {
    id: 'roderick',
    title: 'RODERICK CASTLE & PAVILION',
    location: 'SCOTLAND',
    image: 'https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=600&q=80',
    category: 'united-kingdom'
  },
  {
    id: 'garthmyl',
    title: 'GARTHMYL HALL',
    location: 'ENGLAND & WALES',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
    category: 'united-kingdom'
  },
  {
    id: 'casa-arte',
    title: 'CASA ARTE LAGO',
    location: 'PORTUGAL',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    category: 'paris'
  },
  {
    id: 'fraser',
    title: 'FRASER RIVER LODGE',
    location: 'CANADA',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    category: 'united-states'
  },
  {
    id: 'sea-view',
    title: 'SEA VIEW BY DE RIGO',
    location: 'GREECE',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
    category: 'bali'
  },
  {
    id: 'hotham',
    title: 'HOTHAM HALL ESTATE',
    location: 'ENGLAND & WALES',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80',
    category: 'united-kingdom'
  }
];

const POPULAR_DESTINATIONS = [
  {
    name: 'UNITED STATES',
    desc: 'California & East Coast Manors',
    image: 'https://images.unsplash.com/photo-1507504038482-762618d23dd5?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'NEW JERSEY',
    desc: 'Luxury Private Estates',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'SINGAPORE',
    desc: 'Metropolitan Gardens & Skylines',
    image: 'https://images.unsplash.com/photo-1525625293386-3fb0ac7c7287?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'PARIS',
    desc: 'Classic Seine Courtyards',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'MUSCAT',
    desc: 'Desert Oases & Luxury Resorts',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'JAIPUR',
    desc: 'Royal Palaces of the Pink City',
    image: 'https://images.unsplash.com/photo-1477587458883-47135dfdb56f?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'GOA',
    desc: 'Tropical Beachfront Vows',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'BALI',
    desc: 'Cliffside Jungles & Temples',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'SRILANKA',
    desc: 'Tea Country & Coastal Elegance',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'ANDAMAN',
    desc: 'Exotic Turquoise Ocean Vows',
    image: 'https://images.unsplash.com/photo-1589979482837-e74f2e145060?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'KERALA',
    desc: 'Backwaters & Luxury Lagoons',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80'
  }
];

const PHOTOGRAPHERS = [
  {
    name: 'RAHEL DEBBOUEK PHOTOGRAPHY',
    website: 'www.raheldebbouek.com',
    location: 'Europe & International',
    image: 'https://images.unsplash.com/photo-1537907690979-ee8e01276184?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'SYLVIA ZIERA',
    website: 'www.sylviaziera.com',
    location: 'Poland & Worldwide',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'LISA LITVINOVICH PHOTOGRAPHY',
    website: 'www.lisalitvinovich.com',
    location: 'Europe & UK Alliance',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
  }
];

const REAL_WEDDINGS = [
  {
    title: 'A PALACE GARDEN WEDDING WITH A NOD TO THE TUSCAN RUSTIC',
    location: 'TUSCANY, ITALY',
    image: 'https://images.unsplash.com/photo-1519225495810-7517c296517a?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'WHEN A HOCKEY CAREER PATH INSPIRED A COZY EUROPEAN WEDDING',
    location: 'ZERMATT, SWITZERLAND',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'SATIN & STAIRCASE: THE ART OF SYLVIA ZIERA AT WROTHAM HALL',
    location: 'KENT, UNITED KINGDOM',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Destination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const locationParam = searchParams.get('loc');

  const [activeLocation, setActiveLocation] = useState(null);

  useEffect(() => {
    if (locationParam) {
      // Map param to readable title
      const formatted = locationParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      setActiveLocation(formatted);
    } else {
      setActiveLocation(null);
    }
  }, [locationParam]);

  const destinationsSliderRef = React.useRef(null);

  const scrollSlider = (direction) => {
    if (destinationsSliderRef.current) {
      const scrollAmount = destinationsSliderRef.current.clientWidth * 0.75;
      destinationsSliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Clean filters
  const handleClearFilter = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-bg-dark pt-32 text-black font-body">
      
      {/* Dynamic Filter Header */}
      {activeLocation && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-8 bg-brand-pink-light/30 border-b border-black/5 rounded-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">Active Destination Filter</span>
            <h2 className="font-heading text-3xl font-light text-black tracking-wide mt-1">Weddings in {activeLocation}</h2>
          </div>
          <button 
            onClick={handleClearFilter}
            className="px-6 py-3 border border-black/10 hover:bg-black hover:text-white rounded-full text-[10px] font-heading tracking-[0.2em] uppercase transition-all duration-300"
          >
            Clear Filter & View All
          </button>
        </section>
      )}

      {/* SECTION 1: Featured Destination Venues Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">Our Portfolio Selection</span>
          <h2 className="font-heading text-3xl md:text-5xl font-light tracking-wide text-black uppercase">BEST DESTINATION WEDDING VENUES</h2>
          <div className="w-12 h-[1px] bg-brand-pink mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 1 Large Featured Estate Card */}
          <div className="lg:col-span-6">
            <div className="group relative overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-all hover:border-brand-pink/30">
              <div className="relative overflow-hidden aspect-[4/5]">
                <img 
                  src={VENUES[0].image} 
                  alt={VENUES[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 text-white space-y-2">
                  <span className="text-[9px] font-heading tracking-[0.25em] text-brand-pink uppercase font-semibold">Featured Estate</span>
                  <h3 className="font-heading text-2xl font-light tracking-wide">{VENUES[0].title}</h3>
                  <p className="text-[10px] font-heading tracking-[0.2em] text-white/70 uppercase flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-brand-pink" /> {VENUES[0].location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 6 smaller cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VENUES.slice(1).map((venue) => (
              <div key={venue.id} className="group flex flex-col space-y-3 bg-white p-3 rounded-lg border border-black/5 hover:border-brand-pink/20 transition-all">
                <div className="relative overflow-hidden aspect-[4/3] rounded-md">
                  <img 
                    src={venue.image} 
                    alt={venue.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="text-center pt-2 space-y-1">
                  <h4 className="font-heading text-xs font-medium tracking-wider text-black group-hover:text-brand-pink transition-colors">
                    {venue.title}
                  </h4>
                  <p className="text-[9px] font-heading tracking-widest text-brand-pink uppercase">
                    {venue.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <button className="px-8 py-3.5 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-full text-[10px] font-heading tracking-[0.25em] uppercase transition-all duration-300 font-semibold shadow-sm">
            VIEW ALL VENUES
          </button>
        </div>
      </section>

      {/* SECTION 2: Popular Wedding Destinations */}
      <section className="bg-white py-24 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">Fine-Art Locations</span>
            <h2 className="font-heading text-3xl md:text-5xl font-light tracking-wide text-black uppercase">POPULAR WEDDING DESTINATIONS</h2>
            <div className="w-12 h-[1px] bg-brand-pink mx-auto mt-4" />
          </div>
          <div className="relative">
            {/* Slider items row */}
            <div 
              ref={destinationsSliderRef}
              className="flex gap-8 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth pb-4"
            >
              {POPULAR_DESTINATIONS.map((dest, idx) => (
                <div 
                  key={idx} 
                  className="flex-shrink-0 w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] snap-start group relative overflow-hidden rounded-xl border border-black/5 shadow-sm bg-bg-dark"
                >
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <img 
                      src={dest.image} 
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-6 inset-x-6 text-center text-white space-y-1 z-10 bg-black/30 backdrop-blur-xs py-3 rounded-lg border border-white/10">
                      <h3 className="font-heading text-base font-medium tracking-[0.2em]">{dest.name}</h3>
                      <p className="text-[9px] font-light tracking-wider opacity-90">{dest.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider arrows decoration to replicate screenshot look */}
            <div className="absolute top-1/2 -left-6 -translate-y-1/2 hidden md:block z-10">
              <button 
                onClick={() => scrollSlider('left')}
                className="p-3 bg-white border border-black/5 shadow-lg rounded-full text-black hover:text-brand-pink transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 hidden md:block z-10">
              <button 
                onClick={() => scrollSlider('right')}
                className="p-3 bg-white border border-black/5 shadow-lg rounded-full text-black hover:text-brand-pink transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-center mt-16">
            <button className="px-8 py-3.5 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-full text-[10px] font-heading tracking-[0.25em] uppercase transition-all duration-300 font-semibold shadow-sm">
              EXPLORE ALL LOCATIONS
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: Best Destination Wedding Photographers */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">Artistic Direction</span>
          <h2 className="font-heading text-3xl md:text-5xl font-light tracking-wide text-black uppercase">BEST DESTINATION WEDDING PHOTOGRAPHERS</h2>
          <div className="w-12 h-[1px] bg-brand-pink mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PHOTOGRAPHERS.map((photographer, idx) => (
            <div key={idx} className="group bg-white p-4 rounded-xl border border-black/5 hover:border-brand-pink/20 transition-all flex flex-col space-y-4">
              <div className="relative overflow-hidden aspect-[4/5] rounded-lg">
                <img 
                  src={photographer.image} 
                  alt={photographer.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="text-center space-y-2 pt-2">
                <h3 className="font-heading text-sm font-semibold tracking-wider text-black group-hover:text-brand-pink transition-colors">
                  {photographer.name}
                </h3>
                <div className="flex flex-col text-[10px] text-text-muted space-y-1 font-light">
                  <span className="flex items-center justify-center gap-1">
                    <Camera className="w-3 h-3 text-brand-pink" /> {photographer.website}
                  </span>
                  <span className="flex items-center justify-center gap-1 uppercase tracking-wider text-[9px] text-brand-pink-dark">
                    <MapPin className="w-3 h-3" /> {photographer.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="px-8 py-3.5 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-full text-[10px] font-heading tracking-[0.25em] uppercase transition-all duration-300 font-semibold shadow-sm">
            MEET THE ARTISTS
          </button>
        </div>
      </section>

      {/* SECTION 4: Get Inspired by Real Weddings */}
      <section className="bg-white py-24 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">Live Love Stories</span>
            <h2 className="font-heading text-3xl md:text-5xl font-light tracking-wide text-black uppercase">GET INSPIRED BY REAL WEDDINGS</h2>
            <div className="w-12 h-[1px] bg-brand-pink mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REAL_WEDDINGS.map((wedding, idx) => (
              <div key={idx} className="group cursor-pointer flex flex-col space-y-4">
                <div className="relative overflow-hidden aspect-[3/2] rounded-lg">
                  <img 
                    src={wedding.image} 
                    alt={wedding.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-heading tracking-widest text-brand-pink uppercase font-semibold">
                    {wedding.location}
                  </span>
                  <h3 className="font-heading text-xs md:text-sm font-light tracking-wide text-black group-hover:text-brand-pink transition-colors leading-relaxed">
                    {wedding.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="px-8 py-3.5 bg-brand-pink hover:bg-brand-pink-dark text-white rounded-full text-[10px] font-heading tracking-[0.25em] uppercase transition-all duration-300 font-semibold shadow-sm">
              EXPLORE ALL STORIES
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: Welcome to Marry the World Catalogue Split */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Block */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">Bespoke Catalogue</span>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-black tracking-wide leading-tight">
                WELCOME TO MARRY THE WORLD
              </h2>
              <h3 className="font-heading text-xs font-semibold tracking-[0.2em] text-brand-pink-dark uppercase">
                THE DESTINATION WEDDING VENUE CATALOGUE
              </h3>
            </div>
            
            <p className="text-text-muted text-xs md:text-sm font-light leading-relaxed">
              Our handpicked wedding venues spans the continents, bringing you a diverse array of wedding venues from all corners of the globe. We believe that every love story is unique, and that each couple deserves a wedding venue that perfectly reflects their dreams and aspirations for their very special day.
            </p>
            <p className="text-text-muted text-xs md:text-sm font-light leading-relaxed">
              Whether you've always envisioned your special day in the heart of a romantic European castle, surrounded by lush vineyards in South America, or beneath the palm trees on a secluded island paradise, our curated catalogue brings together the most extraordinary, diverse array of venues that will leave you spellbound.
            </p>

            <div className="pt-6">
              <a 
                href="#catalogue"
                className="inline-flex items-center gap-2 border-b border-black/20 pb-1.5 text-xs font-heading tracking-[0.15em] uppercase hover:text-brand-pink hover:border-brand-pink transition-all"
              >
                Request Print Edition <ArrowRight className="w-3.5 h-3.5 text-brand-pink" />
              </a>
            </div>
          </div>

          {/* Right Portrait Estate Image */}
          <div className="relative">
            <div className="absolute -inset-4 border border-brand-pink/20 rounded translate-x-3 translate-y-3 pointer-events-none" />
            <img 
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" 
              alt="Grand Wedding Palace Estate" 
              className="relative z-10 w-full aspect-[4/5] object-cover rounded shadow-lg"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
