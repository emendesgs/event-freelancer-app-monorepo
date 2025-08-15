export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  bio?: string;
  profile_image_url?: string;
  location?: string;
  skills?: string[];
  rating: number;
  total_reviews: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  created_at: string;
}

export interface Job {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  description: string;
  event_date?: string;
  event_time?: string;
  location?: string;
  budget_min?: number;
  budget_max?: number;
  budget_type: 'fixed' | 'hourly' | 'negotiable';
  requirements?: string[];
  images?: string[];
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  is_featured: boolean;
  views_count: number;
  applications_count: number;
  created_at: string;
  updated_at: string;
  // Extended fields from joins
  user_name?: string;
  user_image?: string;
  user_rating?: number;
  user_bio?: string;
  category_name?: string;
  category_icon?: string;
  category_color?: string;
}

export interface Product {
  id: string;
  user_id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  price_type: 'sale' | 'rental';
  rental_duration?: string;
  condition: 'new' | 'like_new' | 'good' | 'fair';
  images?: string[];
  is_available: boolean;
  location?: string;
  views_count: number;
  created_at: string;
  updated_at: string;
  // Extended fields from joins
  user_name?: string;
  user_image?: string;
  user_rating?: number;
  category_name?: string;
  category_icon?: string;
  category_color?: string;
}

export interface Application {
  id: string;
  job_id: string;
  user_id: string;
  proposal: string;
  proposed_price?: number;
  estimated_duration?: string;
  portfolio_links?: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  product_id: string;
  buyer_id: string;
  seller_id: string;
  quantity: number;
  total_price: number;
  rental_start_date?: string;
  rental_end_date?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
  shipping_address?: string;
  payment_status: 'pending' | 'paid' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  reviewer_id: string;
  reviewed_user_id: string;
  job_id?: string;
  product_id?: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'application' | 'order' | 'message' | 'review';
  reference_id?: string;
  is_read: boolean;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  job_id?: string;
  product_id?: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SearchFilters {
  category_id?: string;
  location?: string;
  budget_min?: number;
  budget_max?: number;
  price_min?: number;
  price_max?: number;
  status?: string;
  date_from?: string;
  date_to?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface FormData {
  [key: string]: any;
}

export interface ImageUpload {
  file: File;
  preview: string;
  uploaded?: boolean;
  url?: string;
}
