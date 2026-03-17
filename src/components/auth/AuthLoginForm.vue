<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <AppLogo/>

    <div v-if="error" class="error-banner mb-3">{{ t('wrongUserNamePassword') }}</div>

    <form @submit.prevent="handleLogin" class="d-flex flex-column gap-2 text-dark">
      <h1 class="mb-3">{{ t('login') }}</h1>

      <label class="form-label mb-1">{{ t('username') }}</label>
      <div class="position-relative mb-2">
        <i class="bi bi-person-fill input-icon"></i>
        <input
          v-model="username"
          class="form-size form-control ps-5"
          :class="{ 'error-border': error }"
          autocomplete="username"
          :disabled="isLoading"
        />
      </div>

      <label class="form-label mb-1">{{ t('password') }}</label>
      <div class="position-relative mb-2">
        <i class="bi bi-lock-fill input-icon"></i>
        <input
          type="password"
          v-model="password"
          class="form-size form-control ps-5"
          :class="{ 'error-border': error }"
          autocomplete="current-password"
          :disabled="isLoading"
        />
      </div>

      <button type="submit" class="btn-custom w-100 mb-2" :disabled="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
        {{ isLoading ? t('wait') : t('login') }}
      </button>

      <div class="d-flex justify-content-end mb-1">
        <span>{{ t('forgotPasswordQuestion') }}</span>
        <a
          href="#"
          @click.prevent="changeView('forgot-password')"
          class="ms-1 fw-bold text-decoration-none text-primary"
        >
          {{ t('clickHere') }}
        </a>
      </div>

      <div class="divider my-3">
        <h2>{{ t('orBankId') }}</h2>
      </div>

      <div class="d-flex flex-column gap-2 mb-2">
        <button
          @click.prevent="changeView('auth-bankid-qr')"
          class="btn-custom d-flex align-items-center justify-content-start gap-2"
          type="button"
          :disabled="isLoading"
        >
          <img :src="bankIdLogo" alt="BankID" class="bankid-icon" />
          {{ t('mobileBankID') }}
        </button>

        <button
          @click.prevent="changeView('auth-bankid-local')"
          class="btn-custom d-flex align-items-center justify-content-start gap-2"
          type="button"
          :disabled="isLoading"
        >
          <img :src="bankIdLogo" alt="BankID" class="bankid-icon" />
          {{ t('bankIDThisDevice') }}
        </button>
      </div>

      <div class="d-flex justify-content-end mt-2">
        <a
          href="https://www.bankid.com/privat/om-bankid"
          class="fw-bold text-decoration-none text-primary d-flex align-items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="me-1" style="color: inherit;">⍰</span>
          {{ t('aboutMobileBankID') }}
        </a>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../modules/stores/auth'
import { storeToRefs } from 'pinia'
import bankIdLogo from '../../assets/bankid-logo-white.png'
import AppLogo from '../common/AppLogo.vue'

const emit = defineEmits(['change-view', 'show-popup'])
const { t } = useI18n()

// Store-koppling
const authStore = useAuthStore()
const { isLoading, error } = storeToRefs(authStore)

const username = ref('')
const password = ref('')

const handleLogin = async () => {
  // Om du vill visa din gamla popup också:
  emit('show-popup', { title: t('loginIn'), loading: true })

  try {
    const user = await authStore.login({ 
      username: username.value, 
      password: password.value 
    })
    
    emit('show-popup', { visible: false })
    emit('change-view', 'auth-2fa-verify', user) 
  } catch (err) {
    emit('show-popup', { visible: false })
    // Felet visas nu via store.error i templaten
  }
}

const changeView = (view: string) => emit('change-view', view)
</script>