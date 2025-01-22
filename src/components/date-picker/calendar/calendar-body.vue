<template>
  <div class="calendar-body pt-3">
    <table class="table m-0" width="100%" role="calendar-days">
      <thead>
        <tr class="calendar-weekdays" role="calendar-days-header">
          <th class="fs-6 fw-medium text-uppercase p-1 border-0">Dom</th>
          <th class="fs-6 fw-medium text-uppercase p-1 border-0">Seg</th>
          <th class="fs-6 fw-medium text-uppercase p-1 border-0">Ter</th>
          <th class="fs-6 fw-medium text-uppercase p-1 border-0">Qua</th>
          <th class="fs-6 fw-medium text-uppercase p-1 border-0">Qui</th>
          <th class="fs-6 fw-medium text-uppercase p-1 border-0">Sex</th>
          <th class="fs-6 fw-medium text-uppercase p-1 border-0">Sáb</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(days, index) in weekDays" :key="`week${index}`">
          <td v-for="(dateValue, indexDay) in days" :key="`day${indexDay}`" class="p-0 border-0">
            <calendar-day 
              :disabled="isDisabled(dateValue)" 
              :in-range="inRange(dateValue)"
              :selected="isSelected(dateValue)"
              :date="dateValue" 
              @click="selectDate($event)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue';
import CalendarDay from './calendar-day.vue';

import { createDateTimeIsoValidator } from './validator-lib';
import { daysSplittedByWeeks, isDateBetween, isDateEqual, isDateInMonth } from './calendar-body-lib.';
import { DateTime } from 'luxon';

const props = defineProps({
  date: {
    type: String,
    required: true,
    validator: createDateTimeIsoValidator('date', true)
  },
  modelValue: {
    type: String,
    required: false,
    default: null,
    validator: createDateTimeIsoValidator('modelValue')
  },
  // endDate: {
  //   type: String,
  //   required: false,
  //   validator: createDateTimeIsoValidator('endDate')
  // },
  // startDate: {
  //   type: String,
  //   required: false,
  //   validator: createDateTimeIsoValidator('startDate')
  // },
});

// const range = reactive({
//   startDate: null,
//   endDate: null,
// });

const weekDays = computed(() => {
  return daysSplittedByWeeks(props.date);
});

function isDisabled(date) {
  if (!isDateInMonth(date, props.date)) {
    return true;
  }

  return false;
}

function inRange(date) {
  return isDateBetween(date, props.startDate, props.endDate);
}

function isSelected(date) {
  return isDateEqual(date, props.modelValue);
  /*
  if (isDateEqual(date, props.startDate)) {
    return true;
  }

  if (isDateEqual(date, props.endDate)) {
    return true;
  }

  return false;
  */
}

const emits = defineEmits(['select', 'update:modelValue']);
function selectDate(date) {
  emits('update:modelValue', date);
  emits('select', date);
  /*
  if (range.startDate !== null && range.endDate !== null) {
    range.startDate = DateTime.fromFormat(date, 'yyyy-mm-dd').toISODate();
    range.endDate = null;
    return;
  }

  if (range.startDate === null) {
    range.startDate = DateTime.fromFormat(date, 'yyyy-mm-dd').toISODate();
    return;
  }

  if (range.endDate === null) {
    range.endDate = DateTime.fromFormat(date, 'yyyy-mm-dd').toISODate();
    emits('select', range);
  }
    */
}
</script>