<template>
  <div class="calendar-container p-2 border border-1 rounded bg-white">
    <calendar-header :date="actualDate" 
      @movePreviousMonth="movePreviousMonth" 
      @moveNextMonth="moveNextMonth" />

      <!-- :start-date="startDate"
      :end-date="endDate" -->
    <calendar-body :model-value="date" :date="actualDate" @select="selectDate($event)" />
  </div>
</template>

<script setup>
import CalendarHeader from './calendar-header.vue';
import CalendarBody from './calendar-body.vue';

import { createNewDateTimeISO, plusMonth, subMonth } from './calendar-lib';
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
  date: {
    type: String,
    required: false,
    default: null,
  },
  startDate: {
    type: String,
    required: false,
    default: null,
  },
  endDate: {
    type: String,
    required: false,
    default: null,
  },
});

const actualDate = ref(createNewDateTimeISO());
watch(() => props.date, (newValue) => {
  actualDate.value = newValue;
});

onMounted(() => {
  if (props.date) {
    actualDate.value = props.date;
    return;
  }

  actualDate.value = createNewDateTimeISO();
});

function moveNextMonth() {
  actualDate.value = plusMonth(actualDate.value, 1);
}

function movePreviousMonth() {
  actualDate.value = subMonth(actualDate.value, 1);
}

const emits = defineEmits(['select']);
function selectDate(dateRange) {
  emits('select', dateRange);
}
</script>