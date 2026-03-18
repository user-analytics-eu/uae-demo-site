import React, { useState, useEffect, useRef } from 'react';
import { trackEvent } from "../lib/api";
import { motion } from 'motion/react';
import { ChevronRight, ShoppingBag, Star } from 'lucide-react';

export const WholesalePage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('wholesale_inquiry_submit');
    setSubmitted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-24 px-6"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-serif font-bold text-stone-900 mb-6">Wholesale Partnerships</h1>
            <p className="text-stone-600 text-lg mb-8 leading-relaxed">
              Bring the authentic taste of Portugal to your café, restaurant, or hotel. We provide daily fresh delivery and frozen bake-off options for partners worldwide.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Premium Quality</h4>
                  <p className="text-sm text-stone-500">The same recipes used in our flagship Lisbon bakery.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Flexible Ordering</h4>
                  <p className="text-sm text-stone-500">Low minimums and reliable global logistics.</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => trackEvent('download_catalog')}
              className="mt-12 px-8 py-4 bg-stone-100 text-stone-900 rounded-full font-bold hover:bg-stone-200 transition-colors flex items-center gap-2"
            >
              Download Wholesale Catalog
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-stone-100 shadow-xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 fill-current" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">Inquiry Received</h3>
                <p className="text-stone-500">Our wholesale team will contact you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-amber-600 font-bold hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-stone-900 mb-2">Business Name</label>
                  <input type="text" required className="w-full px-6 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-amber-600 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-900 mb-2">Contact Name</label>
                  <input type="text" required className="w-full px-6 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-amber-600 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-900 mb-2">Email Address</label>
                  <input type="email" required className="w-full px-6 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-amber-600 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-900 mb-2">Monthly Volume Estimate</label>
                  <select className="w-full px-6 py-4 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-amber-600 outline-none appearance-none bg-white">
                    <option>100 - 500 units</option>
                    <option>500 - 2,000 units</option>
                    <option>2,000+ units</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-amber-600 text-white rounded-2xl font-bold text-lg hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};