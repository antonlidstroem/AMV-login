<template>
  <div class="rpage">
    <button @click="showContact = true" class="btn-header">{{ t('contact') }}</button>
    <button @click="showHelp = true" class="btn-header">{{ t('help') }}</button>

    <div class="language-selector">
      <button @click="showLanguageMenu = !showLanguageMenu" class="btn-header">
        {{ languageNames[state.currentLang] }}
      </button>

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

    <!-- Inbäddade rutor -->
    <ContactModal v-if="showContact" @close="showContact = false" />
    <HelpModal v-if="showHelp" @close="showHelp = false" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from '../i18n/useI18n'
import ContactModal from './RightViews/ContactModal.vue'
import HelpModal from './RightViews/HelpModal.vue'

export default {
  components: { ContactModal, HelpModal },
  setup() {
    const { state, changeLang, languageNames, t } = useI18n()
    const showContact = ref(false)
    const showHelp = ref(false)
    const showLanguageMenu = ref(false)

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
      selectLanguage
    }
  }
}
</script>
