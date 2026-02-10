<template>
  <div class="rpage">
    
    <button @click="showContact = true" class="btn-header">
      {{ t('contact') }}
    </button>

    <button @click="showHelp = true" class="btn-header">
      {{ t('help') }}
    </button>

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

    <!-- Inbäddad kontaktpanel -->
    <ContactModal v-if="showContact" @close="showContact = false" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from '../i18n/useI18n'
import ContactModal from './RightViews/ContactModal.vue'

export default {
  components: { ContactModal },
  setup() {
    const { state, t, changeLang, languageNames } = useI18n()
    const showContact = ref(false)
    const showHelp = ref(false)
    const showLanguageMenu = ref(false)

    function selectLanguage(langCode) {
      changeLang(langCode)
      showLanguageMenu.value = false
    }

    return {
      state,
      t,
      changeLang,
      languageNames,
      showContact,
      showHelp,
      showLanguageMenu,
      selectLanguage
    }
  }
}
</script>
