<template>
  <div v-if="password" class="password-check p-3 rounded-3 mb-3">
    <strong>Lösenordet måste innehålla:</strong>

    <ul class="list-unstyled mt-2">
      <li v-for="rule in rules" :key="rule.id" class="d-flex align-items-center mb-2">
        <i 
          v-if="rule.test(password)" 
          class="bi bi-check-circle me-2 text-success fs-5"></i>
        <i 
          v-else 
          class="bi bi-exclamation-circle me-2 text-danger fs-5"></i>
        <span>{{ rule.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { passwordRules } from './passwordRules'

export default defineComponent({
  name: 'PasswordCheck',
  props: {
    password: { type: String, required: true }
  },
  setup() {
    return { rules: passwordRules }
  }
})
</script>

<style scoped>
.password-check {
  background: var(--Error-Pink, #FFEAEA);
  border-radius: 0.5rem;
  color: #000; /* Svart text för kontrast */
}
</style>