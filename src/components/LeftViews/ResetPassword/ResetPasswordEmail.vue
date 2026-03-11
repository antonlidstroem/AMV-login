<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import AppLogo from '../../common/AppLogo.vue'

const props = defineProps<{ email: string }>()
const emit = defineEmits(['change-view'])

const { t } = useI18n()
const isDev = import.meta.env.DEV

const sentMessage = computed(() =>
  props.email ? t('resetEmailSentMessage', { email: props.email }) : t('ResetPasswordEmailSent')
)
</script>

<template>
  <div class="bg-views p-4 rounded-4 mb-3 mt-5">
    <AppLogo />
    <h2 class="mt-4 py-2">{{ t('resetPassword') }}</h2>
    <div class="text-center mb-5">
      <i class="bi bi-check-circle display-1" style="color: var(--success)"></i>
    </div>
    <p>{{ sentMessage }}</p>
    <button class="btn-custom mb-3" @click="emit('change-view', 'login')">{{ t('goToStart') }}</button>
  </div>
</template>