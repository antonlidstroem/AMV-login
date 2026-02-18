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
    <button @click="toggleLanguage" class="btn-secondary-custom d-flex align-items-center gap-2" 
        style="min-width: 150px;">
      <span :class="`${flagClasses[state.currentLang]} flag-icon`"></span>
      {{ languageNames[state.currentLang] }}
        <span class="dropdown-arrow text-white">▼</span>
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
    <ContactModal v-if="showContact" @close="showContact = false" />
    <HelpModal v-if="showHelp" @close="showHelp = false" />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from '../i18n/useI18n'
import ContactModal from './RightViews/ContactModal.vue'
import HelpModal from './RightViews/HelpModal.vue'
import bgImage from '../assets/RPageCard.jpg'

export default {
  components: { ContactModal, HelpModal },
  setup() {
    const { state, changeLang, languageNames, t } = useI18n()

    const flagClasses = {
  sv: 'fi fi-se',
  en: 'fi fi-gb',
  fi: 'fi fi-fi',
  no: 'fi fi-no'
}


    const showContact = ref(false)
    const showHelp = ref(false)
    const showLanguageMenu = ref(false)

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


    const selectLanguage = (langCode) => {
      changeLang(langCode)
      showLanguageMenu.value = false
    }

const toggleActionMenu = () => {
  showActionMenu.value = !showActionMenu.value
}


    const handleMobileContact = () => {
  showActionMenu.value = false
  toggleContact()
}

const handleMobileHelp = () => {
  showActionMenu.value = false
  toggleHelp()
}

    // computed property som kollar om någon overlay/modals är öppen
    const isOverlayVisible = computed(() => {
      return showContact.value || showHelp.value || showLanguageMenu.value
    })

    const showActionMenu = ref(false)

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
      flagClasses
    }
  }
}
</script>
