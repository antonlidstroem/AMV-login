<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <div class="mb-4">
      <AppLogo/>
    </div>

    <div class="mb-4">
      <AppBackLink @click="emit('change-view', 'login')" :text="t('toLoginPage')" />
    </div>

    <h1 class="mb-3">{{ t('forgotPassword') }}</h1>
    <p class="text-muted mb-4">{{ t('resetPasswordDescription') }}</p>

    <form @submit.prevent="sendEmail" class="d-flex flex-column gap-3">
      <div>
        <label class="form-label">{{ t('email') }}</label>
        <div class="position-relative">
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
        <div v-if="error" class="text-danger small mt-1">
          {{ t('enterValidEmail') }}
        </div>
      </div>
      <button type="submit" class="btn-custom w-100 mt-2">{{ t('sendReset') }}</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../../modules/stores/auth'
import { usePopupStore } from '../../../modules/stores/popup'
import AppLogo from '../../common/AppLogo.vue'
import AppBackLink from '../../common/AppBackLink.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const popup = usePopupStore()
const emit = defineEmits(['change-view'])

const email = ref('')
const error = ref(false)

const sendEmail = async () => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { error.value = true; return }
  error.value = false
  popup.show({ title: t('wait'), loading: true })
  try {
    await authStore.requestPasswordReset(email.value)
    popup.hide()
    emit('change-view', 'auth-password-reset-sent', email.value)
  } catch (err) {
    popup.hide(); error.value = true
  }
}
</script>

<style scoped>
.auth-logo-request { height: 40px; width: auto; }
</style>