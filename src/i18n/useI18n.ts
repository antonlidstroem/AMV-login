// i18n/useI18n.ts
import { reactive } from 'vue'
import { translations, languageNames } from './translations'




// Typa språken automatiskt från objektet
export type Lang = keyof typeof translations  // 'sv' | 'en' | 'no' | 'fi'

// Typa alla möjliga nycklar (alla nycklar måste finnas i alla språk)
export type TranslationKey = keyof typeof translations['sv'] 

const state = reactive<{ currentLang: Lang }>({
  currentLang: 'sv'
})

export function useI18n() {
  // Funktion för att hämta text
  function t(key: TranslationKey): string {
  return translations[state.currentLang]?.[key] ?? key
  }

  // Byta språk
  function changeLang(lang: Lang) {
    state.currentLang = lang
  }

  return {
    state,
    t,
    changeLang,
    languageNames
  }
}