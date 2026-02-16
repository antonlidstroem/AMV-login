<template>
  <div class="mobile-bankid text-center">

    <h2>{{ t('loginWithMobileBankID') }}</h2>
    <p class="mb-3">{{ t('scanQRCode') }}</p>

    <!-- QR -->
    <div class="qr-wrapper mb-3">
      <div class="fake-qr"></div>
    </div>

<!-- Step indicator with Bootstrap icons, using text-success for active step and text-secondary for inactive steps. -->
    <div class="d-flex justify-content-center align-items-center gap-2">
      <i class="bi bi-1-circle-fill" style="color:#85BE23;"></i> 
      <i class="bi bi-arrow-right" style="color:#000;"></i> 
      <i class="bi bi-2-circle-fill" style="color:#6c757d;"></i> 
      <i class="bi bi-arrow-right" style="color:#000;"></i> 
      <i class="bi bi-3-circle-fill" style="color:#6c757d;"></i> 
    </div>

  <!-- Länkar -->
    <!-- <div class="d-flex justify-content-between mb-3 small">

      <a href="#" @click.prevent="$emit('change-view','login')">
        ← {{ t('back') }}
      </a>

      <a
        href="https://www.bankid.com/privat/om-bankid"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('aboutMobileBankID') }}
      </a>

    </div> -->



<!-- Links -->
<div class="d-flex justify-content-between align-items-center mt-3">
  <BackLink
    :label="t('back')"
    @click="$emit('change-view','login')"
  />

  <BankIdLink
    :label="t('aboutMobileBankID')"
  />
</div>



        <!-- Divider med streck -->
    <div class="d-flex align-items-center my-3">
      <hr class="flex-grow-1">
      <span class="px-2 small">{{ t('or') }}</span>
      <hr class="flex-grow-1">
    </div>

    <button
      @click="$emit('change-view','bankiddevice')"
      class="btn-custom btn-custom d-flex align-items-center justify-content-start gap-2 mb-3"
    >
      <img :src="bankIdLogo" class="bankid-icon"/>
      {{ t('bankIDThisDevice') }}
    </button>

<!-- 🔹 Tillfällig knapp för test -->
    <button
      @click="$emit('change-view','mobilebankidpending')"
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
    return { t, bankIdLogo }
  }
}
</script>
