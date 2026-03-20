<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <AppLogo />
    <h4 class="mb-4">{{ t('enterNewPassword') }}</h4>

    <div v-if="errorMsg" class="error-banner mb-3">{{ errorMsg }}</div>

    <!-- Real-time password check — shown after first submit attempt if rules are failing -->
    <AuthPasswordCheck v-if="shouldShowValidation" :password="p1" class="mb-3" />

    <label class="mb-2">{{ t('newPassword') }}</label>
    <div class="position-relative mb-2">
      <i class="bi bi-lock-fill input-icon"></i>
      <input
        :type="showEye ? 'text' : 'password'"
        v-model="p1"
        class="form-size form-control ps-5 pe-5"
        :class="inputClass"
        autocomplete="new-password"
      />
      <i
        :class="['bi', showEye ? 'bi-eye-slash' : 'bi-eye', 'password-toggle-icon']"
        @click="showEye = !showEye"
      ></i>
    </div>

    <label class="mb-2">{{ t('confirmPassword') }}</label>
    <div class="position-relative mb-4">
      <i class="bi bi-lock-fill input-icon"></i>
      <input
        type="password"
        v-model="p2"
        class="form-size form-control ps-5"
        :class="inputClass"
        autocomplete="new-password"
      />
    </div>

    <a href="#" class="password-link d-block mb-3" @click.prevent="ui.toggleDemands()">
      <i class="bi bi-question-circle"></i> {{ t('passwordRequirements') }}
    </a>

    <button class="btn-custom w-100" @click="change" type="button">
      {{ t('changePassword') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUIStore } from '../../../modules/stores/ui'
import { usePopupStore } from '../../../modules/stores/popup'
import { markRaw } from 'vue'
import { passwordRules } from '../../overlays/password-demands/password-rules'
import { apiClient } from '../../../modules/services/api-client'
import AuthPasswordCheck from '../../overlays/password-demands/AuthPasswordCheck.vue'
import AppLogo from '../../common/AppLogo.vue'
import AppSuccess from '../../common/AppSuccess.vue'

const { t } = useI18n()
const ui = useUIStore()
const popup = usePopupStore()

const p1 = ref('')
const p2 = ref('')
const showEye = ref(false)
const errorMsg = ref('')
const hasAttemptedChange = ref(false)

const allRulesPassed = computed(() => passwordRules.every(rule => rule.test(p1.value)))
const shouldShowValidation = computed(() => hasAttemptedChange.value && !allRulesPassed.value)
const inputClass = computed(() => errorMsg.value ? 'error-border' : '')

const change = async () => {
  hasAttemptedChange.value = true

  if (p1.value !== p2.value) {
    errorMsg.value = t('passwordsNotMatching')
    return
  }
  if (!allRulesPassed.value) {
    errorMsg.value = t('passwordNotAcceptable')
    return
  }

  errorMsg.value = ''

  popup.show({ title: t('changingPassword'), loading: true })

  try {
    await apiClient.resetPassword('mock-token', p1.value)

    popup.show({
      title: t('passwordChanged'),
      loading: false,
      component: markRaw(AppSuccess),
      buttons: [{
        label: t('toLoginPage'),
        action: () => { popup.hide(); ui.setView('login') }
      }]
    })
  } catch {
    popup.hide()
    errorMsg.value = t('errorChangingPassword')
  }
}
</script>
