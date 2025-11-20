import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { state, dispatch, subtotal } = useCart();
  const { items, isOpen } = state;

  if (!isOpen) return null;

  return (
    <div className="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div 
        className="fixed inset-0 bg-neutral-900 bg-opacity-50 transition-opacity backdrop-blur-sm"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      ></div>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                
                {/* Header */}
                <div className="flex-shrink-0 flex items-center justify-between px-4 py-6 sm:px-6 border-b border-neutral-100">
                  <h2 className="text-lg font-serif font-medium text-neutral-900" id="slide-over-title">Shopping Basket</h2>
                  <button
                    type="button"
                    className="-m-2 p-2 text-neutral-400 hover:text-neutral-500"
                    onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                  >
                    <span className="sr-only">Close panel</span>
                    <X size={24} />
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                      <ShoppingBagIcon className="h-16 w-16 text-neutral-300" />
                      <p className="text-neutral-500 font-medium">Your basket at Kiswat Creations is empty.</p>
                      <p className="text-sm text-neutral-400">Discover beautiful ridas and exclusive gifts.</p>
                      <button 
                        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                        className="mt-4 text-primary-700 font-bold hover:underline"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-neutral-100">
                        {items.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-neutral-900">
                                  <h3 className="font-serif"><a href="#">{item.name}</a></h3>
                                  <p className="ml-4">{item.currency} {item.price.toLocaleString()}</p>
                                </div>
                                <p className="mt-1 text-sm text-neutral-500 line-clamp-1">{item.shortDescription}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center border border-neutral-300 rounded-md">
                                  <button 
                                    onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                                    className="p-1 hover:bg-neutral-100 text-neutral-600"
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className="px-2 font-medium">{item.quantity}</span>
                                  <button 
                                    onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                                    className="p-1 hover:bg-neutral-100 text-neutral-600"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                                  className="font-medium text-red-500 hover:text-red-700 flex items-center gap-1"
                                >
                                  <Trash2 size={16} />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="border-t border-neutral-100 px-4 py-6 sm:px-6 bg-neutral-50">
                    <div className="flex justify-between text-base font-medium text-neutral-900">
                      <p>Subtotal</p>
                      <p>INR {subtotal.toLocaleString()}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-neutral-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <Link
                        to="/checkout"
                        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                        className="flex items-center justify-center rounded-md border border-transparent bg-primary-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-900 transition-colors"
                      >
                        Checkout
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-neutral-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          className="font-medium text-primary-700 hover:text-primary-500"
                          onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ShoppingBagIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
    )
}