<template>
  <div class="bg-views p-4 rounded-4 mb-3 mt-3 no-email-received-wrapper">
    <h1 class="mb-4">{{ t('ResetPasswordEmailNotDelivered') }}</h1>
    <p class="mb-4">{{ t('ResetPasswordEmailNotDeliveredHelp') }}</p>
    <button class="btn-custom mb-4" @click="send" type="button">{{ t('resendEmail') }}</button>
    <BackLink :label="t('back')" @click="goBack" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import BackLink from '../../common/BackLink.vue'
export default defineComponent({
  name: 'NoEmailReceived',
  components: { BackLink },
  props: { email: { type: String, default: '' } },
  emits: ['change-view', 'show-popup'],
  setup(_, { emit }) {
    const { t } = useI18n()
    const send = () => {
      emit('show-popup', {
        title: t('newEmailSent'),
        icon: 'bi bi-check-circle',
        buttons: [{ label: t('okClose'), action: () => emit('show-popup', { visible: false }) }]
      })
    }
    const goBack = () => emit('change-view', 'login')
    return { t, send, goBack }
  }
})
</script>
