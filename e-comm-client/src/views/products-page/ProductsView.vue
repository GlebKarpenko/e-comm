<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, onMounted } from 'vue';
import { ProductCpu } from '@/types/index.types';
import { fetchAllProducts } from './api/products';
import ProductsLayout from './components/ProductsLayout.vue';
import FilterPanel from './components/FilterPanel.vue';
import { applyFilters } from './services/filtering';
import { FilterState } from './types/filter.types';

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

async function filterProducts(filterState: FilterState) {
  if (filterState) {
    products.value = await getProducts();
    products.value = applyFilters(products.value, filterState);
  }
}

onMounted(async () => {
  products.value = await getProducts();
});
</script>

<template>
 <div class="products-view">
  <h1 class="page-heading">{{ t(`${I18Namespace}.heading`) }} <i class="fas fa-microchip"></i></h1>
  <main class="products-content">
    <aside class="products-filter">
      <FilterPanel @update:filter-state="filterProducts"/>
    </aside>

    <section class="products-grid-wrapper">
      <ProductsLayout :products="products" />
    </section>
  </main>
 </div>
</template>

<style scoped lang="scss">
.products-content {
  display: flex;
  gap: 0.5rem; // add space between filter and grid
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

.products-filter {
  flex: 0 0 240px; // fixed width sidebar
}

.products-grid-wrapper {
  flex: 1; // take all remaining space for grid
  min-width: 0; // important for overflow control
}

@media (min-width: 1024px) {
  .products-content {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>