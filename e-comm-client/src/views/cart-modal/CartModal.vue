<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div v-if="props.isOpen" class="cart-modal" @click="closeModal">
    <div class="cart-content" @click.stop>
      <div class="cart-header">
        <h2>Shopping Cart</h2>
        <button class="close-button" @click="closeModal">×</button>
      </div>
      
      <div class="cart-items">
        <p>Cart items</p>
      </div>
      
      <div class="cart-footer">
        <button class="checkout-button">Checkout</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cart-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.cart-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
}

.cart-items {
  margin-bottom: 20px;
}

.cart-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.checkout-button {
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  
  &:hover {
    background-color: #1e2a38;
  }
}
</style>