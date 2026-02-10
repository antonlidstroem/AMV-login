

<template>
      <div class="rpage">
            <h2>Högersidan</h2>
            <button @click="showContact=true" class="btn-header">
          {{ t('contact') }}
        </button>

        <button @click="showHelp=true" class="btn-header">
          {{ t('help') }}
        </button>

        <div class="language-selector">
          <button @click="showLanguageMenu=!showLanguageMenu" class="btn-header">
            {{ languageNames[state.currentLang] }}
          </button>

          <div class="language-dropdown" :class="{show:showLanguageMenu}">
            <button @click="changeLang('sv')">Svenska</button>
            <button @click="changeLang('en')">English</button>
          </div>
        </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from '../i18n/useI18n'

export default{
  setup(){

    const { state, t, changeLang, languageNames } = useI18n()

    const showContact = ref(false)
    const showHelp = ref(false)
    const showLanguageMenu = ref(false)

    function sendContact(){
      alert(t('sendMessage'))
      showContact.value=false
    }

    return{
      state,
      t,
      changeLang,
      languageNames,
      showContact,
      showHelp,
      showLanguageMenu,
      sendContact
    }
  }
}

</script>
