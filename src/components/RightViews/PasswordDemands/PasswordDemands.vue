<template>
  <div
    class="contact-panel position-relative rounded-4 text-white p-4 border border-white"
    style="background-color: rgba(100, 100, 100, 0.80); color: white; max-width: 500px; margin: auto;"
  >
    <h2 class="text-center mb-3">{{ t('passwordRequirements') }}</h2>

    <ul class="list-unstyled">
      <li v-for="rule in rules" :key="rule.id" class="mb-2">
        <strong>{{ rule.label }}</strong>
      </li>
    </ul>

    <div class="text-center mt-4">
      <button class="btn btn-secondary-custom" @click="$emit('close')">
        {{ t('closeWindow') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { passwordRules } from './passwordRules'
import { useI18n } from '../../../i18n/useI18n'

export default defineComponent({
  name: 'PasswordDemands',
  emits: ['close'],
  setup() {
    const { t } = useI18n()
    return { rules: passwordRules, t }
  }
})
</script>

<style scoped>
.help-modal ul li {
  font-size: 0.95rem;
}
</style>