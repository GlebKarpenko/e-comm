<script setup lang="ts">
import { defineProps, PropType, defineEmits, ref, watch } from 'vue';

const props = defineProps(({
  filterLabel: {
    type: String,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  modelValue: {
    type: Array as PropType<number[]>,
    required: true
  }
}));

const emit = defineEmits(['update:modelValue']);
const rangeValues = ref<number[]>([...props.modelValue]);

watch(() => props.modelValue, (val) => {
  if (val) {
    rangeValues.value = [...val];
  }
});

function updateMinValue(event: Event) {
  const value = Number((event.target as HTMLInputElement).value);
  rangeValues.value[0] = value;
  emitChange();
}

function updateMaxValue(event: Event) {
  const value = Number((event.target as HTMLInputElement).value);
  rangeValues.value[1] = value;
  emitChange();
}

function emitChange() {
  const [minVal, maxVal] = rangeValues.value;
  if (minVal <= maxVal) {
    emit('update:modelValue', [minVal, maxVal]);
  }
}
</script>

<template>
  <div class="range-filter">
    <label class="filter-label">{{ props.filterLabel }}</label>
    <div class="inputs">
      <input
        type="number"
        :value="rangeValues[0]"
        :min="props.min"
        :max="props.max"
        @input="updateMinValue"
      />
      <span>-</span>
      <input
        type="number"
        :value="rangeValues[1]"
        :min="props.min"
        :max="props.max"
        @input="updateMaxValue"
      />
    </div>
    <input
      type="range"
      :value="rangeValues[0]"
      :min="props.min"
      :max="props.max"
      @input="updateMinValue"
    />
    <span>-</span>
    <input
      type="range"
      :value="rangeValues[1]"
      :min="props.min"
      :max="props.max"
      @input="updateMaxValue"
    />
  </div>
</template>

<style scoped lang="scss">
.range-filter {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .filter-label {
    color: #666;
    font-weight: 500;
    margin-bottom: 0.25rem;
    margin-right: auto;
  }

  .inputs {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
      width: 80%;
      padding: 0.2rem 0.4rem;
    }

    span {
      font-size: 0.9rem;
      color: #888;
    }

    input[type="range"] {
      width: 100%;
    }
  };
}
</style>