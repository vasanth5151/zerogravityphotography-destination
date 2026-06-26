import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Heart, Shield, Sparkles, MapPin } from 'lucide-react';
import Footer from '../../components/Footer/Footer';

export default function Services() {
  const servicesData = [
    {
      id: 'photography',
      title: 'International Wedding Photography',
      subtitle: 'UK, USA & Worldwide Coverage',
      desc: 'We travel the world to document your love story — from English countryside manors and Scottish Highland castles in the UK, to New York skyline rooftop ceremonies and vineyard weddings in California, USA. Our candid, fine-art storytelling captures raw emotion without staged posing. Every destination receives its own bespoke color treatment, detailed pre-shoot scouting, and a private online gallery of 800+ hand-edited images.',
      img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      tag: 'Fine Art & Candid Documentary'
    },
    {
      id: 'decor',
      title: 'Wedding Decors',
      subtitle: 'Designing Dream Backdrops Worldwide',
      desc: 'We design bespoke wedding decors that complement every international venue — from grand Tudor halls in London and barn conversions in the English countryside, to elegant ballrooms in New York and garden estates in New Jersey. Our curators craft themed floral installations, warm candlelight canopies, and cultural mandap or altar designs that honour both your heritage and your chosen destination.',
      img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      tag: 'Bespoke Scenography'
    },
    {
      id: 'management',
      title: 'Events Management',
      subtitle: 'Flawless Coordination Across Borders',
      desc: 'Planning an international wedding involves navigating time zones, vendor contracts, local permits, and cultural logistics. Our experienced events management team handles everything end-to-end — from coordinating UK venue bookings and USA vendor schedules, to managing multi-day Indian wedding functions abroad. We ensure every ceremony runs seamlessly so you can be fully present in the moment.',
      img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      tag: 'Cross-Border Coordination'
    },
    {
      id: 'food',
      title: 'Wedding Food Arrangements',
      subtitle: 'Global Culinary Experiences',
      desc: 'We curate exceptional dining experiences that blend your cultural heritage with the finest local produce of your wedding destination. Whether it is a traditional South Indian spread at a London venue, a fusion Indo-Western menu in New York, or a multi-course French-inspired dinner for a Paris wedding, we partner with celebrated local and diaspora chefs to create a feast your guests will talk about for years.',
      img: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      tag: 'Global Culinary Excellence'
    }
  ];

  const brandPartners = [
    { name: 'THE SAVOY LONDON' },
    { name: 'CLARIDGE\'S' },
    { name: 'THE PLAZA NEW YORK' },
    { name: 'FOUR SEASONS' },
    { name: 'THE RITZ-CARLTON' },
    { name: 'WALDORF ASTORIA' },
    { name: 'ST. REGIS' },
    { name: 'MANDARIN ORIENTAL' },
    { name: 'BVLGARI HOTEL' },
    { name: 'ROSEWOOD LONDON' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-20 text-neutral-900 font-body relative overflow-x-hidden">

      {/* 1. Hero Header (Rose Petals Banner) */}
      <section className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden">
        {/* Soft elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-[#FAF8F5] z-10" />
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80"
          alt="Rose Petals Wedding Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Soft overlay effect */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xs z-5" />
      </section>

      {/* 2. Intro Description Section */}
      <section className="max-w-4xl mx-auto px-6 text-center pt-16 pb-20 space-y-6 relative z-20">
        <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold block">
          International Wedding Services
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-light text-black leading-tight">
          We Travel The World For Your Wedding
        </h1>
        <div className="w-12 h-[1px] bg-brand-pink/50 mx-auto" />
        <p className="text-[15px] font-light text-neutral-500 leading-relaxed max-w-2xl mx-auto">
          Zero Gravity Photography specialises in international wedding photography across the UK, USA, Europe, Southeast Asia, and the Middle East. From candid documentary coverage to full wedding management, we bring the same storytelling passion to a London church, a New York rooftop, or a Bali clifftop — wherever your love story unfolds.
        </p>
      </section>

      {/* 3. Staggered Service Offerings */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 space-y-32 pb-32 relative">
        {servicesData.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={service.id}
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
            >

              {/* Decorative Angled Line (for odd sections) */}
              {!isEven && (
                <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-48 h-[1px] bg-brand-pink/20 rotate-45 pointer-events-none hidden lg:block" />
              )}
              {isEven && index > 0 && (
                <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-48 h-[1px] bg-brand-pink/20 -rotate-45 pointer-events-none hidden lg:block" />
              )}

              {/* Image Column */}
              <div
                className={`lg:col-span-6 overflow-hidden rounded-2xl border border-black/5 shadow-md aspect-[16/11] bg-white p-2 ${isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
              >
                <div className="w-full h-full overflow-hidden rounded-xl">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-103"
                  />
                </div>
              </div>

              {/* Text Content Column */}
              <div
                className={`lg:col-span-6 space-y-5 text-left ${isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
              >
                <span className="text-[9px] font-heading tracking-widest text-brand-pink-dark uppercase font-bold bg-brand-pink/10 px-3 py-1 rounded-full">
                  {service.tag}
                </span>

                <div className="space-y-1">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-black tracking-wide">
                    {service.title}
                  </h2>
                  <p className="text-[10px] font-heading tracking-widest text-neutral-400 uppercase font-semibold">
                    {service.subtitle}
                  </p>
                </div>

                <p className="text-[15px] font-light text-neutral-500 leading-relaxed">
                  {service.desc}
                </p>

                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-2 text-[10px] font-heading tracking-widest text-black uppercase font-bold hover:text-brand-pink transition-colors border-b border-black/25 hover:border-brand-pink pb-1"
                  >
                    <span>Inquire for {service.title.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          );
        })}
      </section>

      {/* Book Session CTA (Warm Light Pink Luxury Layout) */}
      <section className="bg-brand-pink-light py-20 border-y border-black/5 text-center relative overflow-hidden">
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 space-y-6 relative z-10">
          <p className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">
            UK · USA · Europe · Asia · Middle East
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-light text-black">
            Available For International Bookings Worldwide
          </h2>
          <p className="text-[15px] text-text-muted max-w-xl mx-auto font-light leading-relaxed">
            We cover weddings across the United Kingdom, United States, Canada, Australia, Europe, Southeast Asia, and the Middle East. Our team travels to your destination — bringing our full storytelling expertise wherever your celebration takes place.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-3 bg-[#E5A9B4] hover:bg-black/85 px-8 py-4 rounded-full text-[10px] font-heading tracking-[0.2em] text-white uppercase transition-all duration-300 hover:scale-105 shadow-md"
            >
              <span>Book a Session</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}
