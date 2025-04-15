<script setup lang="ts">
import BillingForm from './billing-form/BillingForm.vue';
import PaymentForm from './pay-form/PaymentForm.vue';
import { ref } from 'vue';

const message = ref('');

function handleNewMessage(newMessage: string) {
  message.value = newMessage
}
</script>

<template>
 <div class="payment-view">
  <BillingForm />
  <PaymentForm 
    @create:message="handleNewMessage"  
  />
  <p v-if="message">{{ message }}</p>
</div>
</template>

<style scoped lang="scss">

</style>