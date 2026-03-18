<template>
  <div class="bg-views p-4 rounded-4 mb-3 mt-3 no-email-received-wrapper">

    <h1 class="mb-4">{{ t('resetPasswordEmailNotDelivered') }}</h1>

    <p class="mb-4">{{ t('resetPasswordEmailNotDeliveredHelp') }}</p>

    <button class="btn-custom mb-4" @click="send">{{ t('resendEmail') }}</button>
    <AppBackLink :label="t('back')" @click="emit('change-view', 'login')" />

  </div>
</template>

<script setup lang="ts">
import { markRaw } from 'vue' 
import { useI18n } from 'vue-i18n'
import AppBackLink from '../../common/AppBackLink.vue'
import AppSuccess from '../../common/AppSuccess.vue' 
import { useAuthStore } from '../../../modules/stores/auth'

const props = defineProps<{ email: string }>()
const emit = defineEmits(['change-view', 'show-popup'])
const { t } = useI18n()
const authStore = useAuthStore()

const send = async () => {
  // 3. Visa spinner
  emit('show-popup', {
    title: t('sending'), 
    loading: true
  })

  try {
    // 4. Anropa den riktiga (mockade) endpointen
    await authStore.resendPasswordResetEmail(props.email);

    // 5. Visa succé-bocken när anropet är klart
    emit('show-popup', {
      title: t('newEmailSent'),
      loading: false,
      component: markRaw(AppSuccess),
      buttons: [{ 
        label: t('okClose'), 
        action: () => emit('show-popup', { visible: false }) 
      }]
    })
  } catch (err) {
    // Hantera eventuella fel
    emit('show-popup', { visible: false });
    alert("Kunde inte skicka mejlet, försök igen senare.");
  }
}
</script>

