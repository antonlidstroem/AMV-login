<template>
<div class="bg-views p-4 rounded-4 mb-3">
    <h4>{{ t('noCodeReceived') }}</h4>
    <p>{{ t('waitingForCode') }} {{ t('contactUs') }}</p>

    <button class="btn-custom" @click="verify">{{ t('sendNewCode') }}</button>

    <!-- <Popup
      v-if="successPopup"
      title="✔"
      :text="t('newCodeSent')"
      :button="t('okClose')"
      @close="successPopup = false"
    /> -->

    <GenericPopup 
      v-model:visible="showPopup"
      :title="t('newCodeSent')" 
      :buttons="[ { label: t('okClose'), action: closePopup } ]"
    >
        <template #icon><i class="bi bi-check-circle fs-1"></i></template>

    </GenericPopup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GenericPopup from '../../common/GenericPopup.vue'
import { useI18n } from '../../../i18n/useI18n'

export default defineComponent({
  name: 'ResendCode',
  components: {GenericPopup},
  setup(){
    const { t } = useI18n()

    const showPopup = ref(false)

    const closePopup = () => { showPopup.value = false }

    const verify = (): void => {
      showPopup.value = true
    }

    return {
      t,
      showPopup,
      closePopup,
      verify,
    }
  }
 })
 </script>


