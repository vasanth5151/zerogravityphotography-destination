import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Minus, ArrowRight, Camera, Film, Compass, Heart } from 'lucide-react';
import { servicesList, pricingPackages, processRoadmap, faqAccordion } from '../../data/mockData';
import Footer from '../../components/Footer/Footer';

function FaqItem({ q, a, isActive, onClick }) {
  return (
    <div className="border-b border-black/10 py-4">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left py-2 group focus:outline-none"
      >
        <span className="font-heading text-base md:text-lg font-light text-black group-hover:text-brand-pink transition-colors">
          {q}
        </span>
        <div className="text-brand-pink ml-4">
          {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-text-muted font-light leading-relaxed pt-2 pb-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Services() {
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const icons = [Camera, Film, Heart, Compass];

  const handleFaqClick = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-bg-dark pt-24 text-black">
      {/* Header Banner */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80"
          alt="Services Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-45 grayscale"
        />
        <div className="relative z-20 text-center px-6">
          <p className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase mb-4 font-semibold">Bespoke Collections</p>
          <h1 className="font-heading text-4xl md:text-6xl font-light tracking-wide text-white">Services & Pricing</h1>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="text-[10px] font-heading tracking-[0.25em] text-brand-pink uppercase font-semibold">Our Expertise</p>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-black">Fine-Art Offerings</h2>
          <p className="text-xs text-text-muted font-light leading-relaxed">
            We offer fully customized, high-end photography and cinematography packages. Every project includes comprehensive scouting, professional styling assistance, and digital post-production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesList.map((service, index) => {
            const IconComponent = icons[index] || Camera;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white border border-black/5 hover:border-brand-pink/30 rounded-xl p-8 space-y-6 flex flex-col justify-between transition-all duration-300 group shadow-sm animate-fade-in"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-2xl font-light text-black">{service.title}</h3>
                  <p className="text-xs text-text-muted font-light leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Bullet features list */}
                  <ul className="space-y-2 pt-2">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2 text-xs text-text-muted font-light">
                        <Check className="w-4 h-4 text-brand-pink flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[10px] font-heading tracking-[0.2em] text-black/40 uppercase">Starting Price</span>
                  <span className="font-heading text-lg font-light text-brand-pink">{service.price}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* The Creative Process Roadmap */}
      <section className="bg-white py-20 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <p className="text-[10px] font-heading tracking-[0.25em] text-brand-pink uppercase font-semibold">The Journey</p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-black font-semibold">How We Work Together</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processRoadmap.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="space-y-4 relative"
              >
                {/* Step Number */}
                <div className="text-5xl md:text-6xl font-heading font-light text-brand-pink/20 tracking-tighter">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg font-semibold text-black">{item.title}</h3>
                <p className="text-xs text-text-muted font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers Table */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="text-[10px] font-heading tracking-[0.25em] text-brand-pink uppercase font-semibold">Collections</p>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-black">Investment Tiers</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingPackages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.accent
                  ? 'bg-white border-2 border-brand-pink shadow-lg scale-105 z-10'
                  : 'bg-white/80 border border-black/5 hover:border-brand-pink/20 shadow-sm'
              }`}
            >
              {pkg.accent && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-pink text-bg-dark text-[9px] font-heading tracking-[0.2em] px-4 py-1.5 rounded-full uppercase shadow font-semibold">
                  Recommended Package
                </span>
              )}
              
              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <h3 className="font-heading text-2xl font-light text-black pt-2">{pkg.name}</h3>
                  <p className="text-xs text-text-muted font-light">{pkg.description}</p>
                </div>
                
                <div className="text-center py-4 border-y border-black/5">
                  <span className="font-heading text-4xl md:text-5xl font-light text-brand-pink">{pkg.price}</span>
                </div>

                <ul className="space-y-3 pt-2">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2 text-xs text-text-muted font-light">
                      <Check className="w-4 h-4 text-brand-pink flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/contact"
                  className={`w-full block text-center py-4 rounded-full text-[10px] font-heading tracking-[0.2em] uppercase transition-all duration-300 ${
                    pkg.accent
                      ? 'bg-black text-white hover:bg-black/85 font-semibold'
                      : 'border border-black/20 hover:border-brand-pink/50 hover:bg-black/5 text-black'
                  }`}
                >
                  Reserve Date
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-black/5">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[10px] font-heading tracking-[0.25em] text-brand-pink uppercase font-semibold">Faq</p>
          <h2 className="font-heading text-3xl font-light text-black">Frequently Asked Queries</h2>
        </div>

        <div className="space-y-2">
          {faqAccordion.map((faq, index) => (
            <FaqItem
              key={index}
              q={faq.q}
              a={faq.a}
              isActive={activeFaqIndex === index}
              onClick={() => handleFaqClick(index)}
            />
          ))}
        </div>
      </section>

      {/* Custom Reservation Banner */}
      <section className="bg-brand-pink-light py-20 border-t border-black/5 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 space-y-6 relative z-10">
          <p className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">
            Bespoke Services
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-light text-black">
            Need a Customized Wedding Package?
          </h2>
          <p className="text-xs text-text-muted max-w-xl mx-auto font-light leading-relaxed">
            Every destination is unique. Let's arrange a customized photography plan matching your guest itinerary and days sequence.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-3 bg-black hover:bg-black/85 px-8 py-4 rounded-full text-[10px] font-heading tracking-[0.2em] text-white uppercase transition-all duration-300 hover:scale-105 shadow-md"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
