<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import { apiClient } from '../../../services/apiClient'
import BackLink from '../../common/BackLink.vue'
import AppLogo from '../../common/AppLogo.vue'

const emit = defineEmits(['change-view', 'show-popup'])
const { t } = useI18n()

const digits = reactive(['', '', '', ''])
const error = ref(false)
const loading = ref(false)
const inputRefs = ref<HTMLInputElement[]>([])

const verify = async () => {
  const code = digits.join('')
  if (code.length < 4 || loading.value) return

  loading.value = true
  emit('show-popup', { title: t('loginIn'), loading: true })

  try {
    await apiClient.verifyCode(code)
    emit('show-popup', { visible: false })
    emit('change-view', 'loginview')
  } catch (err) {
    emit('show-popup', { visible: false })
    error.value = true
    digits.fill('')
    inputRefs.value[0]?.focus()
  } finally {
    loading.value = false
  }
}

const onInput = (index: number) => {
  error.value = false
  
  // Vi hämtar värdet eller en tom sträng om det mot förmodan vore undefined
  const val = digits[index] ?? '' 
  digits[index] = val.replace(/\D/g, '').slice(0, 1)

  // Samma sak här, använd valfritt chaining för att vara säker
  if (digits[index] && index < 3) {
    inputRefs.value[index + 1]?.focus()
  }
  
  if (digits.every(d => d !== '')) verify()
}

const onPaste = (e: ClipboardEvent) => {
  const pasted = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, 4)
  pasted.split('').forEach((ch, i) => { digits[i] = ch })
  if (pasted.length === 4) verify()
}
</script>

<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <AppLogo />
    <h4>{{ t('verifyWithCode') }}</h4>
    <p>{{ t('enterPinCode') }}</p>
    <div v-if="error" class="error-banner">{{ t('wrongCodeTryAgain') }}</div>
    <div class="d-flex gap-3 mb-3 justify-content-center">
      <input v-for="(d, i) in digits" :key="i" ref="inputRefs" v-model="digits[i]" maxlength="1" 
             type="tel" class="text-center code-input" :class="{ 'error-border': error }"
             @input="onInput(i)" @paste.prevent="onPaste" />
    </div>
    <BackLink :label="t('back')" @click="emit('change-view', 'login')" />
  </div>
</template>