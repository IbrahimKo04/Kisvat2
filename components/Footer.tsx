import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-serif font-bold">K</div>
              <span className="font-serif text-xl font-bold tracking-wide">Kiswat Creations</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Handcrafted elegance for the modern soul. Specializing in exclusive Ridas, bridal wear, and curated gifts.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary-500 mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/products?filter=ridas" className="hover:text-white transition-colors">Daily Ridas</Link></li>
              <li><Link to="/products?filter=bridal" className="hover:text-white transition-colors">Bridal Collection</Link></li>
              <li><Link to="/products?filter=gifts" className="hover:text-white transition-colors">Gifts</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary-500 mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-primary-500" />
                <span>123 Market Street, Bohra Bazar,<br/>Mumbai, 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary-500" />
                <span>hello@kiswatcreations.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-secondary-500 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Instagram size={24} /></a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors"><Facebook size={24} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Kiswat Creations. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-neutral-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-neutral-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};