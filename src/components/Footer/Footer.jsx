import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Camera, ArrowRight, Heart } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 4000);
    }
  };

  return (
    <footer className="bg-white border-t border-black/5 pt-16 pb-8 px-6 md:px-12 text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Description */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Zero Gravity Photography Logo" className="w-7 h-7 object-contain rounded-full flex-shrink-0" />
            <span className="font-heading text-base font-light tracking-[0.2em] uppercase">
              ZERO GRAVITY PHOTOGRAPHY<span className="text-brand-pink font-semibold">.</span>
            </span>
          </div>
          <p className="text-xs text-text-muted font-light leading-relaxed">
            Capturing timeless romance and raw editorial elegance. Based in Europe, traveling globally for luxury destination weddings.
          </p>
          <div className="flex space-x-4">
            {['Instagram', 'Pinterest', 'Vimeo', 'Facebook'].map((platform) => (
              <a
                key={platform}
                href={`#${platform.toLowerCase()}`}
                className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-black/60 hover:text-brand-pink hover:border-brand-pink transition-all duration-300"
                aria-label={`Follow us on ${platform}`}
              >
                <span className="text-[10px] font-heading tracking-tight font-semibold">
                  {platform.substring(0, 2).toUpperCase()}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-brand-pink mb-6">
            Explore
          </h4>
          <ul className="space-y-3 text-xs font-light text-text-muted">
            <li>
              <NavLink to="/" className="hover:text-black transition-colors">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-black transition-colors">About Story</NavLink>
            </li>
            <li>
              <NavLink to="/services" className="hover:text-black transition-colors font-light">Services & Pricing</NavLink>
            </li>
            <li>
              <NavLink to="/destination" className="hover:text-black transition-colors font-light">Destination Weddings</NavLink>
            </li>
            <li>
              <NavLink to="/galleries" className="hover:text-black transition-colors">Gallery Albums</NavLink>
            </li>
            <li>
              <NavLink to="/blog" className="hover:text-black transition-colors font-light">Wedding Journal</NavLink>
            </li>
          </ul>
        </div>

        {/* Destination Spots */}
        <div>
          <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-brand-pink mb-6">
            Destinations
          </h4>
          <ul className="space-y-3 text-xs font-light text-text-muted">
            <li className="hover:text-black transition-colors cursor-pointer">Lake Como, Italy</li>
            <li className="hover:text-black transition-colors cursor-pointer">Santorini, Greece</li>
            <li className="hover:text-black transition-colors cursor-pointer">Amalfi Coast, Italy</li>
            <li className="hover:text-black transition-colors cursor-pointer">French Riviera, France</li>
            <li className="hover:text-black transition-colors cursor-pointer">Marrakech, Morocco</li>
            <li className="hover:text-black transition-colors cursor-pointer">Tuscany Countryside</li>
          </ul>
        </div>

        {/* Newsletter form */}
        <div>
          <h4 className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-brand-pink mb-6">
            The Journal
          </h4>
          <p className="text-xs text-text-muted font-light leading-relaxed mb-6">
            Subscribe to receive styling guidance, destination scouting updates, and exclusive session bookings.
          </p>
          <form onSubmit={handleSubscribe} className="relative border-b border-black/20 focus-within:border-brand-pink transition-colors pb-2">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-xs w-full outline-none placeholder:text-black/30 text-black font-light pr-10"
              required
            />
            <button
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-black/60 hover:text-brand-pink transition-colors"
              aria-label="Submit newsletter form"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          {isSubmitted && (
            <p className="text-[10px] text-brand-pink mt-2 font-heading transition-all">
              Welcome to our inner circle. Thank you!
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between text-[11px] text-text-muted font-light">
        <p>© {new Date().getFullYear()} ZERO GRAVITY PHOTOGRAPHY. All rights reserved.</p>
        <p className="mt-4 md:mt-0 flex items-center gap-1">
          Designed with <Heart className="w-3 h-3 text-brand-pink fill-brand-pink" /> for Fine-Art Destination Weddings.
        </p>
      </div>
    </footer>
  );
}
