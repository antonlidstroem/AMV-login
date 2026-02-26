import { useI18n } from './useI18n'
import { helpTranslations } from './helpTranslations'

export function useHelpI18n() {
  const { state } = useI18n()

  function tHelp(key: keyof typeof helpTranslations['sv']): string {
    const lang = state.currentLang as keyof typeof helpTranslations
    return helpTranslations[lang]?.[key] ?? key
  }

  return { tHelp }
}