<template>
  <div class="bg-views p-4 rounded-4 mb-3">
    <img :src="AMVLogo" class="logo-top" />

    <h2>{{ t('loginWithBankID') }}</h2>
    <p>{{ t('enterSecurityCode') }}</p>

    <!-- Pending clock -->
    <div class="d-flex flex-column justify-content-center align-items-center text-center mt-4 mb-3">
      <svg width="95" class="mb-3" height="96" viewBox="0 0 95 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M63.4728 92.2396C62.1263 92.2396 60.9939 91.7748 60.0755 90.8452C59.1571 89.9156 58.6979 88.7776 58.6979 87.4311C58.6979 86.0847 59.1627 84.9523 60.0923 84.0339C61.0219 83.1154 62.1599 82.6562 63.5064 82.6562C64.8528 82.6562 65.9852 83.121 66.9036 84.0506C67.822 84.9802 68.2812 86.1182 68.2812 87.4647C68.2812 88.8111 67.8164 89.9436 66.8869 90.862C65.9573 91.7804 64.8193 92.2396 63.4728 92.2396Z M47.9167 95.8333C41.2882 95.8333 35.059 94.5755 29.2292 92.0599C23.3993 89.5443 18.3281 86.1302 14.0156 81.8177C9.70312 77.5052 6.28906 72.434 3.77344 66.6042C1.25781 60.7743 0 54.5451 0 47.9167C0 41.2882 1.25781 35.059 3.77344 29.2292C6.28906 23.3993 9.70312 18.3281 14.0156 14.0156C18.3281 9.70312 23.3993 6.28906 29.2292 3.77344C35.059 1.25781 41.2882 0 47.9167 0V7.1875C36.5764 7.1875 26.9531 11.133 19.0469 19.0241C11.1406 26.9152 7.1875 36.546 7.1875 47.9167C7.1875 59.2865 11.133 68.9174 19.0241 76.8092C26.916 84.7003 36.5468 88.6458 47.9167 88.6458V95.8333Z M63.7292 68.7604L44.3229 49.3542V25.1562H51.5104V46.5343L68.7604 63.7292L63.7292 68.7604Z" fill="#1C1B1F"/>
      </svg>

      <!-- Avbryt-länk -->
      <a href="#" @click.prevent="$emit('change-view','login')" class="text-decoration-none fw-medium mb-4">
        {{ t('cancel') }}
      </a>
    </div>

    <!-- Länkrad -->
    <div class="d-flex justify-content-between align-items-center mt-3 mb-5">
      <BackLink :label="t('back')" @click="$emit('change-view','login')" />
      <BankIdLink :label="t('aboutMobileBankID')" />
    </div>

    <div class="divider mb-3"><h4>{{ t('orBankId') }}</h4></div>

    <button @click="$emit('change-view','mobilebankid')" class="btn-custom d-flex align-items-center justify-content-start gap-2 mb-3">
      <img :src="bankIdLogo" width="25" height="24" />
      {{ t('mobileBankID') }}
    </button>

    <!-- Simuleringsknapp – ENDAST i dev-läge -->
    <button v-if="isDev" @click="$emit('change-view','bankiddeviceapproved')" class="btn-temp">
      Simulera lyckad inloggning
    </button>
  </div>
</template>

<script>
import { useI18n } from '../../../i18n/useI18n'
import bankIdLogo from '../../../assets/BankID_logo_white.png'
import BackLink from '../../common/BackLink.vue'
import BankIdLink from '../../common/BankIdLink.vue'
import AMVLogo from '../../../assets/logo_horizontal.svg'

export default {
  components: { BackLink, BankIdLink },
  emits: ['change-view'],
  setup() {
    const { t } = useI18n()
    const isDev = import.meta.env.DEV
    return { t, bankIdLogo, AMVLogo, isDev }
  }
}
</script>
