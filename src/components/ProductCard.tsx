import { AnimatePresence, motion } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import { trackEvent } from '../lib/api';
import { Pastry } from '../types';
import { ArrowRight, Heart, Share2, ShoppingBag, Star } from 'lucide-react';


export const ProductCard = ({ pastry, onOpenDetail }: { pastry: Pastry, onOpenDetail: (p: Pastry) => void, key?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      layout
      onMouseEnter={() => {
        setIsHovered(true);
        trackEvent('product_hover', { id: pastry.id, name: pastry.name });
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={pastry.image} 
          alt={pastry.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              trackEvent('wishlist_add', { id: pastry.id });
            }}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-stone-800 hover:text-red-500 transition-colors shadow-sm"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              trackEvent('share_click', { id: pastry.id });
            }}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-stone-800 hover:text-amber-600 transition-colors shadow-sm"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-x-4 bottom-4"
            >
              <button 
                onClick={() => {
                  trackEvent('quick_add_to_cart', { id: pastry.id, price: pastry.price });
                }}
                className="w-full py-3 bg-amber-600 text-white rounded-2xl font-bold shadow-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Quick Add
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1 block">{pastry.category}</span>
            <h3 className="text-xl font-serif font-bold text-stone-900">{pastry.name}</h3>
          </div>
          <span className="text-lg font-bold text-stone-900">€{pastry.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-1 mb-4">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(pastry.rating) ? 'fill-current' : ''}`} />
            ))}
          </div>
          <span className="text-xs text-stone-500">({pastry.reviews})</span>
        </div>
        <button 
          onClick={() => {
            trackEvent('view_details', { id: pastry.id });
            onOpenDetail(pastry);
          }}
          className="text-sm font-bold text-stone-900 flex items-center gap-1 group/btn"
        >
          Learn More
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};