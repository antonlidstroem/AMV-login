<template>
  <div
    class="right-page text-white d-flex flex-column justify-content-start w-100"
    :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}"
  >

    <div class="top-controls d-flex justify-content-center align-items-center gap-2 p-3 w-100">
      <div class="d-none d-md-flex">
        <button @click="toggleContact" class="btn-secondary-custom flex-grow-1 me-2">
          <i class="bi bi-at text-white fs-5"></i>{{ t('contact') }}
        </button>
        <button @click="toggleHelp" class="btn-secondary-custom flex-grow-1 mx-2">
          <i class="bi bi-question-circle text-white"></i>{{ t('help') }}
        </button>
      </div>

      <div class="action-dropdown position-relative d-md-none flex-grow-1 ms-2" style="gap: 0.5rem;">
        <button @click="toggleActionMenu" class="btn-secondary-custom btn-transparent"><i class="bi bi-list fs-1"></i></button>
        <div class="dropdown-menu-custom" :class="{ show: showActionMenu }">
          <button @click="handleMobileContact"><i class="bi bi-at"></i>{{ t('contact') }}</button>
          <button @click="handleMobileHelp"><i class="bi bi-question-circle"></i>{{ t('help') }}</button>
        </div>
      </div>

      <div class="language-selector position-relative">
  
        <button @click="toggleLanguage" class="btn-secondary-custom d-flex align-items-center gap-2 w-100">
          <span :class="[flagClasses[state.currentLang], 'd-inline-block']" style="width:24px;height:16px;"></span>
          <span class="d-none d-md-inline">{{ languageNames[state.currentLang] }}</span>
          <span class="d-md-none">{{ shortLanguageNames[state.currentLang] }}</span>
        </button>

        <div class="dropdown-menu-custom w-100" :class="{ show: showLanguageMenu }">
          <button v-for="(name, code) in languageNames" :key="code" @click="selectLanguage(code as Lang)" :class="{ active: state.currentLang === code }" class="w-100">
            <span :class="[flagClasses[code as Lang], 'd-inline-block']" style="width:24px;height:16px;"></span>
            <span class="d-none d-md-inline">{{ name }}</span>
            <span class="d-md-none">{{ shortLanguageNames[code] }}</span>
          </button>
        </div>
      </div>
    </div>

    <div v-show="!isOverlayVisible" class="mobile-left-page">
      <slot name="mobile-left"></slot>
    </div>

    <ContactModal v-if="showContact" @close="handleContactClose" />
    <HelpModal v-if="showHelp" @close="showHelp = false" />

    <PasswordDemands
      v-if="showPasswordDemands"
      @close="handleClosePasswordDemands"
    />

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useI18n } from '../i18n/useI18n'
import type { Lang } from '../i18n/useI18n'
import ContactModal from './RightViews/ContactModal.vue'
import HelpModal from './RightViews/HelpModal.vue'
import PasswordDemands from './RightViews/PasswordDemands/PasswordDemands.vue'
import bgImage from '../assets/RPageCard.jpg'

export default defineComponent({
  name: 'RPage',
  components: { ContactModal, HelpModal, PasswordDemands },
  props: { 
    currentView: { type: String, required: true },
    externalShowDemands: { type: Boolean, default: false }
  },
  emits: ['change-view', 'close-demands'],
  setup(props, { emit }) {
    const { state, changeLang, languageNames, t } = useI18n()

    const flagClasses: Record<string, string> = {
      sv: 'fi fi-se',
      en: 'fi fi-gb',
      fi: 'fi fi-fi',
      no: 'fi fi-no'
    }

    const shortLanguageNames: Record<string, string> = {
      sv: 'SE',
      en: 'GB',
      fi: 'FI',
      no: 'NO'
    };

    const showContact = ref(false)
    const showHelp = ref(false)
    const showLanguageMenu = ref(false)
    const showActionMenu = ref(false)
    const showPasswordDemands = ref(false)

    // Lyssna på prop från App.vue (länken i ResetPasswordNew)
    watch(() => props.externalShowDemands, (newVal) => {
      showPasswordDemands.value = newVal
      // Om PasswordDemands öppnas, stäng de andra
      if (newVal) {
        showContact.value = false
        showHelp.value = false
      }
    })

    const toggleContact = () => { 
      showContact.value = !showContact.value
      if(showContact.value) {
        // Stäng alla andra
        showHelp.value = false
        showPasswordDemands.value = false
        emit('close-demands') // Synka App.vue state
      }
      showLanguageMenu.value = false 
    }
    
    const toggleHelp = () => { 
      showHelp.value = !showHelp.value
      if(showHelp.value) {
        // Stäng alla andra
        showContact.value = false
        showPasswordDemands.value = false
        emit('close-demands') // Synka App.vue state
      }
      showLanguageMenu.value = false 
    }
    
    const toggleLanguage = () => { showLanguageMenu.value = !showLanguageMenu.value }
    const toggleActionMenu = () => { showActionMenu.value = !showActionMenu.value }
    const selectLanguage = (langCode: string) => { changeLang(langCode as Lang); showLanguageMenu.value = false }

    const handleMobileContact = () => { showActionMenu.value = false; toggleContact() }
    const handleMobileHelp = () => { showActionMenu.value = false; toggleHelp() }
    const handleContactClose = () => { showContact.value = false }

    const handleShowPasswordDemands = () => { 
      showPasswordDemands.value = true
      showContact.value = false
      showHelp.value = false
    }
    
    const handleClosePasswordDemands = () => {
      showPasswordDemands.value = false
      emit('close-demands') 
    }

    const isOverlayVisible = computed(() => 
      showContact.value || showHelp.value || showLanguageMenu.value || showPasswordDemands.value
    )

    return {
      state, languageNames, t, flagClasses,
      showContact, showHelp, showLanguageMenu, showActionMenu,
      toggleContact, toggleHelp, toggleLanguage, toggleActionMenu,
      selectLanguage, bgImage, isOverlayVisible,
      handleMobileContact, handleMobileHelp, handleContactClose,
      showPasswordDemands, handleShowPasswordDemands, handleClosePasswordDemands, shortLanguageNames
    }
  }
})
</script>