<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <AppLogo />

    <h2>{{ t('loginWithBankID') }}</h2>

    <p>{{ t('securityCodeApproved') }}</p>

    <div class="d-flex justify-content-center align-items-center mb-5" style="height: 118px;">
    <AppSuccess />
    </div>

    <AppStepIndicator :total-steps="2" :active-step="2" />

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AppLogo from '../../common/AppLogo.vue'
import AppSuccess from '../../common/AppSuccess.vue'
import AppStepIndicator from '../../common/AppStepIndicator.vue'
import { useAuthStore } from '../../../modules/stores/auth' 

const { t } = useI18n()
const isDev = import.meta.env.DEV
const authStore = useAuthStore()
const emit = defineEmits(['change-view'])
  
  onMounted(() => {
  setTimeout(() => {
    emit('change-view', 'authenticated-view', authStore.user)
  }, 1500)
})
</script>
