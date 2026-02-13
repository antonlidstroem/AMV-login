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
import ForgotPassword from './LeftViews/ResetPassword/ForgotPassword.vue'
import ResetPasswordEmail from './LeftViews/ResetPassword/ResetPasswordEmail.vue'
import ResetPasswordNew from './LeftViews/ResetPassword/ResetPasswordNew.vue'

import MobileBankId from './LeftViews/BankIDMobile/MobileBankId.vue'
import BankIdDevice from './LeftViews/BankIDDevice/BankIDDevice.vue'
import BankIdDeviceApproved from './LeftViews/BankIDDevice/BankIDDeviceApproved.vue'
import TwoFactor from './LeftViews/TwoFactor.vue'

import { useI18n } from '../i18n/useI18n'
import AMVLogo from '../assets/logo_horizontal.svg'
import MobileBankIdPending from './LeftViews/BankIDMobile/MobileBankIdPending.vue'
import MobileBankIdApproved from './LeftViews/BankIDMobile/MobileBankIdApproved.vue'


export default {
  props:['currentView'],

  components:{ 
    LoginForm, 
    ForgotPassword, 
    MobileBankId, 
    MobileBankIdPending,
    MobileBankIdApproved,
    BankIdDevice, 
    BankIdDeviceApproved,
    TwoFactor,
    ResetPasswordNew,
    ResetPasswordEmail  
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
        bankiddeviceapproved: BankIdDeviceApproved,
        twofactor:TwoFactor,
        newpassword:ResetPasswordNew,
        resetpasswordemail:ResetPasswordEmail
      }

      return views[this.currentView] || LoginForm
    }
  }
}

</script>