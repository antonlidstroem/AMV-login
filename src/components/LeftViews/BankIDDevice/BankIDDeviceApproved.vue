<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <img :src="AMVLogo" class="logo-top" />

    <h2>{{ t('loginWithBankID') }}</h2>
    <p>{{ t('SecurityCodeApproved') }}</p>

    <!-- Success icon -->
    <div class="d-flex flex-column justify-content-center align-items-center text-center mt-4 mb-4">
      <svg class="mb-3" width="115" height="101" viewBox="0 0 115 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_117_161" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="115" height="101">
          <rect width="115" height="101" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_117_161)">
          <path d="M73.0558 14.7602C71.7094 14.7602 70.5769 14.2954 69.6585 13.3658C68.7401 12.4363 68.2809 11.2982 68.2809 9.95177C68.2809 8.60532 68.7457 7.47289 69.6753 6.55448C70.6049 5.63608 71.7429 5.17688 73.0894 5.17688C74.4358 5.17688 75.5682 5.64167 76.4866 6.57126C77.4051 7.50084 77.8643 8.63886 77.8643 9.98532C77.8643 11.3318 77.3995 12.4642 76.4699 13.3826C75.5403 14.301 74.4023 14.7602 73.0558 14.7602ZM73.0558 93.8227C71.7094 93.8227 70.5769 93.3579 69.6585 92.4283C68.7401 91.4988 68.2809 90.3607 68.2809 89.0143C68.2809 87.6678 68.7457 86.5354 69.6753 85.617C70.6049 84.6986 71.7429 84.2394 73.0894 84.2394C74.4358 84.2394 75.5682 84.7042 76.4866 85.6338C77.4051 86.5633 77.8643 87.7014 77.8643 89.0478C77.8643 90.3943 77.3995 91.5267 76.4699 92.4451C75.5403 93.3635 74.4023 93.8227 73.0558 93.8227Z" fill="#1C1B1F"/>
        </g>
        <mask id="mask1_117_161" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="30" y="22" width="57" height="57">
          <rect x="30" y="22" width="57" height="57" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask1_117_161)">
          <path d="M52.6807 66.6497L37.2432 51.2122L42.5869 45.8685L52.6807 55.9622L74.4119 34.231L79.7557 39.5747L52.6807 66.6497Z" fill="#7B9B3F"/>
        </g>
      </svg>

      <a href="#" @click.prevent="changeToLogin">{{ t('cancel') }}</a>
    </div>

    <!-- Simuleringsknapp – ENDAST i dev-läge -->
    <button v-if="isDev" @click="simulateSuccess" class="btn-temp">
      Simulera lyckad inloggning
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../../../i18n/useI18n'
import AMVLogo from '../../../assets/logo_horizontal.svg'

const { t } = useI18n()
const isDev = import.meta.env.DEV

const emit = defineEmits<{
  (e: 'change-view', view: string): void
}>()

const changeToLogin = () => emit('change-view', 'login')

const simulateSuccess = () => emit('change-view', 'loginview')
</script>
