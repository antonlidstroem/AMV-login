import { reactive } from 'vue'
import { translations, languageNames } from './translations'

const state = reactive({
  currentLang:'sv'
})

export function useI18n(){

  function t(key){
    return translations[state.currentLang][key] || key
  }

  function changeLang(lang){
    state.currentLang = lang
  }

  return{
    state,
    t,
    changeLang,
    languageNames
  }
}
