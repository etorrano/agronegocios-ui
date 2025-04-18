export type User = {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
};

export type TransactionType = 'sale' | 'trade' | 'consignment';

export type Product = {
  id: string;
  name: string;
  brand: string;
  model: string;
  year?: number;
  price: number;
  currency: 'USD' | 'UYU';
  description: string;
  specifications: Record<string, string | number>;
  images: string[];
  condition: string;
  origin?: string;
  transactionType: TransactionType;
  commissionRate?: number; // For consignment
  status: 'available' | 'sold' | 'reserved';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NewsArticle = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  published: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  productId?: string;
  read: boolean;
  createdAt: string;
};