<template>
  <div class="bg-views p-4 rounded-4 mb-3 mt-3 no-email-received-wrapper">

    <h1 class="mb-4">{{ t('ResetPasswordEmailNotDelivered') }}</h1>

    <p class="mb-4">{{ t('ResetPasswordEmailNotDeliveredHelp') }}</p>

    <button class="btn-custom mb-4" @click="send">{{ t('resendEmail') }}</button>
    <BackLink :label="t('back')" @click="emit('change-view', 'login')" />

  </div>
</template>

<script setup lang="ts">
import { markRaw } from 'vue' // 1. Importera markRaw
import { useI18n } from '../../../i18n/useI18n'
import BackLink from '../../common/BackLink.vue'
import AppSuccess from '../../common/AppSuccess.vue' // 2. Importera AppSuccess

defineProps<{ email: string }>()
const emit = defineEmits(['change-view', 'show-popup'])
const { t } = useI18n()

const send = () => {
  // 1. Visa spinner först
  emit('show-popup', {
    title: "skcikar", // t.ex. "Skickar..."
    loading: true
  })

  // 2. Vänta lite (simulera nätverk) och byt sen till bocken
  setTimeout(() => {
    emit('show-popup', {
      title: t('newEmailSent'),
      loading: false, // Stäng av spinnern
      component: markRaw(AppSuccess), // In med bocken!
      buttons: [{ label: t('okClose'), action: () => emit('show-popup', { visible: false }) }]
    })
  }, 800) // 0.8 sekunder räcker för att det ska kännas äkta
}
</script>

