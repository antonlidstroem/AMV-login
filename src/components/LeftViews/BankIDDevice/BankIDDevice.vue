<template>
  <div>

    <h2>{{ t('loginWithBankID') }}</h2>
    <p>{{ t('enterSecurityCode') }}</p>

    <div class="waiting-box">
      <div class="spinner"></div>
    </div>


<!-- Pending clock -->
<div class="d-flex flex-column justify-content-center align-items-center text-center mt-4">
  <!-- Klockikon (stor med font-size) -->
  <i class="bi bi-clock-history text-dark mb-3" style="font-size: 6rem;"></i>


  <!-- Avbryt-länk -->
  <a href="#" @click.prevent="$emit('change-view','login')" class="text-decoration-none fw-medium mb-4">
    {{ t('cancel') }}
  </a>
</div>

<!-- Step indicator with Bootstrap icons, using text-success for active step and text-secondary for inactive steps. -->
<div class="d-flex justify-content-center align-items-center gap-2">
  <i class="bi bi-1-circle-fill" style="color:#85BE23;"></i> 
  <i class="bi bi-arrow-right" style="color:#000;"></i> 
  <i class="bi bi-2-circle-fill" style="color:#6c757d;"></i> 
</div>

<!-- Links -->
<div class="d-flex justify-content-between align-items-center mt-3 mb-5">
  <BackLink
    :label="t('back')"
    @click="$emit('change-view','login')"
  />

  <BankIdLink
    :label="t('aboutMobileBankID')"
  />
</div>



    <div class="divider mb-3"><h4>{{ t('orBankId') }}</h4></div>

    <button @click="$emit('change-view','mobilebankid')" class="btn-custom btn-custom btn-custom d-flex align-items-center justify-content-start gap-2 mb-3" >
      <img :src="bankIdLogo" class="bankid-icon" />
      {{ t('mobileBankID') }}
      
    </button>

<!-- 🔹 Tillfällig knapp för test -->
    <button
      @click="$emit('change-view','bankiddeviceapproved')"
      class="btn-temp"
    >
      Simulera lyckad inloggning
    </button>

  </div>
</template>

<script>
import { useI18n } from '../../../i18n/useI18n'
import bankIdLogo from '../../../assets/BankID_logo_white.png'
import BackLink from '../../common/BackLink.vue'
import BankIdLink from '../../common/BankIdLink.vue'



export default {
  components:{BackLink, BankIdLink},
  emits:['change-view'],

  setup() {
    const { t } = useI18n()
    return { t, bankIdLogo}
  }
}
</script>
