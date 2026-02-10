<template>
  <div class="rpage">
    <h2>Högersidan</h2>

    <button @click="showContact = true" class="btn-header">
      {{ t('contact') }}
    </button>

    <button @click="showHelp = true" class="btn-header">
      {{ t('help') }}
    </button>

    <div class="language-selector">
      <!-- Knappar för att öppna dropdown -->
      <button @click="showLanguageMenu = !showLanguageMenu" class="btn-header">
        {{ languageNames[state.currentLang] }}
      </button>

      <!-- Dropdownmeny -->
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
</template>

<script>
import { ref } from 'vue'
import { useI18n } from '../i18n/useI18n'

export default {
  setup() {
    const { state, t, changeLang, languageNames } = useI18n()

    const showContact = ref(false)
    const showHelp = ref(false)
    const showLanguageMenu = ref(false)

    function sendContact() {
      alert(t('sendMessage'))
      showContact.value = false
    }

    // Funktion för att byta språk och stänga menyn
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
      sendContact,
      selectLanguage
    }
  }
}
</script>

<style scoped>
.language-dropdown {
  display: none;
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  margin-top: 4px;
  z-index: 10;
}

.language-dropdown.show {
  display: block;
}

.language-dropdown button {
  display: block;
  width: 100%;
  padding: 4px 8px;
  text-align: left;
  background: white;
  border: none;
  cursor: pointer;
}

.language-dropdown button.active {
  font-weight: bold;
  background: #f0f0f0;
}
</style>
