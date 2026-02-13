<template>
  <div class="mobile-bankid">

    <h2>{{ t('loginWithMobileBankID') }}</h2>
    <p>{{ t('scanQRCode') }}</p>

    <div class="qr-wrapper">
      <div class="fake-qr"></div>
    </div>

    <div class="links">
      <a href="#" @click.prevent="$emit('change-view','login')">
        ← {{ t('back') }}
      </a>

      <a
        href="https://www.bankid.com/privat/om-bankid"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('aboutBankID') }}
      </a>
    </div>

    <div class="divider"><span>{{ t('orBankId') }}</span></div>

    <button @click="$emit('change-view','bankiddevice')" class="btn-bankid-alt">
      <img :src="bankIdLogo" alt="BankID" class="bankid-icon" />
       {{ t('bankIDThisDevice') }}
    </button>

  </div>
</template>

<script>
import { useI18n } from '../../i18n/useI18n'
import bankIdLogo from '../../assets/BankID_logo_white.png'

export default {
  emits:['change-view'],
  setup() {
    const { t } = useI18n()
    return { t, bankIdLogo }
  }
}
</script>
