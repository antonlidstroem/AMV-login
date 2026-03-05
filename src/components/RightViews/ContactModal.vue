<template>
  <div
    class="contact-panel position-relative rounded-4 text-white p-4 border border-white"
    style="background-color: rgba(100, 100, 100, 0.80); width: 90%; max-width: 900px; height: 85%; max-height: 90vh; margin: auto; display: flex; flex-direction: column;">
            
   

    <IconCloseButton @close="close" />

    <h2 class="text-white text-center mt-4 mb-4">{{ t('contact') }}</h2>
    <span class="text-white mb-3">{{ t('contactLoginInfo') }}</span>

    <div class="contact-person rounded-3 p-3 mb-4 flex-shrink-0 border border-white"
         style="background-color: rgba(128, 172, 47, 0.15);">
      <p class="mb-2" style="color: #ffffff !important;">
        <i class="bi bi-person-fill me-2"></i>
        <strong class="text-white">Emanuel Makhoul</strong>
      </p>
      <p class="mb-2" style="color: #ffffff !important;">
        <i class="bi bi-envelope me-2"></i>
        emanuel@arbetsmiljoverktyget.se
      </p>
      <p class="mb-0" style="color: #ffffff !important;">
        <i class="bi bi-telephone me-2"></i>
        +4670 112
      </p>
    </div>

     <span class="text-white mb-3">{{ t('contactOtherInfo') }}</span>

    <form @submit.prevent="sendContact" class="d-flex flex-column gap-2">
      <label class="form-label mb-0 text-white">{{ t('name') }}</label>
      <div class="position-relative mb-2">
        <i class="bi bi-person-vcard position-absolute text-white" 
           style="left: 12px; top: 50%; transform: translateY(-50%); font-size: 1.2rem; opacity: 0.6;"></i>
        <input v-model="name" type="text" class="form-control ps-5 bg-transparent text-white border-white rounded-3" required />
      </div>

      <label class="form-label mb-0 text-white">{{ t('email') }}</label>
      <div class="position-relative mb-2">
        <i class="bi bi-envelope position-absolute text-white" 
           style="left: 12px; top: 50%; transform: translateY(-50%); font-size: 1.2rem; opacity: 0.6;"></i>
        <input v-model="email" type="email" class="form-control ps-5 bg-transparent text-white border-white rounded-3" required />
      </div>

      <div class="position-relative mb-2">
        <i class="bi bi-pencil-square position-absolute text-white" 
           style="left: 12px; top: 12px; font-size: 1.2rem; opacity: 0.6;"></i>
        <textarea v-model="message" rows="4" :placeholder="t('yourMessage')" class="form-control ps-5 pt-2 bg-transparent text-white border-white rounded-3" required></textarea>
      </div>

      <button type="submit" class="btn-custom border border-white mb-2">{{ t('sendMessage') }}</button>

      <div class="text-center mt-auto ">
      <CloseButton @close="$emit('close')" />
    </div>

    


    </form>

      <BaseButton 
          :label="t('closeWindow')" 
          icon="bi bi-x-circle-fill" 
          class="btn-modal mx-auto"
          @action="close" 
        />

    <GenericPopup 
      v-model:visible="showPopup"
      :title="t('messageSent')" 
      :buttons="popupButtons"
    >
        <template #icon><i class="bi bi-check-circle"></i></template>
    </GenericPopup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from '../../i18n/useI18n'
import GenericPopup from '../common/GenericPopup.vue'
import BaseButton from '../common/BaseSecondaryButton.vue'
import IconCloseButton from '../common/IconCloseButton.vue'

export default defineComponent({
  name: 'ContactPanel',
  components: { GenericPopup, BaseButton, IconCloseButton },
  emits: ['close'],
  setup(_, { emit }) {
    const { t } = useI18n()

    const name = ref<string>('')
    const email = ref<string>('')
    const message = ref<string>('')
    const showPopup = ref<boolean>(false)

    const sendContact = (): void => {
      // Här kan du lägga till själva API-anropet sen!
      name.value = ''
      email.value = ''
      message.value = ''
      showPopup.value = true
    }

    const close = (): void => {
      emit('close')
    }

    const closeFromPopup = (): void => {
      showPopup.value = false
      emit('close') // Stänger även panelen när man trycker OK i popupen
    }

    const popupButtons = [
  { label: t('okClose'), action: closeFromPopup }
]

    return {
      t,
      name,
      email,
      message,
      showPopup,
      sendContact,
      close,
      closeFromPopup,
      popupButtons
    }
  }
})
</script>