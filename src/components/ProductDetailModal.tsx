import React, { useState, useEffect, useRef } from 'react';
import { Pastry } from '../types';
import { trackEvent } from '../lib/api';
import { motion } from 'motion/react';
import { ChevronRight, Heart, Info, Pause, Play, ShoppingBag, Star } from 'lucide-react';


export const ProductDetailModal = ({ pastry, onClose }: { pastry: Pastry, onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        trackEvent('video_pause', { id: pastry.id });
      } else {
        videoRef.current.play();
        trackEvent('video_play', { id: pastry.id });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-stone-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-[2rem] overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:w-1/2 relative bg-stone-100 h-64 md:h-auto">
          {pastry.videoUrl ? (
            <div className="relative w-full h-full">
              <video 
                ref={videoRef}
                src={pastry.videoUrl}
                className="w-full h-full object-cover"
                loop
                muted
                onEnded={() => trackEvent('video_complete', { id: pastry.id })}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={toggleVideo}
                  className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-stone-900 shadow-xl hover:scale-110 transition-transform"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </button>
              </div>
            </div>
          ) : (
            <img 
              src={pastry.image} 
              alt={pastry.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <span className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2 block">{pastry.category}</span>
          <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">{pastry.name}</h2>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-stone-900">€{pastry.price.toFixed(2)}</span>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-amber-400 fill-current" />
              <span className="font-bold text-stone-900">{pastry.rating}</span>
              <span className="text-stone-500">({pastry.reviews} reviews)</span>
            </div>
          </div>
          <p className="text-stone-600 leading-relaxed mb-8 text-lg">
            {pastry.description}
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-stone-700">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                <Info className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Allergens: Gluten, Eggs, Dairy, Nuts</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => trackEvent('add_to_cart', { id: pastry.id, source: 'modal', price: pastry.price })}
              className="flex-1 py-4 bg-stone-900 text-white rounded-2xl font-bold text-lg hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-6 h-6" />
              Add to Cart
            </button>
            <button 
              onClick={() => trackEvent('wishlist_add', { id: pastry.id, source: 'modal' })}
              className="p-4 border border-stone-200 rounded-2xl text-stone-800 hover:bg-stone-50 transition-colors"
            >
              <Heart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

