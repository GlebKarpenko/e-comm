<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue';
import ItemView from './components/ItemView.vue';
import { fetchCart, addToCart, removeFromCart } from '@/views/cart-modal/api/cart';
import { SessionCart } from './types/cart.types';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();

// Props and emits
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

// State
const cart = ref<SessionCart>({
  total: 0,
  items: []
});
const isLoading = ref(false);
const error = ref<string | null>(null);

// Methods
const closeModal = () => {
  emit('close');
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

const loadCart = async () => {
  try {
    isLoading.value = true;

    const cartData = await fetchCart();
    if (cartData) {
      cart.value = cartData;
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load cart';
    console.error('Error loading cart:', err);
  } finally {
    isLoading.value = false;
  }
};

const addItem = async (itemId: number) => {
  try {
    isLoading.value = true;
    await addToCart(itemId);
    await loadCart();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to update quantity';
    console.error('Error updating quantity:', err);
  } finally {
    isLoading.value = false;
  }
};

const removeItem = async (itemId: number) => {
  try {
    isLoading.value = true;
    await removeFromCart(itemId);
    await loadCart();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to remove item';
    console.error('Error removing item:', err);
  } finally {
    isLoading.value = false;
  }
};

const goToCheckout = () => {
  router.push('/checkout');
}

const { t } = useI18n({ useScope: 'global' });
const I18Namespace = 'cart-modal';

// Load cart data when modal is opened
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    loadCart();
  }
});

// Load cart data when component mounts (if modal is open)
onMounted(() => {
  if (props.isOpen) {
    loadCart();
  }
});
</script>

<template>
  <div v-if="props.isOpen" class="cart-modal" @click="closeModal">
    <div class="cart-content" @click.stop>
      <div class="cart-header">
        <h2>{{ t(`${I18Namespace}.shopping-cart`) }}</h2>
        <button class="close-button" @click="closeModal">×</button>
      </div>
     
      <div class="cart-items">
        <div v-if="isLoading" class="loading-state">
          {{ t(`${I18Namespace}.loading`) }}
        </div>
        <div v-else-if="error" class="error-state">
          {{ error }}
        </div>
        <div v-else-if="cart.items.length === 0" class="empty-cart">
          {{ t(`${I18Namespace}.cart-empty`) }}
        </div>
        <template v-else>
            <ItemView 
            v-for="item in cart.items" 
            :key="item.id" 
            :item="item"
            @add="addItem"
            @remove="removeItem"
          />
          <div class="cart-total">
            <span>{{ t(`${I18Namespace}.total`) }}:</span>
            <span class="total-price">{{ formatPrice(cart.total) }}</span>
          </div>
        </template>
      </div>
     
      <div class="cart-footer">
        <button 
          class="checkout-button" 
          :disabled="isLoading || cart.items.length === 0"
          @click="goToCheckout"
        >
        {{ t(`${I18Namespace}.checkout`) }}
        </button>
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

.loading-state, .error-state, .empty-cart {
  text-align: center;
  padding: 30px 0;
  color: #666;
}

.error-state {
  color: #e74c3c;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  font-size: 16px;
  font-weight: 600;
}

.total-price {
  font-size: 18px;
  color: #2c3e50;
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
 
  &:hover:not(:disabled) {
    background-color: #1e2a38;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
</style>