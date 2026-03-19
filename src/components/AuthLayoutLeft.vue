<template>
  <div class="bg-AuthLayoutLeft d-flex flex-column align-items-center justify-content-center h-100 rounded-4">
    <div class="w-100 px-1">
      <!-- Specialvy: 2FA (Visar både Verify och Retry samtidigt) -->
      <div v-if="currentView === 'auth-2fa-verify'" class="d-flex flex-column gap-3 w-100">
        <Auth2FAVerify @change-view="handleChangeView" @show-popup="emit('show-popup', $event)" />
        <Auth2FARetry @show-popup="emit('show-popup', $event)" />
      </div>

      <!-- Specialvy: Lösenordsåterställning skickad -->
      <div v-else-if="currentView === 'auth-password-reset-sent'">
        <div class="reset-password-wrapper d-flex flex-column">
          <AuthPasswordResetSent :email="emailForAuthPasswordResetRetry" @change-view="handleChangeView" />
          <AuthPasswordResetRetry :email="emailForAuthPasswordResetRetry" @change-view="handleChangeView" @show-popup="emit('show-popup', $event)" />
        </div>
      </div>

      <!-- Dynamisk komponent för alla andra vyer -->
      <component
        v-else-if="currentComponent"
        :is="currentComponent"
        :email="emailForAuthPasswordResetRetry"
        @change-view="handleChangeView"
        @show-password-demands="emit('show-password-demands')"
        @trigger-error="emit('trigger-error')"
        @show-popup="emit('show-popup', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Component } from 'vue'
import type { ViewType } from '../modules/types/views'
import { useAuthStore } from '../modules/stores/auth'

// Import av alla delkomponenter
import AuthLoginForm from './auth/AuthLoginForm.vue'
import AuthPasswordResetRequest from './auth/reset-password/AuthPasswordResetRequest.vue'
import AuthPasswordResetSent from './auth/reset-password/AuthPasswordResetSent.vue'
import AuthPasswordResetForm from './auth/reset-password/AuthPasswordResetForm.vue'
import AuthPasswordResetRetry from './auth/reset-password/AuthPasswordResetRetry.vue'
import AuthBankIdQr from './auth/bankid-mobile/AuthBankIdQr.vue'
import AuthBankIdLocal from './auth/bankid-device/AuthBankIdLocal.vue'
import AuthBankIdLocalSuccess from './auth/bankid-device/AuthBankIdLocalSuccess.vue'
import Auth2FAVerify from './auth/2fa/Auth2FAVerify.vue'
import Auth2FARetry from './auth/2fa/Auth2FARetry.vue'
import AuthBankIdQrPending from './auth/bankid-mobile/AuthBankIdQrPending.vue'
import AuthBankIdQrSuccess from './auth/bankid-mobile/AuthBankIdQrSuccess.vue'

const authStore = useAuthStore()
const props = defineProps<{ currentView: ViewType }>()
const emit = defineEmits(['change-view', 'show-password-demands', 'trigger-error', 'show-popup'])

const emailForAuthPasswordResetRetry = ref('')

// Mapping av vyer till komponenter
const VIEW_MAP: Record<ViewType, Component | null> = {
  login: AuthLoginForm,
  'forgot-password': AuthPasswordResetRequest,
  'auth-bankid-qr': AuthBankIdQr,
  'auth-bankid-qr-pending': AuthBankIdQrPending,
  'auth-bankid-qr-success': AuthBankIdQrSuccess,
  'auth-bankid-local': AuthBankIdLocal,
  'auth-bankid-local-success': AuthBankIdLocalSuccess,
  'auth-2fa-verify': Auth2FAVerify,
  'new-password': AuthPasswordResetForm,
  'auth-password-reset-sent': AuthPasswordResetSent,
  'auth-2fa-retry': Auth2FARetry,
  'auth-password-reset-retry': AuthPasswordResetRetry,
  'dashboard-view': null, 
  'authenticated-view': null 
}

/**
 * Hanterar vybyte och sparar payload (t.ex. e-post) om det finns
 */
const handleChangeView = (view: ViewType, payload?: any) => {
  if (typeof payload === 'string' && payload.includes('@')) {
    emailForAuthPasswordResetRetry.value = payload
  }
  emit('change-view', view, payload)
}

/**
 * HJÄRTAT I FLÖDET: Bevakar statusen i Pinia och byter vy automatiskt.
 * Detta gör att vi inte behöver duplicera watch-logik i småkomponenterna.
 */
watch(() => authStore.bankIdStatus, (newStatus) => {
  console.log("Layout detekterade statusändring:", newStatus)
  
  if (newStatus === 'USER_SIGN') {
    handleChangeView('auth-bankid-qr-pending')
  } else if (newStatus === 'COMPLETE') {
    // VIKTIGT: Kolla om vi kör Local eller QR för att välja rätt succé-vy
    const isLocal = props.currentView.includes('local')
    const successView = isLocal ? 'auth-bankid-local-success' : 'auth-bankid-qr-success'
    
    handleChangeView(successView)
  }
})

// Beräknar vilken komponent som ska visas just nu
const currentComponent = computed(() => VIEW_MAP[props.currentView] ?? null)
</script>