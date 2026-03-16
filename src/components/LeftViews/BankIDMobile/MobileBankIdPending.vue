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
      <AppBackLink :label="t('back')" @click="goToLogin" />
      <AppBankIdLink :label="t('aboutMobileBankID')" />
    </div>
    
    <div class="divider my-3"><hr class="flex-grow-1"><span class="px-2 small">{{ t('or') }}</span><hr class="flex-grow-1"></div>
   
    <button @click="goToAuthBankIdLocal" class="btn-custom d-flex align-items-center justify-content-start gap-2 mb-3" type="button">
      <img :src="bankIdLogo" class="bankid-icon" alt="BankID" />{{ t('bankIDThisDevice') }}
    </button>
    
    <div v-if="isDev" class="d-flex flex-column gap-2 mt-2">
      <button @click="simulateSuccess" class="btn-temp" type="button">Simulera lyckad inloggning</button>
      <button @click="$emit('trigger-error')" class="btn-temp" type="button">Simulera misslyckad inloggning</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../../../i18n/useI18n'
import bankIdLogo from '../../../assets/bankid-logo-white.png'
import AppBackLink from '../../common/AppBackLink.vue'
import AppBankIdLink from '../../common/AppBankIdLink.vue'
import AppLogo from '../../common/AppLogo.vue'
import AppSpinner from '../../common/AppSpinner.vue'
import AppStepIndicator from '../../common/AppStepIndicator.vue'

const { t } = useI18n()
const isDev = import.meta.env.DEV
const emit = defineEmits<{ (e: 'change-view', view: string): void; (e: 'trigger-error'): void }>()
const goToLogin = () => emit('change-view', 'login')
const goToAuthBankIdLocal = () => emit('change-view', 'authbankidlocal')
const simulateSuccess = () => emit('change-view', 'mobilebankidapproved')
</script>
