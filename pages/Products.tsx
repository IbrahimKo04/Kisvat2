import React, { useEffect, useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { api } from '../services/api';
import { Product, SortOption } from '../types';
import { FILTER_TAGS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const Products: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  
  const query = useQuery();
  const urlTag = query.get('tag');

  // Initial Data Load
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await api.getProducts();
      setAllProducts(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (urlTag) {
        const foundTag = FILTER_TAGS.find(t => t.includes(urlTag) || urlTag.includes(t));
        if (foundTag && !selectedTags.includes(foundTag)) {
            setSelectedTags([foundTag]);
        }
    }
  }, [urlTag]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (searchQuery) {
      const lowerQ = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerQ) || 
        p.tags.some(t => t.toLowerCase().includes(lowerQ))
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter(p => 
        selectedTags.some(tag => p.tags.includes(tag))
      );
    }

    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.reverse(); 
        break;
      default:
        break;
    }

    return result;
  }, [allProducts, searchQuery, selectedTags, sortOption]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="animate-fade-up">
             <h1 className="font-serif text-4xl font-bold text-neutral-900 mb-2">Our Collection</h1>
             <p className="text-neutral-500">Showing {filteredProducts.length} items</p>
          </div>
          
          <div className="flex items-center gap-4 animate-fade-up delay-100">
             {/* Search */}
             <div className="relative group">
               <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-700 transition-colors" />
               <input
                 type="text"
                 placeholder="Search..."
                 className="pl-10 pr-4 py-2.5 bg-neutral-50 border border-transparent hover:bg-neutral-100 focus:bg-white focus:border-neutral-200 rounded-full w-48 focus:w-64 transition-all outline-none text-sm"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
             </div>
             
             {/* Sort */}
             <div className="relative">
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                  <ChevronDown size={14} />
                </div>
                <select 
                  value={sortOption} 
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="appearance-none pl-4 pr-10 py-2.5 bg-neutral-50 border border-transparent hover:bg-neutral-100 rounded-full cursor-pointer outline-none text-sm font-medium text-neutral-700"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
             </div>
          </div>
        </div>

        {/* Tags Slicer - Stickyish */}
        <div className="sticky top-20 z-20 bg-white/95 backdrop-blur-sm py-4 mb-8 -mx-4 px-4 md:mx-0 md:px-0 border-b border-neutral-100 animate-fade-up delay-200">
           <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {selectedTags.length > 0 && (
                 <button 
                   onClick={() => setSelectedTags([])} 
                   className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium bg-neutral-100 text-neutral-500 hover:bg-neutral-200 transition-colors mr-2"
                 >
                   Clear
                 </button>
              )}
              {FILTER_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-900 text-white border-primary-900 shadow-md'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary-500 hover:text-primary-700'
                  }`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
           </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="text-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900 mx-auto"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32">
            <div className="inline-block p-6 rounded-full bg-neutral-100 mb-4">
               <Search size={32} className="text-neutral-400" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">No matches found</h3>
            <p className="text-neutral-500 mt-2">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedTags([]); }}
              className="mt-6 text-primary-700 font-bold hover:underline"
            >
              View all products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
             {filteredProducts.map((product, idx) => (
               <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${(idx % 4) * 100}ms` }}>
                  <ProductCard 
                    product={product} 
                    onOpenModal={setSelectedProduct}
                  />
               </div>
             ))}
          </div>
        )}
      </div>

      <ProductModal 
        isOpen={!!selectedProduct} 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
};