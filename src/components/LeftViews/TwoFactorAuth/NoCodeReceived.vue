<template>
<div class="bg-views p-4 rounded-4 mb-3">
    <h4>{{ t('noCodeReceived') }}</h4>
    <p>{{ t('waitingForCode') }} {{ t('contactUs') }}</p>

    <button class="btn-custom" @click="verify">{{ t('sendNewCode') }}</button>

    <Popup
      v-if="successPopup"
      title="✔"
      :text="t('newCodeSent')"
      :button="t('okClose')"
      @close="successPopup = false"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import Popup from '../../common/LoginPopup.vue'
import { useI18n } from '../../../i18n/useI18n'

export default {
  components: { Popup },
  setup() {
    const { t } = useI18n()
    const successPopup = ref(false)

    const verify = () => {
      successPopup.value = true
    }

    return {
      t,
      successPopup,
      verify
    }
  }
}
</script>
