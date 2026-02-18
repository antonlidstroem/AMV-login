<template>
<div class="bg-white p-4 rounded-4 mb-3">

    <h2>{{ t('loginWithMobileBankID') }}</h2>
    <p class="mb-3">{{ t('waitingForAuth') }}</p>


<!-- Pending clock -->
  <i class="bi bi-clock-history display-1 text-dark mb-3"></i>

<!-- Step indicator with Bootstrap icons, using text-success for active step and text-secondary for inactive steps. -->
<div class="d-flex justify-content-center align-items-center gap-2">
  <i class="bi bi-1-circle-fill" style="color:#6c757d;"></i> 
  <i class="bi bi-arrow-right" style="color:#000;"></i> 
  <i class="bi bi-2-circle-fill" style="color:#85BE23;"></i> 
  <i class="bi bi-arrow-right" style="color:#000;"></i> 
  <i class="bi bi-3-circle-fill" style="color:#6c757d;"></i> 
</div>



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
      class="btn-custom btn-custom btn-custom d-flex align-items-center justify-content-start gap-2 mb-3"
    >
      <img :src="bankIdLogo" class="bankid-icon"/>
      {{ t('bankIDThisDevice') }}
    </button>

<!-- 🔹 Tillfällig knapp för test -->
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
