<template>
<div class="bg-views p-4 rounded-4 mb-3">

  <img :src="AMVLogo" class="logo-top" />

<h4>{{ t('verifyWithCode') }}</h4>
<p>{{ t('enterPinCode') }}</p>

<div v-if="error" class="error-banner">t('newCodeSent')"</div>

<div class="d-flex gap-3 mb-3 justify-content-center">
  <input
    v-for="(d,i) in digits"
    :key="i"
    v-model="digits[i]"
    maxlength="1"
    class="text-center code-input"
    :class="{
      'error-border': error,
      'success-border': digits[i] && !error
    }"
    @input="clearError"
  />
</div>


<button class="btn-custom" @click="verify">{{ t('login') }}</button>

<button class="btn btn-link" @click="$emit('change-view','login')">{{ t('back') }}</button>
</div>
</template>

<script>
import Popup from '../../common/Popup.vue'
import { useI18n } from '../../../i18n/useI18n'
import AMVLogo from '../../../assets/logo_horizontal.svg'


export default{
 components:{Popup},
 data(){
  return{
   digits:['','','',''],
   error:false,
   successPopup:false
  }
 },
 computed:{
  inputClass(){
   if(this.error) return 'error-border'
   if(this.digits.some(d=>d)) return 'success-border'
   return ''
  }
 },
 methods:{
  verify(){
   if(this.digits.join('')==='1234'){
    alert('login success mock')
   }else{
    this.error=true
   }
  },
  clearError(){
   if(this.error){
    this.error=false
   }
  }
 },
 setup(){
 const { t } = useI18n()
 return { t, AMVLogo }
}

}
</script>
