<template>
  <div class="right-page text-white d-flex flex-column justify-content-start"
       :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}">

    <!-- Knapprad överst -->
<div class="d-flex gap-2 p-3 justify-content-center w-100">
  <button @click="toggleContact" class="btn-secondary-custom">
    <i class="bi bi-at text-white fs-5"></i>{{ t('contact') }}
  </button>
  <button @click="toggleHelp" class="btn-secondary-custom">
    <i class="bi bi-question-circle text-white fs-5"></i>{{ t('help') }}
  </button>

  <div class="language-selector position-relative">
    <button @click="toggleLanguage" class="btn-secondary-custom">
      {{ languageNames[state.currentLang] }}
    </button>

    <div class="language-dropdown" :class="{ show: showLanguageMenu }">
      <button v-for="(name, code) in languageNames" 
              :key="code" 
              @click="selectLanguage(code)"
              :class="{ active: state.currentLang === code }">
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
      showContact.value = false
      showHelp.value = false
    }

    const selectLanguage = (langCode) => {
      changeLang(langCode)
      showLanguageMenu.value = false
    }

    // ✅ computed property som kollar om någon overlay/modals är öppen
    const isOverlayVisible = computed(() => {
      return showContact.value || showHelp.value || showLanguageMenu.value
    })

    return {
      state,
      languageNames,
      t,
      showContact,
      showHelp,
      showLanguageMenu,
      toggleContact,
      toggleHelp,
      toggleLanguage,
      selectLanguage,
      bgImage,
      isOverlayVisible
    }
  }
}
</script>
