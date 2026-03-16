<template>
  <div v-if="password" class="password-check p-3 rounded-3 mb-3">
    <strong>{{ t('passwordRequirements') }}:</strong>
    <ul class="list-unstyled mt-2">
      <li v-for="rule in rules" :key="rule.id" class="d-flex align-items-center mb-2">
        <i v-if="rule.test(password)" class="bi bi-check-circle me-2 text-success fs-5"></i>
        <i v-else class="bi bi-exclamation-circle me-2 text-danger fs-5"></i>
        <span :class="{ 'text-success': rule.test(password) }">{{ getRuleLabel(rule.labelKey, rule.value) }}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { passwordRules } from './password-rules'
import { useI18n } from '../../../i18n/useI18n'
import { passwordRuleTranslations } from '../../../i18n/passwordRulesI18n'
import type { RuleTranslationKey } from '../../../i18n/passwordRulesI18n'
export default defineComponent({
  name: 'AuthPasswordCheck',
  props: { password: { type: String, required: true } },
  setup() {
    const { t, state } = useI18n()
    const getRuleLabel = (key: RuleTranslationKey, value?: number | string): string => {
      const lang = state.currentLang
      const cur = passwordRuleTranslations[lang]
      let text = cur ? cur[key] : (passwordRuleTranslations['sv']![key] || key)
      if (value !== undefined && text.includes('{n}')) text = text.replace('{n}', value.toString())
      return text
    }
    return { rules: passwordRules, t, getRuleLabel }
  }
})
</script>
<style scoped>
.password-check { background: var(--Error-Pink, #FFEAEA); border-radius: 0.5rem; color: #4C4C4B; }
.text-success { color: #28a745 !important; }
</style>
