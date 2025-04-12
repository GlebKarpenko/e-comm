<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import filterData from '@/views/products-page/data/filterData';
import RangeFilter from './RangeFilter.vue';
import { FilterState } from '../types/filter.types';

const { t } = useI18n({ useScope: 'global' });

// Range selectors
const selectors = ref(filterData.rangeSelectors);
const selectedPrice = ref<[number, number]>([selectors.value[0].min, selectors.value[0].max]);
const selectedPerfomance = ref<[number, number]>([selectors.value[1].min, selectors.value[1].max]);

function updatePrice(newPrice: [number, number]) {
  selectedPrice.value = newPrice;
}

function updatePerfomance(newPerfomance: [number, number]) {
  selectedPerfomance.value = newPerfomance;
}

// Update translation keys with localized label values
const selectorLabels = computed(() => {
    return filterData.rangeSelectors.map(selector => {
      return { label: t(selector.labelKey) };
    });
});

// Checkbox inputs
const checkboxes = ref(filterData.checkBoxFilters);

// Update translation key for labels or options with their translations
const translatedCheckboxes = computed(() => {
  return filterData.checkBoxFilters.map(filter => {
    // Translate both labels and options that need localization
    if (filter.optionsKeys) {
      return {
        label: t(filter.labelKey),
        options: filter.optionsKeys.map(key => t(key))
      };
    }

    // Only translate labels, dont change options
    return {
      label: t(filter.labelKey),
      options: filter.options
    }
  })
});

// Global state to keep track of selected options
// If new value is selected it is added as key-value pair
// Range values are selected by default, the rest are unactive before user interacts with them
const filterState = ref<FilterState>({
  price: selectedPrice.value,
  perfomance_range: selectedPerfomance.value
});

function updateFilterState(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.value;

  console.log("new selection", value);
}

// Keep track of which filtering options are opened
const openSections = ref<boolean[]>(translatedCheckboxes.value.map(() => false));

function toggle(index: number) {
  openSections.value[index] = !openSections.value[index];
}

</script>

<template>
  <div class="filter-panel">
    <RangeFilter 
      :filter-label="selectorLabels[0].label"
      :min="selectors[0].min"
      :max="selectors[0].max"
      v-model="selectors[0].initialRange"
      @update:model-value="updatePrice"
    />

    <div
      v-for="(checkboxGroup, groupIndex) in checkboxes"
      :key="groupIndex"
      class="filter-section"
    >
      <button class="filter-header" @click="toggle(groupIndex)">
        {{ translatedCheckboxes[groupIndex].label }}
        <span class="chevron" :class="{ open: openSections[groupIndex] }">⌄</span>
      </button>

      <transition name="fold">
        <div v-show="openSections[groupIndex]" class="filter-options">
          <label 
            v-for="(option, optionIndex) in checkboxGroup.values" 
            :key="option" 
            class="option"
          >
            <input 
              type="checkbox"
              :id="option"
              :name="checkboxGroup.labelKey"
              :value="option"
              @change="updateFilterState"
            />
            {{ translatedCheckboxes[groupIndex].options[optionIndex] }}
          </label>
        </div>
      </transition>
    </div>

    <RangeFilter 
      :filter-label="selectorLabels[1].label"
      :min="selectors[1].min"
      :max="selectors[1].max"
      v-model="selectors[1].initialRange"
      @update:model-value="updatePerfomance"
    />
  </div>
</template>

<style scoped lang="scss">
.filter-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
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