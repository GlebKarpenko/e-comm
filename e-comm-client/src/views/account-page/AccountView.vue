<template>
  <div class="account-view">
    <button @click="loginWithGoogle">Login with Google</button>
  </div>
</template>

<script lang="ts" setup>
const loginWithGoogle = () => {
  window.location.href = 'http://localhost:8081/auth/google';
};
</script>