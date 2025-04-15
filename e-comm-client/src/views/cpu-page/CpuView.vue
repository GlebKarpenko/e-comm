<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ProductCpu } from '@/types/index.types'
import { useRoute } from 'vue-router';
import { fetchProduct } from '@/views/products-page/api/products';
import { addToCart } from '../cart-modal/api/cart';
import { useModalStore } from '@/store/modalStore';

// I18n setup
const { t } = useI18n();
const I18Namespace = 'cpu-page';

const cpu = ref<ProductCpu | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const route = useRoute();

onMounted(async () => {
  try {
    isLoading.value = false;
    const productIdStr = route.params.id as string;
    const productId = parseFloat(productIdStr);
    cpu.value = await fetchProduct(productId);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load CPU data';
    console.error("Error loading CPU data:", error);
  }
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

async function addProductToCart() {
  if (cpu.value) {
    await addToCart(cpu.value.identification.id);

    const modalStore = useModalStore();
    modalStore.openCartModal();
  }
}
</script>

<template>
  <div v-if="cpu" class="cpu-view">
    <span class="sku-tag">SKU: {{ cpu.identification.sku }}</span>
    <div class="cpu-header">
      <img 
        class="cpu-image" 
        :src="cpu.meta.imageUrl" 
        :alt="cpu.meta.imageMime" 
      />
      <div class="cpu-titles">
        <h2 class="cpu-brand">{{ cpu.naming.brand }}</h2>
        <h3 class="cpu-name">{{ cpu.naming.name }}</h3>
      </div>
    </div>

    <div class="cpu-specs">
      <div class="specs-group">
        <div class="spec-item">
          <span class="spec-label">{{ t(`${I18Namespace}.socket`) }}</span>
          <span class="spec-value">{{ cpu.specs.socket }}</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">{{ t(`${I18Namespace}.cores`) }}</span>
          <span class="spec-value">{{ cpu.specs.coreCount }}</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">{{ t(`${I18Namespace}.threads`) }}</span>
          <span class="spec-value">{{ cpu.specs.threadCount }}</span>
        </div>
      </div>

      <div class="specs-group">
        <div class="spec-item">
          <span class="spec-label">{{ t(`${I18Namespace}.base-clock`) }}</span>
          <span class="spec-value">{{ cpu.specs.baseClock }} GHz</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">{{ t(`${I18Namespace}.boost-clock`) }}</span>
          <span class="spec-value">{{ cpu.specs.boostClock }} GHz</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">{{ t(`${I18Namespace}.tdp`) }}</span>
          <span class="spec-value">{{ cpu.specs.tdp }} W</span>
        </div>
      </div>

      <div class="specs-group">
        <div class="spec-item">
          <span class="spec-label">{{ t(`${I18Namespace}.memory`) }}</span>
          <span class="spec-value">{{ cpu.specs.memoryType }}</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">{{ t(`${I18Namespace}.pcie`) }}</span>
          <span class="spec-value">{{ cpu.specs.pcieSupport }}</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">{{ t(`${I18Namespace}.cache-size`) }}</span>
          <span class="spec-value">{{ cpu.specs.cacheSize }} MB</span>
        </div>
      </div>

      <div class="specs-group">
        <div class="spec-item">
          <span class="spec-label">{{ t(`${I18Namespace}.tech-proc`) }}</span>
          <span class="spec-value">{{ cpu.specs.techProc }} nm</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">{{ t(`${I18Namespace}.graphics`) }}</span>
          <span class="spec-value">{{ cpu.specs.graphicsIntegrated ? t(`${I18Namespace}.yes`) : t(`${I18Namespace}.no`) }}</span>
        </div>
        <div class="spec-item">
          <span class="spec-label">{{ t(`${I18Namespace}.perfomance`) }}</span>
          <span class="spec-value">{{ cpu.specs.productivityScore }}</span>
        </div>
      </div>
    </div>

    <p class="cpu-description">{{ cpu.meta.description }}</p>

    <div class="info-row">
      <div class="left-column">
        <div class="availability-line">
          <span class="availability-label">{{ t(`${I18Namespace}.available`) }}</span>
          <span class="availability-icon" :class="{ 'in-stock': cpu.sales.inventoryQuantity > 0 }">
            {{ cpu.sales.inventoryQuantity > 0 ? '✔' : '✖' }}
          </span>
          <span class="inventory-count" v-if="cpu.sales.inventoryQuantity > 0">
            ({{ cpu.sales.inventoryQuantity }} {{ t(`${I18Namespace}.total`) }})
          </span>
        </div>
        <div class="price-container">
          <span class="price" :class="{ 'discounted': cpu.sales.discountPercentage > 0 }">
            {{ formatPrice(cpu.sales.price) }}
          </span>
          <span class="discount-price" v-if="cpu.sales.discountPercentage > 0">
            {{ formatPrice(cpu.sales.price) }}
          </span>
          <span class="discount-badge" v-if="cpu.sales.discountPercentage > 0">
            -{{ cpu.sales.discountPercentage }}%
          </span>
        </div>
      </div>
      <button 
        class="cart-button" 
        :disabled="cpu.sales.inventoryQuantity <= 0"
        @click="addProductToCart"
      >
        <i class="fa-solid fa-cart-shopping"></i>
        {{ t(`${I18Namespace}.add-to-cart`) }}
      </button>
    </div>
  </div>
  <div v-else>
    <h2>404 {{ error }}</h2>
  </div>
</template>

<style scoped lang="scss">
.cpu-view {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 20px;
  background-color: #fff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
}

.sku-tag {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 12px;
  color: #aaa;
  background-color: #f9f9f9;
  padding: 2px 6px;
  border-radius: 4px;
}

.cpu-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.cpu-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.cpu-titles {
  text-align: left;
}

.cpu-brand {
  font-size: 18px;
  font-weight: 600;
  color: #666;
  margin: 0 0 4px 0;
}

.cpu-name {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: #2c3e50;
}

.cpu-specs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 16px 0;
}

.specs-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.spec-label {
  font-size: 14px;
  color: #666;
}

.spec-value {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
}

.cpu-description {
  font-size: 14px;
  line-height: 1.5;
  color: #666;
  margin: 0;
  text-align: justify;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: auto;
}

.left-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
}

.availability-line {
  display: flex;
  align-items: center;
  gap: 6px;
}

.availability-icon {
  font-size: 14px;
  color: red;
  
  &.in-stock {
    color: green;
  }
}

.inventory-count {
  font-size: 13px;
  color: #666;
}

.availability-label {
  font-size: 14px;
  color: #666;
}

.price-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  
  &.discounted {
    text-decoration: line-through;
    color: #999;
    font-size: 18px;
  }
}

.discount-price {
  font-size: 24px;
  font-weight: bold;
  color: #e74c3c;
}

.discount-badge {
  background-color: #e74c3c;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.cart-button {
  flex: 0 0 auto;
  min-width: 150px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  padding: 12px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1e2a38;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  i {
    font-size: 16px;
  }
}
</style>