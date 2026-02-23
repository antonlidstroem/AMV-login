<template>
<div class=" bg-views p-4 rounded-4 mb-3">

  <h2>{{ t('resetPassword') }}</h2>

  <div class="text-center">
  <i class="bi bi-check-circle display-1 mb-3" style="color: var(--success)"></i>
  </div>

  <p>{{ t('ResetPasswordEmailSent') }}</p>
  <button class="btn-custom" @click="send">
    {{t('goToStart')}}
  </button>


  <h2>{{ t('ResetPasswordEmailNotDelivered') }}</h2>
  <p>{{ t('ResetPasswordEmailNotDeliveredHelp') }}</p>
  <button class="btn-custom" @click="send">
    {{t('resendEmail')}}
  </button>

</div>
</template>


<script>
import { useI18n } from '../../../i18n/useI18n'
import Popup from '../../common/LoginPopup.vue'

export default {
  name:'ForgotPassword',
  components:{ Popup },

  data(){
    return{
      email:'',
      error:false,
      success:false
    }
  },

  methods:{
    send(){
      if(!this.email.includes('@')){
        this.error=true
      }else{
        this.error=false
        this.success=true

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

