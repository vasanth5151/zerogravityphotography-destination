import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Camera, Calendar, Heart } from 'lucide-react';
import Footer from '../../components/Footer/Footer';

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-dark pt-24 text-black font-body flex flex-col justify-between">
      
      {/* Main thank you card section */}
      <section className="flex-grow flex items-center justify-center py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-xl w-full bg-white border border-black/5 rounded-3xl p-8 md:p-12 text-center shadow-lg space-y-8 relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute -right-16 -top-16 w-36 h-36 bg-brand-pink/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-36 h-36 bg-brand-pink/10 rounded-full blur-2xl pointer-events-none" />

          {/* Icon Circle */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
              className="w-20 h-20 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink border border-brand-pink/20"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <span className="text-[10px] font-heading tracking-[0.3em] text-brand-pink uppercase font-semibold block">
              Inquiry Received
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-light text-black uppercase tracking-wide leading-tight">
              THANK YOU FOR <br />
              <span className="font-semibold">CHOOSING US</span>
            </h1>
            <div className="w-12 h-[1.5px] bg-brand-pink mx-auto mt-2" />
          </div>

          {/* Description */}
          <p className="text-[15px] text-text-muted font-light leading-relaxed max-w-sm mx-auto">
            Your inquiry has been successfully recorded. We have forwarded the details to our events management and planning team. We will check availability for your date and get back to you within 24 hours.
          </p>

          {/* Helpful Next Steps list */}
          <div className="bg-bg-dark border border-black/5 rounded-2xl p-5 text-left space-y-4">
            <h4 className="text-[10px] font-heading tracking-[0.2em] uppercase text-black font-semibold border-b border-black/5 pb-2">
              What Happens Next?
            </h4>
            <div className="space-y-3 text-xs text-text-muted">
              <div className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-1.5 flex-shrink-0" />
                <p>We review your date, location, and event specification details.</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-1.5 flex-shrink-0" />
                <p>A coordinator reaches out via email or phone with availability and custom portfolio details.</p>
              </div>
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-pink hover:bg-brand-pink-dark text-white px-8 py-3.5 rounded-full text-[10px] font-heading tracking-[0.2em] uppercase transition-all duration-300 font-semibold shadow-sm"
            >
              <span>Back To Home</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/galleries')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 border border-black/10 hover:border-brand-pink hover:text-brand-pink px-8 py-3.5 rounded-full text-[10px] font-heading tracking-[0.2em] uppercase transition-all duration-300 font-semibold"
            >
              <Camera className="w-3.5 h-3.5 text-brand-pink" />
              <span>Explore Galleries</span>
            </button>
          </div>

        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
