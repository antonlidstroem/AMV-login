<template>
<div>
<h4>Verifiera med kod</h4>
<p>Ange den fyrsiffriga kod som skickats...</p>

<div v-if="error" class="error-banner">Du har angett fel kod. Försök igen.</div>

<div class="d-flex gap-2 mb-3">
<input v-for="(d,i) in digits" :key="i"
 v-model="digits[i]"
 maxlength="1"
 class="form-control text-center"
 :class="inputClass"/>
</div>

<button class="btn btn-success w-100 mb-2" @click="verify">Logga in</button>

<button class="btn btn-link" @click="$emit('change-view','login')">Tillbaka</button>

<Popup v-if="successPopup"
 title="✔"
 text="En ny kod har skickats"
 button="Okej, stäng fönster"
 @close="successPopup=false"/>
</div>
</template>

<script>
import Popup from '../common/Popup.vue'
import { useI18n } from '../../i18n/useI18n'


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
  }
 },
 setup(){
 const { t } = useI18n()
 return { t }
}

}
</script>
