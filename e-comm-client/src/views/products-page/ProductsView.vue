<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import { ProductCpu } from './types/product.types';
import { fetchAllProducts } from './api/products';
import ProductsLayout from './components/ProductsLayout.vue';

const { t } = useI18n({ useScope: 'global' });
const I18Namespace = 'products-page';

const products = ref<ProductCpu[]>([]);
const pageSize = 50;
const pageNumber = ref(1);

async function getProducts() {
  const allProducts = await fetchAllProducts();
  const pageStart = (pageNumber.value - 1) * pageSize;
  const pageEnd = pageStart + pageSize; 

  return allProducts.slice(pageStart, pageEnd);
}

onMounted(async () => {
  products.value = await getProducts();
});
</script>

<template>
 <div class="products-view">
  <h1 class="page-heading">{{ t(`${I18Namespace}.heading`) }} <i class="fas fa-microchip"></i></h1>
  <div class="products-wrapper">
    <ProductsLayout :products="products"/>
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