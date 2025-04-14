<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import { CartItem } from '../types/cart.types';

const props = defineProps<{
  item: CartItem;
}>();

const emit = defineEmits(['add', 'remove']);

const quantity = ref(props.item.quantity);

watch(() => props.item.quantity, (newVal) => {
  quantity.value = newVal;
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

const addItem = () => {
  quantity.value += 1;
  emit('add', props.item.productId);
};

const removeItem = () => {
  emit('remove', props.item.productId);
};
</script>

<template>
  <div class="cart-item">
    <div class="item-image">
      <img :src="props.item.productImage" :alt="props.item.productName" />
    </div>
    
    <div class="item-details">
      <h4 class="item-name">{{ props.item.productName }}</h4>
    </div>
    
    <div class="quantity-controls">
      <button 
        class="quantity-btn" 
        @click="removeItem"
        :disabled="props.item.quantity <= 1"
      >-</button>
      
      <input 
        type="number" 
        class="quantity-input" 
        :value="quantity"
        readonly 
        min="1" 
      />
      
      <button 
        class="quantity-btn" 
        @click="addItem"
      >+</button>
    </div>
    
    <div class="item-price">
      {{ formatPrice(item.itemTotal) }}
    </div>
    
    <button class="remove-btn" @click="removeItem">×</button>
  </div>
</template>

<style scoped lang="scss">
.cart-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  gap: 12px;
}

.item-image {
  flex: 0 0 60px;
  height: 60px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-name {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 2px;
}

.quantity-btn {
  width: 28px;
  height: 28px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  
  &:hover {
    background-color: #e5e5e5;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.quantity-input {
  width: 40px;
  height: 28px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  border: none;
  background-color: transparent;
  pointer-events: none; /* prevents keyboard and mouse interaction */
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
}

.item-price {
  font-weight: 600;
  font-size: 14px;
  min-width: 80px;
  text-align: right;
}

.remove-btn {
  width: 28px;
  height: 28px;
  background: none;
  border: none;
  border-radius: 50%;
  color: #999;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background-color: #f5f5f5;
    color: #e74c3c;
  }
}
</style>