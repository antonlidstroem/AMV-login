<template>
  <div class="bg-AuthLayoutLeft d-flex flex-column align-items-center justify-content-center h-100 rounded-4">
    <div class="w-100 px-1">
      <div v-if="currentView === 'twofactor'" class="d-flex flex-column gap-3 w-100">
        <TwoFactor @change-view="handleChangeView" @show-popup="emit('show-popup', $event)" />
        <NoCodeReceived @show-popup="emit('show-popup', $event)" />
      </div>

      <div v-else-if="currentView === 'resetpasswordemail'">
        <div class="reset-password-wrapper d-flex flex-column">
          <ResetPasswordEmail :email="emailForNoEmailReceived" @change-view="handleChangeView" />
          <NoEmailReceived :email="emailForNoEmailReceived" @change-view="handleChangeView" @show-popup="emit('show-popup', $event)" />
        </div>
      </div>

      <component
        v-else-if="currentComponent"
        :is="currentComponent"
        :email="emailForNoEmailReceived"
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
import ForgotPassword from './LeftViews/ResetPassword/ForgotPassword.vue'
import ResetPasswordEmail from './LeftViews/ResetPassword/ResetPasswordEmail.vue'
import ResetPasswordNew from './LeftViews/ResetPassword/ResetPasswordNew.vue'
import NoEmailReceived from './LeftViews/ResetPassword/NoEmailReceived.vue'
import MobileBankId from './LeftViews/BankIDMobile/MobileBankId.vue'
import BankIdDevice from './LeftViews/BankIDDevice/BankIDDevice.vue'
import BankIdDeviceApproved from './LeftViews/BankIDDevice/BankIDDeviceApproved.vue'
import TwoFactor from './LeftViews/TwoFactorAuth/TwoFactor.vue'
import NoCodeReceived from './LeftViews/TwoFactorAuth/NoCodeReceived.vue'
import MobileBankIdPending from './LeftViews/BankIDMobile/MobileBankIdPending.vue'
import MobileBankIdApproved from './LeftViews/BankIDMobile/MobileBankIdApproved.vue'

const props = defineProps<{ currentView: ViewType }>()
const emit = defineEmits(['change-view', 'show-password-demands', 'trigger-error', 'show-popup'])

const VIEW_MAP: Record<string, any> = {
  login: LoginForm,
  forgot: ForgotPassword,
  mobilebankid: MobileBankId,
  mobilebankidpending: MobileBankIdPending,
  mobilebankidapproved: MobileBankIdApproved,
  bankiddevice: BankIdDevice,
  bankiddeviceapproved: BankIdDeviceApproved,
  twofactor: TwoFactor,
  newpassword: ResetPasswordNew,
  resetpasswordemail: ResetPasswordEmail,
  nocodereceived: NoCodeReceived,
  noemailreceived: NoEmailReceived
}

const emailForNoEmailReceived = ref('')

const handleChangeView = (view: ViewType, payload?: any) => {
  // Om det är en sträng (e-post), spara den internt i AuthLayoutLeft
  if (typeof payload === 'string') {
    emailForNoEmailReceived.value = payload
  }
  
  // VIKTIGT: Skicka vidare payloaden till App.vue!
  emit('change-view', view, payload)
}

const currentComponent = computed(() => VIEW_MAP[props.currentView] ?? null)
</script>
