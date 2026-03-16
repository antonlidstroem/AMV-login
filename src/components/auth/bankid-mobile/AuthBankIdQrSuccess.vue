<template>
  <div class="bg-views p-4 rounded-4 mb-3">

    <AppLogo />

    <h2>{{ t('loginWithMobileBankID') }}</h2>

    <p class="mb-5">{{ t('securityCodeApproved') }}</p>

 
    <div class="d-flex justify-content-center align-items-center mb-5" style="height: 118px;">
      <AppSuccess />
    </div>

    <AppStepIndicator :total-steps="3" :active-step="3" />

    <div class="d-flex justify-content-center align-items-center gap-2 mb-5">
      <svg width="131" height="25" viewBox="0 0 131 25" fill="none"><circle cx="118.87" cy="12.1296" r="12.1296" fill="#7B9B3F"/><circle cx="65.5002" cy="12.1296" r="12.1296" fill="#ADB2A3"/><circle cx="12.1296" cy="12.1296" r="12.1296" fill="#ADB2A3"/></svg>
    </div>




    
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue' // Importera onMounted
import { useI18n } from 'vue-i18n'
import AppLogo from '../../common/AppLogo.vue'
import AppSuccess from '../../common/AppSuccess.vue'
import AppStepIndicator from '../../common/AppStepIndicator.vue'
import type { AuthUser } from '../../../modules/stores/auth'

const { t } = useI18n()
const emit = defineEmits<{ 
  (e: 'change-view', view: string, payload?: AuthUser): void 
}>()

onMounted(() => {
  setTimeout(() => {
    const bankIdUser = { username: 'BankID-användare', name: 'Sven Svensson' }
    
    // Skicka både användaren och triggern i samma anrop
    emit('change-view', 'authenticated-view', bankIdUser)
  }, 2000)
})
</script>
