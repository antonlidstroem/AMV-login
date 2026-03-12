<template>
  <div class="bg-views p-4 rounded-4 mb-3">

    <AppLogo />

    <h2>{{ t('loginWithMobileBankID') }}</h2>

    <p class="mb-5">{{ t('SecurityCodeApproved') }}</p>

 
    <div class="d-flex justify-content-center align-items-center mb-5" style="height: 118px;">
      <AppSuccess />
    </div>

    <StepIndicator :total-steps="3" :active-step="3" />

    <div class="d-flex justify-content-center align-items-center gap-2 mb-5">
      <svg width="131" height="25" viewBox="0 0 131 25" fill="none"><circle cx="118.87" cy="12.1296" r="12.1296" fill="#7B9B3F"/><circle cx="65.5002" cy="12.1296" r="12.1296" fill="#ADB2A3"/><circle cx="12.1296" cy="12.1296" r="12.1296" fill="#ADB2A3"/></svg>
    </div>




    
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue' // Importera onMounted
import { useI18n } from '../../../i18n/useI18n'
import AppLogo from '../../common/AppLogo.vue'
import AppSuccess from '../../common/AppSuccess.vue'
import StepIndicator from '../../common/StepIndicator.vue'

const { t } = useI18n()
const emit = defineEmits<{ (e: 'change-view', view: string): void }>()

onMounted(() => {
  // 1000ms (animationstid) + 1000ms (din fördröjning) = 2000ms
  setTimeout(() => {
    // Skicka 'loginview' till App.vue som i sin tur kör auth.login()
    emit('change-view', 'loginview')
  }, 2000)
})
</script>
