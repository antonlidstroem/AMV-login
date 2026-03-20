<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <!-- <AppLogo /> -->
    <h2>{{ t('loginWithBankID') }}</h2>
    <p class="mb-5">{{ t('enterSecurityCode') }}</p>

    <div class="d-flex justify-content-center mb-5">
      <AppSpinner />
    </div>

    <AppStepIndicator :total-steps="2" :active-step="1" />

    <div class="d-flex justify-content-between align-items-center mt-3 mb-5">
      <AppBackLink :label="t('back')" @click="handleGoBack" />
      <AppBankIdLink :label="t('aboutMobileBankID')" />
    </div>

    <div class="divider mb-3"><h4>{{ t('orBankId') }}</h4></div>

    <button
      @click="handleSwitchToQr"
      class="btn-custom d-flex align-items-center justify-content-start gap-2 mb-3"
      type="button"
    >
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

// Guard against stale navigation: if the user navigates away before
// loginWithBankId() resolves, the async closure must not call ui.setView.
let isMounted = true

onMounted(async () => {
  try {
    await authStore.loginWithBankId()
    if (isMounted) ui.setView('auth-bankid-local-success')
  } catch {
    if (isMounted) ui.setView('login')
  }
})

onUnmounted(() => {
  isMounted = false
  authStore.resetLoading()
})

const handleGoBack = () => {
  isMounted = false
  authStore.resetLoading()
  ui.setView('login')
}

// Stop the in-progress authenticate call from navigating to local-success
// after the user has already switched to the QR flow.
const handleSwitchToQr = () => {
  isMounted = false
  authStore.resetLoading()
  ui.setView('auth-bankid-qr')
}
</script>
