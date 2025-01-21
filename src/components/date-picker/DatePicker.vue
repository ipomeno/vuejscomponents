<script setup>
import Calendar from './calendar/calendar.vue';
import { computePosition, flip, offset, shift } from '@floating-ui/dom';
import { computed } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const calendarContainerId = computed(() => `${props.id}-calendar-container`);
const calendarButtonId = computed(() => `${props.id}-calendar-button`);

async function updatePosition(input, calendarContainer) {
  const {x, y} = await computePosition(input, calendarContainer, {
    placement: 'bottom',
    middleware: [
      offset(6),
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
  const buttonClose = calendarContainer.querySelector('button');

  calendarContainer.style.display = 'block';
  await updatePosition(input, calendarContainer);
  buttonClose.focus();
}

function hideCalendar() {
  const calendarContainer = document.getElementById(calendarContainerId.value);
  const buttonOpen = document.querySelector(`#${calendarButtonId.value}`);
  calendarContainer.style.display = 'none';
  buttonOpen.focus();
}
</script>

<template>
  <div class="field-container">
   <div class="date-input-container">
    <input type="text" :id="props.id" />
    <button type="button" :id="`${props.id}-calendar-button`" class="calendar-button"
      @click="showCalendar()">&nbsp;</button>
   </div>
    <div :id="`${props.id}-calendar-container`" class="datepicker-container">
      <div class="calendar-content">
        <calendar />
        <button type="button" @click="hideCalendar()">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.field-container {
  margin: 10px 0px;
}
.datepicker-container {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  border: 2px solid black;
  padding: 10px;
}
</style>