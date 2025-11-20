import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

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

export const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative h-[60vh] bg-neutral-900">
        <div className="absolute inset-0 overflow-hidden">
            {/* RENAME PHOTO TO: about-hero.jpg */}
            <LocalImage 
                src="/images/about-hero.jpg" 
                alt="Fabrics and Patterns" 
                className="w-full h-full object-cover opacity-60"
            />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 animate-fade-up">Our Story</h1>
                <p className="text-xl text-neutral-200 max-w-2xl mx-auto animate-fade-up delay-100">Weaving tradition into modern lifestyles.</p>
            </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg prose-neutral mx-auto">
            <h2 className="font-serif text-primary-700">Welcome to Kiswat Creations</h2>
            <p>
                Founded with a passion for elegance and a deep respect for tradition, Kiswat Creations aims to provide the Dawoodi Bohra community and connoisseurs of fine textiles with exceptional Ridas, bespoke bridal wear, and thoughtful gifts.
            </p>
            <p>
                Every piece in our collection is hand-selected or hand-crafted. We believe that what you wear is an expression of your identity and your values. That’s why we prioritize high-quality fabrics, intricate embroidery, and designs that balance modesty with contemporary grace.
            </p>
            
            <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
                {/* RENAME PHOTO TO: about-workshop.jpg */}
                <LocalImage src="/images/about-workshop.jpg" alt="Workshop" className="rounded-lg shadow-md w-full h-64 object-cover" />
                {/* RENAME PHOTO TO: about-detail.jpg */}
                <LocalImage src="/images/about-detail.jpg" alt="Detailing" className="rounded-lg shadow-md w-full h-64 object-cover" />
            </div>

            <h3 className="font-serif">Our Promise</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Quality:</strong> Breathable fabrics that last.</li>
                <li><strong>Exclusivity:</strong> Limited edition designs ensuring uniqueness.</li>
                <li><strong>Service:</strong> A seamless shopping experience from browsing to unboxing.</li>
            </ul>
        </div>
      </div>
    </div>
  );
};