<template>
  <div class="bg-views p-3 rounded-4 mb-3">
    <AppLogo />
    
    <div class="form-group-custom">
      <h2 class="mt-4 mb-3">{{ t('resetPassword') }}</h2>

      <div class="d-flex justify-content-center align-items-center mb-4" style="height: 120px;">
        <AppSuccess />
      </div>

      <p class="mb-3 text-center">{{ sentMessage }}</p>

      <button class="btn-custom w-100 mb-3" @click="ui.setView('login')" type="button">
        {{ t('goToStart') }}
      </button>

      <button v-if="isDev" class="btn-temp w-100" @click="ui.setView('new-password')" type="button">
        Simulera lösenordsåterställning
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUIStore } from '../../../modules/stores/ui'
import AppLogo from '../../common/AppLogo.vue'
import AppSuccess from '../../common/AppSuccess.vue'

const props = defineProps<{ email: string }>()

const { t } = useI18n()
const ui = useUIStore()
const isDev = import.meta.env.DEV

const sentMessage = computed(() =>
  props.email
    ? t('resetEmailSentMessage', { email: props.email })
    : t('resetPasswordEmailSent'),
)
</script>
