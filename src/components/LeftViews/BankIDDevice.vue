<template>
  <div>

    <h2>{{ t('loginWithBankID') }}</h2>
    <p>{{ t('enterSecurityCode') }}</p>

    <div class="waiting-box">
      <div class="spinner"></div>
      <p>{{ t('waitingForBankId') }}</p>
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
        {{ t('aboutMobileBankID') }}
      </a>
    </div>

    <div class="divider"><span>{{ t('orBankId') }}</span></div>

    <button @click="$emit('change-view','mobilebankid')" class="btn btn-primary w-100" >
      <img :src="bankIdLogo" alt="BankID" />
      {{ t('mobileBankID') }}
      
    </button>

  </div>
</template>

<script>
import { useI18n } from '../../i18n/useI18n'
import bankIdLogo from '../../assets/BankID_logo_white.png'
import AMVLogo from '../../assets/logo_horizontal.svg'



export default {
  emits:['change-view'],

  setup() {
    const { t } = useI18n()
    return { t, bankIdLogo, AMVLogo }
  }
}
</script>
