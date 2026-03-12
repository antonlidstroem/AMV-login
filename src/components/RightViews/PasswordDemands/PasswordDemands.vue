<template>
  <div class="contact-panel position-relative rounded-4 text-white p-5 border border-white"
    style="background-color: rgba(100,100,100,0.80); width: 90%; max-width: 900px; height: 85%; max-height: 90vh; margin: auto; display: flex; flex-direction: column;">
    <IconCloseButton @close="$emit('close')" />
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
import { passwordHeaderKey, passwordRules, freeTextKey, passwordConfig } from './passwordRules'
import { useI18n } from '../../../i18n/useI18n'
import { passwordRuleTranslations } from '../../../i18n/passwordRulesI18n'
import type { RuleTranslationKey } from '../../../i18n/passwordRulesI18n'
import IconCloseButton from '../../common/IconCloseButton.vue'
import BaseButton from '../../common/BaseSecondaryButton.vue'
export default defineComponent({
  name: 'PasswordDemands',
  emits: ['close'],
  components: { IconCloseButton, BaseButton },
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
