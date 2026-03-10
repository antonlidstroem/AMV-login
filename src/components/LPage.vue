<template>
  <div class="bg-lpage d-flex flex-column align-items-center justify-content-center h-100">
    <div class="w-100">

      <!-- TwoFactor + NoCodeReceived visas alltid tillsammans -->
      <div v-if="currentView === 'twofactor'" class="d-flex flex-column gap-3 w-100">
        <TwoFactor
          @change-view="handleChangeView"
          @show-popup="$emit('show-popup', $event)"
        />
        <NoCodeReceived
          @show-popup="$emit('show-popup', $event)"
        />
      </div>

      <!-- ResetPasswordEmail + NoEmailReceived visas alltid tillsammans -->
      <div v-else-if="currentView === 'resetpasswordemail'">
        <div class="reset-password-wrapper d-flex flex-column">
          <ResetPasswordEmail @change-view="handleChangeView" />
          <div class="no-email-received-wrapper mt-3 mt-md-0">
            <NoEmailReceived
              :email="emailForNoEmailReceived"
              @change-view="handleChangeView"
              @show-popup="$emit('show-popup', $event)"
            />
          </div>
        </div>
      </div>

      <!-- Fristående NoEmailReceived (om man navigerar hit direkt) -->
      <div v-else-if="currentView === 'noemailreceived'" class="d-flex flex-column gap-3 w-100">
        <NoEmailReceived
          :email="emailForNoEmailReceived"
          @change-view="handleChangeView"
          @show-popup="$emit('show-popup', $event)"
        />
      </div>

      <!--
        Alla andra vyer.
        'loginview' mappas till null i currentComponent – vi renderar ingenting
        för den vyn (App.vue tar hand om övergången till /dashboard).
      -->
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

// Komponentkarta – null = App.vue hanterar övergången, inget renderas här
const VIEW_MAP: Record<ViewType, any> = {
  login:                LoginForm,
  forgot:               ForgotPassword,
  mobilebankid:         MobileBankId,
  mobilebankidpending:  MobileBankIdPending,
  mobilebankidapproved: MobileBankIdApproved,
  bankiddevice:         BankIdDevice,
  bankiddeviceapproved: BankIdDeviceApproved,
  twofactor:            TwoFactor,
  newpassword:          ResetPasswordNew,
  resetpasswordemail:   ResetPasswordEmail,
  nocodereceived:       NoCodeReceived,
  noemailreceived:      NoEmailReceived,
  loginview:            null  // Hanteras av App.vue → router.push('/dashboard')
}

export default defineComponent({
  name: 'LeftPageContainer',
  components: {
    LoginForm, ForgotPassword, MobileBankId, MobileBankIdPending, MobileBankIdApproved,
    BankIdDevice, BankIdDeviceApproved, TwoFactor, ResetPasswordNew, ResetPasswordEmail,
    NoCodeReceived, NoEmailReceived
  },
  props: {
    currentView: { type: String as () => ViewType, required: true }
  },
  emits: ['change-view', 'show-password-demands', 'trigger-error', 'show-popup'],

  setup(props, { emit }) {
    const emailForNoEmailReceived = ref('')

    const handleChangeView = (view: ViewType, email?: string) => {
      if (view === 'noemailreceived' && email) {
        emailForNoEmailReceived.value = email
      }
      emit('change-view', view)
    }

    const currentComponent = computed(() => VIEW_MAP[props.currentView] ?? null)

    return { currentComponent, emailForNoEmailReceived, handleChangeView }
  }
})
</script>
