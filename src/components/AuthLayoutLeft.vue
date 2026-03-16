<template>
  <div class="bg-AuthLayoutLeft d-flex flex-column align-items-center justify-content-center h-100 rounded-4">
    <div class="w-100 px-1">
      <div v-if="currentView === 'twofactor'" class="d-flex flex-column gap-3 w-100">
        <TwoFactor @change-view="handleChangeView" @show-popup="emit('show-popup', $event)" />
        <NoCodeReceived @show-popup="emit('show-popup', $event)" />
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
import type { ViewType } from '../types/views'
import LoginForm from './LeftViews/LoginForm.vue'
import AuthPasswordResetRequest from './LeftViews/ResetPassword/AuthPasswordResetRequest.vue'
import AuthPasswordResetSent from './LeftViews/ResetPassword/AuthPasswordResetSent.vue'
import AuthPasswordResetForm from './LeftViews/ResetPassword/AuthPasswordResetForm.vue'
import AuthPasswordResetRetry from './LeftViews/ResetPassword/AuthPasswordResetRetry.vue'
import MobileBankId from './LeftViews/BankIDMobile/AuthBankIdQr.vue'
import AuthBankIdLocal from './LeftViews/BankIDDevice/AuthBankIdLocal.vue'
import AuthBankIdLocalSuccess from './LeftViews/BankIDDevice/AuthBankIdLocalSuccess.vue'
import TwoFactor from './LeftViews/TwoFactorAuth/TwoFactor.vue'
import NoCodeReceived from './LeftViews/TwoFactorAuth/NoCodeReceived.vue'
import AuthBankIdQrPending from './LeftViews/BankIDMobile/AuthBankIdQrPending.vue'
import AuthBankIdQrSuccess from './LeftViews/BankIDMobile/AuthBankIdQrSuccess.vue'

const props = defineProps<{ currentView: ViewType }>()
const emit = defineEmits(['change-view', 'show-password-demands', 'trigger-error', 'show-popup'])

const VIEW_MAP: Record<string, any> = {
  login: LoginForm,
  forgot: AuthPasswordResetRequest,
  mobilebankid: MobileBankId,
  authbankidqrpending: AuthBankIdQrPending,
  authbankidqrsuccess: AuthBankIdQrSuccess,
  authbankidlocal: AuthBankIdLocal,
  authbankidlocalsuccess: AuthBankIdLocalSuccess,
  twofactor: TwoFactor,
  newpassword: AuthPasswordResetForm,
  authPasswordResetSent: AuthPasswordResetSent,
  nocodereceived: NoCodeReceived,
  authPasswordResetRetry: AuthPasswordResetRetry
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
