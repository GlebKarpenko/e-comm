<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import filterData from '@/views/products-page/data/filterData';
import RangeFilter from './RangeFilter.vue';
import { CheckboxFilterKey, FilterState } from '../types/filter.types';

const emit = defineEmits(['update:filterState']);

const { t } = useI18n({ useScope: 'global' });

// Range selectors
const selectors = ref(filterData.rangeSelectors);

function updatePrice(newPrice: [number, number]) {
  filterState.value.price = newPrice;
  emit('update:filterState', filterState.value);
}

function updatePerfomance(newPerfomance: [number, number]) {
  filterState.value.perfomance_range = newPerfomance;
  emit('update:filterState', filterState.value);
}

// Update translation keys with localized label values
const selectorLabels = computed(() => {
    return filterData.rangeSelectors.map(selector => {
      return { label: t(selector.labelKey) };
    });
});

// Global state to keep track of selected options
// Range values are selected by default with maximum possible range
// Other checkbox values are unactive before user interacts with them
const filterState = ref<FilterState>({
  price:            [selectors.value[0].min, selectors.value[0].max],
  perfomance_range: [selectors.value[1].min, selectors.value[1].max]
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

function updateFilterState(event: Event) {
  const target = event.target as HTMLInputElement;
  const key = target.name as CheckboxFilterKey;
  const value = target.value;

  // If option of new type is selected its name added as key
  if (!filterState.value[key]) {
    filterState.value[key] = [value];
  } else {
    // Toggle checkbox selection
    const existing = filterState.value[key];
    const index = existing.indexOf(value);

    if (index === -1){
      existing.push(value);
    } else {
      existing.splice(index, 1);
      if (existing.length === 0){
        // If last option of filter-type is unselected, delete filter-type
        delete filterState.value[key];
      }
    }
  }

  emit('update:filterState', filterState.value);
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
              :name="checkboxGroup.id"
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