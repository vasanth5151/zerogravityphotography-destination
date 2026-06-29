import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Compass, Award, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { aboutStats, timelineEvents, awardsList } from '../../data/mockData';
import Footer from '../../components/Footer/Footer';
import Ajay from '../../assets/Ajay.webp';

// A simple count-up statistic component styled for light theme
function StatItem({ value, label, icon: Icon }) {
  const [count, setCount] = useState(0);
  const target = parseInt(value, 10) || 0;

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="bg-white border border-black/5 rounded-xl p-8 flex flex-col items-center text-center hover:border-brand-pink/40 shadow-sm transition-all duration-300 group">
      <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-4xl md:text-5xl font-heading font-light text-black mb-2">
        {count}+
      </div>
      <div className="text-[10px] font-heading tracking-[0.25em] text-text-muted uppercase">
        {label}
      </div>
    </div>
  );
}

const testimonials = [
  {
    id: 1,
    name: "Deepa & James Wilson",
    location: "The Savoy, London, UK",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    text1: "Zero Gravity captured our wedding at The Savoy with extraordinary skill and editorial elegance. From our traditional ceremonies to the grand reception in the Thames Foyer, every candid shot radiates pure, genuine emotion.",
    text2: "Their team worked seamlessly across cultures, making both families feel completely comfortable. They traveled far, worked tirelessly, and delivered a collection of images that went far beyond our highest expectations. Absolutely world-class."
  },
  {
    id: 2,
    name: "Jack & Sofia",
    location: "Castle Estates, Europe",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80",
    text1: "At Zero Gravity Photography, we believe that every moment of your special day deserves to be captured with heart and artistry. Our team of passionate photographers specializes in turning fleeting moments into timeless memories that you'll cherish forever.",
    text2: "From candid emotions to breathtaking portraits, we are dedicated to documenting your wedding story with a creative touch and a personalized approach. Let us preserve the beauty, joy, and love of your celebration, so you can relive it for years to come."
  },
  {
    id: 3,
    name: "Priya & Karthik Rajan",
    location: "Park Chateau, New Jersey, USA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    text1: "We had over 400 guests at our multi-day New Jersey wedding and Zero Gravity handled the entire event flawlessly. The cinematic drone footage of our outdoor ceremony and the candid moments captured are breathtaking.",
    text2: "They didn't force us into artificial poses, instead capturing the real laughter, tears, and energy of the celebration. They are extremely professional, creative, and passionate about their craft. Worth every single mile they traveled!"
  }
];

