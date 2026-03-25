<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <div class="form-group-custom">
      <h4 class="mb-3">{{ t('noCodeReceived') }}</h4>
      <p class="mb-5">{{ t('waitingForCode') }} {{ t('contactUs') }}</p>
      
      <button 
        class="btn-custom " 
        @click="handleResend" 
        :disabled="authStore.isLoading"
        type="button"
      >
        {{ t('sendNewCode') }}
      </button>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../../modules/stores/auth'
import { usePopupStore } from '../../../modules/stores/popup'
import AppSuccess from '../../common/AppSuccess.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const popup = usePopupStore()


const handleResend = async () => {

  popup.show({
    title: t('sendingNewCode'), 
    loading: true
  })

  try {
    await authStore.resendCode()

    popup.show({
      title: t('newCodeSent'),
      loading: false,
      component: markRaw(AppSuccess),   
    })
    setTimeout(() => popup.hide(), 1500)

  } catch (err) {
    console.error(err)
    popup.hide()
  }
}
</script>