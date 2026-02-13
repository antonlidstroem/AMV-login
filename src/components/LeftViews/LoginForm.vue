<template>
<div>


<div v-if="error" class="error-banner">Fel användarnamn och lösenord</div>

<h2>{{ t('login') }}</h2>

    <form @submit.prevent="login">

    <div class="input-icon">
      <p>{{ t('username') }}</p>
      <i class="bi bi-person-fill"></i>
      <input 
        v-model="username" 
        class="form-control mb-2" 
        :class="{'error-border':error}" 
      />
    </div>



    <div class="input-icon">
      <p>{{ t('password') }}</p>
      <i class="bi bi-lock-fill"></i>
        <input
          type="password"
          v-model="password"
          class="form-control mb-3"
          :class="{'error-border':error}"
        />

    </div>

<button class="btn btn-primary w-100">Logga in</button>

<div class="text-sm text-right">
        <span>{{ t('forgotPasswordQuestion') }}</span>
        <a href="#" @click.prevent="$emit('change-view','forgot')"
        class="text-blue-600 ml-1 hover:underline"
        >
        {{" " + t('clickHere') }}
      </a>
      </div>

<div class="divider">
      <span>{{ t('orBankId') }}</span>
    </div>

<div class="bankid-options">

        
            <button @click="$emit('change-view','mobilebankid')" 
              class="btn-common w-100 bankid-btn">
              <img :src="bankIdLogo" alt="BankID" class="bankid-icon" />
              {{ t('mobileBankID') }}
            </button>

            <button @click="$emit('change-view','bankiddevice')" 
              class="btn-common w-100 bankid-btn">
            <img :src="bankIdLogo" alt="BankID" class="bankid-icon" />
            {{ t('bankIDThisDevice') }}
            </button>


            
    </div>

     <a
        href="https://www.bankid.com/privat/om-bankid"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t('aboutMobileBankID') }}
      </a>



</form>

<Popup v-if="loading" title="Loggar in" text="Vänta..." button=""/>
</div>
</template>

<script>
import { loginMock } from '../../mock/authService'
import Popup from '../common/Popup.vue'
import { useI18n } from '../../i18n/useI18n'
import bankIdLogo from '../../assets/BankID_logo_white.png'


export default{
 components:{Popup},
 data(){
  return{
   username:'',
   password:'',
   error:false,
   loading:false
  }
 },
 methods:{
  async login(){
   this.error=false
   this.loading=true
   try{
    await loginMock(this.username,this.password)
    localStorage.setItem('mockLogin','true')

    this.$emit('change-view','twofactor')
   }catch{
    this.error=true
   }
   this.loading=false
  }
 },
 setup(){
 const { t } = useI18n()
 return { t, bankIdLogo}
}

}
</script>
