import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Camera, ArrowRight, Heart, Instagram, Facebook } from 'lucide-react';

const PinterestIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0"/>
  </svg>
);

const VimeoIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.92 11.237c-.366 1.748-.86 3.197-1.48 4.346-.623 1.15-1.344 1.724-2.164 1.724-.59 0-1.107-.55-1.545-1.645-.44-1.096-.998-3.323-1.674-6.685-.68-3.362-1.382-5.042-2.108-5.042-.142 0-.616.294-1.42.884L1.75 3.32C3 2.193 4.293 1.455 5.632 1.103c1.782-.47 2.87.568 3.266 3.113.438 2.81 1.05 6.096 1.833 9.855.334 1.58.643 2.37.926 2.37.382 0 .86-.713 1.437-2.137.575-1.424.877-2.52.906-3.287.058-1.564-.476-2.346-1.6-2.346-.532 0-1.085.122-1.657.368 1.09-3.565 3.194-5.38 6.31-5.45 2.316-.05 3.413 1.45 3.29 4.5-.122 3.11-.973 6.068-2.553 8.87-1.58 2.802-3.1 4.204-4.56 4.204-1.357 0-2.115-1.282-2.274-3.847l-.145-2.004z" />
  </svg>
);

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
          <div className="flex space-x-3.5">
            <a
              href="https://www.instagram.com/zerogravityphotography/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-black/60 hover:text-brand-pink hover:border-brand-pink transition-all duration-300 shadow-xs"
              aria-label="Follow us on Instagram"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://in.pinterest.com/zerogravityphotography/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-black/60 hover:text-brand-pink hover:border-brand-pink transition-all duration-300 shadow-xs"
              aria-label="Follow us on Pinterest"
              title="Pinterest"
            >
              <PinterestIcon className="w-4 h-4" />
            </a>
            <a
              href="https://vimeo.com/zerogravityphotography"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-black/60 hover:text-brand-pink hover:border-brand-pink transition-all duration-300 shadow-xs"
              aria-label="Follow us on Vimeo"
              title="Vimeo"
            >
              <VimeoIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/zerogravitystudios/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-black/60 hover:text-brand-pink hover:border-brand-pink transition-all duration-300 shadow-xs"
              aria-label="Follow us on Facebook"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
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
            {[
              'United States',
              'New Jersey',
              'Singapore',
              'Paris',
              'Muscat',
              'Jaipur',
              'Goa',
              'Bali',
              'Srilanka',
              'Andaman',
              'Kerala'
            ].map((loc) => {
              const slug = loc.toLowerCase().replace(/\s+/g, '-');
              return (
                <li key={loc}>
                  <NavLink to={`/destination/${slug}`} className="hover:text-black transition-colors">
                    {loc}
                  </NavLink>
                </li>
              );
            })}
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
