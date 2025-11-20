import React, { useState } from 'react';
import { Plus, Eye, ImageOff } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenModal }) => {
  const { dispatch } = useCart();
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <div 
      className="group relative flex flex-col h-full cursor-pointer"
      onClick={() => onOpenModal(product)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center text-neutral-400 bg-neutral-200">
            <ImageOff size={32} className="mb-2" />
            <span className="text-xs text-center px-4">Put <strong>{product.image.split('/').pop()}</strong> in public/images</span>
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
           <button
             onClick={(e) => { e.stopPropagation(); onOpenModal(product); }}
             className="bg-white p-3 rounded-full shadow-lg text-neutral-900 hover:bg-neutral-100 transition-colors"
             aria-label="Quick View"
           >
             <Eye size={20} />
           </button>
           <button
             onClick={handleAddToCart}
             className="bg-primary-900 p-3 rounded-full shadow-lg text-white hover:bg-primary-800 transition-colors"
             aria-label="Add to cart"
           >
             <Plus size={20} />
           </button>
        </div>
        
        {/* Badge */}
        {product.stock < 5 && product.stock > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Low Stock
            </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg text-neutral-900 font-serif font-bold group-hover:text-primary-700 transition-colors">
                {product.name}
                </h3>
                <p className="mt-1 text-sm text-neutral-500 line-clamp-1">{product.shortDescription}</p>
            </div>
            <p className="text-lg font-medium text-primary-900 whitespace-nowrap ml-2">
                {product.currency} {product.price.toLocaleString()}
            </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.tags.slice(0, 2).map(tag => (
            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-neutral-100 text-neutral-500 uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};