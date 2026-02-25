<template>
  <div class="bg-lpage d-flex flex-column align-items-center justify-content-center h-100">
    <div class="w-100">
      <div v-if="currentView === 'twofactor'" class="d-flex flex-column gap-3 w-100">
        <div class="component-box">
          <TwoFactor @change-view="$emit('change-view', $event)" />
        </div>
        <div class="component-box">
          <NoCodeReceived />
        </div>
      </div>

      <div v-else-if="currentView === 'noemailreceived'" class="d-flex flex-column gap-3 w-100">
        <div class="component-box">
          <ResetPasswordEmail @change-view="$emit('change-view', $event)" />
        </div>
        <div class="component-box">
          <NoEmailReceived />
        </div>
      </div>

      <component
        v-else
        :is="currentComponent"
        @change-view="$emit('change-view', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useI18n } from '../i18n/useI18n'

// Importera alla komponenter
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
    currentView: {
      type: String as () => ViewType,
      required: true
    }
  },
  emits: ['change-view'],
  components: { 
    LoginForm, 
    ForgotPassword, 
    MobileBankId, 
    MobileBankIdPending,
    MobileBankIdApproved,
    BankIdDevice, 
    BankIdDeviceApproved,
    TwoFactor,
    ResetPasswordNew,
    ResetPasswordEmail,
    NoCodeReceived,
    NoEmailReceived
  },
  setup(props, { emit }) {
    const { t } = useI18n()

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

    return {
      t,
      currentComponent,
      emit
    }
  }
})
</script>