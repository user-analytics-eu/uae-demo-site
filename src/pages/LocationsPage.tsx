import { motion } from "motion/react";
import { trackEvent } from "../lib/api";
import { ExternalLink } from "lucide-react";

export const LocationsPage = () => {
  const locations = [
    { city: 'Lisbon', address: 'Rua Augusta 124, 1100-053 Lisboa', phone: '+351 21 345 6789', image: 'https://images.unsplash.com/photo-1580741569354-08fed7fc1143?auto=format&fit=crop&q=80&w=800' },
    { city: 'Porto', address: 'Rua de Santa Catarina 312, 4000-443 Porto', phone: '+351 22 123 4567', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=800' },
    { city: 'London', address: '15 Greek St, Soho, London W1D 4DP', phone: '+44 20 7123 4567', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800' },
    { city: 'New York', address: '245 Bleecker St, New York, NY 10014', phone: '+1 212 555 0123', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-stone-900 mb-4">Find Us</h1>
          <p className="text-stone-600 text-lg">Visit our bakeries around the world for a taste of Lisbon.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((loc, i) => (
            <motion.div 
              key={loc.city}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col sm:flex-row"
            >
              <div className="sm:w-1/2 aspect-square sm:aspect-auto overflow-hidden">
                <img 
                  src={loc.image} 
                  alt={loc.city} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="sm:w-1/2 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">{loc.city}</h3>
                <p className="text-stone-500 text-sm mb-4">{loc.address}</p>
                <p className="text-stone-900 font-medium text-sm mb-6">{loc.phone}</p>
                <button 
                  onClick={() => trackEvent('get_directions', { city: loc.city })}
                  className="w-full py-3 border border-stone-900 text-stone-900 rounded-xl font-bold hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Get Directions
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};