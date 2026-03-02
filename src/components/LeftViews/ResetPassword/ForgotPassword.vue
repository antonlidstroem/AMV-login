<template>
  <div class="bg-views p-3 rounded-4 mb-3">
    <img :src="AMVLogo" class="logo-top" />
    <h2 class="mb-3">{{ t('resetPassword') }}</h2>
    <p class="mb-5">{{ t('resetPasswordDescription') }}</p>

    <p class="mb-2">{{ t('email') }}:</p>

    <div v-if="error" class="error-banner">
      {{ t('enterValidEmail') }}
    </div>

    <input
      v-model="email"
      class="form-control mb-3 form-size"
      :class="{ 'error-border': error }"
      placeholder="example@mail.com"
    />

    <button class="btn-custom mb-2" @click="sendEmail">
      {{ t('send') }}
    </button>

    <button class="btn-link mt-2" @click="noEmailReceived">
      {{ t('ResetPasswordEmailNotDelivered') }}
    </button>

    <BackLink :label="t('back')" @click="goToLogin" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import AMVLogo from '../../../assets/logo_horizontal.svg'
import BackLink from '../../common/BackLink.vue'

const { t } = useI18n()
const email = ref('')
const error = ref(false)

type ViewType = 'login' | 'resetpasswordemail' | 'noemailreceived'

const emit = defineEmits<{
  (e: 'change-view', view: ViewType, email?: string): void
}>()

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const sendEmail = () => {
  if (!isValidEmail(email.value)) {
    error.value = true
    return
  }
  error.value = false
  emit('change-view', 'resetpasswordemail')
}

const noEmailReceived = () => {
  emit('change-view', 'noemailreceived', email.value)
}

const goToLogin = () => {
  emit('change-view', 'login')
}
</script>