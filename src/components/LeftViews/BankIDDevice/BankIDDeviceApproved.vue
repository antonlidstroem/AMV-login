<template>
<div class="bg-white p-4 rounded-4 mb-3">

    <h2>{{ t('loginWithBankID') }}</h2>
    <p>{{ t('SecurityCodeApproved') }}</p>

    <div class="waiting-box">
      <div class="spinner"></div>
      <p>{{ t('waitingForBankId') }}</p>
    </div>

    <!-- Success icon -->
    <div class="d-flex flex-column justify-content-center align-items-center text-center mt-4 mb-4">
      <i class="bi bi-check-circle-fill mb-3" style="font-size: 6rem; color: var(--success);"></i>
  
    
<!-- Step indicator with Bootstrap icons, using text-success for active step and text-secondary for inactive steps. -->
<div class="d-flex justify-content-center align-items-center gap-2 mb-3">
  <i class="bi bi-1-circle-fill" style="color:#6c757d;"></i> 
  <i class="bi bi-arrow-right" style="color:#000;"></i> 
  <i class="bi bi-2-circle-fill" style="color:#85BE23;"></i> 
</div>

<a href="#" @click.prevent="$emit('change-view','login')">
            {{ t('cancel') }}
          </a>
    </div>
    

<!-- Tillfällig knapp för test -->
    <button
      @click="$emit('change-view','mobilebankidapproved')"
      class="btn-temp"
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
