<template>
  <div class="payment-revision">
    <PaymentRevisionForm
      v-if="step === 'form'"
      @change-step="changeStep"
    />
    <PaymentRevisionSummary
      v-if="step === 'summary'"
      @edit-billing-data="editBillingData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PaymentRevisionForm, PaymentRevisionSummary } from './components';

const step = ref<'form' | 'summary'>('form');

const changeStep = (newStep: 'form' | 'summary') => {
  step.value = newStep;
}

const editBillingData = () => {
  console.log('editBillingData');
  step.value = 'form';
}
</script>

<style scoped lang="scss">
.payment-revision {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
</style>
