<script setup lang="ts">
import { reactive, defineExpose } from 'vue';
import { BillingInfo, FormErrors } from './billing.types';
import { Country, getCodeList } from 'country-list';
import { useI18n } from 'vue-i18n';

// I18n setup
const { t } = useI18n();
const I18Namespace = "payment-page";

// Form state
const billing = reactive<BillingInfo>({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zip: '',
  country: '',
});

const errors = reactive<FormErrors>({});

const countryData = getCodeList();
const countries = Object.entries(countryData).map(([code, name]) => ({
  code, name
})) as Country[];

const validateInput = (): boolean => {
  console.log("validating");

  if (!billing.firstName.trim()) {
    errors['firstName'] = t(`${I18Namespace}.errors.required-fname`);
    return false;
  }
  
  if (!billing.lastName.trim()) {
    errors['lastName'] = t(`${I18Namespace}.errors.required-lname`);
    return false;
  }
  
  if (!billing.email.trim()) {
    errors['email'] = t(`${I18Namespace}.errors.required-email`);
    return false;
  } else if (!/^\S+@\S+\.\S+$/.test(billing.email)) {
    errors['email'] = t(`${I18Namespace}.errors.invalid-email`);
    return false;
  }
  
  if (!billing.address.trim()) {
    errors['address'] = t(`${I18Namespace}.errors.required-address`);
    return false;
  }
  
  if (!billing.city.trim()) {
    errors['city'] = t(`${I18Namespace}.errors.required-city`);
    return false;
  }
  
  if (!billing.zip.trim()) {
    errors['zip'] = t(`${I18Namespace}.errors.required-zip`);
    return false;
  }
  
  if (!billing.country) {
    errors['country'] = t(`${I18Namespace}.errors.required-country`);
    return false;
  }

  return true;
}

const getBillingInfo = (): BillingInfo => {
  return { ...billing };
}

defineExpose({
  validateInput,
  getBillingInfo
});
</script>

<template>
  <div class="billing-form">
    <h2 class="form-title">Billing Information</h2>
    
    <div class="form-grid">
      <div class="form-field">
        <input 
          type="text" 
          v-model="billing.firstName" 
          placeholder="First name"
          :class="{ error: errors.firstName }"
        />
        <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
      </div>
      
      <div class="form-field">
        <input 
          type="text" 
          v-model="billing.lastName" 
          placeholder="Last name"
          :class="{ error: errors.lastName }"
        />
        <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
      </div>
      
      <div class="form-field">
        <input 
          type="email" 
          v-model="billing.email" 
          placeholder="Email"
          :class="{ error: errors.email }"
        />
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>
      
      <div class="form-field">
        <input 
          type="tel" 
          v-model="billing.phone" 
          placeholder="Phone"
          :class="{ error: errors.phone }"
        />
        <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
      </div>
      
      <div class="form-field full-width">
        <input 
          type="text" 
          v-model="billing.address" 
          placeholder="Address"
          :class="{ error: errors.address }"
        />
        <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
      </div>
      
      <div class="form-field">
        <input 
          type="text" 
          v-model="billing.city" 
          placeholder="City"
          :class="{ error: errors.city }"
        />
        <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
      </div>
      
      <div class="form-field">
        <input 
          type="text" 
          v-model="billing.zip" 
          placeholder="Zip"
          :class="{ error: errors.zip }"
        />
        <span v-if="errors.zip" class="error-message">{{ errors.zip }}</span>
      </div>
      
      <div class="form-field full-width">
        <select 
          v-model="billing.country"
          :class="{ error: errors.country }"
          placeholder="Country"
        >
          <option value="" disabled selected>Country</option>
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
        <span v-if="errors.country" class="error-message">{{ errors.country }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.billing-form {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 24px;
  background-color: #fff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.form-title {
  font-size: 20px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 24px;
  color: #2c3e50;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-field {
  display: flex;
  flex-direction: column;
  position: relative;
  
  &.full-width {
    grid-column: span 2;
  }
  
  input, select {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    color: #2c3e50;
    background-color: #fff;
    transition: border-color 0.2s ease;
    outline: none;
    
    &:focus {
      border-color: #1e2a38;
    }
    
    &.error {
      border-color: #e74c3c;
    }
    
    &::placeholder {
      color: #aaa;
    }
  }
  
  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232c3e50' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
    padding-right: 40px;
  }
}

.error-message {
  font-size: 12px;
  color: #e74c3c;
  margin-top: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

.continue-button {
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  padding: 12px 24px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #1e2a38;
  }
}
</style>