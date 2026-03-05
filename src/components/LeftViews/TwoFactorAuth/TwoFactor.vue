<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <img :src="AMVLogo" class="logo-top" />

    <h4>{{ t('verifyWithCode') }}</h4>
    <p>{{ t('enterPinCode') }}</p>

    <div v-if="error" class="error-banner">{{ t('wrongCodeTryAgain') }}</div>

    <div class="d-flex gap-3 mb-3 justify-content-center">
      <input
        v-for="(d, i) in digits"
        :key="i"
        ref="inputRefs" 
        v-model="digits[i]"
        maxlength="1"
        type="tel"
        class="text-center code-input"
        :class="{ 'error-border': error, 'success-border': digits[i] && !error }"
        @input="onInput(i)"
      />
    </div>

    <button class="btn-custom" :disabled="loading" @click="verify">
      {{ loading ? t('wait') : t('login') }}
    </button>
    
    <button class="btn btn-link mt-2" @click="$emit('change-view','login')">
      {{ t('back') }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, nextTick } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import AMVLogo from '../../../assets/logo_horizontal.svg'
import { verifyCodeMock } from '../../../mock/authService'

export default defineComponent({
  name: 'VerifyCode',
  emits: ['change-view'],
  setup(_, { emit }) {
    const { t } = useI18n()
    const digits = reactive<string[]>(['', '', '', ''])
    const error = ref<boolean>(false)
    const loading = ref<boolean>(false)

    // Referenser till input-fälten för att kunna flytta fokus
    const inputRefs = ref<HTMLInputElement[]>([])

    const onInput = (index: number) => {
      clearError()
      // Om man skrivit en siffra, flytta fokus till nästa ruta
      if (digits[index] && index < 3) {
        inputRefs.value[index + 1]?.focus()
      }
      // Om alla siffror är ifyllda, kör verifiering direkt? (Valfritt)
      if (digits.every(d => d !== '')) {
        verify()
      }
    }

        // TwoFactor.vue inuti verify-funktionen
    const verify = async (): Promise<void> => {
      const code = digits.join('')
      if (code.length < 4) return

      loading.value = true
      try {
        await verifyCodeMock(code)
        
        // Ändra från 'dashboard' till 'loginview'
        emit('change-view', 'loginview') 
        
      } catch (err) {
        error.value = true
        digits.fill('')
        inputRefs.value[0]?.focus()
      } finally {
        loading.value = false
      }
    }

    const clearError = (): void => {
      if (error.value) error.value = false
    }

    return {
      t, AMVLogo, digits, error, loading,
      verify, clearError, onInput, inputRefs
    }
  }
})
</script>