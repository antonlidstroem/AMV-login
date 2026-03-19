<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <h4>{{ t('noCodeReceived') }}</h4>
    <p>{{ t('waitingForCode') }} {{ t('contactUs') }}</p>
    
    <button 
      class="btn-custom" 
      @click="handleResend" 
      :disabled="authStore.isLoading"
      type="button"
    >
      <span v-if="authStore.isLoading" class="spinner-border spinner-border-sm me-2"></span>
      {{ t('sendNewCode') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../../modules/stores/auth'
import { usePopupStore } from '../../../modules/stores/popup'


const popup = usePopupStore()

const { t } = useI18n()
const authStore = useAuthStore()


const handleResend = async () => {
  try {
    await authStore.resendCode()

    // Success feedback is kept as a popup
    popup.show({
      title: 'Ny kod har skickats!',
      icon: 'bi bi-check-circle',
      buttons: [{ label: 'Stäng', action: () => popup.hide() }]
    })

  } catch (err) {
    console.error(err)
  }
}
</script>