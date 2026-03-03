<template>
  <div class="bg-views p-4 rounded-4 mb-3 mt-3 no-email-received-wrapper">
    <h1 class="mb-4">{{ t('ResetPasswordEmailNotDelivered') }}</h1>
    <p class="mb-4">{{ t('ResetPasswordEmailNotDeliveredHelp') }}</p>

    <button class="btn-custom mb-4" @click="send">
      {{ t('resendEmail') }}
    </button>


    <BackLink :label="t('back')" @click="goBack" />

    <GenericPopup 
      v-model:visible="showPopup"
      :title="t('newEmailSent')" 
      :buttons="[ { label: t('okClose'), action: closePopup } ]"
    >
        <template #icon><i class="bi bi-check-circle"></i></template>
      
    </GenericPopup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import GenericPopup from '../../common/GenericPopup.vue'
import BackLink from '../../common/BackLink.vue'

export default defineComponent({
  name: 'NoEmailReceived',
  components: { GenericPopup, BackLink },
  props: { email: { type: String, default: '' } },
  emits: ['change-view'],
  setup(_, { emit }) {
    const { t } = useI18n()
    const success = ref(false)
    const showPopup = ref(false)

    const send = () => {
      success.value = true
      showPopup.value = true
    }

    const closePopup = () => { showPopup.value = false }

    const goBack = () => { emit('change-view', 'login') }

    return { t, success, showPopup, send, closePopup, goBack }
  }
})
</script>