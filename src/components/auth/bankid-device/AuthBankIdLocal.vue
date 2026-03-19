<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <AppLogo />
    <h2>{{ t('loginWithBankID') }}</h2>
    <p class="mb-5">{{ t('enterSecurityCode') }}</p>

    <div class="d-flex justify-content-center mb-5">
      <AppSpinner />
    </div>

    <AppStepIndicator :total-steps="2" :active-step="1" />

    <div class="d-flex justify-content-between align-items-center mt-3 mb-5">
      <AppBackLink :label="t('back')" @click="ui.setView('login')" />
      <AppBankIdLink :label="t('aboutMobileBankID')" />
    </div>

    <div class="divider mb-3"><h4>{{ t('orBankId') }}</h4></div>
    
    <button @click="ui.setView('auth-bankid-qr')" class="btn-custom d-flex align-items-center justify-content-start gap-2 mb-3">
      <img :src="bankIdLogo" width="25" height="24" alt="BankID" />
      {{ t('mobileBankID') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../../modules/stores/auth'
import { useUIStore } from '../../../modules/stores/ui'
import bankIdLogo from '../../../assets/bankid-logo-white.png'
import AppBackLink from '../../common/AppBackLink.vue'
import AppBankIdLink from '../../common/AppBankIdLink.vue'
import AppLogo from '../../common/AppLogo.vue'
import AppSpinner from '../../common/AppSpinner.vue'
import AppStepIndicator from '../../common/AppStepIndicator.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const ui = useUIStore()

onMounted(async () => {
  try {
    await authStore.loginWithBankId()
    ui.setView('auth-bankid-local-success')
  } catch (err) {
    ui.setView('login') 
  }
})

onUnmounted(() => {
  authStore.isLoading = false
})
</script>