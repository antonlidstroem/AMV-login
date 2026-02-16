<template>
<div>


<div v-if="error" class="error-banner">{{ t('wrongUserNamePassword') }}</div>



 <form @submit.prevent="login" class="d-flex flex-column gap-2 p-3 text-dark">
    <h2 class="mb-3">{{ t('login') }}</h2> 
      <!-- Username -->
<label class="form-label mb-1">{{ t('username') }}</label>
      <div class="position-relative mb-2">
        <i class="bi bi-person-fill position-absolute text-dark" 
           style="left: 10px; top: 50%; transform: translateY(-50%); font-size: 1.2rem;"></i>
        <input 
          v-model="username" 
          class="form-control ps-5" 
          :class="{'error-border':error}" 
        />
      </div>

     <!-- Password -->
      <label class="form-label mb-1">{{ t('password') }}</label>
      <div class="position-relative mb-2">
        <i class="bi bi-lock-fill position-absolute text-dark" 
           style="left: 10px; top: 50%; transform: translateY(-50%); font-size: 1.2rem;"></i>
        <input
          type="password"
          v-model="password"
          class="form-control ps-5"
          :class="{'error-border':error}"
        />
      </div>

<button type="submit" class="btn-custom w-100 mb-2">Logga in</button>


<!-- Forgot password link -->
     <div class="d-flex justify-content-end mb-4">
        <span>{{ t('forgotPasswordQuestion') }}</span>
        <a href="#" @click.prevent="$emit('change-view','forgot')" 
           class="ms-1 fw-bold text-decoration-none text-primary">
          {{ t('clickHere') }}
        </a>
      </div>



<div class="divider mb-2">
  <br/>    
  <h4>{{ t('orBankId') }}</h4>
    </div>

<div class="d-flex flex-column gap-2 mb-2">
        
            <button @click="$emit('change-view','mobilebankid')" 
              class="btn-custom d-flex align-items-center justify-content-start gap-2">
              <img :src="bankIdLogo" alt="BankID" class="bankid-icon" />
              {{ t('mobileBankID') }}
            </button>

            <button @click="$emit('change-view','bankiddevice')" 
              class="btn-custom d-flex align-items-center justify-content-start gap-2">
            <img :src="bankIdLogo" alt="BankID" class="bankid-icon" />
            {{ t('bankIDThisDevice') }}
            </button>
          
    </div>

    <!-- About BankId -->
<div class="d-flex justify-content-end mt-2">
  <a
    href="https://www.bankid.com/privat/om-bankid"
    class="fw-bold text-decoration-none text-primary d-flex align-items-center"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="me-1" style="color: inherit;">⍰</span>
    {{ t('aboutMobileBankID') }}
  </a>
</div>




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
