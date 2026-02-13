<template>



  <div class="col-md-6 p-4 bg-light">

    <img :src="AMVLogo" class="logo-top"/>

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
import TwoFactor from './LeftViews/TwoFactor.vue'
import ResetPasswordNew from './LeftViews/ResetPasswordNew.vue'
import { useI18n } from '../i18n/useI18n'
import AMVLogo from '../assets/logo_horizontal.svg'
import MobileBankIdPending from './LeftViews/MobileBankIdPending.vue'
import MobileBankIdApproved from './LeftViews/MobileBankIdApproved.vue'


export default {
  props:['currentView'],

  components:{ 
    LoginForm, 
    ForgotPassword, 
    MobileBankId, 
    MobileBankIdPending,
    MobileBankIdApproved,
    BankIdDevice, 
    TwoFactor,
    ResetPasswordNew  
  },

  setup(){
    const { t } = useI18n()
    return{ t, AMVLogo }
  },

  computed:{
    currentComponent(){

      const views = {
        login: LoginForm,
        forgot: ForgotPassword,
        mobilebankid: MobileBankId,
        mobilebankidpending: MobileBankIdPending,
        mobilebankidapproved: MobileBankIdApproved,
        bankiddevice: BankIdDevice,
        twofactor:TwoFactor,
        newpassword:ResetPasswordNew
      }

      return views[this.currentView] || LoginForm
    }
  }
}

</script>