export interface ApiResponse<T> {
  data: T;
  message?: string;
  pagination?: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
  };
}

export interface Job {
    id: string;
    client_id: string;
    title: string;
    description: string;
    category_id: string;
    budget: string;
    status: string;
    created_at: string;
    location: string;
    jobType: string;
    salary: number;
    company: string;
    postedDate: string;
    deadline: string;
    requirements: string[];
    category?: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
    image: string;
    price_type: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    profile_image_url?: string;
}