import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Printer, Home } from 'lucide-react';
import { Order } from '../types';

export const ThankYou: React.FC = () => {
  const location = useLocation();
  const order = location.state?.order as Order | undefined;

  if (!order) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 md:p-12 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-2">Thank you for your order!</h1>
          <p className="text-neutral-500 mb-8">We have received your order and will begin processing it immediately.</p>

          <div className="bg-neutral-50 rounded-lg p-6 mb-8 text-left">
            <div className="flex justify-between items-center mb-4 border-b border-neutral-200 pb-4">
                <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Order Number</p>
                    <p className="text-lg font-mono font-medium text-primary-700">{order.id}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Total Paid</p>
                    <p className="text-lg font-bold text-neutral-900">INR {order.totalAmount.toLocaleString()}</p>
                </div>
            </div>
            
            <div className="space-y-2">
                <p className="text-sm text-neutral-600"><span className="font-medium">Estimated Dispatch:</span> 2-3 Business Days</p>
                <p className="text-sm text-neutral-600"><span className="font-medium">Sent to:</span> {order.customer.email}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-700 hover:bg-primary-900 transition-colors"
            >
              <Home className="mr-2" size={18}/> Continue Shopping
            </Link>
            <button 
              onClick={() => window.print()}
              className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-base font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
            >
              <Printer className="mr-2" size={18}/> Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};