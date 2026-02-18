<template>
<div class="bg-white p-4 rounded-4 mb-3">
    <h2 class="mb-3">{{ t('resetPassword') }}</h2>
    <p class="mb-5">{{ t('resetPasswordDescription') }}</p>
    <p class="mb-2">{{ t('email') }}:</p>

    <div v-if="error" class="error-banner">
      {{ t('enterValidEmail') }}
    </div>

    <input
      v-model="email"
      class="form-control mb-3"
      :class="{ 'error-border': error }"
    />

    <button class="btn-custom" @click="send">
      {{ t('send') }}
    </button>

    <div class="back-link mt-3">
      <a href="#" @click.prevent="$emit('change-view','login')">
        {{ t('back') }}
      </a>
    </div>
  </div>
</template>

<script>
import { useI18n } from '../../../i18n/useI18n'

export default {
  name:'ForgotPassword',

  data(){
    return {
      email:'',
      error:false
    }
  },

  methods:{
    send(){
      if(!this.email.includes('@')){
        this.error = true
      } else {
        this.error = false
        this.$emit('change-view','resetpasswordemail', 'noemailreceived')
      }
    }
  },

  setup(){
    const { t } = useI18n()
    return { t }
  }
}
</script>
