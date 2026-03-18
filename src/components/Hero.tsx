import { motion } from "motion/react";
import { trackEvent } from "../lib/api";
import { ChevronRight } from "lucide-react";

const Hero = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <section className="relative pt-24 min-h-[70vh] flex items-center overflow-hidden bg-stone-900">
      <div className="relative z-10 px-6 w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 text-left">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-amber-400 font-serif italic text-lg mb-4"
            >
              Established 1924 in Lisbon
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight"
            >
              The Golden Standard of Portuguese Pastry
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-white/90 mb-6 max-w-lg"
            >
              Handcrafted pastries inspired by time-honoured Portuguese recipes — made daily with the finest ingredients.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <button
                id="hero-cta-primary"
                onClick={() => {
                  trackEvent("cta_click", { id: "hero-primary", label: "Order Now" });
                  onNavigate("shop");
                }}
                className="px-6 py-3 bg-amber-600 text-white rounded-full font-bold text-lg hover:bg-amber-700 transition-all flex items-center gap-2 group"
              >
                Order Now
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-cta-secondary"
                onClick={() => {
                  trackEvent("cta_click", { id: "hero-secondary", label: "View Menu" });
                  onNavigate("shop");
                }}
                className="px-6 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
              >
                View Menu
              </button>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="w-full h-56 md:h-[520px] rounded-xl overflow-hidden shadow-2xl bg-stone-800"
            >
              <img
                src="https://images.unsplash.com/photo-1598233847491-f0607be1b640?auto=format&fit=crop&q=80&w=1200"
                alt="Assortment of Portuguese pastries"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;