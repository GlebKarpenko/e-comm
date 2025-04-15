<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import BillingForm from './billing-form/BillingForm.vue';
import PaymentForm from './pay-form/PaymentForm.vue';
import OrderSummary from './order-summary/OrderSummary.vue';

const billingFormRef = ref();
const paymentFormRef = ref();

const loading = ref(false);
const message = ref('');

const billingInfo = ref(null);
const paymentComplete = ref(false);

const pay = async () => {
  if (billingFormRef.value) {
    const billingValid = billingFormRef.value.validateInput();

    if (!billingValid) return;
    billingInfo.value = billingFormRef.value.getBillingInfo();
  }

  if (paymentFormRef.value) {
    loading.value = true;
    await paymentFormRef.value.pay();
    loading.value = paymentFormRef.value.loading;
  }
}

function handleNewMessage(newMessage: string) {
  message.value = newMessage
}

function handleNewStatus(isComplete: boolean) {
  paymentComplete.value = isComplete;
}

// I18n setup
const { t } = useI18n();
const I18Namespace = "payment-page";
</script>

<template>
 <div class="payment-view">
  <OrderSummary />
  <BillingForm
    ref="billingFormRef"
    @create:message="handleNewMessage"
  />
  <PaymentForm 
    ref="paymentFormRef"
    @create:message="handleNewMessage"  
    @payment:status="handleNewStatus"
  />
  <button @click="pay" :disabled="loading || paymentComplete ">
    {{ loading ? t(`${I18Namespace}.processing`) : t(`${I18Namespace}.pay`) }}
  </button>
  <p v-if="message">{{ message }}</p>
</div>
</template>

<style scoped lang="scss">
button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #5469d4;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:disabled {
    background-color: #aab3e1;
    cursor: not-allowed;
    filter: grayscale(100%);
    opacity: 0.7;
  }
}

.order-summary {
  margin-top: 14px;
  margin-bottom: 14px;
}
</style>