<template>
  <div>

    <h2>{{ t('loginWithBankID') }}</h2>
    <p>{{ t('enterSecurityCode') }}</p>

    <div class="waiting-box">
      <div class="spinner"></div>
      <p>{{ t('waitingForBankId') }}</p>
    </div>

    <!-- Pending clock -->
  <i class="bi bi-clock-history display-1 text-dark mb-3"></i>
    <div>
    <a href="#" @click.prevent="$emit('change-view','login')">
            {{ t('cancel') }}
          </a>
    </div>
<!-- Step indicator with Bootstrap icons, using text-success for active step and text-secondary for inactive steps. -->
<div class="d-flex justify-content-center align-items-center gap-2">
  <i class="bi bi-1-circle-fill" style="color:#85BE23;"></i> 
  <i class="bi bi-arrow-right" style="color:#000;"></i> 
  <i class="bi bi-2-circle-fill" style="color:#6c757d;"></i> 
</div>


    <div class="links">
      

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

    <button @click="$emit('change-view','mobilebankid')" class="btn-custom" >
      <img :src="bankIdLogo" class="bankid-icon" />
      {{ t('mobileBankID') }}
      
    </button>

<!-- 🔹 Tillfällig knapp för test -->
    <button
      @click="$emit('change-view','bankiddeviceapproved')"
      class="btn-custom"
    >
      Simulera lyckad inloggning
    </button>

  </div>
</template>

<script>
import { useI18n } from '../../../i18n/useI18n'
import bankIdLogo from '../../../assets/BankID_logo_white.png'




export default {
  emits:['change-view'],

  setup() {
    const { t } = useI18n()
    return { t, bankIdLogo}
  }
}
</script>
