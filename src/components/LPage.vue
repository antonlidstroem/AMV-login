<template>
  <div class="bg-lpage d-flex flex-column align-items-center justify-content-center h-100">
    <!-- FIX: added px-1 so form cards have a small margin from the panel edge on desktop.
         On mobile bg-lpage is transparent and the wrapper controls spacing via py-3 px-2. -->
    <div class="w-100 px-1">

      <div v-if="currentView === 'twofactor'" class="d-flex flex-column gap-3 w-100">
        <TwoFactor @change-view="handleChangeView" @show-popup="$emit('show-popup', $event)" />
        <NoCodeReceived @show-popup="$emit('show-popup', $event)" />
      </div>

      <div v-else-if="currentView === 'resetpasswordemail'">
        <div class="reset-password-wrapper d-flex flex-column">
          <ResetPasswordEmail :email="emailForNoEmailReceived" @change-view="handleChangeView" />
          <div class="no-email-received-wrapper mt-3 mt-md-0">
            <NoEmailReceived :email="emailForNoEmailReceived" @change-view="handleChangeView" @show-popup="$emit('show-popup', $event)" />
          </div>
        </div>
      </div>

      <div v-else-if="currentView === 'noemailreceived'" class="d-flex flex-column gap-3 w-100">
        <NoEmailReceived :email="emailForNoEmailReceived" @change-view="handleChangeView" @show-popup="$emit('show-popup', $event)" />
      </div>

      <component
        v-else-if="currentComponent"
        :is="currentComponent"
        @change-view="handleChangeView"
        @show-password-demands="$emit('show-password-demands')"
        @trigger-error="$emit('trigger-error')"
        @show-popup="$emit('show-popup', $event)"
      />

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
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

const VIEW_MAP: Record<ViewType, any> = {
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
  noemailreceived: NoEmailReceived,
  loginview: null
}

export default defineComponent({
  name: 'LeftPageContainer',
  components: { LoginForm, ForgotPassword, MobileBankId, MobileBankIdPending, MobileBankIdApproved, BankIdDevice, BankIdDeviceApproved, TwoFactor, ResetPasswordNew, ResetPasswordEmail, NoCodeReceived, NoEmailReceived },
  props: { currentView: { type: String as () => ViewType, required: true } },
  emits: ['change-view', 'show-password-demands', 'trigger-error', 'show-popup'],
  setup(props, { emit }) {
    const emailForNoEmailReceived = ref('')
    const handleChangeView = (view: ViewType, email?: string) => {
      // Capture email on both resetpasswordemail and noemailreceived so
      // ResetPasswordEmail can show which address was contacted, and
      // NoEmailReceived can reference it in its "resend" confirmation.
      if ((view === 'resetpasswordemail' || view === 'noemailreceived') && email) {
        emailForNoEmailReceived.value = email
      }
      emit('change-view', view)
    }
    const currentComponent = computed(() => VIEW_MAP[props.currentView] ?? null)
    return { currentComponent, emailForNoEmailReceived, handleChangeView }
  }
})
</script>
