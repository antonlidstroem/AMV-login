<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <AppLogo />
    <div class="form-group-custom">
      <h2 class="mb-2">{{ t('loginWithMobileBankID') }}</h2>
      <p class="mb-4">{{ t('scanQRCode') }}</p>

      <div class="qr-wrapper mb-5 d-flex justify-content-center"> 
        <div v-if="isQrLoaded" class="fake-qr"></div>
        <div
          v-else
          class="qr-placeholder d-flex align-items-center justify-content-center border rounded-3 w-100"
          style="height: 200px; max-width: 200px; background: rgba(0,0,0,0.1);"
        >
          <div class="spinner-border text-light" role="status"></div>
        </div>
      </div>

      <AppStepIndicator :total-steps="3" :active-step="1" class="mb-4" />

      <div class="d-flex justify-content-between align-items-center mb-5">
        <AppBackLink :label="t('back')" @click="handleGoBack" />
        <AppBankIdLink :label="t('aboutMobileBankID')" />
      </div>

      <div class="divider mb-4">
        <hr class="flex-grow-1" />
        <span class="px-2 small">{{ t('or') }}</span>
        <hr class="flex-grow-1" />
      </div>

      <button
        @click="handleSwitchToLocal"
        class="btn-custom w-100 d-flex align-items-center justify-content-start gap-2"
        type="button"
      >
        <img :src="bankIdLogo" class="bankid-icon" alt="BankID" />
        {{ t('bankIDThisDevice') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../../modules/stores/auth'
import { useUIStore } from '../../../modules/stores/ui'
import { usePopupStore } from '../../../modules/stores/popup'
import bankIdLogo from '../../../assets/bankid-logo-white.png'
import AppBackLink from '../../common/AppBackLink.vue'
import AppBankIdLink from '../../common/AppBankIdLink.vue'
import AppLogo from '../../common/AppLogo.vue'
import AppStepIndicator from '../../common/AppStepIndicator.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const ui = useUIStore()
const popup = usePopupStore()

const isQrLoaded = ref(true)

const handleGoBack = () => {
  authStore.stopPolling()
  ui.setView('login')
}


const handleSwitchToLocal = () => {
  authStore.stopPolling()
  ui.setView('auth-bankid-local')
}

onMounted(async () => {
  try {
    await authStore.loginWithBankId()
    authStore.pollBankIdStatus()
  } catch {
    popup.show({
      title: t('errorTitle'),
      icon: 'bi bi-exclamation-triangle',
      buttons: [{ label: t('okClose'), action: () => { popup.hide(); ui.setView('login') } }],
    })
  }
})

onUnmounted(() => {
  // KEY FIX for bug 6: when AuthLayoutLeft's bankIdStatus watcher detects USER_SIGN
  // it navigates to auth-bankid-qr-pending, which unmounts this component.
  // If we call stopPolling() here, the polling loop dies before reaching COMPLETE.
  // Only stop polling if the user navigated away from the flow (status is not USER_SIGN).
  if (authStore.bankIdStatus !== 'USER_SIGN') {
    authStore.stopPolling()
  }
})
</script>
