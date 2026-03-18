<template>
  <div class="bg-AuthLayoutLeft d-flex flex-column align-items-center justify-content-center h-100 rounded-4">
    <div class="w-100 px-1">
      <div v-if="currentView === 'auth-2fa-verify'" class="d-flex flex-column gap-3 w-100">
        <Auth2FAVerify @change-view="handleChangeView" @show-popup="emit('show-popup', $event)" />
        <Auth2FARetry @show-popup="emit('show-popup', $event)" />
      </div>

      <div v-else-if="currentView === 'auth-password-reset-sent'">
        <div class="reset-password-wrapper d-flex flex-column">
          <AuthPasswordResetSent :email="emailForAuthPasswordResetRetry" @change-view="handleChangeView" />
          <AuthPasswordResetRetry :email="emailForAuthPasswordResetRetry" @change-view="handleChangeView" @show-popup="emit('show-popup', $event)" />
        </div>
      </div>

      <component
        v-else-if="currentComponent"
        :is="currentComponent"
        :email="emailForAuthPasswordResetRetry"
        @change-view="handleChangeView"
        @show-password-demands="emit('show-password-demands')"
        @trigger-error="emit('trigger-error')"
        @show-popup="emit('show-popup', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ViewType } from '../modules/types/views'
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
import { watch } from 'vue'
import { useAuthStore } from '../modules/stores/auth'

const authStore = useAuthStore()
const props = defineProps<{ currentView: ViewType }>()
const emit = defineEmits(['change-view', 'show-password-demands', 'trigger-error', 'show-popup'])

// src/components/AuthLayoutLeft.vue

const VIEW_MAP: Record<string, any> = {
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
  'auth-password-reset-retry': AuthPasswordResetRetry 
}


const emailForAuthPasswordResetRetry = ref('')

const handleChangeView = (view: ViewType, payload?: any) => {
  if (typeof payload === 'string') {
    emailForAuthPasswordResetRetry.value = payload
  }
  
  emit('change-view', view, payload)
}

// Denna kod i din AuthLayoutLeft.vue är nu hjärtat i flödet:
watch(() => authStore.bankIdStatus, (newStatus) => {
  if (newStatus === 'USER_SIGN') {
    emit('change-view', 'auth-bankid-qr-pending')
  } else if (newStatus === 'COMPLETE') {
    emit('change-view', 'auth-bankid-qr-success')
  }
})

const currentComponent = computed(() => VIEW_MAP[props.currentView] ?? null)
</script>
