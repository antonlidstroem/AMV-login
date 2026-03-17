<template>
  <div class="bg-views p-3 rounded-4 mb-3">
    <img :src="AMVLogo" class="logo-top" />
    <div v-if="error" class="error-banner mb-4">{{ t('enterValidEmail') }}</div>
    <h2 class="mb-3">{{ t('resetPassword') }}</h2>
    <p class="mb-5">{{ t('resetPasswordDescription') }}</p>
    <p class="mb-2">{{ t('email') }}:</p>
    <input v-model="email" class="form-control mb-3 form-size" :class="{ 'error-border': error }" placeholder="example@mail.com" type="email" autocomplete="email" />
    <button class="btn-custom mb-4" @click="sendEmail" type="button">{{ t('sendReset') }}</button>
    <AppBackLink :label="t('back')" @click="goToLogin" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AMVLogo from '../../../assets/logo-horizontal.svg'
import AppBackLink from '../../common/AppBackLink.vue'

const { t } = useI18n()
const email = ref('')
const error = ref(false)

type ViewType = 'login' | 'auth-password-reset-sent' | 'auth-password-reset-retry'

const emit = defineEmits<{ (e: 'change-view', view: ViewType, email?: string): void }>()
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const sendEmail = () => {
  if (!isValidEmail(email.value)) { error.value = true; return }
  error.value = false
  // Fix: forward the email so AuthLayoutLeft can store it and AuthPasswordResetRetry can use it
  emit('change-view', 'auth-password-reset-sent', email.value)
}
const goToLogin = () => emit('change-view', 'login')
</script>
