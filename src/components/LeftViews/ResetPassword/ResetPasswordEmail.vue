<template>
  <div class="bg-views p-4 rounded-4 mb-3 mt-5">
    <img :src="AMVLogo" class="logo-top" />
    <h2 class="mt-4 py-2">{{ t('resetPassword') }}</h2>
    <div class="text-center mb-5">
      <i class="bi bi-check-circle display-1" style="color: var(--success)"></i>
    </div>
    <p>{{ sentMessage }}</p>
    <button class="btn-custom mb-3" @click="goToStart" type="button">{{ t('goToStart') }}</button>
    <button v-if="isDev" class="btn-temp mb-3" @click="goToResetNew" type="button">Simulera</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useI18n } from '../../../i18n/useI18n'
import AMVLogo from '../../../assets/logo_horizontal.svg'
export default defineComponent({
  name: 'ResetPasswordEmail',
  props: { email: { type: String, default: '' } },
  emits: ['change-view'],
  setup(props, { emit }) {
    const { t } = useI18n()
    const isDev = import.meta.env.DEV
    // Fix: use interpolated translation so the actual email address is displayed
    const sentMessage = computed(() =>
      props.email
        ? t('resetEmailSentMessage', { email: props.email })
        : t('ResetPasswordEmailSent')
    )
    const goToStart = () => emit('change-view', 'login')
    const goToResetNew = () => emit('change-view', 'newpassword')
    return { t, goToStart, goToResetNew, AMVLogo, isDev, sentMessage }
  }
})
</script>
