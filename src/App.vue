<template>
  <div class="page-wrapper min-vh-100 d-md-flex justify-content-md-center align-items-md-center">

    <div
      v-if="!auth.isLoggedIn"
      class="main-container d-flex flex-column flex-md-row shadow rounded-5 w-100 p-0"
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
            <div class="d-flex d-md-none w-100 justify-content-center align-items-start py-3 px-2">
              <LPage
                class="w-100"
                style="max-width: 460px; width: 100%;"
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

    <LoginView v-else @logout="handleLogout" />

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
      <template #icon>
        <transition name="popup-media" mode="out-in">
          <AppSpinner v-if="popupState.loading" color="white" key="spinner" />
          <component 
            v-else-if="popupState.component" 
            :is="popupState.component" 
            color="white" 
            :key="popupState.component ? popupState.component.__name || popupState.component.name : 'none'"
          />
          <i v-else-if="popupState.icon" :class="popupState.icon" key="icon"></i>
        </transition>
      </template>
    </GenericPopup>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useAuthStore } from './stores/auth'
import LPage from './components/LPage.vue'
import RPage from './components/RPage.vue'
import LoginView from './views/LoginView.vue'
import ErrPopup from './components/common/Err-Popup.vue'
import GenericPopup from './components/common/GenericPopup.vue'
import AppSpinner from './components/common/AppSpinner.vue'
import AppSuccess from './components/common/AppSuccess.vue'
import type { ViewType } from './types/views'

export default defineComponent({
  name: 'App',
  components: { LPage, RPage, LoginView, ErrPopup, GenericPopup, AppSpinner, AppSuccess },

  setup() {
    const auth = useAuthStore()

    const currentView = ref<ViewType>('login')
    const showDemandsInRPage = ref(false)
    const contactTrigger = ref(false)

    const popupState = reactive({
      visible: false,
      title: '',
      loading: false,
      component: null as any, 
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

    const handleViewChange = (view: ViewType) => {
      if (view === 'loginview') {
        auth.login({ username: 'inloggad' })
      } else {
        currentView.value = view
      }
    }

    const handleLogout = () => {
      auth.logout()
      currentView.value = 'login'
    }

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
      handleLoginError,
      AppSpinner
      
    }
  }
})
</script>
