<template>
  <div class="forgot-password-page">

    <h2>{{ t('resetPassword') }}</h2>

    <p>{{ t('resetPasswordDescription') }}</p>

    <form @submit.prevent="$emit('reset')">
      <div class="form-group">
        <label>{{ t('email') }}</label>
        <input type="email" required />
      </div>

      <button class="btn-login">{{ t('sendReset') }}</button>
    </form>

    <div class="back-link">
      <a href="#" @click.prevent="$emit('change-view','login')">
        ← {{ t('back') }}
      </a>
    </div>

  </div>
</template>

<script>
import { useI18n } from '../../i18n/useI18n'

export default {
  name: 'ForgotPassword',
  setup() {
    const { t } = useI18n()
    return { t }
  }
}
</script>
