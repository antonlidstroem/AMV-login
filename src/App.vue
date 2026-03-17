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
            key="dynamic-content"
          />
          
          <i v-else-if="popupState.icon" :class="popupState.icon" key="icon"></i>
        </transition>
      </template>
    </AppPopupGeneric>

  </div>
</template>

<script lang="ts">
// FIX: Använd 'type' för Component-importen för att tillfredsställa verbatimModuleSyntax
import { defineComponent, reactive, type Component as VueComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './modules/stores/auth'

// Komponenter för popups
import AppPopupError from './components/common/AppPopupError.vue'
import AppPopupGeneric from './components/common/AppPopupGeneric.vue'
import AppSpinner from './components/common/AppSpinner.vue'
import AppSuccess from './components/common/AppSuccess.vue'

// Typer för bättre kodstöd
interface PopupState {
  visible: boolean;
  title: string;
  loading: boolean;
  component: VueComponent | null;
  icon: string;
  buttons: any[];
}

interface ErrorState {
  visible: boolean;
  icon: string;
  message: string;
  buttonLabel: string;
  action: () => void;
}

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

    // Globalt state för vanliga popups
    const popupState = reactive<PopupState>({
      visible: false,
      title: '',
      loading: false,
      component: null,
      icon: '',
      buttons: []
    })

    // Globalt state för felmeddelanden
    const errorState = reactive<ErrorState>({
      visible: false,
      icon: '',
      message: '',
      buttonLabel: '',
      action: () => {}
    })

    const handleLogout = () => {
      auth.logout()
      router.push('/')
    }

    const handleShowPopup = (config: Partial<PopupState & { duration?: number }>) => {
      popupState.title = config.title ?? ''
      popupState.loading = config.loading ?? false
      popupState.component = config.component ?? null
      popupState.icon = config.icon ?? ''
      popupState.buttons = config.buttons ?? []
      popupState.visible = config.visible !== undefined ? config.visible : true

      if (config.duration) {
        setTimeout(() => { 
          popupState.visible = false 
        }, config.duration)
      }
    }

    const handleLoginError = (payload?: any) => {
      errorState.icon = 'bi bi-shield-exclamation'
      errorState.message = 'Inloggningen misslyckades. Kontrollera att du har BankID-appen öppen.'
      errorState.buttonLabel = 'Kontakta support'
      errorState.visible = true
      errorState.action = () => {
        errorState.visible = false
        if (payload?.triggerContact) {
           // Logik för kontakt-overlay kan läggas här
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
/* Transition för sidbyten */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Transition för ikoner/spinners inuti popupen */
.popup-media-enter-active,
.popup-media-leave-active {
  transition: all 0.3s ease;
}

.popup-media-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.popup-media-leave-to {
  opacity: 0;
  transform: scale(1.2);
}

/* Bas-styling för att säkerställa att wrapper tar hela höjden */
.page-wrapper {
  background-color: #f8f9fa;
  overflow-x: hidden;
}
</style>