<template>
  <div v-if="password" class="password-check p-3 rounded-3 mb-3">
    <strong>{{ t('passwordRequirements') }}:</strong>
    <ul class="list-unstyled mt-2">
      <li v-for="rule in rules" :key="rule.id" class="d-flex align-items-center mb-2">
        <i v-if="rule.test(password)" class="bi bi-check-circle me-2 text-success fs-5"></i>
        <i v-else class="bi bi-exclamation-circle me-2 text-danger fs-5"></i>
        <span :class="{ 'text-success': rule.test(password) }">
          {{ getRuleLabel(rule.labelKey, rule.value) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { passwordRules } from './password-rules'          // ← was missing — caused blank list
import { passwordRuleTranslations } from '../../../modules/i18n/password-rules-translations'
import type { RuleTranslationKey } from '../../../modules/i18n/password-rules-translations'

defineProps<{ password: string }>()

const { t, locale } = useI18n()

// This must be declared so the template's v-for="rule in rules" works
const rules = passwordRules

const getRuleLabel = (key: RuleTranslationKey, value?: number | string): string => {
  const lang = locale.value as 'sv' | 'en'
  const cur = passwordRuleTranslations[lang]
  let text = cur ? cur[key] : (passwordRuleTranslations['sv']![key] || key)
  if (value !== undefined && text.includes('{n}')) {
    text = text.replace('{n}', value.toString())
  }
  return text
}
</script>

<style scoped>
.password-check {
  background: var(--Error-Pink, #ffeaea);
  border-radius: 0.5rem;
  color: #4c4c4b;
}
.text-success { color: #28a745 !important; }
</style>
