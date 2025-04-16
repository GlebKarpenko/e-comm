<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProductList from './components/ProductList.vue';
import ShipmentList from './components/ShipmentList.vue';

export default defineComponent({
  name: 'DashboardView',
  components: {
    ProductList,
    ShipmentList
  },
  setup() {
    const activeTab = ref('products');
    
    return {
      activeTab
    };
  }
});
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="logo">
        <h1>E-Comm Admin</h1>
      </div>
      <nav class="navigation">
        <button 
          :class="['nav-button', { active: activeTab === 'products' }]" 
          @click="activeTab = 'products'"
        >
          Товари
        </button>
        <button 
          :class="['nav-button', { active: activeTab === 'shipments' }]" 
          @click="activeTab = 'shipments'"
        >
          Замовлення
        </button>
      </nav>
    </header>
    
    <main class="dashboard-content">
      <ProductList v-if="activeTab === 'products'" />
      <ShipmentList v-else-if="activeTab === 'shipments'" />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #2c3e50;
    color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    .logo {
      h1 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 700;
      }
    }
    
    .navigation {
      display: flex;
      gap: 1rem;
      
      .nav-button {
        padding: 0.5rem 1rem;
        border: none;
        background: transparent;
        color: #ecf0f1;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.2s;
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        &.active {
          background-color: #3498db;
          color: white;
        }
      }
    }
  }
  
  .dashboard-content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    background-color: #f8f9fa;
  }
}
</style>