import { motion } from "motion/react";
import { trackEvent } from "../lib/api";

export const StoryPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Heritage</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-8 leading-tight">A Century of Sweetness</h1>
            <p className="text-stone-600 text-lg leading-relaxed mb-6">
              It began in 1924, in a small corner of Lisbon's Alfama district. Our founder, Diogo d'Ouro, believed that a perfect pastry could brighten even the greyest day.
            </p>
            <p className="text-stone-600 text-lg leading-relaxed">
              Today, we carry that same torch. Every Pastel de Nata that leaves our oven is a testament to three generations of dedication, secret recipes, and the finest Portuguese ingredients.
            </p>
          </motion.div>
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1000" 
              alt="Old Bakery" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="bg-stone-900 rounded-[3rem] p-12 md:p-24 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12">The Pillars of d'Ouro</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Tradition', desc: 'Recipes passed down through handwritten journals.' },
              { title: 'Quality', desc: 'Local eggs, stone-milled flour, and pure butter.' },
              { title: 'Community', desc: 'Supporting our local farmers and artisans.' }
            ].map((pillar, i) => (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => trackEvent('pillar_click', { pillar: pillar.title })}
              >
                <h3 className="text-2xl font-serif font-bold mb-4 text-amber-400">{pillar.title}</h3>
                <p className="text-stone-400">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};