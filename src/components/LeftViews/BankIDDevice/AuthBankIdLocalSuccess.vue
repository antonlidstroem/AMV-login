<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <AppLogo />

    <h2>{{ t('loginWithBankID') }}</h2>

    <p>{{ t('SecurityCodeApproved') }}</p>

    <div class="d-flex justify-content-center align-items-center mb-5" style="height: 118px;">
    <AppSuccess />
    </div>

    <AppStepIndicator :total-steps="2" :active-step="2" />

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import AppLogo from '../../common/AppLogo.vue'
import AppSuccess from '../../common/AppSuccess.vue'
import AppStepIndicator from '../../common/AppStepIndicator.vue'
import type { AuthUser } from '../../../stores/auth'

const { t } = useI18n()
const isDev = import.meta.env.DEV
const emit = defineEmits<{ 
  (e: 'change-view', view: string, payload?: AuthUser): void 
}>()

onMounted(() => {
  setTimeout(() => {
    const bankIdUser = { username: 'BankID-användare', name: 'Sven Svensson' }

    emit('change-view', 'authenticated-view', bankIdUser)
  }, 2000)
})
</script>
