<template>
  <div class="bg-views p-3 rounded-4 mb-3">
    <AppLogo />

    <div class="form-group-custom">
      <h1 class="mb-3">{{ t('forgotPassword') }}</h1>
      <p class="mb-4">{{ t('resetPasswordDescription') }}</p>

      <form @submit.prevent="sendEmail" class="d-flex flex-column gap-2">
        <div>
          <label class="form-label mb-3">{{ t('email') }}</label>
          <div class="position-relative mb-1">
            <i class="bi bi-envelope-fill input-icon"></i>
            <input
              v-model="email"
              type="email"
              class="form-size form-control ps-5"
              :class="{ 'error-border': error }"
              :placeholder="t('enterEmail')"
              required
            />
          </div>
          <div v-if="error" class="text-danger small mb-3">
            {{ t('enterValidEmail') }}
          </div>
        </div>

        <div class="d-flex justify-content-end mb-3">
          <AppBackLink :label="t('back')" @click="ui.setView('login')" />
        </div>

        <button type="submit" class="btn-custom w-100">{{ t('sendReset') }}</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../../modules/stores/auth'
import { useUIStore } from '../../../modules/stores/ui'
import { usePopupStore } from '../../../modules/stores/popup'
import AppLogo from '../../common/AppLogo.vue'
import AppBackLink from '../../common/AppBackLink.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const ui = useUIStore()
const popup = usePopupStore()

const emit = defineEmits<{
  (e: 'update-email', email: string): void
}>()

const email = ref('')
const error = ref(false)

const sendEmail = async () => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    error.value = true
    return
  }
  error.value = false
  popup.show({ title: t('wait'), loading: true })
  try {
    await authStore.requestPasswordReset(email.value)
    popup.hide()
    emit('update-email', email.value)
    ui.setView('auth-password-reset-sent')
  } catch {
    popup.hide()
    error.value = true
  }
}
</script>
