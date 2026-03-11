<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <img :src="AMVLogo" class="logo-top" />

    <h2>{{ t('loginWithMobileBankID') }}</h2>
    <p class="mb-5">{{ t('SecurityCodeApproved') }}</p>

    <!-- Ikon -->
    <div class="d-flex justify-content-center align-items-center gap-2 mb-5">
      <svg width="118" height="118" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_423_1818" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="118" height="118">
          <rect width="118" height="118" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_423_1818)">
          <path d="M19.6661 98.3335V52.2397L10.8161 59.0002L5.03906 51.2564L58.9995 9.8335L113.083 51.1335L107.183 59.0002L58.9995 22.1252L29.4995 44.7418V88.5002H44.2495V98.3335H19.6661ZM73.3807 108.167L52.6078 87.271L59.4911 80.2647L73.3807 94.1543L101.283 66.3752L108.166 73.3814L73.3807 108.167Z" fill="#1C1B1F"/>
        </g>
      </svg>
    </div>

    <!-- Stegindikator -->
    <div class="d-flex justify-content-center align-items-center gap-2 mb-5">
      <svg width="131" height="25" viewBox="0 0 131 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="118.87" cy="12.1296" r="12.1296" fill="#7B9B3F"/>
        <circle cx="65.5002" cy="12.1296" r="12.1296" fill="#ADB2A3"/>
        <circle cx="12.1296" cy="12.1296" r="12.1296" fill="#ADB2A3"/>
      </svg>
    </div>

    <!-- Länk tillbaka -->
    <div class="d-flex justify-content-between align-items-center mt-3">
      <BackLink :label="t('back')" @click="goToLogin" />
    </div>

    <!-- Simuleringsknapp – ENDAST i dev-läge -->
    <button
      v-if="isDev"
      @click="simulateSuccess"
      class="btn-temp"
    >
      Simulera lyckad inloggning
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../../../i18n/useI18n'
import BackLink from '../../common/BackLink.vue'
import AMVLogo from '../../../assets/logo_horizontal.svg'

const { t } = useI18n()

// Används bara för att visa/dölja dev-knappar
const isDev = import.meta.env.DEV

const emit = defineEmits<{
  (e: 'change-view', view: string): void
  (e: 'show-popup', config: any): void
}>()

const goToLogin = () => {
  emit('change-view', 'login')
}

/**
 * Simulerar lyckad inloggning:
 * 1. Visa laddnings-popup
 * 2. Vänta lite för realism
 * 3. Stäng popup och skicka upp 'loginview' – App.vue sköter resten
 */
const simulateSuccess = () => {
  emit('show-popup', { title: t('loginIn'), loading: true })

  setTimeout(() => {
    emit('show-popup', { visible: false })
    emit('change-view', 'loginview')
  }, 1500)
}
</script>
