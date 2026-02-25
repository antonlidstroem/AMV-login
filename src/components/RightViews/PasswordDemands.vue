<template>
  <div class="contact-panel position-relative rounded-4 text-white p-4 border border-white"
       style="background-color: rgba(100, 100, 100, 0.80);
              width: 90%;
              max-width: 900px;
              height: 85%;
              max-height: 90vh;
              margin: auto;
              display: flex;
              flex-direction: column;">

    <!-- Stäng-knapp -->
    <button 
      class="btn btn-transparent btn-sm rounded-circle position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center p-0"
      @click="close"
    >
      <i class="bi bi-x-circle text-white fs-4"></i>
    </button>

    <!-- Rubrik -->
    <h2 class="text-white mb-4 text-center">{{ t('passwordRequirements') }}</h2>

    <!-- Lista med krav -->
    <div class="flex-grow-1 overflow-auto">
      <ul class="text-white">
        <li>Minst 5 tecken</li>
        <li>Måste innehålla siffror</li>
        <li>Måste innehålla stora och små bokstäver</li>
        <li>Måste innehålla minst ett specialtecken</li>
      </ul>
    </div>

    <!-- Stäng knapp -->
    <button type="button" class="btn-secondary-custom mt-3" @click="close">
      <i class="bi bi-x-circle-fill text-white fs-5"></i>
      {{ t('closeWindow') }}
    </button>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from '../../i18n/useI18n'

export default defineComponent({
  name: 'PasswordDemands',
  emits: ['close'],
  setup(_, { emit }) {
    const { t } = useI18n()

    const close = () => {
      emit('close')
    }

    return { t, close }
  }
})
</script>