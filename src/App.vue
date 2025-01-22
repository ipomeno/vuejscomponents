<script setup>
import FloatingUiBasic from './components/floating-ui/FloatingUiBasic.vue';
import DatePicker from './components/date-picker/DatePicker.vue';
import { ref } from 'vue';

const m_date = ref('2026-03-23');
const m_cadastro = ref('');
</script>

<template>
  <main>
    <div class="container mt-5">
      <div class="row mb-3">
        <div class="col-md-3">
          <label for="cadastro">Cadastro:</label>
          <date-picker id="cadastro" v-model="m_date"/>
        </div>

        <div class="col-md-3">
          <label for="alteracao">Alteracao:</label>
          <date-picker id="alteracao" v-model="m_cadastro"/>
        </div>
      </div>
    </div>
  </main>
</template>
