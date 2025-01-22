<script setup>
import Calendar from './calendar/calendar.vue';
import { computed, onMounted, ref } from 'vue';

import im from 'inputmask';
import { computePosition, flip, offset, shift } from '@floating-ui/dom';
import { DateTime } from 'luxon';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: false,
    default: null,
  },
});

const calendarContainerId = computed(() => `${props.id}-calendar-container`);
const calendarButtonId = computed(() => `${props.id}-calendar-button`);
const inputValue = ref(props.modelValue);
const emits = defineEmits(['update:modelValue']);

onMounted(() => {
  const input = document.getElementById(props.id);
  const inputMask = im('99/99/9999', {
    'oncomplete': (event) => {
      let value = event.target.value;
      inputValue.value = value;
      
      value = DateTime.fromFormat(value, 'dd/MM/yyyy').toISODate();
      emits('update:modelValue', value);
    },
  }).mask(input);

  if (props.modelValue) {
    inputMask.setValue(DateTime.fromISO(props.modelValue).toFormat('dd/MM/yyyy'));
  }
});

async function updatePosition(input, calendarContainer) {
  const {x, y} = await computePosition(input, calendarContainer, {
    placement: 'bottom',
    middleware: [
      offset(4),
      flip(),
      shift({ padding: 5 }),
    ],
  });

  Object.assign(calendarContainer.style, {
    left: `${x}px`,
    top: `${y}px`,
  });
}

async function showCalendar() {
  const input = document.getElementById(props.id);
  const calendarContainer = document.getElementById(calendarContainerId.value);

  calendarContainer.style.display = 'block';
  await updatePosition(input, calendarContainer);
}

function hideCalendar() {
  const calendarContainer = document.getElementById(calendarContainerId.value);
  const buttonOpen = document.querySelector(`#${calendarButtonId.value}`);
  calendarContainer.style.display = 'none';
  buttonOpen.focus();
}

function selectDate(date) {
  inputValue.value = DateTime.fromISO(date).toFormat('dd/MM/yyyy');
  emits('update:modelValue', date);
  hideCalendar();
}
</script>

<template>
  <div class="field-container">
   <div class="date-input-container input-group mb-3">
    <input type="text" class="form-control" :id="props.id" :value="inputValue"/>
    <button type="button" :id="`${props.id}-calendar-button`" class="btn btn-secondary calendar-button"
      @click="showCalendar()">
      <i class="fa fa-calendar"></i>
    </button>
   </div>
    <div :id="`${props.id}-calendar-container`" class="position-absolute p-0 m-0 datepicker-container">
        <calendar :date="modelValue" @select="selectDate($event)"/>
    </div>
  </div>
</template>

<style scoped>
.datepicker-container {
  display: none;
}
</style>