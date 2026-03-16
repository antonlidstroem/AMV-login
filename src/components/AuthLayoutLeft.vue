<template>
  <div class="bg-AuthLayoutLeft d-flex flex-column align-items-center justify-content-center h-100 rounded-4">
    <div class="w-100 px-1">
      <div v-if="currentView === 'auth2faverify'" class="d-flex flex-column gap-3 w-100">
        <Auth2FAVerify @change-view="handleChangeView" @show-popup="emit('show-popup', $event)" />
        <Auth2FARetry @show-popup="emit('show-popup', $event)" />
      </div>

      <div v-else-if="currentView === 'authpasswordresetsent'">
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

const props = defineProps<{ currentView: ViewType }>()
const emit = defineEmits(['change-view', 'show-password-demands', 'trigger-error', 'show-popup'])

// src/components/AuthLayoutLeft.vue

const VIEW_MAP: Record<string, any> = {
  login: AuthLoginForm,
  forgot: AuthPasswordResetRequest,
  authBankIdQr: AuthBankIdQr,
  authbankidqrpending: AuthBankIdQrPending,
  authbankidqrsuccess: AuthBankIdQrSuccess,
  authbankidlocal: AuthBankIdLocal,
  authbankidlocalsuccess: AuthBankIdLocalSuccess,
  auth2faverify: Auth2FAVerify, // Fixat: gemener
  newpassword: AuthPasswordResetForm,
  authpasswordresetsent: AuthPasswordResetSent, // Fixat: gemener
  auth2faretry: Auth2FARetry, // Fixat: gemener
  authpasswordresetretry: AuthPasswordResetRetry // Fixat: gemener
}

const emailForAuthPasswordResetRetry = ref('')

const handleChangeView = (view: ViewType, payload?: any) => {
  // Om det är en sträng (e-post), spara den internt i AuthLayoutLeft
  if (typeof payload === 'string') {
    emailForAuthPasswordResetRetry.value = payload
  }
  
  // VIKTIGT: Skicka vidare payloaden till App.vue!
  emit('change-view', view, payload)
}

const currentComponent = computed(() => VIEW_MAP[props.currentView] ?? null)
</script>
