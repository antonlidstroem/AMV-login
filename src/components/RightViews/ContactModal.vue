<template>
  <div class="contact-panel position-relative rounded-4 text-white p-4 border border-white"
  style="background-color: rgba(100,100,100,0.85); width: 95%; max-width: 900px; margin: 0 auto; display: flex; flex-direction: column;">
    <div class="position-relative mb-3">
      <h2 class="text-white text-center m-0">{{ t('contact') }}</h2>
      <IconCloseButton @close="close" style="position: absolute; right: -10px; top: -10px; margin: 0 !important;" />
    </div>
    
    <span class="text-white mb-3">{{ t('contactLoginInfo') }}</span>
    
    <div class="contact-person rounded-3 p-3 mb-3 flex-shrink-0 border border-white" style="background-color: rgba(128,172,47,0.15);">
      <p class="mb-2" style="color:#ffffff !important;"><i class="bi bi-person-fill me-2"></i><strong class="text-white">Emanuel Makhoul</strong></p>
      <p class="mb-2" style="color:#ffffff !important;"><i class="bi bi-envelope me-2"></i>emanuel@arbetsmiljoverktyget.se</p>
      <p class="mb-0" style="color:#ffffff !important;"><i class="bi bi-telephone me-2"></i>+4670 112</p>
    </div>
    
    <span class="text-white mb-2">{{ t('contactOtherInfo') }}</span>
    
    <form @submit.prevent="sendContact" class="d-flex flex-column gap-3 flex-grow-1">
      
      <div class="row g-3">
        <div class="col-12 col-md-6 d-flex flex-column gap-1">
          <label class="form-label mb-0 text-white">{{ t('name') }}</label>
          <div class="position-relative">
            <i class="bi bi-person-vcard position-absolute text-white input-icon-modal"></i>
            <input v-model="name" type="text" class="form-control ps-5 bg-transparent text-white border-white rounded-3" required autocomplete="name" />
          </div>
        </div>

        <div class="col-12 col-md-6 d-flex flex-column gap-1">
          <label class="form-label mb-0 text-white">{{ t('email') }}</label>
          <div class="position-relative">
            <i class="bi bi-envelope position-absolute text-white input-icon-modal"></i>
            <input v-model="email" type="email" class="form-control ps-5 bg-transparent text-white border-white rounded-3" required autocomplete="email" />
          </div>
        </div>
      </div>
      
      <div class="d-flex flex-column gap-1">
        <label class="form-label mb-0 text-white">{{ t('yourMessage') }}</label>
        <div class="position-relative">
          <i class="bi bi-pencil-square position-absolute text-white" style="left:12px; top:12px; font-size:1.2rem; opacity:0.6;"></i>
          <textarea v-model="message" rows="4" class="form-control ps-5 pt-2 bg-transparent text-white border-white rounded-3" required></textarea>
        </div>
      </div>
      
      <button type="submit" class="btn-custom border border-white mt-2">{{ t('sendMessage') }}</button>
      
      <div class="text-center mt-auto pt-3">
        <BaseButton :label="t('closeWindow')" icon="bi bi-x-circle-fill" class="btn-modal mx-auto" @action="close" />
      </div>
    </form>
  </div>
</template>



<script lang="ts">
import { defineComponent, ref, markRaw } from 'vue'
import { useI18n } from '../../i18n/useI18n'
import { apiClient } from '../../services/apiClient'
import BaseButton from '../common/BaseSecondaryButton.vue'
import IconCloseButton from '../common/IconCloseButton.vue'
import AppSuccess from '../common/AppSuccess.vue'

export default defineComponent({
  name: 'ContactPanel',
  components: { BaseButton, IconCloseButton },
  emits: ['close', 'show-popup'],

  setup(_, { emit }) {

    const { t } = useI18n()
    const name = ref(''), email = ref(''), message = ref('')

    const sendContact = async () => {
      // 1. Visa spinner medan vi "skickar"
      emit('show-popup', {
        title: t('sendingMessage'), // t.ex. "Skickar meddelande..."
        loading: true
      })

      try {
        // 2. Anropa mocken
        await apiClient.sendContactMessage({
          name: name.value,
          email: email.value,
          message: message.value
        })

        // 3. Visa succé-bocken när det är klart
        emit('show-popup', {
          title: t('messageSent'),
          loading: false,
          component: markRaw(AppSuccess),
          buttons: [{ 
            label: t('okClose'), 
            action: () => { 
              emit('show-popup', { visible: false }); 
              emit('close'); 
            } 
          }]
        })
      } catch (err) {
        emit('show-popup', {
          title: t('errorTitle'),
          icon: 'bi bi-exclamation-triangle',
          buttons: [{ label: t('okClose'), action: () => emit('show-popup', { visible: false }) }]
        })
      }
    }

    const close = () => emit('close')
    
    return { t, name, email, message, sendContact, close }
  }
})
</script>

<style scoped>
/* Hjälpklass för att centrera ikonerna vertikalt i fälten */
.input-icon-modal {
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  opacity: 0.6;
}

/* Tvingar bort Bootstraps default-marginaler på raden om det behövs */
.row {
  margin-left: 0;
  margin-right: 0;
}
</style>