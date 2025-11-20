import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitted');
    // Reset after delay
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-neutral-900 mb-4">Get in Touch</h1>
          <p className="text-neutral-600">Have a question about a custom Rida or bulk order? We're here to help.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-serif font-bold text-primary-700 mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-secondary-100 p-3 rounded-full">
                  <MapPin className="text-secondary-700" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">Visit Us</h3>
                  <p className="text-neutral-600">123 Market Street, Bohra Bazar<br/>Mumbai, Maharashtra 400001</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary-100 p-3 rounded-full">
                  <Mail className="text-secondary-700" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">Email Us</h3>
                  <p className="text-neutral-600">hello@kiswatcreations.com</p>
                  <p className="text-neutral-600">support@kiswatcreations.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary-100 p-3 rounded-full">
                  <Phone className="text-secondary-700" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">Call Us</h3>
                  <p className="text-neutral-600">+91 98765 43210</p>
                  <p className="text-xs text-neutral-500">Mon-Sat: 10am - 7pm</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 h-48 bg-neutral-200 rounded-lg overflow-hidden relative">
               {/* RENAME PHOTO TO: contact-map.jpg */}
               <img 
                  src="/images/contact-map.jpg" 
                  alt="Map Location" 
                  className="w-full h-full object-cover opacity-80" 
                  onError={(e) => {
                     (e.target as HTMLImageElement).style.display = 'none';
                     (e.target as HTMLImageElement).parentElement!.innerHTML += '<div class="flex items-center justify-center h-full text-sm text-neutral-500">Map Image Missing</div>';
                  }}
               />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <span className="bg-white/80 px-4 py-2 rounded font-bold text-sm backdrop-blur-sm shadow-sm">Mumbai Store</span>
               </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-serif font-bold text-primary-700 mb-6">Send us a Message</h2>
            
            {status === 'submitted' ? (
              <div className="bg-green-50 text-green-800 p-4 rounded-md flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-600"></div>
                Message sent successfully! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Name</label>
                  <input type="text" id="name" required className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700">Email</label>
                  <input type="email" id="email" required className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700">Subject</label>
                  <input type="text" id="subject" required className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700">Message</label>
                  <textarea id="message" rows={4} required className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:ring-primary-500 focus:border-primary-500"></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-700 hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                  <Send size={18} className="mr-2" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};