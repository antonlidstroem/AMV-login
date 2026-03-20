<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <AppLogo />
    <h4>{{ t('verifyWithCode') }}</h4>
    <p>{{ t('enterPinCode') }}</p>

    <div v-if="auth.error" class="error-banner mb-3">{{ auth.error }}</div>

    <div class="d-flex gap-3 mb-3 justify-content-center">
      <input
        v-for="(d, i) in digits"
        :key="i"
        ref="inputRefs"
        :value="digits[i]"
        maxlength="1"
        type="tel"
        class="text-center code-input"
        :class="{ 'error-border': auth.error }"
        @input="onInput(i, $event)"
        @paste.prevent="onPaste"
        :disabled="auth.isLoading"
      />
    </div>

    <AppBackLink :label="t('back')" @click="ui.setView('login')" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../../modules/stores/auth'
import { useUIStore } from '../../../modules/stores/ui'
import AppBackLink from '../../common/AppBackLink.vue'
import AppLogo from '../../common/AppLogo.vue'

const { t } = useI18n()
const auth = useAuthStore()
const ui = useUIStore()

// Use a plain ref array so Vue tracks individual index assignments via .splice()
const digits = ref<string[]>(['', '', '', ''])
const inputRefs = ref<HTMLInputElement[]>([])

const verify = async () => {
  const code = digits.value.join('')
  if (code.length < 4 || auth.isLoading) return
  try {
    await auth.verify2FA(code)
    ui.setView('authenticated-view')
  } catch {
    digits.value.splice(0, 4, '', '', '', '')
    inputRefs.value[0]?.focus()
  }
}

const onInput = (index: number, event: Event) => {

  auth.clearError()

  const raw = (event.target as HTMLInputElement).value
  const clean = raw.replace(/\D/g, '').slice(0, 1)
  digits.value.splice(index, 1, clean)


  ;(event.target as HTMLInputElement).value = clean

  if (clean && index < 3) {
    inputRefs.value[index + 1]?.focus()
  }

  if (digits.value.every(d => d !== '')) verify()
}

const onPaste = (e: ClipboardEvent) => {
  const pasted = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, 4)
  pasted.split('').forEach((ch, i) => digits.value.splice(i, 1, ch))
  if (pasted.length === 4) verify()
}
</script>

<style scoped>
.code-input {
  width: 50px;
  height: 60px;
  font-size: 1.5rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
}
.error-border { border-color: #dc3545; }
</style>
