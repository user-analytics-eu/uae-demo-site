import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Pastry } from './types';
import { PASTRIES } from './constants';
import { trackEvent } from './lib/api';
import { ProductCard } from './components/ProductCard';
import { StoryPage } from './pages/StoryPage';
import { LocationsPage } from './pages/LocationsPage';
import { WholesalePage } from './pages/WholesalePage';
import Hero from './components/Hero';
import Newsletter from './components/Newsletter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { useNavigate, useLocation } from 'react-router-dom';


// --- Main App ---

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathToPage = (path: string) => {
    if (path.startsWith('/shop')) return 'shop';
    if (path.startsWith('/story')) return 'story';
    if (path.startsWith('/locations')) return 'locations';
    if (path.startsWith('/wholesale')) return 'wholesale';
    return 'home';
  };
  const currentPage = pathToPage(location.pathname);
  const [selectedPastry, setSelectedPastry] = useState<Pastry | null>(null);
  const [filter, setFilter] = useState<'All' | 'Classic' | 'Regional'>('All');

  useEffect(() => {
    trackEvent('page_view', { page: currentPage });
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    trackEvent('nav_click', { target: page });
    switch (page) {
      case 'shop':
        navigate('/shop');
        break;
      case 'story':
        navigate('/story');
        break;
      case 'locations':
        navigate('/locations');
        break;
      case 'wholesale':
        navigate('/wholesale');
        break;
      default:
        navigate('/');
    }
  };

  const filteredPastries = filter === 'All' 
    ? PASTRIES 
    : PASTRIES.filter(p => p.category === filter);

  const renderContent = () => {
    switch (currentPage) {
      case 'shop':
        return (
          <section className="py-24 px-6 max-w-7xl mx-auto pt-32">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
              <div>
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-amber-600 font-bold uppercase tracking-[0.2em] text-sm mb-4 block"
                >
                  Our Collection
                </motion.span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">Handcrafted Delights</h2>
              </div>
              <div className="flex bg-white p-1 rounded-full border border-stone-200 shadow-sm">
                {['All', 'Classic', 'Regional'].map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFilter(f as any);
                      trackEvent('filter_change', { filter: f });
                    }}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                      filter === f ? 'bg-stone-900 text-white shadow-md' : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredPastries.map((pastry) => (
                  <ProductCard 
                    key={pastry.id} 
                    pastry={pastry} 
                    onOpenDetail={setSelectedPastry} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </section>
        );
      case 'story':
        return <StoryPage />;
      case 'locations':
        return <LocationsPage />;
      case 'wholesale':
        return <WholesalePage />;
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />

            <section className="py-24 px-6 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                <div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-amber-600 font-bold uppercase tracking-[0.2em] text-sm mb-4 block"
                  >
                    Featured Pastries
                  </motion.span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">Lisbon's Finest</h2>
                </div>
                <button 
                  onClick={() => handleNavigate('shop')}
                  className="text-amber-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  View All Shop
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {PASTRIES.slice(0, 3).map((pastry) => (
                  <ProductCard 
                    key={pastry.id} 
                    pastry={pastry} 
                    onOpenDetail={setSelectedPastry} 
                  />
                ))}
              </div>
            </section>

            <section className="py-24 bg-stone-900 text-white overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                 {/* Decorative pattern could go here */}
              </div>
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-amber-400 font-serif italic text-2xl mb-4 block">The Secret Ingredient</span>
                  <h2 className="text-5xl font-serif font-bold mb-8 leading-tight">Tradition Baked into Every Bite</h2>
                  <p className="text-stone-400 text-lg mb-8 leading-relaxed">
                    Our recipes haven't changed in a century. We source our eggs from local Alentejo farms, our flour from traditional stone mills, and our passion from the streets of Belém.
                  </p>
                  <button 
                    onClick={() => {
                      trackEvent('cta_click', { id: 'story-cta', label: 'Read Our Story' });
                      handleNavigate('story');
                    }}
                    className="px-8 py-4 bg-white text-stone-900 rounded-full font-bold hover:bg-stone-200 transition-colors flex items-center gap-2 group"
                  >
                    Read Our Story
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
                >
                  <img 
                    src="photo-1555507036-ab1f4038808a.avif" 
                    alt="Bakery Interior" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </section>

            <Newsletter />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      
      <main>
        {renderContent()}
      </main>

      <Footer onNavigate={handleNavigate} />

      <AnimatePresence>
        {selectedPastry && (
          <ProductDetailModal 
            pastry={selectedPastry} 
            onClose={() => setSelectedPastry(null)} 
          />
        )}
      </AnimatePresence>

      {/* Analytics Debug Overlay (Optional, for testing) */}
      <div className="fixed bottom-4 left-4 z-[200] pointer-events-none">
        <div className="bg-stone-900/90 text-white text-[10px] p-2 rounded-lg font-mono shadow-xl border border-white/10">
          Analytics Debug Active
        </div>
      </div>
    </div>
  );
}
