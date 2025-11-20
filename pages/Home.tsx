import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronRight, ImageOff } from 'lucide-react';
import { api } from '../services/api';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';

// Helper for fallback images
const LocalImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-neutral-200 text-neutral-400 p-4 text-center ${className}`}>
        <ImageOff size={24} className="mb-2"/>
        <span className="text-xs">Missing: {src.split('/').pop()}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadFeatured = async () => {
      const all = await api.getProducts();
      setFeaturedProducts(all.slice(0, 4));
    };
    loadFeatured();
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Modern Split Hero */}
      <section className="relative bg-neutral-50 min-h-screen flex items-center pt-20">
        {/* Decorative background blob */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[600px] h-[600px] bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[400px] h-[400px] bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="order-2 lg:order-1 space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-primary-100 shadow-sm text-primary-800 text-xs font-bold tracking-widest uppercase animate-fade-up">
              New Collection 2024
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-neutral-900 leading-[1.1] animate-fade-up delay-100">
              Modesty woven with <span className="text-primary-700 italic">grace.</span>
            </h1>
            <p className="text-lg text-neutral-600 max-w-lg leading-relaxed animate-fade-up delay-200">
              Discover Kiswat Creations — where traditional craftsmanship meets contemporary elegance. Exclusive Ridas, bridal wear, and spiritual gifts.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <Link 
                to="/products" 
                className="bg-primary-900 text-white hover:bg-primary-800 px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
              >
                Shop Now <ChevronRight size={18} />
              </Link>
              <Link 
                to="/about" 
                className="bg-white text-neutral-900 border border-neutral-200 hover:border-primary-500 hover:text-primary-700 px-8 py-4 rounded-full font-medium transition-all"
              >
                Our Story
              </Link>
            </div>
            
            <div className="flex items-center gap-4 pt-8 animate-fade-up delay-500">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full bg-neutral-200 border-2 border-white bg-cover bg-center" style={{ backgroundImage: `url(https://picsum.photos/seed/user${i}/100)` }}></div>
                 ))}
               </div>
               <div className="text-sm">
                 <div className="flex text-secondary-500"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
                 <p className="text-neutral-500">Loved by 500+ customers</p>
               </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative animate-fade-up delay-200">
            <div className="relative h-[500px] w-full">
              {/* RENAME PHOTO TO: hero-banner.jpg */}
              <LocalImage 
                src="/images/hero-banner.jpg" 
                alt="Elegant Rida" 
                className="absolute inset-0 w-full h-full object-cover rounded-tl-[120px] rounded-br-[120px] rounded-tr-2xl rounded-bl-2xl shadow-2xl z-10"
              />
              {/* Floating element */}
              <div className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block animate-fade-in delay-500">
                 <p className="font-serif text-xl font-bold text-neutral-900">"Timeless."</p>
                 <p className="text-sm text-neutral-500 mt-1">Hand-embroidered details ensuring every piece is unique.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections - Masonry Style */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-serif text-4xl font-bold text-neutral-900">Curated Collections</h2>
            <Link to="/products" className="hidden md:flex text-primary-700 font-medium items-center gap-2 hover:gap-3 transition-all">View All <ArrowRight size={20}/></Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[500px]">
            {/* Large Left Item */}
            <Link to="/products?tag=exclusive%20ridas" className="group md:col-span-2 relative overflow-hidden rounded-2xl h-[300px] md:h-full cursor-pointer">
              {/* RENAME PHOTO TO: collection-exclusive.jpg */}
              <LocalImage src="/images/collection-exclusive.jpg" alt="Exclusive" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                 <div className="absolute bottom-0 left-0 p-8">
                   <span className="text-secondary-400 text-sm font-bold tracking-wider uppercase mb-2 block">Signature Series</span>
                   <h3 className="text-white font-serif text-3xl font-bold">Exclusive Ridas</h3>
                 </div>
              </div>
            </Link>

            {/* Right Column */}
            <div className="flex flex-col gap-6 h-full">
              <Link to="/products?tag=bridal%20ridas" className="group relative overflow-hidden rounded-2xl flex-1 cursor-pointer h-[250px] md:h-auto">
                {/* RENAME PHOTO TO: collection-bridal.jpg */}
                <LocalImage src="/images/collection-bridal.jpg" alt="Bridal" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <h3 className="text-white font-serif text-2xl font-bold">Bridal Wear</h3>
                </div>
              </Link>
              <Link to="/products?tag=gifts" className="group relative overflow-hidden rounded-2xl flex-1 cursor-pointer h-[250px] md:h-auto">
                {/* RENAME PHOTO TO: collection-gifts.jpg */}
                <LocalImage src="/images/collection-gifts.jpg" alt="Gifts" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <h3 className="text-white font-serif text-2xl font-bold">Gifts & Masallahs</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl font-bold text-neutral-900 mb-4">Trending Now</h2>
            <div className="h-1 w-20 bg-secondary-500 mx-auto rounded-full"></div>
            <p className="text-neutral-500 mt-4 text-lg">Favorites from our community, hand-picked for you.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => (
              <div key={product.id} className={`animate-fade-up`} style={{ animationDelay: `${idx * 100}ms` }}>
                <ProductCard 
                  product={product} 
                  onOpenModal={setSelectedProduct}
                />
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Link to="/products" className="inline-block border border-neutral-900 text-neutral-900 px-10 py-3 rounded-full font-medium hover:bg-neutral-900 hover:text-white transition-colors">
               Shop All Products
             </Link>
          </div>
        </div>
      </section>

      <ProductModal 
        isOpen={!!selectedProduct} 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};