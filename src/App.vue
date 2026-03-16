<template>
  <div class="page-wrapper min-vh-100 d-md-flex justify-content-md-center align-items-md-center">
    
    <router-view 
      v-slot="{ Component }"
      @show-popup="handleShowPopup"
      @trigger-error="handleLoginError"
      @logout="handleLogout"
    >
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <AppPopupError
      v-model:visible="errorState.visible"
      :icon="errorState.icon"
      :message="errorState.message"
      :buttonLabel="errorState.buttonLabel"
      @action="errorState.action"
    />

    <AppPopupGeneric
      v-model:visible="popupState.visible"
      :title="popupState.title"
      :loading="popupState.loading"
      :buttons="popupState.buttons"
    >
      <template #icon>
        <transition name="popup-media" mode="out-in">
          <AppSpinner v-if="popupState.loading" color="white" key="spinner" />
          <component 
            v-else-if="popupState.component" 
            :is="popupState.component" 
            color="white" 
            :key="popupState.component.__name || 'comp'"
          />
          <i v-else-if="popupState.icon" :class="popupState.icon" key="icon"></i>
        </transition>
      </template>
    </AppPopupGeneric>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './modules/stores/auth'

// Komponenter för popups
import AppPopupError from './components/common/AppPopupError.vue'
import AppPopupGeneric from './components/common/AppPopupGeneric.vue'
import AppSpinner from './components/common/AppSpinner.vue'
import AppSuccess from './components/common/AppSuccess.vue'

export default defineComponent({
  name: 'App',
  components: { 
    AppPopupError, 
    AppPopupGeneric, 
    AppSpinner, 
    AppSuccess 
  },

  setup() {
    const auth = useAuthStore()
    const router = useRouter()

    // Globalt state för vanliga popups (t.ex. "Skickar...")
    const popupState = reactive({
      visible: false,
      title: '',
      loading: false,
      component: null as any,
      icon: '',
      buttons: [] as any[]
    })

    // Globalt state för felmeddelanden (t.ex. BankID-strul)
    const errorState = reactive({
      visible: false,
      icon: '',
      message: '',
      buttonLabel: '',
      action: () => {}
    })

    // Hanterar logga ut och skickar användaren till start
    const handleLogout = () => {
      auth.logout()
      router.push('/')
    }

    // Öppnar den generiska popupen (anropas via emit från vyer)
    const handleShowPopup = (config: any) => {
      popupState.title = config.title ?? ''
      popupState.loading = config.loading ?? false
      popupState.component = config.component ?? null
      popupState.icon = config.icon ?? ''
      popupState.buttons = config.buttons ?? []
      popupState.visible = config.visible !== undefined ? config.visible : true

      if (config.duration) {
        setTimeout(() => { popupState.visible = false }, config.duration)
      }
    }

    // Visar felmeddelandet (t.ex. om BankID misslyckas)
    const handleLoginError = (payload?: any) => {
      errorState.icon = 'bi bi-shield-exclamation'
      errorState.message = 'Inloggningen misslyckades. Kontrollera att du har BankID-appen öppen.'
      errorState.buttonLabel = 'Kontakta support'
      errorState.visible = true
      errorState.action = () => {
        errorState.visible = false
        // Om vi vill trigga något i vyn (t.ex. öppna kontakt-overlay)
        if (payload?.triggerContact) {
            // Här kan vi lägga logik om det behövs
        }
      }
    }

    return {
      auth,
      popupState,
      errorState,
      handleLogout,
      handleShowPopup,
      handleLoginError
    }
  }
})
</script>

<style>
/* Enkel transition för sidbyten */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>