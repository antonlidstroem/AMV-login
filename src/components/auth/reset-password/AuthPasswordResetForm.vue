<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <h1 class="mb-3">{{ t('resetPassword') }}</h1>
    <p class="text-muted mb-4">{{ t('enterNewPassword') }}</p>

    <form @submit.prevent="change" class="d-flex flex-column gap-3">
      <div>
        <label class="form-label">{{ t('newPassword') }}</label>
        <div class="position-relative">
          <i class="bi bi-lock-fill input-icon"></i>
          <input
            v-model="p1"
            :type="showEye ? 'text' : 'password'"
            class="form-size form-control ps-5 pe-5"
            :class="{ 'error-border': shouldShowValidationDetails }"
            required
          />
          <i :class="['bi', showEye ? 'bi-eye-slash' : 'bi-eye', 'password-toggle-icon']" @click="showEye = !showEye"></i>
        </div>
        
        <!-- Din logik: Visa bara om man försökt OCH det är fel -->
        <div v-if="shouldShowValidationDetails" class="mt-3">
          <AuthPasswordCheck :password="p1" />
        </div>
      </div>

      <!-- Länk med frågetecken som togglar högerpanelen -->
      <div class="d-flex justify-content-end mb-1">
        <a href="#" @click.prevent="ui.toggleDemands()" class="fw-bold text-decoration-none text-primary d-flex align-items-center small">
          <i class="bi bi-question-circle me-1"></i>
          {{ t('showPasswordDemands') }}
        </a>
      </div>

      <button type="submit" class="btn-custom w-100 mt-2">{{ t('changePassword') }}</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUIStore } from '../../../modules/stores/ui'
import { passwordRules } from '../../overlays/password-demands/password-rules'
import AuthPasswordCheck from '../../overlays/password-demands/AuthPasswordCheck.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const ui = useUIStore()
const p1 = ref('')
const showEye = ref(false)
const hasAttemptedChange = ref(false)

const allRulesPassed = computed(() => passwordRules.every(rule => rule.test(p1.value)))
const shouldShowValidationDetails = computed(() => hasAttemptedChange.value && !allRulesPassed.value)

const change = async () => {
  hasAttemptedChange.value = true
  if (!allRulesPassed.value) return
  // API anrop här...
}
</script>