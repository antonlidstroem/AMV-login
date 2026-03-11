<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <AppLogo />
    <h2>{{ t('loginWithMobileBankID') }}</h2>
    <p class="mb-5">{{ t('waitingForAuth') }}</p>
    <div class="d-flex justify-content-center align-items-center gap-2 mb-5">
      <svg width="115" height="101" viewBox="0 0 115 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0p" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="115" height="101"><rect width="115" height="101" fill="#D9D9D9"/></mask>
        <g mask="url(#mask0p)">
          <path d="M73.3124 70.3437L53.9062 50.9374V26.7395H61.0937V48.1175L78.3437 65.3124L73.3124 70.3437Z" fill="#1C1B1F"/>
        </g>
        <circle cx="73" cy="10" r="5" fill="#7B9B3F"/>
      </svg>
    </div>
    <div class="d-none d-md-flex justify-content-center align-items-center w-100">
      <svg width="131" height="25" viewBox="0 0 131 25" fill="none"><circle cx="118.87" cy="12.1296" r="12.1296" fill="#ADB2A3"/><circle cx="65.5" cy="12.1296" r="12.1296" fill="#7B9B3F"/><circle cx="12.1296" cy="12.1296" r="12.1296" fill="#ADB2A3"/></svg>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-3">
      <BackLink :label="t('back')" @click="goToLogin" />
      <BankIdLink :label="t('aboutMobileBankID')" />
    </div>
    <div class="d-flex align-items-center my-3"><hr class="flex-grow-1"><span class="px-2 small">{{ t('or') }}</span><hr class="flex-grow-1"></div>
    <button @click="goToBankIdDevice" class="btn-custom d-flex align-items-center justify-content-start gap-2 mb-3" type="button">
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
import bankIdLogo from '../../../assets/BankID_logo_white.png'
import BackLink from '../../common/BackLink.vue'
import BankIdLink from '../../common/BankIdLink.vue'
import AppLogo from '../../common/AppLogo.vue'

const { t } = useI18n()
const isDev = import.meta.env.DEV
const emit = defineEmits<{ (e: 'change-view', view: string): void; (e: 'trigger-error'): void }>()
const goToLogin = () => emit('change-view', 'login')
const goToBankIdDevice = () => emit('change-view', 'bankiddevice')
const simulateSuccess = () => emit('change-view', 'mobilebankidapproved')
</script>
