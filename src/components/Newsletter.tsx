import React, { useState, useEffect, useRef } from 'react';
import { trackEvent } from "../lib/api";
import { Mail } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('newsletter_signup', { email });
    setEmail('');
    alert('Obrigado! You have been subscribed.');
  };

  return (
    <section className="py-24 bg-amber-50 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">Join the Confraria</h2>
        <p className="text-stone-600 mb-8 text-lg">Subscribe to receive exclusive offers, recipes, and news from our Lisbon bakery.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input 
            type="email" 
            required
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-4 rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
          />
          <button 
            type="submit"
            className="px-8 py-4 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
          >
            Subscribe
            <Mail className="w-5 h-5" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;