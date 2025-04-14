<script setup lang="ts">
import NavBar from './components/layouts/NavBar.vue';
import CartModal from '@/views/cart-modal/CartModal.vue';
import { useModalStore } from '@/store/modalStore';

const modalStore = useModalStore();
</script>

<template>
  <NavBar @modal:open="modalStore.openCartModal"/>
  <div class="content-page">
    <router-view/>
  </div>
  <CartModal
    :isOpen="modalStore.isCartOpen"
    @close="modalStore.closeCartModal"
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
