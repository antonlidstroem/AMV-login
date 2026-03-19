<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <div class="mb-4 text-center">
      <AppLogo/>
    </div>

    <h1 class="mb-3">{{ t('resetPassword') }}</h1>
    <p class="text-muted mb-4">{{ t('enterNewPassword') }}</p>

    <form @submit.prevent="change" class="d-flex flex-column gap-3">
      <!-- Lösenord 1 -->
      <div>
        <label class="form-label">{{ t('newPassword') }}</label>
        <div class="position-relative">
          <i class="bi bi-lock-fill input-icon"></i>
          <input
            v-model="p1"
            :type="showP1 ? 'text' : 'password'"
            class="form-size form-control ps-5 pe-5"
            :class="inputClass"
            :placeholder="t('password')"
            required
          />
          <i 
            :class="['bi', showP1 ? 'bi-eye-slash' : 'bi-eye', 'password-toggle-icon']"
            @click="showP1 = !showP1"
          ></i>
        </div>
        
        <!-- Visas endast vid felaktigt försök -->
        <div v-if="shouldShowValidationDetails" class="mt-3">
          <AuthPasswordCheck :password="p1" />
        </div>
      </div>

      <!-- Lösenord 2 -->
      <div>
        <label class="form-label">{{ t('confirmPassword') }}</label>
        <div class="position-relative">
          <i class="bi bi-check-circle-fill input-icon"></i>
          <input
            v-model="p2"
            :type="showP2 ? 'text' : 'password'"
            class="form-size form-control ps-5 pe-5"
            :class="inputClass"
            :placeholder="t('confirmPassword')"
            required
          />
          <i 
            :class="['bi', showP2 ? 'bi-eye-slash' : 'bi-eye', 'password-toggle-icon']"
            @click="showP2 = !showP2"
          ></i>
        </div>
      </div>

      <!-- Toggle-länk för lösenordskrav -->
      <div class="d-flex justify-content-end mb-1">
        <a
          href="#"
          @click.prevent="emit('show-password-demands')"
          class="fw-bold text-decoration-none text-primary d-flex align-items-center small"
        >
          <i class="bi bi-question-circle me-1"></i>
          {{ t('showPasswordDemands') }}
        </a>
      </div>

      <!-- Felmeddelande (döljs om kraven är uppfyllda) -->
      <div v-if="shouldShowValidationDetails && errorMsg" class="text-danger small">
        {{ errorMsg }}
      </div>

      <button type="submit" class="btn-custom w-100 mt-2">
        {{ t('changePassword') }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, markRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { usePopupStore } from '../../../modules/stores/popup'
import { apiClient } from '../../../modules/services/api-client'
import { passwordRules } from '../../overlays/password-demands/password-rules'
import AppSuccess from '../../common/AppSuccess.vue'
import AuthPasswordCheck from '../../overlays/password-demands/AuthPasswordCheck.vue'
import AppLogo from '../../common/AppLogo.vue'

const { t } = useI18n()
const route = useRoute()
const popup = usePopupStore()
const emit = defineEmits(['change-view', 'show-password-demands'])

const p1 = ref('')
const p2 = ref('')
const showP1 = ref(false)
const showP2 = ref(false)
const errorMsg = ref('')
const hasAttemptedChange = ref(false)

// Valideringslogik
const allRulesPassed = computed(() => 
  passwordRules.every(rule => rule.test(p1.value))
)

// Kontrollerar om vi ska visa detaljer (Check-komponent + felmeddelande)
const shouldShowValidationDetails = computed(() => 
  hasAttemptedChange.value && !allRulesPassed.value
)

const inputClass = computed(() => 
  (shouldShowValidationDetails.value && errorMsg.value) ? 'error-border' : ''
)

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
    const token = route.query.token as string
    await apiClient.resetPassword(token, p1.value)

    popup.show({
      title: t('passwordChanged'),
      loading: false,
      component: markRaw(AppSuccess),
      buttons: [{ 
        label: t('toLoginPage'), 
        action: () => {
          popup.hide()
          emit('change-view', 'login')
        } 
      }]
    })
  } catch (err: any) {
    popup.hide()
    errorMsg.value = err.response?.data?.message || t('errorChangingPassword')
  }
}
</script>

<style scoped>
.auth-logo-reset {
  height: 40px;
  width: auto;
}

.password-toggle-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6c757d;
  z-index: 10;
}
</style>