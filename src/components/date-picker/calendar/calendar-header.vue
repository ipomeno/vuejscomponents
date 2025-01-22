<template>
  <div class="calendar-header">
    <div class="d-flex align-items-center justify-content-between">
      <button class="btn btn-secondary btn-sm" @click="$emit('movePreviousMonth', $event)" role="btn-previous-month">
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="calendar-header-title">
        <h3 class="fs-5 text-uppercase m-0 p-0" role="calendar-header-text">{{ formattedTitle }}</h3>
      </div>
      <button class="btn btn-secondary btn-sm" @click="$emit('moveNextMonth', $event)" role="btn-next-month">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { createDateTimeIsoValidator } from './validator-lib';
import { formatTitle } from './calendar-header-lib';

const props = defineProps({
  date: {
    type: String,
    required: true,
    validator: createDateTimeIsoValidator('date', true),
  },
});

const emits = defineEmits(['movePreviousMonth', 'moveNextMonth']);

const formattedTitle = computed(() => {
  return formatTitle(props.date);
});
</script>