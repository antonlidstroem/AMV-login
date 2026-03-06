<template>
  <div class="page-wrapper min-vh-100 d-md-flex justify-content-md-center align-items-md-center">
    
    <div v-if="!isLoggedIn" class="main-container d-flex flex-column flex-md-row shadow rounded-5 w-100 overflow-hidden p-0"
         style="max-width:1120px; width:100%;">
      
      <LPage
        class="d-none d-md-flex flex-fill"
        :currentView="currentView"
        @change-view="handleViewChange" 
        @show-password-demands="showDemandsInRPage = !showDemandsInRPage"
        @trigger-error="handleLoginError"
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
              />
            </div>
          </template>
        </RPage>
      </div>
    </div>

    <LoginView v-else @logout="isLoggedIn = false" />

    <ErrPopup 
      v-model:visible="errorState.visible"
      :icon="errorState.icon"
      :message="errorState.message"
      :buttonLabel="errorState.buttonLabel"
      @action="errorState.action"
    />

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import LPage from './components/LPage.vue'
import RPage from './components/RPage.vue'
import type { ViewType } from './types/views'
import LoginView from './views/LoginView.vue' 
import ErrPopup from './components/common/Err-Popup.vue'

export default defineComponent({
  name: 'App',
  components: { LPage, RPage, LoginView, ErrPopup },
  setup() {
    const currentView = ref<ViewType>('login')
    const showDemandsInRPage = ref(false)
    const isLoggedIn = ref(false)

   
    const handleViewChange = (view: ViewType) => {
      // Vi kollar om strängen är 'loginview'
      if (view === 'loginview') {
        isLoggedIn.value = true
      } else {
        currentView.value = view
      }
    }

    const contactTrigger = ref(false);
    const errorState = reactive({
      visible: false,
      icon: '',
      message: '',
      buttonLabel: '',
      action: () => {}
    });

    const handleLoginError = () => {
      errorState.icon = 'bi bi-shield-exclamation';
      errorState.message = 'Inloggningen misslyckades. Kontrollera att du har BankID-appen öppen.';
      errorState.buttonLabel = 'Kontakta support';
      errorState.visible = true;
      
      // Här definierar vi vad som händer när man trycker på knappen
      errorState.action = () => {
        errorState.visible = false;
        contactTrigger.value = true; // Detta triggar ContactModal i RPage
      };
    };


    return {
      currentView,
      showDemandsInRPage,
      isLoggedIn,
      handleViewChange,
      contactTrigger,  
      errorState,      
      handleLoginError
    }
  }
})
</script>