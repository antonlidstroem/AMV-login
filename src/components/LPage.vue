<template>
  <div class="vpage">

<!-- Dynamically render the component based on currentView prop -->
    <component
      :is="currentComponent"
      @change-view="$emit('change-view',$event)"
    />

  </div>
</template>

<script>
import LoginForm from './LeftViews/LoginForm.vue'
import ForgotPassword from './LeftViews/ForgotPassword.vue'
import MobileBankId from './LeftViews/MobileBankId.vue'
import BankIdDevice from './LeftViews/BankIdDevice.vue'
import { useI18n } from '../i18n/useI18n'


export default {
  props:['currentView'],

  components:{ 
    LoginForm, 
    ForgotPassword, 
    MobileBankId, 
    BankIdDevice  
  },

  setup(){
    const { t } = useI18n()
    return{ t }
  },

  computed:{
    currentComponent(){

      const views = {
        login: 'LoginForm',
        forgot: 'ForgotPassword',
        mobilebankid: 'MobileBankId',
        bankiddevice: 'BankIdDevice'
      }

      return views[this.currentView] || 'LoginForm'
    }
  }
}

</script>



<style scoped>
.vpage {
  width: 50%;
  padding: 20px;
  background-color: #f0f0f0;
}
</style>
