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
  password_hash?: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserCreate {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  bio?: string;
  location?: string;
  skills?: string[];
}

export interface UserUpdate {
  full_name?: string;
  phone?: string;
  bio?: string;
  location?: string;
  skills?: string[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  created_at: Date;
}

export interface Job {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  description: string;
  event_date?: Date;
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
  created_at: Date;
  updated_at: Date;
}

export interface JobCreate {
  category_id: string;
  title: string;
  description: string;
  event_date?: Date;
  event_time?: string;
  location?: string;
  budget_min?: number;
  budget_max?: number;
  budget_type: 'fixed' | 'hourly' | 'negotiable';
  requirements?: string[];
}

export interface JobUpdate {
  category_id?: string;
  title?: string;
  description?: string;
  event_date?: Date;
  event_time?: string;
  location?: string;
  budget_min?: number;
  budget_max?: number;
  budget_type?: 'fixed' | 'hourly' | 'negotiable';
  requirements?: string[];
  status?: 'open' | 'in_progress' | 'completed' | 'cancelled';
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
  created_at: Date;
  updated_at: Date;
}

export interface ProductCreate {
  category_id: string;
  name: string;
  description: string;
  price: number;
  price_type: 'sale' | 'rental';
  rental_duration?: string;
  condition: 'new' | 'like_new' | 'good' | 'fair';
  location?: string;
}

export interface ProductUpdate {
  category_id?: string;
  name?: string;
  description?: string;
  price?: number;
  price_type?: 'sale' | 'rental';
  rental_duration?: string;
  condition?: 'new' | 'like_new' | 'good' | 'fair';
  location?: string;
  is_available?: boolean;
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
  created_at: Date;
  updated_at: Date;
}

export interface ApplicationCreate {
  job_id: string;
  proposal: string;
  proposed_price?: number;
  estimated_duration?: string;
  portfolio_links?: string[];
}

export interface ApplicationUpdate {
  proposal?: string;
  proposed_price?: number;
  estimated_duration?: string;
  portfolio_links?: string[];
  status?: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
}

export interface Order {
  id: string;
  product_id: string;
  buyer_id: string;
  seller_id: string;
  quantity: number;
  total_price: number;
  rental_start_date?: Date;
  rental_end_date?: Date;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
  shipping_address?: string;
  payment_status: 'pending' | 'paid' | 'refunded';
  created_at: Date;
  updated_at: Date;
}

export interface OrderCreate {
  product_id: string;
  quantity: number;
  total_price: number;
  rental_start_date?: Date;
  rental_end_date?: Date;
  shipping_address?: string;
}

export interface Review {
  id: string;
  reviewer_id: string;
  reviewed_user_id: string;
  job_id?: string;
  product_id?: string;
  rating: number;
  comment?: string;
  created_at: Date;
}

export interface ReviewCreate {
  reviewed_user_id: string;
  job_id?: string;
  product_id?: string;
  rating: number;
  comment?: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: Date;
}

export interface MessageCreate {
  receiver_id: string;
  content: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'application' | 'order' | 'message' | 'review';
  reference_id?: string;
  is_read: boolean;
  created_at: Date;
}

export interface Favorite {
  id: string;
  user_id: string;
  job_id?: string;
  product_id?: string;
  created_at: Date;
}

export interface AuthRequest extends Request {
  user?: User;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface SearchFilters {
  q?: string;
  category_id?: string;
  location?: string;
  budget_min?: number | undefined;
  budget_max?: number | undefined;
  price_min?: number | undefined;
  price_max?: number | undefined;
  status?: string;
  date_from?: Date | undefined;
  date_to?: Date | undefined;
}

export interface JwtPayload {
  userId: string;
  email: string;
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