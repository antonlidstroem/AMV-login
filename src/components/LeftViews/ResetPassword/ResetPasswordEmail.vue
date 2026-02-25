<template>
  <div class="bg-views p-4 rounded-4 mb-3">

    <h2>{{ t('resetPassword') }}</h2>

    <div class="text-center">
      <i class="bi bi-check-circle display-1 mb-3" style="color: var(--success)"></i>
    </div>

    <p>{{ t('ResetPasswordEmailSent') }}</p>
    <button class="btn-custom" @click="goToStart">
      {{ t('goToStart') }}
    </button>

    <h2>{{ t('ResetPasswordEmailNotDelivered') }}</h2>
    <p>{{ t('ResetPasswordEmailNotDeliveredHelp') }}</p>
    <button class="btn-custom mb-3" @click="resendEmail">
      {{ t('resendEmail') }}
    </button>

    <button class="btn-temp" @click="simulateResetLink">
      simulera tryck på återställningslänk
    </button>



  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import Popup from '../../common/LoginPopup.vue'

export default defineComponent({
  name: 'ForgotPassword',
  components: { Popup },
  emits: ['change-view'],

  setup(_, { emit }) {
    const { t } = useI18n()

    const email = ref<string>('')
    const error = ref<boolean>(false)
    const success = ref<boolean>(false)

    const resendEmail = () => {
      if (!email.value.includes('@')) {
        error.value = true
        success.value = false
      } else {
        error.value = false
        success.value = true
        emit('change-view', 'resetpasswordemail')
      }
    }

    const goToStart = () => {
      emit('change-view', 'login')
    }

    const simulateResetLink = () => {
      // Emit för att byta till ResetPasswordNew
      emit('change-view', 'newpassword')
    }

    return { t, email, error, success, resendEmail, goToStart, simulateResetLink }
  }
})
</script>