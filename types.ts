export interface Product {
  id: string;
  name: string;
  tags: string[];
  price: number;
  currency: string;
  stock: number;
  image: string;
  shortDescription: string;
  longDescription: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed';
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
  };
  date: string;
}

export type SortOption = 'featured' | 'newest' | 'price-low-high' | 'price-high-low';

export interface FilterState {
  tags: string[];
  search: string;
  sort: SortOption;
}