<template>
  <div class="right-page text-white d-flex flex-column justify-content-start align-items-center" 
       :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover'}">
    
    <!-- Knapprad -->
    <div class="d-flex gap-2 p-3 justify-content-center">
      <button @click="toggleContact" class="btn-secondary-custom">{{ t('contact') }}</button>
      <button @click="toggleHelp" class="btn-secondary-custom">{{ t('help') }}</button>

      <div class="language-selector position-relative">
        <button @click="toggleLanguage" class="btn-secondary-custom">
          {{ languageNames[state.currentLang] }}
        </button>

        <!-- language dropdown -->
        <div class="language-dropdown" :class="{ show: showLanguageMenu }">
          <button 
            v-for="(name, code) in languageNames" 
            :key="code" 
            @click="selectLanguage(code)"
            :class="{ active: state.currentLang === code }"
          >
            {{ name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ContactModal v-if="showContact" @close="showContact = false" />
    <HelpModal v-if="showHelp" @close="showHelp = false" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from '../i18n/useI18n'
import ContactModal from './RightViews/ContactModal.vue'
import HelpModal from './RightViews/HelpModal.vue'
import bgImage from '../assets/RPageCard.jpg'

export default {
  components: { ContactModal, HelpModal },
  setup() {
    const { state, changeLang, languageNames, t } = useI18n()
    
    // Alla toggle states
    const showContact = ref(false)
    const showHelp = ref(false)
    const showLanguageMenu = ref(false)

    // Toggle-funktioner
    function toggleContact() {
      showContact.value = !showContact.value
      if (showContact.value) showHelp.value = false // stänger help
      showLanguageMenu.value = false // stänger language dropdown
    }

    function toggleHelp() {
      showHelp.value = !showHelp.value
      if (showHelp.value) showContact.value = false // stänger contact
      showLanguageMenu.value = false // stänger language dropdown
    }

    function toggleLanguage() {
      showLanguageMenu.value = !showLanguageMenu.value
      showContact.value = false // stänger contact
      showHelp.value = false // stänger help
    }

    function selectLanguage(langCode) {
      changeLang(langCode)
      showLanguageMenu.value = false
    }

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
      bgImage
    }
  }
}
</script>
