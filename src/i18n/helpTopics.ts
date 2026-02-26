import type { HelpTranslationKey } from './helpTranslations'

export interface HelpTopicDefinition {
  id: string
  labelKey: HelpTranslationKey
  contentKey: HelpTranslationKey
}

export const helpTopics: HelpTopicDefinition[] = [
  { id: 'forgotPassword', labelKey: 'forgotPassword', contentKey: 'forgotPasswordHelp' },
  { id: 'noEmailAccess', labelKey: 'noEmailAccess', contentKey: 'noEmailAccessHelp' },
  { id: 'systemError', labelKey: 'systemError', contentKey: 'systemErrorHelp' }
]