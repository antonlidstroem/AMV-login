<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <AppLogo />
    <h2>{{ t('loginWithBankID') }}</h2>
    <p class="mb-5">{{ t('securityCodeApproved') }}</p>

    <div class="d-flex justify-content-center align-items-center mb-5" style="height: 118px;">
      <AppSuccess />
    </div>

    <!-- Lokal BankID har bara 2 steg totalt -->
    <AppStepIndicator :total-steps="2" :active-step="2" />

    <div class="d-flex justify-content-center align-items-center gap-2 mb-5">
      <svg width="131" height="25" viewBox="0 0 131 25" fill="none">
        <circle cx="118.87" cy="12.1296" r="12.1296" fill="#7B9B3F"/>
        <circle cx="65.5002" cy="12.1296" r="12.1296" fill="#ADB2A3"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../../modules/stores/auth'
import AppLogo from '../../common/AppLogo.vue'
import AppSuccess from '../../common/AppSuccess.vue'
import AppStepIndicator from '../../common/AppStepIndicator.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const emit = defineEmits(['change-view'])

onMounted(() => {
  setTimeout(() => {
    if (authStore.pendingUser || authStore.user) {
      authStore.confirmLogin() 
      emit('change-view', 'authenticated-view')
    }
  }, 1500)
})
</script>