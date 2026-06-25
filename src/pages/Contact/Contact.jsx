import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Star, ChevronLeft, ChevronRight, Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import Footer from '../../components/Footer/Footer';

const TESTIMONIALS = [
  {
    quote: "Zero Gravity Photography captured our wedding in Jaipur with absolute perfection. Every detail, from the royal palace backdrop to the candid tears, was portrayed with editorial elegance. The team is extremely professional and their artistic direction is second to none.",
    couple: "Aditi & Rahul",
    location: "Jaipur Palace, India",
    rating: 5
  },
  {
    quote: "An absolute dream to work with! They documented our beach wedding in Goa with cinematic finesse. The shots are light, airy, and full of raw emotion. We will cherish these timeless frames forever.",
    couple: "Sneha & Keith",
    location: "Goa Beachfront Resort, India",
    rating: 5
  },
  {
    quote: "Their fine-art documentary style is unparalleled. They travelled to Kerala for our backwater destination wedding and delivered shots that look straight out of a luxury magazine. Truly outstanding work!",
    couple: "Meera & Arjun",
    location: "Kumarakom Lake Resort, Kerala",
    rating: 5
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    event: 'Wedding',
    date: '',
    location: '',
    time: '',
    crowdstrength: '',
    message: ''
  });

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        event: 'Wedding',
        date: '',
        location: '',
        time: '',
        crowdstrength: '',
        message: ''
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="min-h-screen bg-bg-dark pt-24 text-black font-body">
      
      {/* Banner Header */}
      <section className="relative h-[35vh] md:h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80"
          alt="Contact Header"
          className="absolute inset-0 w-full h-full object-cover opacity-45 grayscale"
        />
        <div className="relative z-20 text-center px-6">
          <h1 className="font-heading text-4xl md:text-5xl font-light text-white tracking-wide uppercase">
            Contacts
          </h1>
          <p className="text-[10px] font-heading tracking-[0.25em] text-brand-pink uppercase mt-2 font-semibold">
            Home / Contacts
          </p>
        </div>
      </section>

      {/* Main Grid Info Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
        
        {/* Three Columns Info Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white border border-black/5 p-8 rounded-2xl shadow-sm">
          {/* Card 1: Email */}
          <div className="flex flex-col items-center text-center p-6 space-y-4 border-r border-black/5 last:border-r-0">
            <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-black">
              Send Email
            </h3>
            <div className="text-xs text-text-muted font-light space-y-1">
              <p>info@zerogravityphotography.com</p>
              <p>bookings@zerogravityphotography.com</p>
            </div>
          </div>

          {/* Card 2: Phone */}
          <div className="flex flex-col items-center text-center p-6 space-y-4 border-r border-black/5 last:border-r-0">
            <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-black">
              Call Us
            </h3>
            <div className="text-sm font-semibold text-black tracking-wide">
              +91 90030 11999
            </div>
          </div>

          {/* Card 3: Address */}
          <div className="flex flex-col items-center text-center p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-black">
              Visit Us
            </h3>
            <p className="text-xs text-text-muted font-light max-w-[200px] leading-relaxed">
              Chennai Head Office, Zero Gravity Photography, Nungambakkam, Chennai - 600034
            </p>
          </div>
        </section>

        {/* DROP US A LINE FORM */}
        <section className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="font-heading text-2xl md:text-3xl font-light tracking-wide uppercase text-black">
              Book Your Story
            </h2>
            <p className="text-xs text-text-muted font-light">
              Fill out the details below to check availability for your destination wedding or shoot.
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-brand-pink/10 border border-brand-pink/20 rounded-xl p-8 text-center text-brand-pink-dark font-medium text-xs uppercase tracking-wider"
            >
              Thank you! Your inquiry has been sent successfully. We will get in touch shortly.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name, Email, Phone */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-[9px] font-heading tracking-widest text-brand-pink uppercase font-semibold">Your Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full bg-white border border-black/10 focus:border-brand-pink rounded-lg py-3 px-4 text-xs outline-none transition-colors text-black placeholder:text-black/35 font-medium shadow-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-heading tracking-widest text-brand-pink uppercase font-semibold">Your Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                    className="w-full bg-white border border-black/10 focus:border-brand-pink rounded-lg py-3 px-4 text-xs outline-none transition-colors text-black placeholder:text-black/35 font-medium shadow-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-heading tracking-widest text-brand-pink uppercase font-semibold">Phone Number*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    required
                    className="w-full bg-white border border-black/10 focus:border-brand-pink rounded-lg py-3 px-4 text-xs outline-none transition-colors text-black placeholder:text-black/35 font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Row 2: City, Event type, Date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-[9px] font-heading tracking-widest text-brand-pink uppercase font-semibold">City*</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Your Current City"
                    required
                    className="w-full bg-white border border-black/10 focus:border-brand-pink rounded-lg py-3 px-4 text-xs outline-none transition-colors text-black placeholder:text-black/35 font-medium shadow-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-heading tracking-widest text-brand-pink uppercase font-semibold">Select Event Type*</label>
                  <select
                    name="event"
                    value={formData.event}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-black/10 focus:border-brand-pink rounded-lg py-3 px-4 text-xs outline-none transition-colors text-black font-medium shadow-sm"
                  >
                    <option value="Wedding">Destination Wedding</option>
                    <option value="Pre-Wedding">Pre-Wedding Shoot</option>
                    <option value="Fashion">Fashion Editorial</option>
                    <option value="Portrait">Fine Art Portrait</option>
                    <option value="Other">Other Event</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-heading tracking-widest text-brand-pink uppercase font-semibold">Event Date*</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-black/10 focus:border-brand-pink rounded-lg py-3 px-4 text-xs outline-none transition-colors text-black font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Row 3: Location, Time, Crowd strength */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-[9px] font-heading tracking-widest text-brand-pink uppercase font-semibold">Event Location*</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Venue / City / Country"
                    required
                    className="w-full bg-white border border-black/10 focus:border-brand-pink rounded-lg py-3 px-4 text-xs outline-none transition-colors text-black placeholder:text-black/35 font-medium shadow-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-heading tracking-widest text-brand-pink uppercase font-semibold">Event Time*</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-black/10 focus:border-brand-pink rounded-lg py-3 px-4 text-xs outline-none transition-colors text-black font-medium shadow-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-heading tracking-widest text-brand-pink uppercase font-semibold">Crowd Strength (Guest Count)*</label>
                  <input
                    type="number"
                    name="crowdstrength"
                    value={formData.crowdstrength}
                    onChange={handleChange}
                    placeholder="Approx. guest count"
                    required
                    min="1"
                    className="w-full bg-white border border-black/10 focus:border-brand-pink rounded-lg py-3 px-4 text-xs outline-none transition-colors text-black placeholder:text-black/35 font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Message Box */}
              <div className="space-y-1">
                <label className="text-[9px] font-heading tracking-widest text-brand-pink uppercase font-semibold">Message Box*</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your love story, themes, or custom requests..."
                  rows="5"
                  required
                  className="w-full bg-white border border-black/10 focus:border-brand-pink rounded-lg py-3 px-4 text-xs outline-none transition-colors text-black placeholder:text-black/35 font-medium shadow-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center space-x-2 border-2 border-black hover:bg-black hover:text-white px-10 py-4 text-[10px] font-heading tracking-[0.25em] uppercase font-bold transition-all shadow rounded-md cursor-pointer"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-3.5 h-3.5 text-brand-pink" />
                </button>
              </div>
            </form>
          )}
        </section>

        {/* SECTION: Luxury Testimonials Slider */}
        <section className="py-16 border-t border-black/5 bg-white rounded-2xl border border-black/5 p-8 shadow-sm">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold">Kind Words</span>
            
            {/* Big quote mark icon */}
            <div className="flex justify-center">
              <span className="text-6xl font-serif text-brand-pink select-none">“</span>
            </div>

            {/* Carousel quotes */}
            <div className="min-h-[140px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <p className="font-heading text-base md:text-lg font-light italic leading-relaxed text-black/85">
                    {TESTIMONIALS[activeTestimonial].quote}
                  </p>
                  <div className="space-y-1">
                    <h4 className="font-heading text-xs font-semibold tracking-wider text-black">
                      {TESTIMONIALS[activeTestimonial].couple}
                    </h4>
                    <p className="text-[10px] text-brand-pink-dark tracking-widest uppercase">
                      {TESTIMONIALS[activeTestimonial].location}
                    </p>
                  </div>
                  
                  {/* Stars Rating */}
                  <div className="flex justify-center gap-1">
                    {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-brand-pink text-brand-pink" />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider arrows */}
            <div className="flex justify-center items-center space-x-6 pt-4">
              <button
                onClick={prevTestimonial}
                className="p-2.5 rounded-full border border-black/5 hover:border-brand-pink text-black/60 hover:text-brand-pink transition-all bg-bg-dark cursor-pointer shadow-xs"
                aria-label="Previous quote"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2.5 rounded-full border border-black/5 hover:border-brand-pink text-black/60 hover:text-brand-pink transition-all bg-bg-dark cursor-pointer shadow-xs"
                aria-label="Next quote"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </section>

      </div>

      {/* Full-Width Maps Frame at the very bottom with light pink border line */}
      <section className="w-full px-6 md:px-12 py-8 bg-white border-t border-black/5 mt-16 flex flex-col items-center">
        <div className="w-full max-w-7xl border-4 border-brand-pink p-2 bg-white rounded-2xl overflow-hidden shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4622.078958875185!2d80.24200035445166!3d13.055417376145295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526644fb145589%3A0xecc6216b122e39a!2sZero%20Gravity%20Photography%20-%20Wedding%20Photography%20In%20Chennai!5e0!3m2!1sen!2sin!4v1782391740014!5m2!1sen!2sin" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="strict-origin-when-cross-origin"
            title="Zero Gravity Chennai Head Office Map"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
