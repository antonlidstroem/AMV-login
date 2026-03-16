<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <AppLogo />
    <h2>{{ t('loginWithBankID') }}</h2>
    <p class="mb-5">{{ t('enterSecurityCode') }}</p>

    
   
    <div class="d-flex justify-content-center mb-5">
      <AppSpinner />
    </div>

    <AppStepIndicator :total-steps="2" :active-step="1" />

    <a href="#" @click.prevent="emit('change-view','login')" class="text-decoration-none fw-medium mb-4">{{ t('cancel') }}</a>

    <div class="d-flex justify-content-between align-items-center mt-3 mb-5">
      <AppBackLink :label="t('back')" @click="emit('change-view','login')" />
      <AppBankIdLink :label="t('aboutMobileBankID')" />
    </div>

    <div class="divider mb-3"><h4>{{ t('orBankId') }}</h4></div>
    
    <button @click="emit('change-view','authbankidqr')" class="btn-custom d-flex align-items-center justify-content-start gap-2 mb-3">
      <img :src="bankIdLogo" width="25" height="24" alt="BankID" />
      {{ t('mobileBankID') }}
    </button>

    <button v-if="isDev" @click="emit('change-view','authbankidlocalsuccess')" class="btn-temp">Simulera lyckad inloggning</button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../../../modules/i18n/useI18n'
import bankIdLogo from '../../../assets/bankid-logo-white.png'
import AppBackLink from '../../common/AppBackLink.vue'
import AppBankIdLink from '../../common/AppBankIdLink.vue'
import AppLogo from '../../common/AppLogo.vue'
import AppSpinner from '../../common/AppSpinner.vue'
import AppStepIndicator from '../../common/AppStepIndicator.vue'

const { t } = useI18n()
const isDev = import.meta.env.DEV
const emit = defineEmits(['change-view'])
</script>