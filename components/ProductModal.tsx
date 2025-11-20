import React, { useState } from 'react';
import { X, Minus, Plus, CheckCircle, ImageOff } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { dispatch } = useCart();
  const [qty, setQty] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    // Add item multiple times based on qty
    for(let i=0; i<qty; i++) {
        dispatch({ type: 'ADD_ITEM', payload: product });
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      setQty(1);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-neutral-900 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4 z-10">
            <button
              type="button"
              className="bg-white/80 rounded-full p-1 text-neutral-400 hover:text-neutral-500 focus:outline-none"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X size={24} />
            </button>
          </div>

          <div className="sm:flex sm:items-start bg-white">
            <div className="w-full sm:w-1/2 aspect-square sm:aspect-auto relative bg-neutral-100">
                 {!imgError ? (
                   <img 
                     src={product.image} 
                     alt={product.name} 
                     className="w-full h-full object-cover"
                     onError={() => setImgError(true)}
                   />
                 ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400">
                      <ImageOff size={48} className="mb-2"/>
                      <p className="text-sm">Image not found</p>
                   </div>
                 )}
            </div>
            <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-2">{product.name}</h3>
                <p className="text-xl text-secondary-700 font-medium mb-4">{product.currency} {product.price.toLocaleString()}</p>
                
                <div className="mb-4">
                  <p className="text-neutral-600 text-sm leading-relaxed">{product.longDescription}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded capitalize">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center mb-4">
                    <label className="mr-4 text-sm font-medium text-neutral-700">Quantity</label>
                    <div className="flex items-center border border-neutral-300 rounded-md">
                        <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-neutral-100"><Minus size={16}/></button>
                        <span className="px-4 font-medium">{qty}</span>
                        <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-2 hover:bg-neutral-100"><Plus size={16}/></button>
                    </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={showSuccess || product.stock === 0}
                  className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white transition-all ${
                    showSuccess ? 'bg-green-600' : 'bg-primary-700 hover:bg-primary-900'
                  }`}
                >
                  {showSuccess ? (
                    <><CheckCircle className="mr-2" size={20}/> Added to Cart</>
                  ) : (
                    product.stock === 0 ? "Out of Stock" : "Add to Basket"
                  )}
                </button>
                <p className="mt-2 text-center text-xs text-neutral-500">
                    {product.stock > 0 ? `${product.stock} items left in stock` : 'Unavailable'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};