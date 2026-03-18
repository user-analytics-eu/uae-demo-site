import { Facebook, Instagram, Twitter } from "lucide-react";
import { trackEvent } from "../lib/api";

const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 text-white mb-6">
            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-serif italic text-lg">D</div>
            <span className="font-serif text-xl font-bold tracking-tight">Pastelaria d'Ouro</span>
          </div>
          <p className="text-sm leading-relaxed mb-6 italic">
            "Preserving the sweet traditions of Portugal since 1924. From our ovens to your heart."
          </p>
          <div className="flex gap-4">
            <button onClick={() => trackEvent('social_click', { platform: 'instagram' })} className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></button>
            <button onClick={() => trackEvent('social_click', { platform: 'facebook' })} className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></button>
            <button onClick={() => trackEvent('social_click', { platform: 'twitter' })} className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></button>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Shop</h4>
          <ul className="space-y-4 text-sm">
            <li><button onClick={() => { trackEvent('footer_link_click', { link: 'all-pastries' }); onNavigate('shop'); }} className="hover:text-white transition-colors">All Pastries</button></li>
            <li><button onClick={() => { trackEvent('footer_link_click', { link: 'gift-boxes' }); onNavigate('shop'); }} className="hover:text-white transition-colors">Gift Boxes</button></li>
            <li><button onClick={() => { trackEvent('footer_link_click', { link: 'bakery-kits' }); onNavigate('shop'); }} className="hover:text-white transition-colors">Bakery Kits</button></li>
            <li><button onClick={() => { trackEvent('footer_link_click', { link: 'merchandise' }); onNavigate('shop'); }} className="hover:text-white transition-colors">Merchandise</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><button onClick={() => { trackEvent('footer_link_click', { link: 'about' }); onNavigate('story'); }} className="hover:text-white transition-colors">About Us</button></li>
            <li><button onClick={() => trackEvent('footer_link_click', { link: 'careers' })} className="hover:text-white transition-colors">Careers</button></li>
            <li><button onClick={() => trackEvent('footer_link_click', { link: 'sustainability' })} className="hover:text-white transition-colors">Sustainability</button></li>
            <li><button onClick={() => trackEvent('footer_link_click', { link: 'press' })} className="hover:text-white transition-colors">Press</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Support</h4>
          <ul className="space-y-4 text-sm">
            <li><button onClick={() => trackEvent('footer_link_click', { link: 'shipping' })} className="hover:text-white transition-colors">Shipping Info</button></li>
            <li><button onClick={() => trackEvent('footer_link_click', { link: 'returns' })} className="hover:text-white transition-colors">Returns</button></li>
            <li><button onClick={() => trackEvent('footer_link_click', { link: 'faq' })} className="hover:text-white transition-colors">FAQ</button></li>
            <li><button onClick={() => { trackEvent('footer_link_click', { link: 'contact' }); onNavigate('locations'); }} className="hover:text-white transition-colors">Contact Us</button></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© 2026 Pastelaria d'Ouro. All rights reserved.</p>
        <div className="flex gap-8">
          <button onClick={() => trackEvent('legal_click', { type: 'privacy' })} className="hover:text-white transition-colors">Privacy Policy</button>
          <button onClick={() => trackEvent('legal_click', { type: 'terms' })} className="hover:text-white transition-colors">Terms of Service</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;