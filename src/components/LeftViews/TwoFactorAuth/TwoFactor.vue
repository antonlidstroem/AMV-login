<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <img :src="AMVLogo" class="logo-top" />

    <h4>{{ t('verifyWithCode') }}</h4>
    <p>{{ t('enterPinCode') }}</p>

    <div v-if="error" class="error-banner">{{ t('newCodeSent') }}</div>

    <div class="d-flex gap-3 mb-3 justify-content-center">
      <input
        v-for="(d, i) in digits"
        :key="i"
        v-model="digits[i]"
        maxlength="1"
        class="text-center code-input"
        :class="{
          'error-border': error,
          'success-border': digits[i] && !error
        }"
        @input="clearError"
      />
    </div>

    <button class="btn-custom" @click="verify">{{ t('login') }}</button>
    <button class="btn btn-link" @click="$emit('change-view','login')">{{ t('back') }}</button>

    <Popup
      v-if="successPopup"
      title="✔"
      :text="t('newCodeSent')"
      :button="t('okClose')"
      @close="successPopup = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import Popup from '../../common/LoginPopup.vue'
import { useI18n } from '../../../i18n/useI18n'
import AMVLogo from '../../../assets/logo_horizontal.svg'

export default defineComponent({
  name: 'VerifyCode',
  components: { Popup },
  emits: ['change-view'],
  setup(_, { emit }) {
    const { t } = useI18n()

    // Reaktiva state
    const digits = reactive<string[]>(['', '', '', ''])
    const error = ref<boolean>(false)
    const successPopup = ref<boolean>(false)

    // Computed (valfritt, här bara för exempel)
    const inputClass = computed(() => {
      if (error.value) return 'error-border'
      if (digits.some(d => d)) return 'success-border'
      return ''
    })

    // Metoder
    const verify = (): void => {
      if (digits.join('') === '1234') {
        alert('login success mock')
        successPopup.value = true
      } else {
        error.value = true
      }
    }

    const clearError = (): void => {
      if (error.value) error.value = false
    }

    return {
      t,
      AMVLogo,
      digits,
      error,
      successPopup,
      inputClass,
      verify,
      clearError,
      emit
    }
  }
})
</script>