<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <AppLogo />
    <h2>{{ t('loginWithMobileBankID') }}</h2>
    <p class="mb-5">{{ t('scanQRCode') }}</p>

    <div class="qr-wrapper mb-5">
      <div v-if="isQrLoaded" class="fake-qr"></div>
      <div v-else class="qr-placeholder d-flex align-items-center justify-content-center border rounded-3" style="height: 200px; background: rgba(0,0,0,0.1);">
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <AppStepIndicator :total-steps="3" :active-step="1" />

    <div class="d-flex justify-content-between align-items-center mt-3">
      <AppBackLink :label="t('back')" @click="handleGoBack" />
      <AppBankIdLink :label="t('aboutMobileBankID')" />
    </div>

    <div class="d-flex align-items-center my-3">
      <hr class="flex-grow-1">
      <span class="px-2 small">{{ t('or') }}</span>
      <hr class="flex-grow-1">
    </div>

    <button @click="emit('change-view', 'auth-bankid-local')" class="btn-custom d-flex align-items-center justify-content-start gap-2 mb-3" type="button">
      <img :src="bankIdLogo" class="bankid-icon" alt="BankID" />
      {{ t('bankIDThisDevice') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../../modules/stores/auth'
import bankIdLogo from '../../../assets/bankid-logo-white.png'
import AppBackLink from '../../common/AppBackLink.vue'
import AppBankIdLink from '../../common/AppBankIdLink.vue'
import AppLogo from '../../common/AppLogo.vue'
import AppStepIndicator from '../../common/AppStepIndicator.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const isQrLoaded = ref(true)
const emit = defineEmits(['change-view', 'trigger-error'])

// Watch for the store to hit 'COMPLETE' and switch views automatically
watch(() => authStore.bankIdStatus, (newStatus) => {
  if (newStatus === 'USER_SIGN') {
    // Användaren har skannat, byt till vänta-vyn!
    emit('change-view', 'auth-bankid-qr-pending'); 
  }
  if (newStatus === 'COMPLETE') {
    emit('change-view', 'auth-bankid-qr-success');
  }
})

const handleGoBack = () => {
  authStore.stopPolling()
  emit('change-view', 'login')
}

onMounted(async () => {
  try {
    await authStore.loginWithBankId()
    authStore.pollBankIdStatus() // Starts the loop in the store
  } catch (err) {
    emit('trigger-error')
  }
})

// onUnmounted(() => {
//   authStore.stopPolling()
// })
</script>