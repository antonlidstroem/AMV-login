<template>
  <div class="bg-views p-4 rounded-4">
    <AppLogo />
    <h2>{{ t('loginWithMobileBankID') }}</h2>
    <p class="mb-5">{{ t('waitingForAuth') }}</p>

    <div class="d-flex justify-content-center align-items-center mb-5" style="height: 200px;">
      <AppSpinner />
    </div>

    <AppStepIndicator :total-steps="3" :active-step="2" />

    <div class="d-flex justify-content-between align-items-center mt-3">
      <AppBackLink :label="t('back')" @click="handleGoBack" />
      <AppBankIdLink :label="t('aboutMobileBankID')" />
    </div>

    <div class="divider my-3">
      <hr class="flex-grow-1" /><span class="px-2 small">{{ t('or') }}</span><hr class="flex-grow-1" />
    </div>

    <button
      @click="handleSwitchToLocal"
      class="btn-custom d-flex align-items-center justify-content-start gap-2 mb-3"
      type="button"
    >
      <img :src="bankIdLogo" class="bankid-icon" alt="BankID" />
      {{ t('bankIDThisDevice') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../../modules/stores/auth'
import { useUIStore } from '../../../modules/stores/ui'
import bankIdLogo from '../../../assets/bankid-logo-white.png'
import AppBackLink from '../../common/AppBackLink.vue'
import AppBankIdLink from '../../common/AppBankIdLink.vue'
import AppLogo from '../../common/AppLogo.vue'
import AppSpinner from '../../common/AppSpinner.vue'
import AppStepIndicator from '../../common/AppStepIndicator.vue'

const authStore = useAuthStore()
const ui = useUIStore()
const { t } = useI18n()

const handleGoBack = () => {
  authStore.stopPolling()
  ui.setView('login')
}

const handleSwitchToLocal = () => {
  authStore.stopPolling()
  ui.setView('auth-bankid-local')
}

onUnmounted(() => {
  if (authStore.isPolling) {
    authStore.stopPolling()
  }
})
</script>
