<template>
  <div class="login-page">
    
    <div>
      <img :src="AMVLogo" alt="AMV Logo" class="amv-logo" />
    </div>


    <form @submit.prevent="handleLogin" class="login-form" >
      <div class="form-group">
        <label>{{ t('username') }}</label>
        <input v-model="username" type="text" :placeholder="t('enterUsername')" required />
      </div>

      <div class="form-group">
        <label>{{ t('password') }}</label>
        <input v-model="password" type="password" :placeholder="t('enterPassword')" required />
      </div>

      <button type="submit" class="btn-bankid">{{ t('login') }}</button>

      <div class="forgot-password">
        <span>{{ t('forgotPasswordQuestion') }}</span>
        <a href="#" @click.prevent="$emit('change-view','forgot')">{{" " + t('clickHere') }}</a>
      </div>
    </form>

    <div class="divider">
      <span>{{ t('or') }}</span>
    </div>

    <div class="bankid-options">

      <div class="bankid-options">
        <button @click="$emit('change-view','mobilebankid')" class="btn-bankid">
          <img :src="bankIdLogo" alt="BankID" class="bankid-icon" />
          {{ t('mobileBankID') }}
        </button>

        <button @click="$emit('change-view','bankiddevice')" class="btn-bankid-alt">
          <img :src="bankIdLogo" alt="BankID" class="bankid-icon" />
          {{ t('bankIDThisDevice') }}
        </button>
</div>

    </div>
  </div>
</template>

<script>
import { authStore } from '../../stores/authStore'
import { useI18n } from '../../i18n/useI18n'
import bankIdLogo from '../../assets/BankID_logo_white.png'
import AMVLogo from '../../assets/logo_horizontal.svg'


export default {
  emits: ['change-view'],
  setup() {
    const { t } = useI18n()
    return { t, bankIdLogo, AMVLogo }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      await authStore.login(this.username, this.password)
      if(authStore().isAuthenticated) {
        this.$emit('change-view','dashboard')
      }
    }
  }
}
</script>
