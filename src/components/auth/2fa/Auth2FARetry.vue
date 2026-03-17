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

const { t } = useI18n()
const authStore = useAuthStore()
const emit = defineEmits(['show-popup'])

const handleResend = async () => {
  // 1. Visa laddnings-popup (valfritt, eftersom vi har spinner på knappen nu också)
  emit('show-popup', { title: t('wait'), loading: true })

  try {
    // 2. Gör det faktiska anropet via storen
    await authStore.resendCode()

    // 3. Om det lyckas, visa succé-popupen
    emit('show-popup', {
      title: t('newCodeSent'),
      icon: 'bi bi-check-circle fs-1',
      buttons: [{ 
        label: t('okClose'), 
        action: () => emit('show-popup', { visible: false }) 
      }]
    })
  } catch (err) {
    // 4. Vid fel, stäng popupen (eller visa felmeddelande)
    emit('show-popup', { visible: false })
  }
}
</script>