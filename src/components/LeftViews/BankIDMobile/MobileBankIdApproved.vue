<template>
  <div class="mobile-bankid text-center">

    <h2>{{ t('loginWithMobileBankID') }}</h2>
    <p class="mb-3">{{ t('SecurityCodeApproved') }}</p>



  <i class="bi bi-house-check display-1 text-dark mb-3"></i>

<!-- Step indicator with Bootstrap icons, using text-success for active step and text-secondary for inactive steps. -->
<div class="d-flex justify-content-center align-items-center gap-2">
  <i class="bi bi-1-circle-fill" style="color:#6c757d;"></i> 
  <i class="bi bi-arrow-right" style="color:#000;"></i> 
  <i class="bi bi-2-circle-fill" style="color:#6c757d;"></i> 
  <i class="bi bi-arrow-right" style="color:#000;"></i> 
  <i class="bi bi-3-circle-fill" style="color:#85BE23;"></i> 
</div>

<!-- Links -->
    <div class="d-flex justify-content-between align-items-center mt-3">
      <BackLink
        :label="t('back')"
        @click="$emit('change-view','login')"
      />

    </div>

<!-- 🔹 Tillfällig knapp för test -->
        <button
        @click="$router.push('/dashboard')"
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

export default {
  components:{BackLink},
  emits:['change-view'],
  setup() {
    const { t } = useI18n()
    return { t, bankIdLogo }
  }
}
</script>
