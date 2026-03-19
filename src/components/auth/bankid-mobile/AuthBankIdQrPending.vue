<template>
  <div class="bg-views p-4 rounded-4">
    <AppLogo />
    <h2>{{ t('loginWithMobileBankID') }}</h2>
    <p class="mb-5">{{ t('waitingForAuth') }}</p>
    
    <div class="d-flex justify-content-center mb-4 ">
      <AppSpinner />
    </div>

    <AppStepIndicator :total-steps="3" :active-step="2" />
    
    <div class="d-flex justify-content-between align-items-center mt-3">
      <AppBackLink :label="t('back')" @click="handleGoBack" />
      <AppBankIdLink :label="t('aboutMobileBankID')" />
    </div>
    
    <div class="divider my-3"><hr class="flex-grow-1"><span class="px-2 small">{{ t('or') }}</span><hr class="flex-grow-1"></div>
   
    <button @click="emit('change-view', 'auth-bankid-local')" class="btn-custom d-flex align-items-center justify-content-start gap-2 mb-3" type="button">
      <img :src="bankIdLogo" class="bankid-icon" alt="BankID" />{{ t('bankIDThisDevice') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onUnmounted, watch } from 'vue'
import { useAuthStore } from '../../../modules/stores/auth'
import bankIdLogo from '../../../assets/bankid-logo-white.png'
import AppBackLink from '../../common/AppBackLink.vue'
import AppBankIdLink from '../../common/AppBankIdLink.vue'
import AppLogo from '../../common/AppLogo.vue'
import AppSpinner from '../../common/AppSpinner.vue'
import AppStepIndicator from '../../common/AppStepIndicator.vue'

const authStore = useAuthStore()
const { t } = useI18n()
const emit = defineEmits(['change-view'])

// Watch for status change here too, in case they navigated to this view manually
watch(() => authStore.bankIdStatus, (newStatus) => {
  if (newStatus === 'COMPLETE') {
    emit('change-view', 'auth-bankid-qr-success')
  }
})

const handleGoBack = () => {
  authStore.stopPolling()
  emit('change-view', 'login')
}


</script>