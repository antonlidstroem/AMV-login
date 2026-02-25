<template>
<div class=" bg-views p-4 rounded-4 mb-3">
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
    />

    <button class="btn-custom" @click="send">
      {{ t('send') }}
    </button>

    <div class="back-link mt-3">
      <a href="#" @click.prevent="goToLogin">
        {{ t('back') }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '../../../i18n/useI18n'

// i18n
const { t } = useI18n()

// state
const email = ref<string>('')
const error = ref<boolean>(false)

// 🔐 Typa alla views korrekt
type ViewType = 'login' | 'resetpasswordemail'
type ResetStatus = 'noemailreceived'

const emit = defineEmits<{
  (e: 'change-view', view: ViewType, status?: ResetStatus): void
}>()

// email-validering (bättre än includes('@'))
const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const send = (): void => {
  if (!isValidEmail(email.value)) {
    error.value = true
    return
  }

  error.value = false
  emit('change-view', 'resetpasswordemail', 'noemailreceived')
}

const goToLogin = (): void => {
  emit('change-view', 'login')
}
</script>
