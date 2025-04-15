<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n';
import { useModalStore } from '@/store/modalStore';
import { CartItem } from '@/views/cart-modal/types/cart.types';
import { fetchCart } from '@/views/cart-modal/api/cart';

const cartItems = ref<CartItem[]>([]);
const cartTotal = ref(0);

const getCartItems = async () => {
  const sessionData = await fetchCart();

  if (sessionData) {
    cartItems.value = sessionData.items;
    cartTotal.value = sessionData.total;
  }
}

const modalStore = useModalStore();

watch(() => modalStore.isCartOpen, async () => {
  await getCartItems();
})

onMounted(() => {
  getCartItems();
});

// I18n setup
const { t } = useI18n();
const I18Namespace = "payment-page";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};
</script>

<template>
  <div class="order-summary">
    <h3 class="summary-title">{{ t(`${I18Namespace}.your-order`) }}</h3>

    <div class="order-items">
      <div 
        class="order-item"
        v-for="item in cartItems"
        :key="item.id"
      >
        <div class="item-image">
          <img :src="item.productImage" :alt="item.productName" />
        </div>

        <div class="item-details">
          <h4 class="item-name">{{ item.productName }}</h4>
          <span class="item-quantity">{{ t(`${I18Namespace}.quantity`) }} {{ item.quantity }}</span>
        </div>

        <div class="item-price">
          {{ formatPrice(item.itemTotal) }}
        </div>

      </div>
    </div>

    <div class="order-total">
      <span>{{ t(`${I18Namespace}.total`) }}</span>
      <strong>{{ formatPrice(cartTotal) }}</strong>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-summary {
  border: 1px solid #eee;
  padding: 16px;
  border-radius: 8px;
  background-color: #fafafa;
}

.summary-title {
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 600;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-image {
  flex: 0 0 50px;
  height: 50px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.item-details {
  flex: 1;
  overflow: hidden;

  .item-name {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .item-quantity {
    font-size: 16px;
    color: #777;
  }
}

.item-price {
  font-size: 14px;
  font-weight: 600;
  min-width: 80px;
  text-align: right;
}

.order-total {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #ddd;
  font-size: 16px;
  font-weight: 600;
}
</style>