<template>
<div>
<h4>Ange nytt lösenord</h4>

<div v-if="errorMsg" class="error-banner">{{errorMsg}}</div>

<input type="password" v-model="p1" class="form-control mb-2" :class="inputClass"/>
<input type="password" v-model="p2" class="form-control mb-2" :class="inputClass"/>

<button class="btn btn-success w-100" @click="change">Byt lösenord</button>

<Popup v-if="success"
 title="✔"
 text="Du har nu bytt lösenord."
 button="Till inloggning"
 @close="$emit('change-view','login')"/>
</div>
</template>

<script>
import Popup from '../common/Popup.vue'
import { useI18n } from '../../i18n/useI18n'


export default{
 components:{Popup},
 data(){return{p1:'',p2:'',errorMsg:'',success:false}},
 computed:{
  inputClass(){
   return this.errorMsg?'error-border':''
  }
 },
 methods:{
  change(){
   if(this.p1!==this.p2){
    this.errorMsg='De angivna lösenorden stämmer inte överens'
    return
   }
   if(this.p1.length<5){
    this.errorMsg='Ditt lösenord uppfyller inte kraven'
    return
   }
   this.success=true
  }
 },
 setup(){
 const { t } = useI18n()
 return { t }
}

}
</script>
