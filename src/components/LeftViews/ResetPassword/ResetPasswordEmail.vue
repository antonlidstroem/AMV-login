<template>
  <div class="bg-views p-4 rounded-4 mb-3 mt-5">

    <!-- Logo -->
    <img :src="AMVLogo" class="logo-top" />

    <!-- Rubrik -->
    <h2 class="mt-4 py-2">{{ t('resetPassword') }}</h2>

    <!-- Ikon -->
    <div class="text-center mb-5">
      <i class="bi bi-check-circle display-1" style="color: var(--success)"></i>
    </div>

    <!-- Text -->
    <p>{{ t('ResetPasswordEmailSent') }}</p>

    <!-- Knapp till start -->
    <button class="btn-custom mb-3" @click="goToStart">
      {{ t('goToStart') }}
    </button>

    <!-- Knapp till simulering -->
    <button class="btn-temp mb-3" @click="goToResetNew">
      Simulera
    </button>


  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import AMVLogo from '../../../assets/logo_horizontal.svg'
import NoEmailReceived from './NoEmailReceived.vue'

export default defineComponent({
  name: 'ResetPasswordEmail',
  components: { NoEmailReceived },
  emits: ['change-view'],
  setup(_, { emit }) {
    const { t } = useI18n()

    const goToStart = () => {
      emit('change-view', 'login')
    }

    const goToResetNew = () => {
      emit('change-view', 'newpassword')
    }

    return { t, goToStart, goToResetNew, AMVLogo }
  }
})
</script>