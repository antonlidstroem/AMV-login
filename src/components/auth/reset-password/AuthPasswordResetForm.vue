<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <img :src="AMVLogo" class="logo-top" />
    <h4 class="mb-4">{{ t('enterNewPassword') }}</h4>
    
    <div v-if="errorMsg" class="error-banner mb-3">{{ errorMsg }}</div>

    <!-- Visar valideringen om användaren försökt spara men reglerna inte uppfylls -->
    <AuthPasswordCheck v-if="shouldShowValidation" :password="p1" />

    <label class="mb-2">{{ t('newPassword') }}</label>
    <input 
      type="password" 
      v-model="p1" 
      class="form-control mb-2" 
      :class="inputClass" 
      autocomplete="new-password" 
    />
   
    <label class="mb-2">{{ t('confirmPassword') }}</label>
    <input 
      type="password" 
      v-model="p2" 
      class="form-control mb-4" 
      :class="inputClass" 
      autocomplete="new-password" 
    />
    
    <a href="#" class="password-link d-block mb-3" @click.prevent="showDemands">
      <i class="bi bi-question-circle"></i> {{ t('passwordRequirements') }}
    </a>

    <button class="btn-custom w-100" @click="change" type="button">
      {{ t('changePassword') }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, markRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import AMVLogo from '../../../assets/logo-horizontal.svg'
import AuthPasswordCheck from '../../overlays/password-demands/AuthPasswordCheck.vue'
import AppSuccess from '../../common/AppSuccess.vue'
import { passwordRules } from '../../overlays/password-demands/password-rules'
import { apiClient } from '../../../modules/services/api-client'

export default defineComponent({
  name: 'AuthPasswordResetForm',
  components: { AuthPasswordCheck },
  emits: ['change-view', 'show-password-demands', 'show-popup'],
  
  setup(_, { emit }) {
    const { t } = useI18n()
    const route = useRoute()
    
    const p1 = ref('')
    const p2 = ref('')
    const errorMsg = ref('')
    const hasAttemptedChange = ref(false)

    // Logik för validering
    const allRulesPassed = computed(() => passwordRules.every(rule => rule.test(p1.value)))
    const shouldShowValidation = computed(() => hasAttemptedChange.value && !allRulesPassed.value)
    const inputClass = computed(() => errorMsg.value ? 'error-border' : '')

    const showDemands = () => emit('show-password-demands')
    
    const change = async () => {
      hasAttemptedChange.value = true
      
      // 1. Lokal validering
      if (p1.value !== p2.value) { 
        errorMsg.value = t('passwordsNotMatching')
        return 
      }
      if (!allRulesPassed.value) { 
        errorMsg.value = t('passwordNotAcceptable')
        return 
      }
      
      errorMsg.value = ''

      // 2. Starta popup/spinner
      emit('show-popup', {
        title: t('changingPassword'),
        loading: true
      })

      try {
        // Hämta token från URL (?token=...)
        const token = route.query.token as string

        // 3. API-anrop via vår nya metod i apiClient
        await apiClient.resetPassword(token, p1.value)

        // 4. Succé! Byt ut spinnern mot bocken
        emit('show-popup', {
          title: t('passwordChanged'),
          loading: false,
          component: markRaw(AppSuccess),
          buttons: [{ 
            label: t('toLoginPage'), 
            action: () => emit('change-view', 'login') 
          }]
        })
      } catch (err: any) {
        // 5. Felhantering
        emit('show-popup', { visible: false })
        errorMsg.value = err.message || t('errorChangingPassword')
        console.error("Password reset error:", err)
      }
    }

    // VIKTIGT: Returnera ALLT som används i <template>
    return { 
      t, 
      p1, 
      p2, 
      errorMsg, 
      inputClass, 
      change, 
      shouldShowValidation, 
      AMVLogo, 
      showDemands,
      allRulesPassed // Bra att ha med även om den bara används i computed internt
    }
  }
})
</script>