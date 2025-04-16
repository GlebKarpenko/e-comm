import axios from 'axios';
import type { Shipment, CategoryWithProducts, Product } from '../types';

const apiClient = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});

const mapProductToServerFormat = (clientProduct: any): any => {
    // Default values for fields not provided by the client
    const defaultValues = {
        brand: "Unknown",
        model: `${clientProduct.name || "Unknown"}`,
        socket: "N/A",
        core_count: 0,
        thread_count: 0,
        base_clock: 0,
        boost_clock: 0,
        memory_type: "N/A",
        pcie_support: "N/A",
        cache_size: 0,
        tdp: 0,
        has_integrated_graphics: false,
        techproc: 0,
        productivity: 0,
        inventory_quantity: 0,
        id_discount: 3, // Default discount ID
        id_category: 6  // Use a valid category ID from your database
    };
  
    // Return the mapped product object with all required server fields
    return {
        // Fields from client input
        name: clientProduct.name,
        slug: clientProduct.slug,
        desc: clientProduct.desc,
        SKU: clientProduct.SKU,
        image: clientProduct.image || "",
        image_mime: clientProduct.image_mime || "",
        image_size: clientProduct.image_size || "1000x1000",
        status: clientProduct.status,
        price: clientProduct.price,
        
        // Add default values for fields not provided by client
        ...defaultValues,
        
        // Override with client's category ID only if provided and non-zero
        id_category: clientProduct.category_id > 0 ? clientProduct.category_id : 5,
    };
};  

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
    const serverFormatProduct = mapProductToServerFormat(product);
    const response = await apiClient.post('/products', serverFormatProduct);
    return response.data;
  },
  
  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    const serverFormatProduct = mapProductToServerFormat({...product, id_product: id});
    const response = await apiClient.put(`/products/${id}`, serverFormatProduct);
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