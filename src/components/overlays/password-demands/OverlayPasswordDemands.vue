<template>
    <div class="contact-panel position-relative rounded-4 text-white p-5 border border-white"
      style="background-color: rgba(100,100,100,0.80); width: 90%; max-width: 900px; margin: 0 auto; display: flex; flex-direction: column;">

    <AppIconButtonClose @close="$emit('close')" />
    
    <h2 class="text-white text-start mt-4 mb-4 py-2">{{ t('passwordRequirements') }}</h2>
    
    <div v-if="config.showFreeText" class="mt-3 px-2">
      <p class="text-white">{{ getRuleLabel(freeTextKey) }}</p>
    </div>
   
    <div class="mt-3 px-2">
      <label class="text-white mb-3">{{ getRuleLabel(headerKey) }}</label>
    </div>
   
    <ul class="text-white ps-4">
      <li v-for="rule in rules" :key="rule.id" class="mb-2">
        <span class="text-white">{{ getRuleLabel(rule.labelKey, rule.value) }}</span>
      </li>
    </ul>
   
    <div class="text-center mt-auto">
      <BaseButton :label="t('closeWindow')" icon="bi bi-x-circle-fill" class="btn-modal mx-auto" @action="$emit('close')" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { passwordHeaderKey, passwordRules, freeTextKey, passwordConfig } from './password-rules'
import { useI18n } from 'vue-i18n'
import { passwordRuleTranslations } from '../../../modules/i18n/password-rules-translations'
import type { RuleTranslationKey } from '../../../modules/i18n/password-rules-translations'
import AppIconButtonClose from '../../common/AppIconButtonClose.vue'
import SecondaryButton from '../../common/AppButtonSecondary.vue'
export default defineComponent({
  name: 'PasswordDemands',
  emits: ['close'],
  components: { AppIconButtonClose, SecondaryButton },
  setup() {
    const { t, state } = useI18n()
    const getRuleLabel = (key: RuleTranslationKey, value?: number | string): string => {
      const lang = state.currentLang
      const cur = passwordRuleTranslations[lang]
      let text = cur ? cur[key] : (passwordRuleTranslations['sv']![key] || key)
      if (value !== undefined && text.includes('{n}')) text = text.replace('{n}', value.toString())
      return text
    }
    return { rules: passwordRules, headerKey: passwordHeaderKey, freeTextKey, config: passwordConfig, t, getRuleLabel }
  }
})
</script>
