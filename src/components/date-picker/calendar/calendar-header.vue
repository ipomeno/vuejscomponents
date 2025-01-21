<template>
  <div class="calendar-header">
    <div class="calendar-header-content">
      <button class="btn btn-secondary" @click="$emit('movePreviousMonth', $event)" role="btn-previous-month">
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="calendar-header-title">
        <h3 role="calendar-header-text">{{ formattedTitle }}</h3>
      </div>
      <button class="btn btn-secondary" @click="$emit('moveNextMonth', $event)" role="btn-next-month">
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

<style scoped>
.calendar-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.calendar-header-title {
  font-size: 1.5rem;
  text-transform: uppercase;
}

.calendar-header-title h3 {
  margin: 0;
  padding: 0;
}
</style>