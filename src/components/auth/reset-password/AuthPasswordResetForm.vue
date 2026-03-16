<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <img :src="AMVLogo" class="logo-top" />
    <h4 class="mb-4">{{ t('enterNewPassword') }}</h4>
    
    <div v-if="errorMsg" class="error-banner mb-3">{{ errorMsg }}</div>

    <AuthPasswordCheck v-if="shouldShowValidation" :password="p1" />

    <label class="mb-2">{{ t('newPassword') }}</label>
    <input type="password" v-model="p1" class="form-control mb-2" :class="inputClass" autocomplete="new-password" />
   
    <label class="mb-2">{{ t('confirmPassword') }}</label>
    <input type="password" v-model="p2" class="form-control mb-4" :class="inputClass" autocomplete="new-password" />
    
    <a href="#" class="password-link d-block mb-3" @click.prevent="showDemands">
      <i class="bi bi-question-circle"></i> {{ t('passwordRequirements') }}
    </a>

    <button class="btn-custom w-100" @click="change" type="button">{{ t('changePassword') }}</button>
  </div>
</template>

<script lang="ts">
// 1. Importera markRaw från vue
import { defineComponent, ref, computed, markRaw } from 'vue'
import { useI18n } from 'vue-i18n'
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
    const p1 = ref(''), p2 = ref(''), errorMsg = ref('')
    const hasAttemptedChange = ref(false)

    const allRulesPassed = computed(() => passwordRules.every(rule => rule.test(p1.value)))
    const shouldShowValidation = computed(() => hasAttemptedChange.value && !allRulesPassed.value)
    const inputClass = computed(() => errorMsg.value ? 'error-border' : '')

    const showDemands = () => emit('show-password-demands')
    
    const change = async () => {
      hasAttemptedChange.value = true
      
      // Grundläggande validering (lokalt)
      if (p1.value !== p2.value) { errorMsg.value = t('passwordsNotMatching'); return }
      if (!allRulesPassed.value) { errorMsg.value = t('passwordNotAcceptable'); return }
      
      errorMsg.value = ''

      // 1. Visa spinner direkt när användaren klickar
      emit('show-popup', {
        title: t('changingPassword'), // Se till att denna finns i i18n, annars använd hårdkodad text för test
        loading: true
      })

      try {
        // 2. Anropa din MSW-mock via api-client
        // Här väntar vi i 1.5 sekunder (pga delay i din handler)
        await apiClient.resetPassword(p1.value)

        // 3. När anropet är klart: Byt ut spinnern mot succé-bocken!
        emit('show-popup', {
          title: t('passwordChanged'),
          loading: false, // Stoppa spinnern
          component: markRaw(AppSuccess), // In med bocken
          buttons: [{ 
            label: t('toLoginPage'), 
            action: () => emit('change-view', 'login') 
          }]
        })
      } catch (err) {
        // 4. Hantera om något går fel (t.ex. serverfel i mocken)
        emit('show-popup', { visible: false }) // Stäng popupen
        errorMsg.value = t('errorChangingPassword') // Visa felmeddelande i formuläret
        console.error("Password reset error:", err)
      }
    }

    return { t, p1, p2, errorMsg, inputClass, change, shouldShowValidation, AMVLogo, showDemands }
  }
})
</script>