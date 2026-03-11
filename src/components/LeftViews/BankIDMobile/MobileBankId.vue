<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <img :src="AMVLogo" class="logo-top" />

    <h2>{{ t('loginWithMobileBankID') }}</h2>
    <p class="mb-5">{{ t('scanQRCode') }}</p>

    <!-- QR area -->
    <div class="qr-wrapper mb-5">
      <div v-if="isQrLoaded" class="fake-qr"></div>
      <div
        v-else
        class="qr-placeholder d-flex align-items-center justify-content-center border rounded-3"
        style="height: 200px; background: rgba(0,0,0,0.1);"
      >
        <!-- Bootstrap spinner — works whenever Bootstrap CSS is imported -->
        <div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <!-- Step indicator -->
    <div class="d-none d-md-flex w-100 justify-content-center align-items-center gap-2 mb-3">
      <svg width="131" height="25" viewBox="0 0 131 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="118.87" cy="12.1296" r="12.1296" fill="#ADB2A3"/>
        <circle cx="65.5" cy="12.1296" r="12.1296" fill="#ADB2A3"/>
        <circle cx="12.1296" cy="12.1296" r="12.1296" fill="#7B9B3F"/>
      </svg>
    </div>

    <!-- Link row -->
    <div class="d-flex justify-content-between align-items-center mt-3">
      <BackLink :label="t('back')" @click="goToBankIdDevice" />
      <BankIdLink :label="t('aboutMobileBankID')" />
    </div>

    <!-- Divider -->
    <div class="d-flex align-items-center my-3">
      <hr class="flex-grow-1">
      <span class="px-2 small">{{ t('or') }}</span>
      <hr class="flex-grow-1">
    </div>

    <button @click="$emit('change-view', 'bankiddevice')" class="btn-custom d-flex align-items-center justify-content-start gap-2 mb-3" type="button">
      <img :src="bankIdLogo" class="bankid-icon" alt="BankID" />
      {{ t('bankIDThisDevice') }}
    </button>

    <!-- Dev-only simulation buttons -->
    <div v-if="isDev" class="d-flex flex-column gap-2 mt-4">
      <button @click="simulatePending" class="btn-temp" type="button">
        Simulera väntande (pending)
      </button>
      <button @click="simulateQrError" class="btn-temp" type="button">
        Simulera QR-fel
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import bankIdLogo from '../../../assets/BankID_logo_white.png'
import BackLink from '../../common/BackLink.vue'
import BankIdLink from '../../common/BankIdLink.vue'
import AMVLogo from '../../../assets/logo_horizontal.svg'

const { t } = useI18n()
const isQrLoaded = ref(true)
const isDev = import.meta.env.DEV

const emit = defineEmits<{
  (e: 'change-view', view: string): void
  (e: 'trigger-error'): void
}>()

/**
 * Bug fix: previously `isQrLoaded` was set to false and never reset,
 * leaving the spinner permanently visible after the error was dismissed.
 * Now we reset it after a short delay so the QR area recovers gracefully.
 */
const simulateQrError = () => {
  isQrLoaded.value = false
  emit('trigger-error')

  // Reset the QR view after the error popup has been acknowledged
  // (give it 3 s — enough time for the user to see the popup)
  setTimeout(() => {
    isQrLoaded.value = true
  }, 3000)
}

const goToBankIdDevice = () => emit('change-view', 'bankiddevice')
const simulatePending = () => emit('change-view', 'mobilebankidpending')
</script>
