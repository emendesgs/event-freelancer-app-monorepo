import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse, Product, Category } from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic request methods
  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    const response = await this.api.get(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.post(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.api.put(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.api.delete(url);
    return response.data;
  }

  // Auth endpoints
  async register(data: any) {
    return this.post('/auth/register', data);
  }

  async login(data: any) {
    return this.post('/auth/login', data);
  }

  async getProfile() {
    return this.get('/auth/profile');
  }

  async updateProfile(data: any) {
    return this.put('/auth/profile', data);
  }

  // Jobs endpoints
  async getJobs(params?: any) {
    return this.get('/jobs', params);
  }

  async getJobById(id: string) {
    return this.get(`/jobs/${id}`);
  }

  async createJob(data: any) {
    return this.post('/jobs', data);
  }

  async updateJob(id: string, data: any) {
    return this.put(`/jobs/${id}`, data);
  }

  async deleteJob(id: string) {
    return this.delete(`/jobs/${id}`);
  }

  async getMyJobs(params?: any) {
    return this.get('/jobs/user/me', params);
  }

  // Products endpoints
  async getProducts(params?: any): Promise<ApiResponse<Product[]>> {
    return this.get('/products', params);
  }

  async getProductById(id: string) {
    return this.get(`/products/${id}`);
  }

  async createProduct(data: any) {
    return this.post('/products', data);
  }

  async updateProduct(id: string, data: any) {
    return this.put(`/products/${id}`, data);
  }

  async deleteProduct(id: string) {
    return this.delete(`/products/${id}`);
  }

  async getMyProducts(params?: any) {
    return this.get('/products/user/me', params);
  }

  // Applications endpoints
  async createApplication(data: any) {
    return this.post('/applications', data);
  }

  async getMyApplications(params?: any) {
    return this.get('/applications/user/me', params);
  }

  async getJobApplications(jobId: string, params?: any) {
    return this.get(`/applications/job/${jobId}`, params);
  }

  async updateApplication(id: string, data: any) {
    return this.put(`/applications/${id}`, data);
  }

  async deleteApplication(id: string) {
    return this.delete(`/applications/${id}`);
  }

  // Orders endpoints
  async createOrder(data: any) {
    return this.post('/orders', data);
  }

  async getMyOrders(params?: any) {
    return this.get('/orders/user/me', params);
  }

  async getOrderById(id: string) {
    return this.get(`/orders/${id}`);
  }

  async updateOrder(id: string, data: any) {
    return this.put(`/orders/${id}`, data);
  }

  // Reviews endpoints
  async createReview(data: any) {
    return this.post('/reviews', data);
  }

  async getUserReviews(userId: string, params?: any) {
    return this.get(`/reviews/user/${userId}`, params);
  }

  async getMyReviews(params?: any) {
    return this.get('/reviews/user/me', params);
  }

  // Messages endpoints
  async sendMessage(data: any) {
    return this.post('/messages', data);
  }

  async getConversation(userId: string, params?: any) {
    return this.get(`/messages/conversation/${userId}`, params);
  }

  async getMyConversations(params?: any) {
    return this.get('/messages/conversations', params);
  }

  // Categories endpoints
  async getCategories(): Promise<ApiResponse<Category[]>> {
    return this.get('/categories');
  }

  // Users endpoints
  async getUserById(id: string) {
    return this.get(`/users/${id}`);
  }

  async searchUsers(params?: any) {
    return this.get('/users/search', params);
  }

  // Favorites endpoints
  async addToFavorites(data: any) {
    return this.post('/favorites', data);
  }

  async removeFromFavorites(id: string) {
    return this.delete(`/favorites/${id}`);
  }

  async getMyFavorites(params?: any) {
    return this.get('/favorites/user/me', params);
  }

  // Notifications endpoints
  async getMyNotifications(params?: any) {
    return this.get('/notifications/user/me', params);
  }

  async markNotificationAsRead(id: string) {
    return this.put(`/notifications/${id}/read`);
  }

  async markAllNotificationsAsRead() {
    return this.put('/notifications/read-all');
  }
}

const apiService = new ApiService();
export default apiService;