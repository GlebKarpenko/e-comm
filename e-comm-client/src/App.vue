<script setup lang="ts">
import NavBar from './components/layouts/NavBar.vue';
import CartModal from '@/views/cart-modal/CartModal.vue';
import { ref } from 'vue';

const isCartModalOpen = ref<boolean>(false);

function openCartModal() {
  isCartModalOpen.value = true;
}

function closeCartModal() {
  isCartModalOpen.value = false;
}
</script>

<template>
  <NavBar @modal:open="openCartModal"/>
  <div class="content-page">
    <router-view/>
  </div>
  <CartModal
    :isOpen="isCartModalOpen"
    @close="closeCartModal"
  />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
