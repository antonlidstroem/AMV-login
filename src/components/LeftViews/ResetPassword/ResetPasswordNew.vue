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
  emits: ['change-view', 'show-password-demands', 'show-popup'],

  setup(_, { emit }) {
    const { t } = useI18n()
    const p1 = ref(''), p2 = ref(''), errorMsg = ref('')
    const hasAttemptedChange = ref(false)
    
    const allRulesPassed = computed(() => {
      return passwordRules.every(rule => rule.test(p1.value))
    })

    const shouldShowValidation = computed(() => {
      return hasAttemptedChange.value && !allRulesPassed.value
    })

    const inputClass = computed(() => errorMsg.value ? 'error-border' : '')

    const showDemands = () => { 
      emit('show-password-demands') 
    }


    const change = () => {
      hasAttemptedChange.value = true
      if (p1.value !==  p2.value){
        errorMsg.value = t('passwordsNotMatching')
        return
      }
      if (!allRulesPassed.value){
        errorMsg.value = t('passwordNotAcceptable')
        return
      }


      errorMsg.value = '';

      emit('show-popup', {
        title: t('passwordChanged'),
        icon: 'bi bi-check-circle',
        buttons: [{ 
          label: t('toLoginPage'), 
          action: () => emit('change-view', 'login')}]
      })
    }

      return { 
        t, 
        p1, 
        p2, 
        errorMsg, 
        inputClass, 
        change, 
        shouldShowValidation, 
        AMVLogo,
        showDemands }

  }
})
</script>