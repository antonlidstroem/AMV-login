<template>
<div class=" bg-views p-4 rounded-4 mb-3">

  <h2>{{ t('ResetPasswordEmailNotDelivered') }}</h2>
  <p>{{ t('ResetPasswordEmailNotDeliveredHelp') }}</p>
  <button class="btn-custom" @click="send">
    {{t('resendEmail')}}
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
import Popup from '../../common/Popup.vue'

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

