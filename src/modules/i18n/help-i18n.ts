import { useI18n } from 'vue-i18n' 
import { helpTranslations } from './help-translations'

export function useHelpI18n() {
  const { locale } = useI18n() 
  function tHelp(key: keyof typeof helpTranslations['sv']): string {
    const lang = locale.value as keyof typeof helpTranslations
    return helpTranslations[lang]?.[key] ?? key
  }
  
  return { tHelp }
}