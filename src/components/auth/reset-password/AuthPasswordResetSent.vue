<template>
  <div class="bg-views p-4 rounded-4 mb-3 mt-5">
    <AppLogo />
    <h2 class="mt-4 py-2">{{ t('resetPassword') }}  </h2>

    <div class="d-flex justify-content-center align-items-center mb-5" style="height: 118px;">
      <AppSuccess />
    </div>

    <p>{{ sentMessage }}</p>
    <button class="btn-custom mb-3" @click="emit('change-view', 'login')">{{ t('goToStart') }}</button>
    <button 
      v-if="isDev" 
      class="btn-temp" 
      @click="emit('change-view', 'new-password')"
    >
      Simulera lösenordsåterställning
    </button>
  </div>


  
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppLogo from '../../common/AppLogo.vue'
import AppSuccess from '../../common/AppSuccess.vue'

const props = defineProps<{ email: string }>()
const emit = defineEmits(['change-view'])

const { t } = useI18n()
const isDev = import.meta.env.DEV

const sentMessage = computed(() =>
  props.email ? t('resetEmailSentMessage', { email: props.email }) : t('resetPasswordEmailSent')
)
</script>

