<template>
  <div class="bg-views p-4 rounded-4 mb-3 mt-3 no-email-received-wrapper">
    <h1 class="mb-4">{{ t('resetPasswordEmailNotDelivered') }}</h1>
    <p class="mb-4">{{ t('resetPasswordEmailNotDeliveredHelp') }}</p>
    <button class="btn-custom mb-4" @click="send" type="button">{{ t('resendEmail') }}</button>
    <!-- Fixed: use :label (not :text) and ui.setView() instead of orphan emit -->
    <AppBackLink :label="t('back')" @click="ui.setView('login')" />
  </div>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUIStore } from '../../../modules/stores/ui'
import { usePopupStore } from '../../../modules/stores/popup'
import { useAuthStore } from '../../../modules/stores/auth'
import AppBackLink from '../../common/AppBackLink.vue'
import AppSuccess from '../../common/AppSuccess.vue'

const props = defineProps<{ email: string }>()
const { t } = useI18n()
const ui = useUIStore()
const authStore = useAuthStore()
const popup = usePopupStore()

const send = async () => {
  popup.show({ title: t('sending'), loading: true })
  try {
    await authStore.resendPasswordResetEmail(props.email)
    popup.show({
      title: t('newEmailSent'),
      loading: false,
      component: markRaw(AppSuccess),
      buttons: [{ label: t('okClose'), action: () => popup.hide() }],
    })
  } catch {
    // Fixed: replace alert() with the popup system
    popup.show({
      title: t('errorTitle'),
      icon: 'bi bi-exclamation-triangle',
      buttons: [{ label: t('okClose'), action: () => popup.hide() }],
    })
  }
}
</script>
