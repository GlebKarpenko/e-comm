<script lang="ts" setup>
import { defineEmits, onMounted, ref } from 'vue';
import { initializePayment, createPayment } from './paymentService';
import { fetchCart } from '@/views/cart-modal/api/cart';

const loading = ref(false);
const message = ref('');

const emit = defineEmits(['create:message']);

// Mount the card input on load
onMounted(async () => {
  const result = await initializePayment();
  if (!result.success) {
    message.value = result.message;
  }
})

const pay = async () => {
  loading.value = true;

  const cart = await fetchCart();
  if (cart) {
    const result = await createPayment(cart.total, 'uah');
    
    message.value = result.message;
  } else {
    message.value = "Could not fetch cart total amount";
  }
  loading.value = false;

  if (message.value) emit('create:message', message);
}
</script>

<template>
  <div class="payment-form">
    <div id="card-element"></div>
    <button @click="pay" :disabled="loading">
      {{ loading ? "Processing..." : "Pay Now" }}
    </button>
  </div>
</template>

<style scoped>
#card-element {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 1rem;
}
button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #5469d4;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}
</style>