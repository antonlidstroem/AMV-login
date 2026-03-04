<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <img :src="AMVLogo" class="logo-top" />
    <h4 class="mb-4">{{ t('EnterNewPassword') }}</h4>

    <div v-if="errorMsg" class="error-banner mb-3">{{ errorMsg }}</div>

    <PasswordCheck v-if="shouldShowValidation" :password="p1" />

    <label class="mb-2">{{ t('newPassword') }}</label>
    <input type="password" v-model="p1" class="form-control mb-2" :class="inputClass" />

    <label class="mb-2">{{ t('confirmPassword') }}</label>
    <input type="password" v-model="p2" class="form-control mb-4" :class="inputClass" />

    <a href="#" class="password-link d-block mb-3" @click.prevent="showDemands">
      <i class="bi bi-question-circle"></i> {{ t('passwordRequirements') }}
    </a>

    <button class="btn-custom w-100" @click="change">{{ t('changePassword') }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import AMVLogo from '../../../assets/logo_horizontal.svg'
import PasswordCheck from '../../RightViews/PasswordDemands/PasswordCheck.vue'
import { passwordRules } from '../../RightViews/PasswordDemands/passwordRules'

export default defineComponent({
  name: 'ResetPasswordNew',
  components: { PasswordCheck },
  emits: ['change-view', 'show-password-demands'],
  setup(_, { emit }) {
    const { t } = useI18n()
    const p1 = ref(''), p2 = ref(''), errorMsg = ref(''), success = ref(false)
    
    // ✅ Håller koll på om användaren klickat på "Byt lösenord"
    const hasAttemptedChange = ref(false)
    
    const inputClass = computed(() => errorMsg.value ? 'error-border' : '')

    const allRulesPassed = computed(() => {
      return passwordRules.every(rule => rule.test(p1.value))
    })

    // ✅ Logiken för att visa checklistan:
    // 1. Man måste ha klickat på knappen minst en gång (hasAttemptedChange)
    // 2. Alla regler får inte vara uppfyllda ännu (!allRulesPassed)
    const shouldShowValidation = computed(() => {
      return hasAttemptedChange.value && !allRulesPassed.value
    })

    const change = () => {
      // ✅ Nu aktiverar vi "validerings-läget" eftersom användaren försöker spara
      hasAttemptedChange.value = true

      // Kolla matchning
      if (p1.value !== p2.value) { 
        errorMsg.value = t('passwordsNotMatching')
        return 
      }
      
      // Kolla regler
      if (!allRulesPassed.value) { 
        errorMsg.value = 'Ditt lösenord uppfyller inte alla krav'
        return 
      }

      // Om allt går bra
      errorMsg.value = ''
      success.value = true
      console.log("Success!")
    }

    const showDemands = () => { emit('show-password-demands') }

    return { 
      t, p1, p2, errorMsg, success, inputClass, 
      change, AMVLogo, showDemands, 
      shouldShowValidation 
    }
  }
})
</script>