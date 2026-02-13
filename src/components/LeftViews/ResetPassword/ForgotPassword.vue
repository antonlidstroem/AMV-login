<template>
  <div>
    <h2>{{ t('resetPassword') }}</h2>
    <p>{{ t('resetPasswordDescription') }}</p>
    <p>{{ t('email') }}:</p>

    <div v-if="error" class="error-banner">
      {{ t('enterValidEmail') }}
    </div>


    <label>ForgotPassword.vue</label>
    <input
      v-model="email"
      class="form-control mb-3"
      :class="{ 'error-border': error }"
    />

    <button class="btn-custom" @click="send">
      Skicka
    </button>

    <div class="back-link mt-3">
      <a href="#" @click.prevent="$emit('change-view','login')">
        ← {{ t('back') }}
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
        // Byt vy direkt till ResetPasswordEmail.vue
        this.$emit('change-view','resetpasswordemail')
      }
    }
  },

  setup(){
    const { t } = useI18n()
    return { t }
  }
}
</script>
