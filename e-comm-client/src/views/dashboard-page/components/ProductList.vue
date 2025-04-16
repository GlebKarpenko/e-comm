<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue';
import { api } from '../api';
import type { CategoryWithProducts } from '../types';

export default defineComponent({
  name: 'ProductList',
  setup() {
    const categoriesWithProducts = ref<CategoryWithProducts[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);
    
    const showAddProductModal = ref(false);
    const showEditProductModal = ref(false);
    const showDeleteModal = ref(false);
    const productToDelete = ref<any>(null);
    
    const productForm = reactive({
      id_product: 0,
      name: '',
      slug: '',
      desc: '',
      SKU: '',
      price: 0,
      status: 'active',
      image: '',
      image_mime: '',
      image_size: 0,
      category_id: 0
    });
    
    const fetchProducts = async () => {
      loading.value = true;
      error.value = null;
      try {
        categoriesWithProducts.value = await api.getProductsByCategory();
      } catch (err) {
        console.error('Error fetching products:', err);
        error.value = 'Failed to load products. Please try again.';
      } finally {
        loading.value = false;
      }
    };
    
    const formatPrice = (price: string) => {
      return Number(price).toLocaleString('uk-UA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    };
    
    const closeProductModal = () => {
      showAddProductModal.value = false;
      showEditProductModal.value = false;
      resetProductForm();
    };
    
    const resetProductForm = () => {
      productForm.id_product = 0;
      productForm.name = '';
      productForm.slug = '';
      productForm.desc = '';
      productForm.SKU = '';
      productForm.price = 0;
      productForm.status = 'active';
      productForm.image = '';
      productForm.image_mime = '';
      productForm.image_size = 0;
      productForm.category_id = 0;
    };
    
    const editProduct = (product: any) => {
      productForm.id_product = product.id_product || 0;
      productForm.name = product.product_name;
      productForm.slug = product.product_slug;
      productForm.desc = product.product_desc;
      productForm.SKU = product.product_SKU;
      productForm.price = Number(product.product_price);
      productForm.status = product.product_status;
      productForm.image = product.product_image;
      productForm.image_mime = product.product_image_mime;
      productForm.image_size = parseInt(product.product_image_size.split('x')[0]);
      // For a real app, you'd need to set the correct category_id
      
      showEditProductModal.value = true;
    };
    
    const submitProductForm = async () => {
      try {
        if (showEditProductModal.value) {
          await api.updateProduct(productForm.id_product, productForm);
        } else {
          await api.createProduct(productForm);
        }
        fetchProducts();
        closeProductModal();
      } catch (err) {
        console.error('Error submitting product:', err);
        error.value = 'Failed to save product. Please try again.';
      }
    };
    
    const confirmDelete = (product: any) => {
      productToDelete.value = product;
      showDeleteModal.value = true;
    };
    
    const deleteProduct = async () => {
      if (!productToDelete.value) return;
      
      try {
        await api.deleteProduct(productToDelete.value.id_product);
        fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
        error.value = 'Failed to delete product. Please try again.';
      } finally {
        showDeleteModal.value = false;
        productToDelete.value = null;
      }
    };
    
    onMounted(() => {
      fetchProducts();
    });
    
    return {
      categoriesWithProducts,
      loading,
      error,
      showAddProductModal,
      showEditProductModal,
      showDeleteModal,
      productToDelete,
      productForm,
      formatPrice,
      closeProductModal,
      editProduct,
      submitProductForm,
      confirmDelete,
      deleteProduct
    };
  }
});
</script>

<template>
  <div class="product-list">
    <h2>Товари за категоріями</h2>
    
    <div class="actions">
      <button class="btn btn-primary" @click="showAddProductModal = true">Додати продукт</button>
    </div>
    
    <div v-if="loading" class="loading">Loading products...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-for="category in categoriesWithProducts" :key="category.category_name" class="category-section">
        <h3>{{ category.category_name }}</h3>
        <p class="category-description">{{ category.category_des }}</p>
        
        <div class="products-grid">
          <div 
            v-for="product in category.products" 
            :key="product.product_slug" 
            class="product-card"
          >
            <div class="product-image">
              <img :src="product.product_image" :alt="product.product_name">
            </div>
            <div class="product-details">
              <h4>{{ product.product_name }}</h4>
              <div class="product-meta">
                <span class="sku">SKU: {{ product.product_SKU }}</span>
                <span :class="['status', product.product_status]">{{ product.product_status }}</span>
              </div>
              <p class="price">{{ formatPrice(product.product_price) }} UAH</p>
              <div class="product-actions">
                <button class="btn btn-sm" @click="editProduct(product)">Edit</button>
                <button class="btn btn-sm btn-danger" @click="confirmDelete(product)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Add/Edit Product Modal -->
    <div v-if="showAddProductModal || showEditProductModal" class="modal-backdrop">
      <div class="modal">
        <h3>{{ showEditProductModal ? 'Edit Product' : 'Add New Product' }}</h3>
        <form @submit.prevent="submitProductForm">
          <div class="form-group">
            <label for="name">Product Name</label>
            <input type="text" id="name" v-model="productForm.name" required>
          </div>
          
          <div class="form-group">
            <label for="slug">Slug</label>
            <input type="text" id="slug" v-model="productForm.slug" required>
          </div>
          
          <div class="form-group">
            <label for="desc">Description</label>
            <textarea id="desc" v-model="productForm.desc" rows="3" required></textarea>
          </div>
          
          <div class="form-group">
            <label for="sku">SKU</label>
            <input type="text" id="sku" v-model="productForm.SKU" required>
          </div>
          
          <div class="form-group">
            <label for="price">Price (UAH)</label>
            <input type="number" id="price" v-model="productForm.price" step="0.01" required>
          </div>
          
          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" v-model="productForm.status" required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="closeProductModal">Cancel</button>
            <button type="submit" class="btn btn-primary">
              {{ showEditProductModal ? 'Update Product' : 'Add Product' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-backdrop">
      <div class="modal delete-modal">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete <strong>{{ productToDelete?.product_name }}</strong>?</p>
        <div class="form-actions">
          <button class="btn btn-secondary" @click="showDeleteModal = false">Cancel</button>
          <button class="btn btn-danger" @click="deleteProduct">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-list {
  padding: 1rem;
  
  h2 {
    margin-bottom: 1rem;
    color: #333;
  }
  
  .actions {
    margin-bottom: 1.5rem;
    
    .btn-primary {
      background-color: #3498db;
      color: white;
    }
  }
  
  .loading, .error {
    text-align: center;
    padding: 2rem 0;
  }
  
  .error {
    color: #e74c3c;
  }
  
  .category-section {
    margin-bottom: 3rem;
    
    h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #2c3e50;
    }
    
    .category-description {
      margin-bottom: 1rem;
      color: #7f8c8d;
    }
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .product-image {
      height: 200px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
        
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    
    .product-details {
      padding: 1rem;
      
      h4 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
        color: #333;
      }
      
      .product-meta {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.75rem;
        font-size: 0.85rem;
        
        .sku {
          color: #7f8c8d;
        }
        
        .status {
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-weight: 500;
          
          &.active {
            background-color: #2ecc71;
            color: white;
          }
          
          &.inactive {
            background-color: #95a5a6;
            color: white;
          }
          
          &.out_of_stock {
            background-color: #e74c3c;
            color: white;
          }
        }
      }
      
      .price {
        font-weight: bold;
        font-size: 1.2rem;
        color: #e67e22;
        margin: 0.5rem 0;
      }
      
      .product-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
        
        .btn {
          padding: 0.35rem 0.75rem;
          border-radius: 4px;
          cursor: pointer;
          border: none;
          font-weight: 500;
          
          &.btn-sm {
            font-size: 0.85rem;
          }
          
          &:hover {
            opacity: 0.9;
          }
          
          &.btn-danger {
            background-color: #e74c3c;
            color: white;
          }
        }
      }
    }
  }
  
  // Modal styles
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    
    h3 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: #2c3e50;
    }
    
    &.delete-modal {
      max-width: 400px;
      text-align: center;
      
      p {
        margin-bottom: 1.5rem;
      }
    }
  }
  
  .form-group {
    margin-bottom: 1.25rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #34495e;
    }
    
    input,
    textarea,
    select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      
      &:focus {
        outline: none;
        border-color: #3498db;
      }
    }
    
    textarea {
      resize: vertical;
    }
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
    
    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      
      &-secondary {
        background-color: #95a5a6;
        color: white;
      }
      
      &-primary {
        background-color: #3498db;
        color: white;
      }
      
      &-danger {
        background-color: #e74c3c;
        color: white;
      }
      
      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>