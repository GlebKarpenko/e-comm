<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ProductCard from './components/ProductCard.vue';
import { fetchProduct } from './api/products';
import { onMounted } from 'vue';

const { t } = useI18n({ useScope: 'global' });

onMounted(async () => {
  console.log(await fetchProduct(16));
});
</script>

<template>
 <div class="products-view">
  <h1 class="page-heading">{{ t('products-page.heading') }} <i class="fas fa-microchip"></i></h1>
  <div class="products-wrapper">
    
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