import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { FEES } from '../constants';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Lock, CreditCard, Truck, AlertCircle } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { state, subtotal, dispatch } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  useEffect(() => {
    if (state.items.length === 0) {
      navigate('/');
    }
  }, [state.items.length, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const shippingCost = subtotal > 5000 ? 0 : FEES.SHIPPING;
  const taxes = subtotal * FEES.TAX_RATE;
  const finalTotal = subtotal + shippingCost + taxes;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Mock Payment Processing
    try {
      // 1. Create Order Object
      const orderPayload = {
        items: state.items,
        totalAmount: finalTotal,
        customer: {
            name: formData.fullName,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            pincode: formData.pincode
        }
      };

      // 2. Send to API
      const order = await api.createOrder(orderPayload);

      // 3. Success
      dispatch({ type: 'CLEAR_CART' });
      navigate('/thank-you', { state: { order } });

    } catch (error) {
      console.error("Checkout error", error);
      alert("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl font-bold text-neutral-900 mb-8">Secure Checkout</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Form Section */}
          <section className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 sm:p-8 border border-neutral-200">
              <div className="mb-8">
                <h2 className="text-lg font-medium text-neutral-900 mb-4 flex items-center gap-2">
                  <Truck size={20} className="text-primary-700"/> Shipping Details
                </h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700">Full Name</label>
                    <div className="mt-1">
                      <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700">Email address</label>
                    <div className="mt-1">
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className="block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">Phone (Optional)</label>
                    <div className="mt-1">
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="address" className="block text-sm font-medium text-neutral-700">Street Address</label>
                    <div className="mt-1">
                      <input type="text" name="address" required value={formData.address} onChange={handleChange} className="block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="city" className="block text-sm font-medium text-neutral-700">City</label>
                    <div className="mt-1">
                      <input type="text" name="city" required value={formData.city} onChange={handleChange} className="block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="pincode" className="block text-sm font-medium text-neutral-700">Pincode / ZIP</label>
                    <div className="mt-1">
                      <input type="text" name="pincode" required value={formData.pincode} onChange={handleChange} className="block w-full border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2 px-3 border" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-8">
                <h2 className="text-lg font-medium text-neutral-900 mb-4 flex items-center gap-2">
                    <CreditCard size={20} className="text-primary-700"/> Payment (Sandbox)
                </h2>
                <div className="bg-neutral-50 p-4 rounded-md border border-neutral-200 mb-6">
                    <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-secondary-500 mt-0.5" />
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-neutral-800">Test Mode Active</h3>
                            <div className="mt-1 text-sm text-neutral-600">
                                No real payment will be captured. This is a demonstration using Stripe Mock logic.
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-700 hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors ${isProcessing ? 'cursor-not-allowed' : ''}`}
                >
                    {isProcessing ? 'Processing Order...' : `Pay Securely INR ${finalTotal.toLocaleString()}`}
                </button>
                <p className="mt-2 text-center text-xs text-neutral-500 flex items-center justify-center gap-1">
                    <Lock size={12} /> Encrypted and Secure
                </p>
              </div>
            </form>
          </section>

          {/* Order Summary */}
          <section className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-white shadow-sm rounded-lg border border-neutral-200 overflow-hidden">
                <div className="p-6 border-b border-neutral-200">
                    <h2 className="text-lg font-medium text-neutral-900">Order Summary</h2>
                </div>
                <div className="p-6">
                    <ul className="divide-y divide-neutral-200">
                        {state.items.map(item => (
                            <li key={item.id} className="flex py-4">
                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-neutral-900">
                                            <h3 className="text-sm">{item.name}</h3>
                                            <p className="text-sm">{item.currency} {(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                        <p className="mt-1 text-xs text-neutral-500">Qty {item.quantity}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                    <dl className="border-t border-neutral-200 pt-6 space-y-4">
                        <div className="flex items-center justify-between text-sm">
                            <dt className="text-neutral-600">Subtotal</dt>
                            <dd className="font-medium text-neutral-900">INR {subtotal.toLocaleString()}</dd>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <dt className="text-neutral-600">Shipping</dt>
                            <dd className="font-medium text-neutral-900">{shippingCost === 0 ? 'Free' : `INR ${shippingCost}`}</dd>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <dt className="text-neutral-600">Taxes (5%)</dt>
                            <dd className="font-medium text-neutral-900">INR {taxes.toLocaleString()}</dd>
                        </div>
                        <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
                            <dt className="text-base font-bold text-neutral-900">Total</dt>
                            <dd className="text-base font-bold text-primary-700">INR {finalTotal.toLocaleString()}</dd>
                        </div>
                    </dl>
                </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};