export default function About() {
  const iconMap = [Award, Compass, Users, Heart];
  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const getVisibleIndices = () => {
    const len = testimonials.length;
    const prev = (activeIndex - 1 + len) % len;
    const next = (activeIndex + 1) % len;
    return [prev, activeIndex, next];
  };

  const visibleIndices = getVisibleIndices();

  return (
    <div className="min-h-screen bg-bg-dark pt-24 text-black">
      {/* Editorial Header Banner (Dark overlay for photo legibility) */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80"
          alt="Studio Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-45 filter grayscale"
        />
        <div className="relative z-20 text-center px-6">
          <p className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase mb-4 font-semibold">
            Our Story
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-light tracking-wide text-white">
            International Wedding Photography
          </h1>
        </div>
      </section>

      {/* Profile & History Split Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Image Card with luxury frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-brand-pink/30 rounded translate-x-2 translate-y-2 pointer-events-none" />
            <img
              src={Ajay}
              alt="Aria Benjamin Founder"
              className="relative z-10 w-full aspect-[4/5] object-cover rounded shadow-lg"
            />
          </motion.div>

          {/* Right: Company Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-light text-black leading-tight">
              We Don't Just Take Photos. <span className="text-brand-pink">We Capture Souls.</span>
            </h2>
            <p className="text-text-muted text-[15px] font-body leading-relaxed">
              An engineer turned photographer, Ajay Kumar founded Zero Gravity Photography with one belief every wedding has a story waiting to be told. What began as a creative passion in Chennai quickly grew into one of India's most sought-after wedding photography studios, now operating globally across the UK, USA, Europe, Southeast Asia, and the Middle East.
              Ajay's candid, documentary-driven approach means no excessive posing, no artificial moments just genuine emotions, beautifully preserved. Today, Zero Gravity travels to English heritage estates, Scottish Highland castles, New York rooftop venues, California vineyards, and Parisian gardens to document love stories from the Indian diaspora and couples worldwide. Email: ajay@zgstudios.com
            </p>


            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-black/5">
              <div>
                <h4 className="text-[10px] font-heading tracking-[0.2em] uppercase text-brand-pink font-semibold mb-2">Our Mission</h4>
                <p className="text-[15px] text-text-muted font-body leading-relaxed">To document your wedding whether in London, New York, Bali, or Chennai with candid storytelling that captures real emotions and creates a legacy you will treasure for generations.</p>
              </div>
              <div>
                <h4 className="text-[10px] font-heading tracking-[0.2em] uppercase text-brand-pink font-semibold mb-2">Our Vision</h4>
                <p className="text-[15px] text-text-muted font-body leading-relaxed">To be the most trusted international wedding photography studio for the global Indian diaspora and couples seeking authentic, fine-art documentary coverage worldwide.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Statistics Grid */}
      <section className="bg-white py-20 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutStats.map((stat, index) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
                icon={iconMap[index] || Award}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Chronological Timeline Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-16">
          <p className="text-[10px] font-heading tracking-[0.25em] text-brand-pink uppercase mb-2 font-semibold">Our Journey</p>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-black">From Chennai to The World</h2>
        </div>

        <div className="relative border-l border-black/10 max-w-4xl mx-auto pl-8 md:pl-12 space-y-12">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 rounded-full bg-bg-dark border border-brand-pink flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-brand-pink" />
              </div>

              {/* Year Label */}
              <span className="inline-block text-[10px] font-heading font-bold tracking-widest text-brand-pink bg-brand-pink/10 px-3 py-1 rounded-full mb-3">
                {event.year}
              </span>

              {/* Content */}
              <h3 className="font-heading text-xl font-light text-black mb-2">{event.title}</h3>
              <p className="text-[15px] text-text-muted font-light leading-relaxed max-w-2xl">{event.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials / Customer Feedback Section */}
      <section className="bg-white py-24 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <div className="w-8 h-[1px] bg-brand-pink/40" />
              <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">
                Testimonials
              </span>
              <div className="w-8 h-[1px] bg-brand-pink/40" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-black tracking-wide">
              Our Happy Clients
            </h2>
          </div>

          {/* Carousel Layout wrapper */}
          <div className="max-w-4xl mx-auto flex flex-col items-center">

            {/* Avatars Row with navigation */}
            <div className="flex items-center justify-center space-x-6 md:space-x-12 select-none mb-8">
              {/* Left Arrow Button */}
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-brand-pink/20 hover:border-brand-pink hover:bg-brand-pink/5 text-brand-pink/60 hover:text-brand-pink flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Avatars */}
              <div className="flex items-center space-x-4 md:space-x-8">
                {visibleIndices.map((idx, pos) => {
                  const isActive = pos === 1; // Middle element is active
                  const item = testimonials[idx];
                  return (
                    <div
                      key={item.id}
                      onClick={() => !isActive && setActiveIndex(idx)}
                      className={`relative transition-all duration-500 transform ${isActive
                        ? 'scale-115 z-10 cursor-default'
                        : 'scale-90 opacity-40 hover:opacity-75 cursor-pointer'
                        }`}
                    >
                      <div className={`rounded-full overflow-hidden transition-all duration-500 ${isActive ? 'border-2 border-brand-pink p-1 bg-white ring-4 ring-brand-pink/10 shadow-lg' : ''
                        }`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover select-none pointer-events-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-brand-pink/20 hover:border-brand-pink hover:bg-brand-pink/5 text-brand-pink/60 hover:text-brand-pink flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Selected Name & Location */}
            <div className="text-center mb-4">
              <h3 className="font-heading text-lg font-light text-black tracking-wide">
                {testimonials[activeIndex].name}
              </h3>
              <p className="text-[10px] font-heading tracking-[0.2em] text-[#E5A9B4] uppercase mt-1">
                {testimonials[activeIndex].location}
              </p>
            </div>

            {/* Quotation Icon */}
            <div className="flex justify-center text-brand-pink/30 mb-6">
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Testimonial Text Paragraphs */}
            <div className="text-center max-w-2xl px-4 space-y-4">
              <p className="text-[15px] text-text-muted font-light leading-relaxed italic">
                {testimonials[activeIndex].text1}
              </p>
              <p className="text-[15px] text-text-muted font-light leading-relaxed italic">
                {testimonials[activeIndex].text2}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Awards & Achievements Table */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-4">
            <p className="text-[10px] font-heading tracking-[0.25em] text-brand-pink uppercase font-semibold">Global Recognition</p>
            <h2 className="font-heading text-3xl font-light text-black leading-tight">Awards & Accolades</h2>
            <p className="text-[15px] text-text-muted font-light leading-relaxed">
              Our work across the UK, USA, Europe, and Asia has earned recognition from leading wedding industry bodies, publications, and couple communities worldwide.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/10 text-[10px] font-heading tracking-[0.2em] text-black/50 uppercase">
                    <th className="pb-4">Award Title</th>
                    <th className="pb-4">Presented By</th>
                    <th className="pb-4 text-right">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 font-light text-sm text-text-muted">
                  {awardsList.map((award, index) => (
                    <tr key={index} className="hover:text-black transition-colors">
                      <td className="py-4 text-black font-heading">{award.title}</td>
                      <td className="py-4">{award.organization}</td>
                      <td className="py-4 text-right text-brand-pink">{award.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Book Session CTA (Warm Light Pink Luxury Layout) */}
      <section className="bg-brand-pink-light py-20 border-y border-black/5 text-center relative overflow-hidden">
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 space-y-6 relative z-10">
          <p className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">
            UK · USA · Europe · Asia · Middle East
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-light text-black">
            We Travel Everywhere Your Love Story Takes Us
          </h2>
          <p className="text-[15px] text-text-muted max-w-xl mx-auto font-light leading-relaxed">
            From London to Los Angeles, from Edinburgh to New York, Zero Gravity Photography documents destination weddings across the globe. Reach out to check availability for your date and destination.
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
