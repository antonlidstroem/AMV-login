<template>
  <div class="contact-panel position-relative rounded-4 text-white p-5 border border-white"
       style="background-color: rgba(100,100,100,0.80); width: 90%; max-width: 900px; margin: 0 auto; display: flex; flex-direction: column;">

    <div class="position-relative mb-3">
      <h2 class="text-white text-center m-0">{{ t('contact') }}</h2>
      <AppIconButtonClose @click="ui.closeOverlays()" style="position: absolute; right: -10px; top: -10px; margin: 0 !important;" />
    </div>

    <div class="flex-grow-1 mt-4 px-4">
      <p class="text-white mb-4">{{ t('contactUsDescription') }}</p>
      
      <form @submit.prevent="sendContact" class="d-flex flex-column gap-3">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label text-white">{{ t('name') }}</label>
            <input 
              v-model="name" 
              type="text" 
              class="form-control bg-transparent text-white border-white auth-input" 
              :placeholder="t('enterYourName')"
              required 
            />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label text-white">{{ t('email') }}</label>
            <input 
              v-model="email" 
              type="email" 
              class="form-control bg-transparent text-white border-white auth-input" 
              :placeholder="t('enterYourEmail')"
              required 
            />
          </div>
        </div>
        
        <div class="mb-3">
          <label class="form-label text-white">{{ t('message') }}</label>
          <textarea 
            v-model="message" 
            class="form-control bg-transparent text-white border-white auth-input" 
            rows="6" 
            :placeholder="t('enterYourMessage')"
            required
          ></textarea>
        </div>

        <div class="d-flex justify-content-center align-items-center gap-3 mt-4">
          <SecondaryButton 
            :label="t('sendMessage')" 
            icon="bi bi-send" 
            class="btn-modal" 
            type="submit" 
          />
          <SecondaryButton 
            :label="t('closeWindow')" 
            icon="bi bi-x-circle-fill" 
            class="btn-modal" 
            @action="ui.closeOverlays()" 
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, markRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePopupStore } from '../../modules/stores/popup'
import { useUIStore } from '../../modules/stores/ui'
import { apiClient } from '../../modules/services/api-client'
import SecondaryButton from '../common/AppButtonSecondary.vue'
import AppIconButtonClose from '../common/AppIconButtonClose.vue'
import AppSuccess from '../common/AppSuccess.vue'

export default defineComponent({
  name: 'ContactPanel',
  components: { SecondaryButton, AppIconButtonClose },
  
  // Inga emits deklarerade
  
  setup() {
    const { t } = useI18n()
    const popup = usePopupStore()
    const ui = useUIStore() // Initiera storen för att stänga panelen

    // Formulär-state
    const name = ref('')
    const email = ref('')
    const message = ref('')

    // Funktion för att skicka meddelandet
    const sendContact = async () => {
      // Visa loading-popup
      popup.show({ title: t('sendingMessage'), loading: true })

      try {
        // Skicka till API
        await apiClient.sendContactMessage({
          name: name.value,
          email: email.value,
          message: message.value
        })

        // Visa success-popup
        popup.show({
          title: t('messageSent'),
          loading: false,
          component: markRaw(AppSuccess),
          buttons: [{ 
            label: t('okClose'), 
            action: () => { 
              popup.hide()
              // Stäng panelen via storen
              ui.closeOverlays() 
            } 
          }]
        })
      } catch (err) {
        // Visa fel-popup
        popup.show({
          title: t('errorTitle'),
          icon: 'bi bi-exclamation-triangle',
          buttons: [{ label: t('okClose'), action: () => popup.hide() }]
        })
      }
    }

    return { 
      t, 
      name, 
      email, 
      message, 
      sendContact, 
      ui // Returnera storen så den kan användas i templaten
    }
  }
})
</script>

<style scoped>
/* Säkerställ minsta höjd för panelen */
.contact-panel {
  min-height: 550px;
}

/* Styling för input-fälten */
.auth-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.auth-input:focus {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: white;
  border-color: white;
  box-shadow: none;
}
</style>