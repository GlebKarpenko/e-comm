<script setup lang="ts">
import { ref } from 'vue';
import RangeFilter from './RangeFilter.vue';

const filters = [
  { label: 'Socket', options: ['AM4', 's1700', 's1200'] },
  { label: 'Core Count', options: ['4 cores', '6 cores', '8 cores', '16 cores'] },
  { label: 'Brand', options: ['Intel', 'AMD'] },
];

const openSections = ref<boolean[]>(filters.map(() => false));

function toggle(index: number) {
  openSections.value[index] = !openSections.value[index];
}

const priceRange = [5000, 20000];
</script>

<template>
  <div class="filter-panel">
    <RangeFilter 
      filter-label="Price"
      :min="0"
      :max="100000"
      v-model="priceRange"
    />
    <div
      v-for="(filter, index) in filters"
      :key="index"
      class="filter-section"
    >
      <button class="filter-header" @click="toggle(index)">
        {{ filter.label }}
        <span class="chevron" :class="{ open: openSections[index] }">⌄</span>
      </button>

      <transition name="fold">
        <div v-show="openSections[index]" class="filter-options">
          <label v-for="option in filter.options" :key="option" class="option">
            <input type="checkbox" />
            {{ option }}
          </label>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filter-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 0;
}

.filter-section {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.5rem;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-weight: 500;
  font-size: 1rem;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0;
  text-align: left;

  .chevron {
    transition: transform 0.2s ease;
    &.open {
      transform: rotate(180deg);
    }
  }
}

.filter-options {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.option {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #333;

  input {
    margin-right: 0.5rem;
  }
}

/* Transition */
.fold-enter-active, .fold-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
}
.fold-enter-from, .fold-leave-to {
  max-height: 0;
  opacity: 0;
}
.fold-enter-to, .fold-leave-from {
  max-height: 300px;
  opacity: 1;
}
</style>