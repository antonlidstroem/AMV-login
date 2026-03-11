<template>
  <div class="bg-views p-4 rounded-4 mb-3 mt-3 no-email-received-wrapper">
    
    <h1 class="mb-4">{{ t('ResetPasswordEmailNotDelivered') }}</h1>

    <p class="mb-4">{{ t('ResetPasswordEmailNotDeliveredHelp') }}</p>

    <button class="btn-custom mb-4" @click="send">{{ t('resendEmail') }}</button>
    <BackLink :label="t('back')" @click="emit('change-view', 'login')" />

  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../../../i18n/useI18n'
import BackLink from '../../common/BackLink.vue'

defineProps<{ email: string }>()
const emit = defineEmits(['change-view', 'show-popup'])
const { t } = useI18n()

const send = () => {
  emit('show-popup', {
    title: t('newEmailSent'),
    icon: 'bi bi-check-circle',
    buttons: [{ label: t('okClose'), action: () => emit('show-popup', { visible: false }) }]
  })
}
</script>

