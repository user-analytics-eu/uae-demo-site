import { ShoppingBag } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { trackEvent } from '../lib/api';

const Navbar = ({ onNavigate, currentPage }: { onNavigate: (page: string) => void, currentPage: string }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex justify-between items-center">
      <button 
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2"
      >
        <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-serif italic text-xl">D</div>
        <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">Pastelaria d'Ouro</span>
      </button>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
        <button 
          onClick={() => onNavigate('shop')} 
          className={`transition-colors ${currentPage === 'shop' ? 'text-amber-600 font-bold' : 'hover:text-amber-600'}`}
        >
          Shop
        </button>
        <button 
          onClick={() => onNavigate('story')} 
          className={`transition-colors ${currentPage === 'story' ? 'text-amber-600 font-bold' : 'hover:text-amber-600'}`}
        >
          Our Story
        </button>
        <button 
          onClick={() => onNavigate('locations')} 
          className={`transition-colors ${currentPage === 'locations' ? 'text-amber-600 font-bold' : 'hover:text-amber-600'}`}
        >
          Locations
        </button>
        <button 
          onClick={() => onNavigate('wholesale')} 
          className={`transition-colors ${currentPage === 'wholesale' ? 'text-amber-600 font-bold' : 'hover:text-amber-600'}`}
        >
          Wholesale
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => trackEvent('cart_open')}
          className="relative p-2 hover:bg-stone-100 rounded-full transition-colors"
        >
          <ShoppingBag className="w-6 h-6 text-stone-800" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-amber-600 text-white text-[10px] flex items-center justify-center rounded-full">3</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;