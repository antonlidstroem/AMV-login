import { useI18n } from 'vue-i18n' // Ändra från '../i18n/useI18n'
import { helpTranslations } from './help-translations'

export function useHelpI18n() {
  const { locale } = useI18n() // Använd 'locale' istället för 'state'
  
  function tHelp(key: keyof typeof helpTranslations['sv']): string {
    // locale.value innehåller 'sv' eller 'en'
    const lang = locale.value as keyof typeof helpTranslations
    return helpTranslations[lang]?.[key] ?? key
  }
  
  return { tHelp }
}