<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { ProductCpu } from '@/types/index.types';
import ProductCard from './ProductCard.vue';

const props = defineProps({
  products: {
    type: Array as PropType<ProductCpu[]>,
    required: true
  }
});
</script>

<template>
 <div class="products-layout">
  <div class="grid-item" 
    v-for="product in props.products" 
    :key="product.identification.id" 
    :value="product"
  >
    <ProductCard :product="product"/>
  </div>
 </div>
</template>

<style scoped lang="scss">
.products-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;

  align-items: stretch;
}

.grid-item {
  display: flex;
}
</style>