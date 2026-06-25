import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import Footer from '../../components/Footer/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
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
              <p>info@example.com</p>
              <p>contacts@example.com</p>
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
              800 1234 56 78
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
              4036 N Highland St, Arlington VA 22201, USA
            </p>
          </div>
        </section>

        {/* DROP US A LINE FORM */}
        <section className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="font-heading text-2xl md:text-3xl font-light tracking-wide uppercase text-black">
              Drop Us a Line
            </h2>
            <p className="text-xs text-text-muted font-light">
              You can contact us to ask questions, answer questions booking
            </p>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-brand-pink/10 border border-brand-pink/20 rounded-xl p-8 text-center text-brand-pink-dark font-medium text-xs uppercase tracking-wider"
            >
              Thank you! Your message has been sent successfully.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row of 3 inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name*"
                  required
                  className="w-full bg-white border border-black/10 focus:border-brand-pink rounded-lg py-3 px-4 text-xs outline-none transition-colors text-black placeholder:text-black/35 font-medium shadow-sm"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email*"
                  required
                  className="w-full bg-white border border-black/10 focus:border-brand-pink rounded-lg py-3 px-4 text-xs outline-none transition-colors text-black placeholder:text-black/35 font-medium shadow-sm"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone*"
                  className="w-full bg-white border border-black/10 focus:border-brand-pink rounded-lg py-3 px-4 text-xs outline-none transition-colors text-black placeholder:text-black/35 font-medium shadow-sm"
                />
              </div>

              {/* Message */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                className="w-full bg-white border border-black/10 focus:border-brand-pink rounded-lg py-3 px-4 text-xs outline-none transition-colors text-black placeholder:text-black/35 font-medium shadow-sm resize-none"
              />

              {/* Bordered square Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center space-x-2 border-2 border-black hover:bg-black hover:text-white px-8 py-3.5 text-[10px] font-heading tracking-[0.25em] uppercase font-bold transition-all shadow"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5 text-brand-pink" />
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Side-by-side Portals (Double Portrait Images & Descriptive Sidebar) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t border-black/5 items-center">
          
          {/* Left: Two Portrait Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden aspect-[3/4] shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" 
                alt="Portrait work 1" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[3/4] shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80" 
                alt="Portrait work 2" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Right: How to shoot sidebar details */}
          <div className="space-y-6">
            <span className="text-[10px] font-heading tracking-[0.25em] text-brand-pink uppercase font-semibold">
              How Does The Photo
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-black leading-tight">
              We are fine-art, wedding & portrait film photographers from NY
            </h2>
            <p className="text-xs text-text-muted font-light leading-relaxed">
              I shoot because I see. I shoot because if I don't, I don't know who will. Activism is seen as a dirty word. I shoot because I find peace in being especially active, and being a vigorous advocate for a cause.
            </p>
            <div className="pt-2">
              <Link
                to="/work"
                className="inline-flex items-center space-x-2 border border-black/20 hover:border-brand-pink hover:bg-brand-pink/5 text-[9px] font-heading tracking-[0.25em] uppercase px-6 py-3 rounded-md text-black transition-all font-semibold"
              >
                <span>See Our Works</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-pink" />
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* Full-Width Maps Frame at the very bottom */}
      <section className="w-full h-[400px] relative bg-white border-t border-black/5 mt-16 overflow-hidden">
        {/* Custom Map frame overlay */}
        <div className="absolute inset-0 bg-white/70 z-10 flex flex-col items-center justify-center p-6 text-center text-black">
          <MapPin className="w-8 h-8 text-brand-pink animate-bounce mb-3" />
          <h3 className="font-heading text-xl font-light">Global Consultation Lounge</h3>
          <p className="text-xs text-text-muted max-w-sm">
            4036 N Highland St, Arlington VA 22201, USA. Consultations by appointment.
          </p>
        </div>
        {/* Static styled map background */}
        <div className="w-full h-full opacity-10 bg-[radial-gradient(#121214_1px,transparent_1px)] [background-size:16px_16px] flex items-center justify-center">
          <span className="text-[120px] font-heading font-light text-black/5 select-none tracking-widest">MAPS</span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
