<template>
  <div class="bg-lpage d-flex flex-column align-items-center justify-content-center h-100">
    <div class="w-100">

      <!-- TwoFactor -->
      <div v-if="currentView === 'twofactor'" class="d-flex flex-column gap-3 w-100">
        <TwoFactor @change-view="handleChangeView" />
        <NoCodeReceived />
      </div>

      <!-- ResetPasswordEmail -->
      <div v-else-if="currentView === 'resetpasswordemail'">
        <div class="reset-password-wrapper d-flex flex-column">
          <ResetPasswordEmail @change-view="handleChangeView" />
          <div class="no-email-received-wrapper mt-3 mt-md-0">
            <NoEmailReceived :email="emailForNoEmailReceived" @change-view="handleChangeView" />
          </div>
        </div>
      </div>

      <!-- NoEmailReceived (vid direkt navigering) -->
      <div v-else-if="currentView === 'noemailreceived'" class="d-flex flex-column gap-3 w-100">
        <NoEmailReceived :email="emailForNoEmailReceived" @change-view="handleChangeView" />
      </div>

      <!-- Övriga komponenter -->
      <component
        v-else
        :is="currentComponent"
        @change-view="handleChangeView"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useI18n } from '../i18n/useI18n'

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
import type { ViewType } from '../types/views'

export default defineComponent({
  name: 'LeftPageContainer',
  props: {
    currentView: { type: String as () => ViewType, required: true },
  },
  emits: ['change-view'],
  components: { 
    LoginForm, ForgotPassword, MobileBankId, MobileBankIdPending, MobileBankIdApproved,
    BankIdDevice, BankIdDeviceApproved, TwoFactor, ResetPasswordNew, ResetPasswordEmail,
    NoCodeReceived, NoEmailReceived
  },
  setup(props, { emit }) {
    const { t } = useI18n()

    // Lokal state för email när man går till noemailreceived
    const emailForNoEmailReceived = ref('')

    const handleChangeView = (view: ViewType, email?: string) => {
      if (view === 'noemailreceived' && email) {
        emailForNoEmailReceived.value = email
      }
      emit('change-view', view)
    }

    const currentComponent = computed(() => {
      const views: Record<ViewType, any> = {
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
      return views[props.currentView] || LoginForm
    })

    return { t, currentComponent, emailForNoEmailReceived, handleChangeView }
  }
})
</script>