import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: "kc001",
    name: "Classic Rida - Pearl White",
    tags: ["ridas", "daily rida"],
    price: 2499,
    currency: "INR",
    stock: 12,
    // RENAME YOUR PHOTO TO: pearl-rida.jpg and put it in public/images/ folder
    image: "/images/pearl-rida.jpg", 
    shortDescription: "Comfortable daily rida in breathable fabric.",
    longDescription: "Experience elegance in everyday wear with our Classic Pearl White Rida. Made from premium breathable cotton blends, it ensures comfort throughout the day while maintaining a crisp, dignified look. Perfect for daily ohbat and errands."
  },
  {
    id: "kc002",
    name: "Bridal Rida - Ivory Embroidery",
    tags: ["bridal ridas", "exclusive ridas"],
    price: 14999,
    currency: "INR",
    stock: 3,
    // RENAME YOUR PHOTO TO: bridal-ivory.jpg
    image: "/images/bridal-ivory.jpg",
    shortDescription: "Hand-embroidered bridal rida with intricate detailing.",
    longDescription: "A masterpiece for your special day. This Ivory Bridal Rida features hand-stitched zari work and delicate pearls. Crafted on pure silk, it offers a regal silhouette that celebrates tradition and modernity."
  },
  {
    id: "kc003",
    name: "Bukhoor - Oud Tradisi",
    tags: ["bukhoor", "gifts"],
    price: 1200,
    currency: "INR",
    stock: 50,
    // RENAME YOUR PHOTO TO: bukhoor-oud.jpg
    image: "/images/bukhoor-oud.jpg",
    shortDescription: "Rich, woody scent for a welcoming home.",
    longDescription: "Fill your home with the spiritual aroma of Oud Tradisi. A slow-burning bukhoor chip blend that releases deep, woody notes with hints of sweet amber. Comes in a decorative jar, making it a perfect gift."
  },
  {
    id: "kc004",
    name: "Festival Rida - Ruby Red",
    tags: ["festival ridas", "ridas"],
    price: 4500,
    currency: "INR",
    stock: 8,
    // RENAME YOUR PHOTO TO: ruby-rida.jpg
    image: "/images/ruby-rida.jpg",
    shortDescription: "Vibrant red rida with gold paneling.",
    longDescription: "Stand out during festivities with this Ruby Red Rida. The bold color is accented by subtle gold paneling and floral motifs. Lightweight yet structured, ideal for long celebratory events."
  },
  {
    id: "kc005",
    name: "Silk Night Suit - Floral",
    tags: ["night suits", "ladies wear"],
    price: 1899,
    currency: "INR",
    stock: 20,
    // RENAME YOUR PHOTO TO: silk-nightsuit.jpg
    image: "/images/silk-nightsuit.jpg",
    shortDescription: "Soft satin silk night suit set.",
    longDescription: "Indulge in luxury sleepwear. This 2-piece floral night suit is crafted from butter-soft satin silk. Features a relaxed fit button-down shirt and elasticated trousers for maximum comfort."
  },
  {
    id: "kc006",
    name: "Velvet Masallah - Royal Blue",
    tags: ["masallah", "gifts"],
    price: 850,
    currency: "INR",
    stock: 15,
    // RENAME YOUR PHOTO TO: velvet-masallah.jpg
    image: "/images/velvet-masallah.jpg",
    shortDescription: "Plush velvet prayer mat.",
    longDescription: "Pray with comfort on our Royal Blue Velvet Masallah. Thick padding provides knee support, while the intricate Islamic geometric borders add a touch of reverence to your prayer space."
  },
  {
    id: "kc007",
    name: "Hand-painted Sujni",
    tags: ["sujni", "exclusive ridas"],
    price: 3200,
    currency: "INR",
    stock: 5,
    // RENAME YOUR PHOTO TO: sujni-art.jpg
    image: "/images/sujni-art.jpg",
    shortDescription: "Traditional quilted sujni with art work.",
    longDescription: "A piece of heritage art. This hand-painted Sujni serves as a beautiful throw or a traditional wrap. The quilting is done by hand, ensuring durability and a unique texture."
  },
  {
    id: "kc008",
    name: "Ohbat Rida - Light Blue",
    tags: ["ohbat rida", "daily rida"],
    price: 2100,
    currency: "INR",
    stock: 10,
    // RENAME YOUR PHOTO TO: blue-ohbat.jpg
    image: "/images/blue-ohbat.jpg",
    shortDescription: "Simple, elegant rida for religious gatherings.",
    longDescription: "Designed specifically for Majlis and Ohbat. The soothing light blue shade represents tranquility. Easy to wash and iron, making it a practical choice for regular use."
  },
  {
    id: "kc009",
    name: "Embroidered Clutch Bag",
    tags: ["gifts", "ladies wear"],
    price: 950,
    currency: "INR",
    stock: 25,
    // RENAME YOUR PHOTO TO: clutch-bag.jpg
    image: "/images/clutch-bag.jpg",
    shortDescription: "Ethnic clutch to match your Rida.",
    longDescription: "Complete your ensemble with this embroidered clutch. Spacious enough for a phone and misbah, yet compact and stylish. Available in multiple thread-work colors."
  },
  {
    id: "kc010",
    name: "Gift Set - Rida & Masallah",
    tags: ["gifts", "exclusive ridas", "masallah"],
    price: 5500,
    currency: "INR",
    stock: 4,
    // RENAME YOUR PHOTO TO: gift-set.jpg
    image: "/images/gift-set.jpg",
    shortDescription: "A perfect wedding or housewarming gift.",
    longDescription: "The ultimate gesture of care. This curated box contains a matching Rida and Masallah set, beautifully packed with a small vial of attar. Ready to gift."
  }
];

export const FILTER_TAGS = [
  "ridas",
  "bridal ridas",
  "exclusive ridas",
  "bukhoor",
  "festival ridas",
  "night suits",
  "ladies wear",
  "gifts",
  "masallah",
  "sujni",
  "daily rida",
  "ohbat rida"
];

export const FEES = {
  SHIPPING: 150,
  TAX_RATE: 0.05, // 5%
};