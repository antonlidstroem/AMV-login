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
        inputmode="numeric"
        pattern="[0-9]*"
        class="text-center code-input"
        :class="{ 'error-border': error, 'success-border': digits[i] && !error }"
        :disabled="loading"
        @input="onInput(i)"
        @paste.prevent="onPaste"
      />
    </div>

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
import { apiClient } from '../../../services/apiClient'
import BackLink from '../../common/BackLink.vue'

export default defineComponent({
  name: 'VerifyCode',
  components: { BackLink },
  emits: ['change-view', 'show-popup'],

  setup(_, { emit }) {
    const { t } = useI18n()
    const digits = reactive<string[]>(['', '', '', ''])
    const error = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const inputRefs = ref<HTMLInputElement[]>([])

    const onInput = (index: number) => {
      clearError()

      // Only allow digits — strip anything else the user typed
      digits[index] = digits[index].replace(/\D/g, '').slice(0, 1)

      if (digits[index] && index < 3) {
        inputRefs.value[index + 1]?.focus()
      }

      // Auto-submit once all four fields are filled
      if (digits.every(d => d !== '')) {
        verify()
      }
    }

    const verify = async (): Promise<void> => {
      const code = digits.join('')
      if (code.length < 4) return

      // Bug fix: guard against concurrent invocations (e.g. fast typing
      // could trigger onInput → verify() multiple times before the first
      // call resolves, causing multiple popups and network requests).
      if (loading.value) return

      loading.value = true

      // Show the global loading popup immediately
      emit('show-popup', { title: t('loginIn'), loading: true })

      // Enforce a minimum visible duration so the spinner doesn't flash
      const minDelay = new Promise<void>(resolve => setTimeout(resolve, 1000))

      try {
        // Run the API call and the minimum delay in parallel; wait for both
        await Promise.all([apiClient.verifyCode(code), minDelay])

        emit('show-popup', { visible: false })
        emit('change-view', 'loginview')
      } catch (err) {
        // Ensure the delay has also finished before removing the spinner
        await minDelay
        emit('show-popup', { visible: false })

        error.value = true
        digits.fill('')

        // Re-focus first input so the user can immediately try again
        inputRefs.value[0]?.focus()
      } finally {
        loading.value = false
      }
    }

    const clearError = (): void => {
      if (error.value) error.value = false
    }

    // Fix: handle paste so copying "1234" from an SMS fills all four boxes.
    // Without this, pasting puts all chars into the focused input and the
    // v-model strips them down to 1 character, leaving the rest empty.
    const onPaste = (e: ClipboardEvent): void => {
      const pasted = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, 4)
      if (!pasted) return
      pasted.split('').forEach((ch, i) => { digits[i] = ch })
      // Move focus to the last filled box (or last box if all 4 filled)
      const lastIdx = Math.min(pasted.length - 1, 3)
      inputRefs.value[lastIdx]?.focus()
      if (pasted.length === 4) verify()
    }

    return {
      t, AMVLogo, digits, error, loading,
      verify, clearError, onInput, onPaste, inputRefs,
    }
  }
})
</script>
