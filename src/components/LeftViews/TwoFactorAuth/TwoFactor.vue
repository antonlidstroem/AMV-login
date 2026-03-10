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
<!-- 
    <button class="btn-custom" :disabled="loading" @click="verify">
      {{ t('login') }}
    </button> -->
    
    <div class="mt-3">
      <BackLink 
        :label="t('back')" 
        @click="$emit('change-view', 'login')" 
      />
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import AMVLogo from '../../../assets/logo_horizontal.svg'
import { verifyCodeMock } from '../../../mock/authService'
import BackLink from '../../common/BackLink.vue'

export default defineComponent({
  name: 'VerifyCode',
  components: {BackLink},
  emits: ['change-view', 'show-popup'],
  setup(_, { emit }) {
    const { t } = useI18n()
    const digits = reactive<string[]>(['', '', '', ''])
    const error = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const inputRefs = ref<HTMLInputElement[]>([])

    const onInput = (index: number) => {
      clearError()
      if (digits[index] && index < 3) {
        inputRefs.value[index + 1]?.focus()
      }
      if (digits.every(d => d !== '')) {
        verify()
      }
    }

    const verify = async (): Promise<void> => {
      const code = digits.join('')
      if (code.length < 4) return

      loading.value = true
      
      // 1. Trigga den globala popupen i App.vue
      emit('show-popup', { title: t('loginIn'), loading: true })

      // 2. Skapa en timer på 1 sekund
      const delay = new Promise(resolve => setTimeout(resolve, 1000))

      try {
        // 3. Kör både API-anropet och timern samtidigt. 
        // Vi väntar tills BÅDA är klara (Promise.all).
        await Promise.all([verifyCodeMock(code), delay])
        
        // Om vi når hit var koden rätt
        emit('show-popup', { visible: false })
        emit('change-view', 'loginview') 
        
      } catch (err) {
        // Om API:et ger fel, väntar vi ut resten av sekunden innan vi stänger popupen
        await delay 
        emit('show-popup', { visible: false })
        
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