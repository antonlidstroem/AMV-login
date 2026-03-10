<template>
<div class="bg-views p-4 rounded-4 mb-3">
    <h4>{{ t('noCodeReceived') }}</h4>
    <p>{{ t('waitingForCode') }} {{ t('contactUs') }}</p>

    <button class="btn-custom" @click="verify">{{ t('sendNewCode') }}</button>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from '../../../i18n/useI18n'

export default defineComponent({
  name: 'ResendCode',
  components: {},
  emits: ['show-popup'],

  setup(_, { emit }) {
    const { t } = useI18n()

    const verify = (): void => {
      emit('show-popup', {
        title: t('newCodeSent'),
        icon: 'bi bi-check-circle fs-1',
        buttons: [
          { 
            label: t('okClose'), 
            action: () => emit('show-popup', { visible: false }) 
          }
        ]
      })
    }

    return {
      t,
      verify,
    }
  }
 })
 </script>


