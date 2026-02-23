<template>
  <div class="right-page text-white d-flex flex-column justify-content-start"
       :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}">


    <!-- Knapprad överst -->
<div class="top-controls d-flex gap-2 p-3 w-100">
  
  <div class="d-none d-md-flex">
  <button @click="toggleContact" class="btn-secondary-custom">
    <i class="bi bi-at text-white fs-5"></i>{{ t('contact') }}
  </button>
  <button @click="toggleHelp" class="btn-secondary-custom">
    <i class="bi bi-question-circle text-white"></i>{{ t('help') }}
  </button>
</div>
  <!-- Mobil dropdown för Kontakt/Hjälp -->
  <div class="action-dropdown position-relative d-md-none" style="gap: 0.5rem; ">
    <button @click="toggleActionMenu" class="btn-secondary-custom">
      ☰
    </button>
    <div class="language-dropdown" :class="{ show: showActionMenu }">
      <button @click="handleMobileContact">Kontakt</button>
      <button @click="handleMobileHelp">Hjälp</button>
    </div>
  </div>

   <!-- Språkknapp -->
  <div class="language-selector position-relative">
    <!-- v-for i template -->
    <button v-for="(name, code) in languageNames" 
            :key="code"
            @click="selectLanguage(code as Lang)"
            :class="{ active: state.currentLang === code }"
            class="btn-custom border border-white d-flex align-items-center gap-2">
      <span :class="[flagClasses[code as Lang], 'flag-icon']"></span>
      {{ name }}
    </button>
     <!-- dropdown -->
    <div class="language-dropdown" :class="{ show: showLanguageMenu }">
      <button v-for="(name, code) in languageNames" 
              :key="code" 
              @click="selectLanguage(code)"
              :class="{ active: state.currentLang === code }"
              class="d-flex align-items-center gap-2">
              <span :class="[flagClasses[code], 'flag-icon']"></span>
        {{ name }}
      </button>
    </div>
  </div>
</div>



<!-- Mobil: LPage inuti RPage -->
<div v-show="!isOverlayVisible" class="mobile-left-page">
  <slot name="mobile-left"></slot>
</div>


    <!-- Modals -->
    <!-- <ContactModal v-if="showContact" @close="showContact = false" /> -->
     <ContactModal v-if="showContact" @close="handleContactClose" />
    <HelpModal v-if="showHelp" @close="showHelp = false" />
  </div>
</template>
<script lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from '../i18n/useI18n'
import type { Lang } from '../i18n/useI18n'
import ContactModal from './RightViews/ContactModal.vue'
import HelpModal from './RightViews/HelpModal.vue'
import bgImage from '../assets/RPageCard.jpg'

export default {
  components: { ContactModal, HelpModal },
  setup() {
    const { state, changeLang, languageNames, t } = useI18n()

    type LangCode = keyof typeof languageNames
    const flagClasses: Record<LangCode, string> = {
      sv: 'fi fi-se',
      en: 'fi fi-gb',
      fi: 'fi fi-fi',
      no: 'fi fi-no'
    }

    const showContact: Ref<boolean> = ref(false)
    const showHelp: Ref<boolean> = ref(false)
    const showLanguageMenu: Ref<boolean> = ref(false)
    const showActionMenu: Ref<boolean> = ref(false)

    const toggleContact = () => {
      showContact.value = !showContact.value
      if (showContact.value) showHelp.value = false
      showLanguageMenu.value = false
    }

    const toggleHelp = () => {
      showHelp.value = !showHelp.value
      if (showHelp.value) showContact.value = false
      showLanguageMenu.value = false
    }

    const toggleLanguage = () => {
      showLanguageMenu.value = !showLanguageMenu.value
    }

    const toggleActionMenu = () => {
      showActionMenu.value = !showActionMenu.value
    }

    const selectLanguage = (langCode: LangCode) => {
      changeLang(langCode)
      showLanguageMenu.value = false
    }

    const handleMobileContact = () => {
      showActionMenu.value = false
      toggleContact()
    }

    const handleMobileHelp = () => {
      showActionMenu.value = false
      toggleHelp()
    }

    const handleContactClose = () => {
      showContact.value = false
    }

    const isOverlayVisible = computed<boolean>(() => {
      return showContact.value || showHelp.value || showLanguageMenu.value
    })

    return {
      state,
      languageNames,
      t,
      showContact,
      showHelp,
      showLanguageMenu,
      showActionMenu,
      toggleContact,
      toggleHelp,
      toggleLanguage,
      toggleActionMenu,
      selectLanguage,
      bgImage,
      isOverlayVisible,
      handleMobileContact,
      handleMobileHelp,
      flagClasses,
      handleContactClose
    }
  }
}
</script>
