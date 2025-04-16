import axios from 'axios';
import type { Shipment, CategoryWithProducts, Product } from '../types';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Product endpoints
  async getProductsByCategory(): Promise<CategoryWithProducts[]> {
    const response = await apiClient.get('/products/category');
    return response.data;
  },
  
  async getProductById(id: number): Promise<Product> {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },
  
  async createProduct(product: Partial<Product>): Promise<Product> {
    const response = await apiClient.post('/products', product);
    return response.data;
  },
  
  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    const response = await apiClient.put(`/products/${id}`, product);
    return response.data;
  },
  
  async deleteProduct(id: number): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },
  
  // Shipment endpoints
  async getShipments(): Promise<Shipment[]> {
    const response = await apiClient.get('/shipments');
    return response.data;
  },
  
  async getShipmentById(id: number): Promise<Shipment> {
    const response = await apiClient.get(`/shipments/${id}`);
    return response.data;
  },
  
  async createShipment(shipment: Partial<Shipment>): Promise<Shipment> {
    const response = await apiClient.post('/shipments', shipment);
    return response.data;
  },
  
  async updateShipment(id: number, shipment: Partial<Shipment>): Promise<Shipment> {
    const response = await apiClient.put(`/shipments/${id}`, shipment);
    return response.data;
  },
  
  async deleteShipment(id: number): Promise<void> {
    await apiClient.delete(`/shipments/${id}`);
  }
};