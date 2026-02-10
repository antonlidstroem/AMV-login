<template>
  <div class="bankid-device">

    <h2>{{ t('loginBankId') }}</h2>
    <p>{{ t('enterBankIdCode') }}</p>

    <div class="waiting-box">
      <div class="spinner"></div>
      <p>{{ t('waitingBankId') }}</p>
    </div>

    <div class="links">
      <a href="#" @click.prevent="$emit('change-view','login')">
        {{ t('cancel') }}
      </a>

      <a href="#" @click.prevent="$emit('change-view','login')">
        {{ t('back') }}
      </a>

      <a
        href="https://www.bankid.com/privat/om-bankid"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('aboutBankId') }}
      </a>
    </div>

    <div class="divider"><span>{{ t('or') }}</span></div>

    <button @click="$emit('change-view','mobilebankid')">
      {{ t('mobileBankId') }}
    </button>

  </div>
</template>

<script>
import { useI18n } from '../../i18n/useI18n'

export default {
  emits:['change-view'],

  setup() {
    const { t } = useI18n()
    return { t }
  }
}
</script>
