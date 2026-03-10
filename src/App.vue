<template>
  <div class="page-wrapper min-vh-100 d-md-flex justify-content-md-center align-items-md-center">

    <div
      v-if="!auth.isLoggedIn"
      class="main-container d-flex flex-column flex-md-row shadow rounded-5 w-100 overflow-hidden p-0"
      style="max-width:1120px; width:100%;"
    >
      <LPage
        class="d-none d-md-flex flex-fill"
        :currentView="currentView"
        @change-view="handleViewChange"
        @show-password-demands="showDemandsInRPage = !showDemandsInRPage"
        @trigger-error="handleLoginError"
        @show-popup="handleShowPopup"
      />

      <div class="col-12 col-md-6 d-flex p-0">
        <RPage
          class="flex-fill d-flex flex-column"
          :currentView="currentView"
          :externalShowDemands="showDemandsInRPage"
          :force-open-contact="contactTrigger"
          @change-view="handleViewChange"
          @contact-opened="contactTrigger = false"
          @close-demands="showDemandsInRPage = false"
          @show-popup="handleShowPopup"
        >
          <template #mobile-left>
            <div class="d-block d-md-none w-100 d-flex justify-content-center align-items-start py-3 px-2">
              <LPage
                class="w-100 h-100"
                style="max-width: 460px; max-height: 90vh; border-radius: 20px; overflow: hidden;"
                :currentView="currentView"
                @change-view="handleViewChange"
                @trigger-error="handleLoginError"
                @show-password-demands="showDemandsInRPage = !showDemandsInRPage"
                @show-popup="handleShowPopup"
              />
            </div>
          </template>
        </RPage>
      </div>
    </div>

    <!-- Visas aldrig direkt – router hanterar /dashboard -->
    <router-view v-else @logout="handleLogout" />

    <ErrPopup
      v-model:visible="errorState.visible"
      :icon="errorState.icon"
      :message="errorState.message"
      :buttonLabel="errorState.buttonLabel"
      @action="errorState.action"
    />

    <GenericPopup
      v-model:visible="popupState.visible"
      :title="popupState.title"
      :loading="popupState.loading"
      :buttons="popupState.buttons"
    >
      <template #icon v-if="popupState.icon">
        <i :class="popupState.icon"></i>
      </template>
    </GenericPopup>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import LPage from './components/LPage.vue'
import RPage from './components/RPage.vue'
import ErrPopup from './components/common/Err-Popup.vue'
import GenericPopup from './components/common/GenericPopup.vue'
import type { ViewType } from './types/views'

export default defineComponent({
  name: 'App',
  components: { LPage, RPage, ErrPopup, GenericPopup },

  setup() {
    const router = useRouter()
    const auth = useAuthStore()

    const currentView = ref<ViewType>('login')
    const showDemandsInRPage = ref(false)
    const contactTrigger = ref(false)

    // ── Popup-state ──────────────────────────────────────────────────────────
    const popupState = reactive({
      visible: false,
      title: '',
      loading: false,
      icon: '',
      buttons: [] as any[]
    })

    const errorState = reactive({
      visible: false,
      icon: '',
      message: '',
      buttonLabel: '',
      action: () => {}
    })

    // ── Handlers ─────────────────────────────────────────────────────────────

    /**
     * ENDA platsen i appen som bestämmer vad som händer vid vybyte.
     * 'loginview' = lyckad inloggning → sätt auth-state och navigera till /dashboard.
     */
    const handleViewChange = (view: ViewType) => {
      if (view === 'loginview') {
        // Sätt inloggad (user kan utökas med verklig data från API-svaret)
        auth.login({ username: 'inloggad' })
        router.push('/dashboard')
      } else {
        currentView.value = view
      }
    }

    const handleLogout = () => {
      auth.logout()
      currentView.value = 'login'
      router.push('/')
    }

    const handleShowPopup = (config: any) => {
      popupState.title = config.title ?? ''
      popupState.loading = config.loading ?? false
      popupState.icon = config.icon ?? ''
      popupState.buttons = config.buttons ?? []
      popupState.visible = config.visible !== undefined ? config.visible : true

      if (config.duration) {
        setTimeout(() => { popupState.visible = false }, config.duration)
      }
    }

    const handleLoginError = () => {
      errorState.icon = 'bi bi-shield-exclamation'
      errorState.message = 'Inloggningen misslyckades. Kontrollera att du har BankID-appen öppen.'
      errorState.buttonLabel = 'Kontakta support'
      errorState.visible = true
      errorState.action = () => {
        errorState.visible = false
        contactTrigger.value = true
      }
    }

    return {
      auth,
      currentView,
      showDemandsInRPage,
      contactTrigger,
      popupState,
      errorState,
      handleViewChange,
      handleLogout,
      handleShowPopup,
      handleLoginError
    }
  }
})
</script>
