<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <h2>{{ t('ResetPasswordEmailNotDelivered') }}</h2>
    <p>{{ t('ResetPasswordEmailNotDeliveredHelp') }}</p>

    <input v-model="email" type="email" placeholder="Email" class="mb-2 p-2 rounded" />

    <button class="btn-custom" @click="send">
      {{ t('resendEmail') }}
    </button>

 
    <div v-if="success" class="text-success mt-2">
      {{ t('emailSent') }}
    </div>

    <div class="back-link mt-3">
      <a href="#" @click.prevent="goBack">
        ← {{ t('back') }}
      </a>
    </div>
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

    const send = () => {
      if (!email.value.includes('@')) {
        error.value = true
        success.value = false
      } else {
        error.value = false
        success.value = true
        emit('change-view', 'resetpasswordemail')
      }
    }

    const goBack = () => {
      emit('change-view', 'login')
    }

    return { t, email, error, success, send, goBack }
  }
})
</script>