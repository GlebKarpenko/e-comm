<script setup lang="ts">
import { defineEmits, ref} from 'vue';
import i18n from '@/config/i18n';
import { useI18n } from 'vue-i18n';
import { Locales } from '@/config/i18n';

const emit = defineEmits(['modal:open']);

const { t } = useI18n({ useScope: 'global' });

const selectedLanguage = ref<Locales>(Locales.UKR);

async function updateLanguage() {
  i18n.global.locale = selectedLanguage.value;
}
</script>

<template>
  <nav class="app-bar">
    <div class="left-content">
      <RouterLink to="/" class="logo-container">
        <img src="@/assets/logo_cropped.png" alt="Logo" class="logo-image" />
      </RouterLink>

      <button class="icon-button catalogue-button" :aria-label="t('navbar.catalogue.aria-label')">
        <i class="fas fa-bars" aria-hidden="true"></i>
        <span class="button-text">{{ t('navbar.catalogue.display-text') }}</span>
      </button>

      <div class="search-bar"></div>
    </div>

    <ul class="right-content">
      <li>
        <RouterLink to="/account" class="icon-button" :aria-label="t('navbar.account.aria-label')">
          <i class="fas fa-user" aria-hidden="true"></i>
          <span class="sr-only">{{ t('navbar.account.aria-label') }}</span>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/favorites" class="icon-button" :aria-label="t('navbar.favorites.aria-label')">
          <i class="fas fa-heart" aria-hidden="true"></i>
          <span class="sr-only">{{ t('navbar.favorites.aria-label') }}</span>
        </RouterLink>
      </li>
      <li>
        <button 
          class="icon-button" 
          :aria-label="t('navbar.cart.aria-label')"
          @click="emit('modal:open')"
        >
          <i class="fas fa-shopping-cart" aria-hidden="true"></i>
          <span class="sr-only">{{ t('navbar.cart.aria-label') }}</span>
        </button>
      </li>
      <li>
        <label for="language-selector" class="sr-only">{{ t('navbar.language-selector.sr-text') }}</label>
        <select 
          id="language-selector" 
          class="language-selector" 
          aria-label="Language selector"
          v-model="selectedLanguage"
          @change="updateLanguage"
        >
          <option value="en">ENG</option>
          <option value="uk">UKR</option>
        </select>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.app-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.left-content,
.right-content {
  display: flex;
  align-items: center;
}

.right-content {
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 1rem;
}

.right-content li {
  display: flex;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
}

.logo-image {
  height: 40px;
  width: auto;
}

.icon-button {
  background: none;
  border: none;
  color: #2c3e50;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}

.icon-button:hover {
  color: #3498db;
}

.icon-button .button-text {
  margin-left: 8px;
  font-size: 1rem;
  display: inline-block;
}

.language-selector {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  cursor: pointer;
  font-size: 0.9rem;
}

/* Accessible text for screen readers only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
