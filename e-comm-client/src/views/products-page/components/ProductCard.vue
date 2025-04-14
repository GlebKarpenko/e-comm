<script setup lang="ts">
import { defineProps, PropType, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ProductCpu } from '@/types/index.types';
import { addToCart } from '@/views/cart-modal/api/cart';

const props = defineProps({
  product: {
    type: Object as PropType<ProductCpu>,
    required: true
  }
});

const { t } = useI18n({ useScope: 'global' });
const I18Namespace = 'products-page.product_card';

const skuTagText = computed(() => {
  const skuLabel = t(`${I18Namespace}.sku`);
  const skuValue = props.product.identification.sku;

  return `${skuLabel} ${skuValue.toString()}`;
});

function addProductToCart() {
  addToCart(props.product.identification.id);
}
</script>

<template>
  <div class="product-card">
    <span class="sku-tag">{{ skuTagText }}</span>
    <img 
      class="product-image" 
      :src="props.product.meta.imageUrl" 
      :alt="props.product.meta.imageMime" 
    />
    <h3 class="product-name">{{ props.product.naming.name }}</h3>

    <div class="info-row">
      <div class="left-column">
        <div class="availability-line">
          <span class="availability-label">{{ t(`${I18Namespace}.availability-label`) }}</span>
          <span class="availability-icon">✔</span>
        </div>
        <span class="price">{{ props.product.sales.price }}</span>
      </div>
      <button class="cart-button" @click="addProductToCart">
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product-card {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 16px;
  background-color: #fff;
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
}

.sku-tag {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 12px;
  color: #aaa;
}

.product-image {
  width: 100%;
  height: 100px;
  object-fit: contain;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  // margin: 0;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 12px;
  margin-top: auto;
}

.left-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.availability-line {
  display: flex;
  align-items: center;
  gap: 6px;
}

.availability-icon {
  font-size: 14px;
  color: green;
}

.availability-label {
  font-size: 14px;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
}

.cart-button {
  flex: 0 0 auto;
  width: 100%;
  max-width: 120px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  padding: 12px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #1e2a38;
  }

  i {
    font-size: 16px;
  }
}
</style>