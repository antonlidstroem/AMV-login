<template>
  <div
    class="contact-panel position-relative rounded-4 text-white p-4 border border-white"
    style="background-color: rgba(100, 100, 100, 0.80);
           width: 90%;
           max-width: 900px;
           height: 85%;
           max-height: 90vh;
           margin: auto;
           display: flex;
           flex-direction: column;">
           
    <!-- Stäng-knapp -->
    <button 
      class="btn btn-transparent btn-sm rounded-circle position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center p-0"
      @click="close">
      <i class="bi bi-x-circle text-white fs-4"></i>
    </button>

    <h2 class="text-white mb-4">{{ t('contact') }}</h2>
    <span class="text-white mb-3">{{ t('contactLoginInfo') }}</span>

    <!-- Kontaktinfo -->
    <div class="contact-person rounded-3 p-3 mb-4 flex-shrink-0 border border-white"
         style="background-color: rgba(128, 172, 47, 0.15);">
      <p class="mb-2" style="color: #ffffff !important;">
        <i class="bi bi-person-fill me-2" style="color: #ffffff !important;"></i>
        <strong style="color: #ffffff !important;">Emanuel Makhoul</strong>
      </p>
      <p class="mb-2" style="color: #ffffff !important;">
        <i class="bi bi-envelope me-2" style="color: #ffffff !important;"></i>
        emanuel@arbetsmiljoverktyget.se
      </p>
      <p class="mb-0" style="color: #ffffff !important;">
        <i class="bi bi-telephone me-2" style="color: #ffffff !important;"></i>
        +4670 112
      </p>
    </div>

     <span class="text-white mb-3">{{ t('contactOtherInfo') }}</span>

    <!-- Formulär -->
    <form @submit.prevent="sendContact" class="d-flex flex-column gap-2">

      <!-- Name -->
      <label class="form-label mb-0 text-white">{{ t('name') }}</label>
      <div class="position-relative mb-3">
        <i class="bi bi-person-vcard position-absolute text-white" 
           style="left: 12px; top: 50%; transform: translateY(-50%); font-size: 1.2rem; opacity: 0.6;"></i>
        <input v-model="name" type="text" class="form-control ps-5 bg-transparent text-white border-white rounded-3" required />
      </div>

      <!-- Email -->
      <label class="form-label mb-0 text-white">{{ t('email') }}</label>
      <div class="position-relative mb-3">
        <i class="bi bi-envelope position-absolute text-white" 
           style="left: 12px; top: 50%; transform: translateY(-50%); font-size: 1.2rem; opacity: 0.6;"></i>
        <input v-model="email" type="email" class="form-control ps-5 bg-transparent text-white border-white rounded-3" required />
      </div>

      <!-- Message -->
      <div class="position-relative mb-3">
        <i class="bi bi-pencil-square position-absolute text-white" 
           style="left: 12px; top: 12px; font-size: 1.2rem; opacity: 0.6;"></i>
        <textarea v-model="message" rows="4" :placeholder="t('yourMessage')" class="form-control ps-5 pt-2 bg-transparent text-white border-white rounded-3" required></textarea>
      </div>

      <!-- Skicka-knapp -->
      <button type="submit" class="btn-custom border border-white mb-3">{{ t('sendMessage') }}</button>

      <!-- Stäng-knapp -->
      <div class="btn-wrapper">
        <button type="button" class="btn-secondary-custom mb-3" @click="close">
          <i class="bi bi-x-circle-fill text-white fs-5"></i>
          {{ t('closeWindow') }}
        </button>
      </div>
    </form>

    <!-- Popup som visas när meddelandet skickats -->
    <SentMessagePopup v-if="showPopup" @close="closeFromPopup" />

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from '../../i18n/useI18n'
import SentMessagePopup from '../common/SentMessagePopup.vue'

export default defineComponent({
  name: 'ContactPanel',
  components: { SentMessagePopup },
  emits: ['close'],
  setup(_, { emit }) {
    const { t } = useI18n()

    // Reaktiva fält
    const name = ref<string>('')
    const email = ref<string>('')
    const message = ref<string>('')
    const showPopup = ref<boolean>(false)

    // Skicka formulär
    const sendContact = (): void => {
      // Rensa fälten
      name.value = ''
      email.value = ''
      message.value = ''

      // Visa popup
      showPopup.value = true
    }

    // Stäng panelen
    const close = (): void => {
      emit('close')
    }

    // Stäng popup + panel
    const closeFromPopup = (): void => {
      showPopup.value = false
      emit('close')
    }

    return {
      t,
      name,
      email,
      message,
      showPopup,
      sendContact,
      close,
      closeFromPopup
    }
  }
})
</script>