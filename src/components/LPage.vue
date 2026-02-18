<template>
  <div class="left-page p-4">

  <div v-if="currentView === 'twofactor'" class="twofactor-wrapper">
    <div class="component-box">
      <TwoFactor @change-view="$emit('change-view',$event)" />
    </div>
    <div class="component-box">
      <NoCodeReceived />
    </div>
  </div>

  <div v-if="currentView === 'noemailreceived'" class="twofactor-wrapper">
    <div class="component-box">
      <ResetPasswordEmail @change-view="$emit('change-view',$event)" />
    </div>
    <div class="component-box">
      <NoEmailReceived />
    </div>
  </div>


  <component
    v-else
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
import NoEmailReceived from './LeftViews/ResetPassword/NoEmailReceived.vue'

import MobileBankId from './LeftViews/BankIDMobile/MobileBankId.vue'
import BankIdDevice from './LeftViews/BankIDDevice/BankIDDevice.vue'
import BankIdDeviceApproved from './LeftViews/BankIDDevice/BankIDDeviceApproved.vue'

import TwoFactor from './LeftViews/TwoFactorAuth/TwoFactor.vue'
import NoCodeReceived from './LeftViews/TwoFactorAuth/NoCodeReceived.vue'

import { useI18n } from '../i18n/useI18n'
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
    ResetPasswordEmail,
    NoCodeReceived,
    NoEmailReceived

  },

  setup(){
    const { t } = useI18n()
    return{ t }
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
        resetpasswordemail:ResetPasswordEmail,
        nocodereceived: NoCodeReceived,
        noemailreceived: NoEmailReceived
        
      }

      return views[this.currentView] || LoginForm
    }
  }
}

</script>