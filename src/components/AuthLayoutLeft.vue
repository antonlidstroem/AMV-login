<template>
  
<div class="auth-left-panel d-flex flex-column align-items-center justify-content-start h-100 pt-5">

    <!-- <AppLogo class="mb-5" /> -->

    <div class="w-100 px-1">
      <!-- 2FA special view -->
      <div v-if="ui.currentView === 'auth-2fa-verify'" class="d-flex flex-column gap-3 w-100">
        <Auth2FAVerify />
        <Auth2FARetry />
      </div>

      <!-- Password reset sent: two stacked cards -->
      <div v-else-if="ui.currentView === 'auth-password-reset-sent'">
        <div class="reset-password-wrapper d-flex flex-column">
          <AuthPasswordResetSent :email="emailForRetry" />
          <AuthPasswordResetRetry :email="emailForRetry" />
        </div>
      </div>

      <!-- All other views via dynamic component -->
      <component
        v-else-if="currentComponent"
        :is="currentComponent"
        :email="emailForRetry"
        @update-email="emailForRetry = $event"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '../modules/stores/auth'
import { useUIStore } from '../modules/stores/ui'
import type { Component } from 'vue'
import type { ViewType } from '../modules/types/views'
import AppLogo from './common/AppLogo.vue'

import AuthLoginForm from './auth/AuthLoginForm.vue'
import AuthPasswordResetRequest from './auth/reset-password/AuthPasswordResetRequest.vue'
import AuthPasswordResetSent from './auth/reset-password/AuthPasswordResetSent.vue'
import AuthPasswordResetForm from './auth/reset-password/AuthPasswordResetForm.vue'
import AuthPasswordResetRetry from './auth/reset-password/AuthPasswordResetRetry.vue'
import AuthBankIdQr from './auth/bankid-mobile/AuthBankIdQr.vue'
import AuthBankIdLocal from './auth/bankid-device/AuthBankIdLocal.vue'
import AuthBankIdLocalSuccess from './auth/bankid-device/AuthBankIdLocalSuccess.vue'
import Auth2FAVerify from './auth/2fa/Auth2FAVerify.vue'
import Auth2FARetry from './auth/2fa/Auth2FARetry.vue'
import AuthBankIdQrPending from './auth/bankid-mobile/AuthBankIdQrPending.vue'
import AuthBankIdQrSuccess from './auth/bankid-mobile/AuthBankIdQrSuccess.vue'

const authStore = useAuthStore()
const ui = useUIStore()

const emailForRetry = ref('')

const VIEW_MAP: Record<ViewType, Component | null> = {
  login: AuthLoginForm,
  'forgot-password': AuthPasswordResetRequest,
  'auth-bankid-qr': AuthBankIdQr,
  'auth-bankid-qr-pending': AuthBankIdQrPending,
  'auth-bankid-qr-success': AuthBankIdQrSuccess,
  'auth-bankid-local': AuthBankIdLocal,
  'auth-bankid-local-success': AuthBankIdLocalSuccess,
  'auth-2fa-verify': Auth2FAVerify,
  'new-password': AuthPasswordResetForm,
  'auth-password-reset-sent': AuthPasswordResetSent,
  'auth-2fa-retry': Auth2FARetry,
  'auth-password-reset-retry': AuthPasswordResetRetry,
  'dashboard-view': null,
  'authenticated-view': null,
}

// Drive view transitions from BankID polling status
watch(() => authStore.bankIdStatus, (status) => {
  if (status === 'USER_SIGN') {
    ui.setView('auth-bankid-qr-pending')
  } else if (status === 'COMPLETE') {
    const isLocal = ui.currentView.includes('local')
    ui.setView(isLocal ? 'auth-bankid-local-success' : 'auth-bankid-qr-success')
  }
})

const currentComponent = computed(() => VIEW_MAP[ui.currentView] ?? null)
</script>
