<template>
  <div :class="classDay" @click="dayOnClick($event)">{{ formattedDay }}</div>
</template>

<script setup>
import { computed } from 'vue';
import { formatDay } from './calendar-day-lib';
import { createDateTimeIsoValidator } from './validator-lib';

const props = defineProps({
  date: {
    type: String,
    required: true,
    validator: createDateTimeIsoValidator('date', true),
  },
  selected: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  inRange: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const classDay = computed(() => {
  const result = ['day'];

  if (props.disabled) {
    result.push('day--disabled');
    return result.join(' ');
  }

  if (props.selected) {
    result.push('day--selected');
  }

  if (props.inRange) {
    result.push('day--in-range');
  }

  return result.join(' ');
});

const formattedDay = computed(() => {
  return formatDay(props.date);
});

const emits = defineEmits(['click']);
const dayOnClick = (event) => {
  if ((props.disabled) && (props.selected)) {
    return;
  }

  emits('click', props.date);
}
</script>

<style scoped>
.day,
.day--disabled,
.day--selected,
.day--in-range,
.day--not-in-month {
  text-align: center;
  padding: 0.5rem;
  color: #010101;
  width: 100%;
}

.day,
.day--selected,
.day--in-range {
  cursor: pointer;
}

.day--disabled {
  color: #ccc;
  cursor: not-allowed;
}

.day--not-in-month {
  color: #f0f0f0;
  visibility: hidden;
}

.day--in-range {
  background-color: #f0f0f0;
}

.day--selected {
  background-color: #007bff;
  color: white;
}
</style>