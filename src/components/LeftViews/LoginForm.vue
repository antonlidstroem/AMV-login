<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <img :src="AMVLogo" class="logo-top" />

    <div v-if="error" class="error-banner">{{ t('wrongUserNamePassword') }}</div>

    <form @submit.prevent="login" class="d-flex flex-column gap-2 p-3 text-dark">
      <h1 class="mb-3">{{ t('login') }}</h1>

      <!-- Username -->
      <label class="form-label mb-1">{{ t('username') }}</label>
      <div class="position-relative mb-2">
        <i class="bi bi-person-fill input-icon"></i>
        <input
          v-model="username"
          class="form-size form-control ps-5"
          :class="{ 'error-border': error }"
        />
      </div>

      <!-- Password -->
      <label class="form-label mb-1">{{ t('password') }}</label>
      <div class="position-relative mb-2">
        <i class="bi bi-lock-fill input-icon"></i>
        <input
          type="password"
          v-model="password"
          class="form-size form-control ps-5"
          :class="{ 'error-border': error }"
        />
      </div>

      <button type="submit" class="btn-custom w-100 mb-2">Logga in</button>

      <!-- Forgot password link -->
      <div class="d-flex justify-content-end mb-4">
        <span>{{ t('forgotPasswordQuestion') }}</span>
        <a
          href="#"
          @click.prevent="changeView('forgot')"
          class="ms-1 fw-bold text-decoration-none text-primary"
        >
          {{ t('clickHere') }}
        </a>
      </div>

      <div class="divider mb-2">
        <br />
        <h2>{{ t('orBankId') }}</h2>
      </div>

      <div class="d-flex flex-column gap-2 mb-2">
        <button
          @click.prevent="changeView('mobilebankid')"
          class="btn-custom d-flex align-items-center justify-content-start gap-2"
        >
          <img :src="bankIdLogo" alt="BankID" class="bankid-icon" />
          {{ t('mobileBankID') }}
        </button>

        <button
          @click.prevent="changeView('bankiddevice')"
          class="btn-custom d-flex align-items-center justify-content-start gap-2"
        >
          <img :src="bankIdLogo" alt="BankID" class="bankid-icon" />
          {{ t('bankIDThisDevice') }}
        </button>
      </div>

      <!-- About BankId -->
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

    <Popup v-if="loading" :title="t('loginIn')" :loading="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { loginMock } from '../../mock/authService'
import Popup from '../common/LoginPopup.vue'
import { useI18n } from '../../i18n/useI18n'
import bankIdLogo from '../../assets/BankID_logo_white.png'
import AMVLogo from '../../assets/logo_horizontal.svg'

export default defineComponent({
  name: 'LoginForm',
  components: { Popup },
  setup(_, { emit }) {
    const username = ref('')
    const password = ref('')
    const error = ref(false)
    const loading = ref(false)

    const { t } = useI18n()

    const login = async () => {
      error.value = false
      loading.value = true
      try {
        await loginMock(username.value, password.value)
        localStorage.setItem('mockLogin', 'true')
        emit('change-view', 'twofactor')
      } catch {
        error.value = true
      } finally {
        loading.value = false
      }
    }

    const changeView = (view: string) => {
      emit('change-view', view)
    }

    return {
      username,
      password,
      error,
      loading,
      t,
      bankIdLogo,
      AMVLogo,
      login,
      changeView
    }
  }
})
</script>