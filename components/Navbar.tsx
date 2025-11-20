import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { totalItems, dispatch } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/products' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-40 transition-all duration-300 ease-in-out ${
          scrolled || isMobileMenuOpen
            ? 'glass-panel shadow-sm py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo & Brand */}
            <div className="flex-shrink-0 flex items-center cursor-pointer group">
              <Link to="/" className="flex items-center gap-3">
                {!logoError ? (
                  <img 
                    src="/images/logo.png" 
                    alt="Kiswat Creations" 
                    className="h-12 w-auto object-contain"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl transition-all duration-300 shadow-lg ${scrolled ? 'bg-primary-700' : 'bg-primary-900'}`}>
                    K
                  </div>
                )}
                
                <div className="flex flex-col">
                  <span className={`font-serif text-xl font-bold tracking-wide transition-colors duration-300 ${scrolled ? 'text-primary-900' : 'text-primary-900'}`}>
                    Kiswat Creations
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-neutral-600 hover:text-primary-700 px-4 py-2 text-sm font-medium transition-all hover:bg-primary-50 rounded-full"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2">
              <Link to="/products" className="p-2 text-neutral-500 hover:text-primary-700 transition-colors hidden sm:block">
                <Search size={20} />
              </Link>
              
              <button
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className="relative p-2 text-neutral-600 hover:text-primary-700 transition-transform hover:scale-105"
                aria-label="Open cart"
              >
                <ShoppingBag size={22} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-secondary-500 rounded-full shadow-md animate-fade-in">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <div className="md:hidden flex items-center ml-2">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-neutral-600 hover:text-primary-700 focus:outline-none p-1"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white pt-24 px-6 animate-fade-in md:hidden flex flex-col">
          <div className="space-y-6 text-center">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                to={link.path}
                style={{ animationDelay: `${idx * 50}ms` }}
                className="block text-2xl font-serif font-medium text-neutral-800 hover:text-primary-700 animate-fade-up"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-8 border-t border-neutral-100">
               <p className="text-sm text-neutral-400 uppercase tracking-widest mb-4">Contact</p>
               <p className="text-neutral-600">+91 98765 43210</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};