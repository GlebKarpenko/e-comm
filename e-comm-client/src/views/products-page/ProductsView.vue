<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import ProductCard from './components/ProductCard.vue';
import { ProductCpu } from '../types/product.types';
import { fetchProduct } from './api/products';

const { t } = useI18n({ useScope: 'global' });
const I18Namespace = 'products-page';

const product = ref<ProductCpu>();

onMounted(async () => {
  product.value = await fetchProduct(16);
});
</script>

<template>
 <div class="products-view">
  <h1 class="page-heading">{{ t(`${I18Namespace}.heading`) }} <i class="fas fa-microchip"></i></h1>
  <div class="products-wrapper">
    <ProductCard v-if="product" :product="product"/>
  </div>
 </div>
</template>

<style scoped lang="scss">
.products-wrapper {
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 1024px) {
  .page-wrapper {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>