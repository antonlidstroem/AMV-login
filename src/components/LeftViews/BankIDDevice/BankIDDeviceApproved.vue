<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <AppLogo />

    <h2>{{ t('loginWithBankID') }}</h2>

    <p>{{ t('SecurityCodeApproved') }}</p>

 
      <div class="d-flex justify-content-center align-items-center mb-5" style="height: 118px;">
      <AppSuccess />
      </div>

      <StepIndicator :total-steps="2" :active-step="2" />

<button v-if="isDev" @click="emit('change-view', 'loginview')" class="btn-temp" type="button">
      Simulera lyckad inloggning (Dev)
    </button>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import AppLogo from '../../common/AppLogo.vue'
import AppSuccess from '../../common/AppSuccess.vue'
import StepIndicator from '../../common/StepIndicator.vue'

const { t } = useI18n()
const isDev = import.meta.env.DEV
const emit = defineEmits<{ (e: 'change-view', view: string): void }>()

onMounted(() => {
  // Vänta på animationen (1s) + fördröjning (1s) = 2s innan vi skickas till LoginView
  setTimeout(() => {
    emit('change-view', 'loginview')
  }, 2000)
})
</script>
