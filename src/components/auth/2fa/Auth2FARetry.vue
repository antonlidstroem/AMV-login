<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <h4>{{ t('noCodeReceived') }}</h4>
    <p>{{ t('waitingForCode') }} {{ t('contactUs') }}</p>
    <button class="btn-custom" @click="verify" type="button">{{ t('sendNewCode') }}</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'ResendCode',
  emits: ['show-popup'],
  setup(_, { emit }) {
    const { t } = useI18n()
    const verify = () => {
      emit('show-popup', {
        title: t('newCodeSent'),
        icon: 'bi bi-check-circle fs-1',
        buttons: [{ label: t('okClose'), action: () => emit('show-popup', { visible: false }) }]
      })
    }
    return { t, verify }
  }
})
</script>
